<template>
  <div class="row">
    <div class="col-12">
      <span>Skeleton:</span><select id="skeletonList"></select>
      <span>Animation:</span><select id="animationList"></select>
      <span>Debug:</span><input type="checkbox" id="debug">
    </div>
    <div class="col-12">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'spine-vue',
    props: {
      _id: {
        type: [String, Number],
        required: true
      }
    },
    head: {
      script: [
        {
          src: 'js/spine-webgl.js'
        }
      ]
    },
    data() {
      return {
        lastFrameTime: Date.now() / 1000,
        canvas: null,
        shader: null,
        batcher: null,
        gl: null,
        mvp: null,
        skeletonRenderer: null,
        debugRenderer: null,
        debugShader: null,
        shapes: null,
        skeleton: {},
        activeSkeleton: '',
        classMap: null,
        pendingAnimation: '',
        animationQueue: [],
        pendingFace: '',
        bgColor: [.3, .3, .3, 1],
        speedFactor: 1,
        debug: false,
        loading: false,
        currentTexture: null,
        currentClassAnimData: {
          type: 0,
          data: {}
        },
        currentCharaAnimData: {
          id: 0,
          data: {}
        },
        currentClass: '1'
      }
    },
    methods: {
      init() {
        this.mvp = new spine.webgl.Matrix4()
        
        this.canvas = this.$refs.canvas
        let config = { alpha: false }
        this.gl = this.canvas.getContext("webgl", config) || this.canvas.getContext("experimental-webgl", config)
        if (!this.gl) {
          alert('WebGL is unavailable.')
          return
        }
        
        this.shader = spine.webgl.Shader.newTwoColoredTextured(this.gl)
        this.batcher = new spine.webgl.PolygonBatcher(this.gl)
        this.mvp.ortho2d(0, 0, this.canvas.width - 1, this.canvas.height - 1)
        this.skeletonRenderer = new spine.webgl.SkeletonRenderer(this.gl)
        this.debugRenderer = new spine.webgl.SkeletonDebugRenderer(this.gl)
        this.debugRenderer.drawRegionAttachments = true;
        this.debugRenderer.drawBoundingBoxes = true;
        this.debugRenderer.drawMeshHull = true;
        this.debugRenderer.drawMeshTriangles = true;
        this.debugRenderer.drawPaths = true;
        this.debugShader = spine.webgl.Shader.newColored(this.gl)
        this.shapes = new spine.webgl.ShapeRenderer(this.gl)
        
        this.load()
      },
      async load() {
        if (this.loading) return
        this.loading = true
        
        console.log('Loading Animation (0/3)')
        
        let loadedResource = {
          skel: null,
          atlas: null
        }
        
        loadedResource.skel = await this.$axios.get(`asset/spine/humanmodel06302.skel`, {responseType: 'arraybuffer'})
        loadedResource.atlas = await this.$axios.get(`asset/spine/humanmodel06302.atlas`)
        
        let img = new Image()
        img.onload = () => {
          let created = !!this.skeleton.skeleton
          if (created) {
            this.skeleton.state.clearTracks()
            this.skeleton.state.clearListeners()
            this.gl.deleteTexture(this.currentTexture.texture)
          }
          
          let imgTexture = new spine.webgl.GLTexture(this.gl, img)
          let atlas = new spine.TextureAtlas(loadedResource.atlas, (path) => {
            return imgTexture
          })
          this.currentTexture = imgTexture
          
          let atlasLoader = new spine.AtlasAttachmentLoader(atlas)
          let skeletonBinary = new spine.SkeletonBinary(atlasLoader)
          let skeletonData = skeletonBinary.readSkeletonData(loadedResource.skel)
          let skeleton = new spine.Skeleton(skeletonData)
          skeleton.setSkinByName('idle')
          if (pendingFace) {
            skeleton.setSkinByName(pendingFace)
            pendingFace = ''
          }
          
          let bounds = calculateBounds(skeleton)
          
          let animationStateData = new spine.AnimationStateData(skeleton.data)
          let animationState = new spine.AnimationState(animationStateData)
          animationState.setAnimation(0, 'idle_loop', true)
          animationState.addListener({
            complete: function tick(track) {
              if (this.animationQueue.length) {
                let nextAnim = animationQueue.shift()
                if (nextAnim == 'stop') return
                if (nextAnim == 'hold') return setTimeout(tick, 1e3)
                console.log(nextAnim)
                animationState.setAnimation(0, nextAnim, !this.animationQueue.length)
              }
            }
          })
          
          this.skeleton = { skeleton: skeleton, state: animationState, bounds: bounds, premultipliedAlpha: true }
          this.loading = false
          if (!created) {
            this.canvas.style.width = '99%'
            requestAnimationFrame(this.render)
            setTimeout(() => {
              this.canvas.style.width = ''
            }, 0)
          }
        }
        console.log(await this.$axios.get(`asset/spine/humanmodel06302.png`, {responseType: 'blob'}))
        //img.src = await this.$axios.get(`asset/spine/humanmodel06302.png`, {responseType: 'blob'})
      },
      render() {
        let now = Date.now() / 1000
        let delta = now - this.lastFrameTime
        this.lastFrameTime = now
        delta *= this.speedFactor
        
        this.resize()
        
        this.gl.clearColor(bgColor[0], bgColor[1], bgColor[2], 1)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        
        let state = this.skeleton.state
        let skeleton = this.skeleton.skeleton
        let bounds = this.skeleton.bounds
        let premultipliedAlpha = this.skeleton.premultipliedAlpha
        state.update(delta)
        state.apply(skeleton)
        skeleton.updateWorldTransform()
        
        this.shader.bind()
        this.shader.setUniformi(spine.webgl.Shader.SAMPLER, 0)
        this.shader.setUniform4x4f(spine.webgl.Shader.MVP_MATRIX, this.mvp.values)
        
        this.batcher.begin(this.shader)
        
        this.skeletonRenderer.premultipliedAlpha = premultipliedAlpha
        this.skeletonRenderer.draw(this.batcher, skeleton)
        this.batcher.end()
        
        this.shader.unbind()
        
        if (this.debug) {
          this.debugShader.bind()
          this.debugShader.setUniform4x4f(spine.webgl.Shader.MVP_MATRIX, this.mvp.values)
          this.debugRenderer.premultipliedAlpha = premultipliedAlpha
          this.shapes.begin(this.debugShader)
          this.debugRenderer.draw(this.shapes, skeleton)
          this.shapes.end()
          this.debugShader.unbind()
        }
        
        requestAnimationFrame(this.render)
      },
      resize() {
        let useBig = screen.width * devicePixelRatio > 1280
        let w = this.canvas.clientWidth * devicePixelRatio
        let h = this.canvas.clientHeight * devicePixelRatio
        let bounds = this.skeleton.bounds
        if (this.canvas.width != w || this.canvas.height != h) {
          this.canvas.width = w
          this.canvas.height = h
        }
        
        let centerX = bounds.offset.x + bounds.size.x / 2
        let centerY = bounds.offset.y + bounds.size.y / 2
        let scaleX = bounds.size.x / this.canvas.width
        let scaleY = bounds.size.y / this.canvas.height
        let scale = Math.max(scaleX, scaleY) * 1.2
        if (scale < 1) scale = 1
        let width = this.canvas.width * scale
        let height = this.canvas.height * scale
        
        this.mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height)
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
      },
      calculateBounds(skeleton) {
        skeleton.setToSetupPose()
        skeleton.updateWorldTransform()
        let offset = new spine.Vector2()
        let size = new spine.Vector2()
        skeleton.getBounds(offset, size, [])
        return { offset: offset, size: size }
      }
    },
    async mounted() {
      this.init()
      //global.spine = spine
    }
  }
</script>
<style>
</style>