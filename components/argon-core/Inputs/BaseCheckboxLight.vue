<template>
  <div class="custom-control custom-checkbox"
       :class="[{disabled: disabled}, {[`custom-checkbox-${type}`]: type},inlineClass]">
    <input :id="cbId"
           type="checkbox"
           class="custom-control-input"
           :class="inputClasses"
           :disabled="disabled"
           :checked="shouldBeChecked"
           :value="value"
           @change="updateInput">
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
  export default {
    name: "base-checkbox-light",
    model: {
      prop: "modelValue",
      event: "change"
    },
    props: {
      value: {
        type: [String, Number, Boolean]
      },
      disabled: {
        type: Boolean,
        description: "Whether checkbox is disabled"
      },
      type: {
        type: String,
        description: 'Checkbox type (e.g info, danger etc)'
      },
      inline: {
        type: Boolean,
        description: "Whether checkbox is inline"
      },
      inputClasses: {
        type: [String, Object, Array],
        description: "Checkbox input classes"
      },
      modelValue: {
        default: false
      },
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      }
    },
    data() {
      return {
        cbId: ""
      };
    },
    computed: {
      shouldBeChecked() {
        if (this.modelValue instanceof Array) {
          return this.modelValue.includes(this.value)
        }
        return this.modelValue === this.trueValue
      },
      inlineClass() {
        if (this.inline) {
          return `form-check-inline`;
        }
      }
    },
    methods: {
      updateInput(event) {
        let isChecked = event.target.checked
        if (this.modelValue instanceof Array) {
          let newValue = [...this.modelValue]
          
          if (isChecked) newValue.push(this.value)
          else newValue.splice(newValue.indexOf(this.value), 1)
          
          this.$emit('change', newValue)
        } else {
          this.$emit('change', isChecked ? this.trueValue : this.falseValue)
        }
      }
    },
    mounted() {
      this.cbId = Math.random()
        .toString(16)
        .slice(2);
    }
  };
</script>
