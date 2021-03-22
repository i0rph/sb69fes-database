<template>
  <div class="row">
    <div class="col-12" ref="canvas">
      <!--<canvas ref="canvas"></canvas>-->
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
    data() {
      return {
        //
      }
    },
    async mounted() {
      const PIXI = await import('pixi.js')
      window.PIXI = PIXI
      await import("pixi-spine")
      
      const app = new PIXI.Application()
      
      this.$refs.canvas.appendChild(app.view)
      app.loader
        .add('spineCharacter', 'asset/spine/humanmodel06302.skel')
        .load(function (loader, resources) {
          let animation = new PIXI.spine.Spine(resources.spineCharacter.spineData)
          window.test = animation
          app.stage.addChild(animation)
          app.start()
        })
      /*
      let skel = await this.$axios.$get('asset/spine/humanmodel06302.skel')
      let atlas = await this.$axios.$get('asset/spine/humanmodel06302.atlas')
      let image = await this.$axios.$get('asset/spine/humanmodel06302.png')
      
      const spineAtlas = new PIXI.spine.core.TextureAtlas(atlas, (line, callback) => {
        callback(PIXI.BaseTexture.from(line))
      })
      
      let spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas)
      let skeletonBinary = new PIXI.spine.core.SkeletonBinary(spineAtlasLoader)
      let skeletonData = PIXI.spine.core.skeletonBinary.readSkeletonData(skel)
      
      let skeleton = new PIXI.spine.core.Skeleton(skeletonData)
      
      console.log(skeleton)
      */
    }
  }
</script>
<style>
</style>