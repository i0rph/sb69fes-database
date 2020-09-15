<template>
  <div class="form-group" :class="formGroupClasses">
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{label}}
      </label>
    </slot>
    <div :class="[
      {'input-group': hasIcon},
      {'focused': focused},
      {'input-group-alternative': alternative},
      {'has-label': label || $slots.label},
      inputGroupClasses
      ]">
      <div v-if="prependIcon || $slots.prepend" class="input-group-prepend">
      <span class="input-group-text">
        <slot name="prepend">
          <i :class="prependIcon"></i>
        </slot>
      </span>
      </div>
      <slot v-bind="slotData">
        <input
          :type="type"
          v-on="listeners"
          v-bind="$attrs"
          :required="required"
          class="form-control"
          :class="inputClasses">
      </slot>
      <div v-if="appendIcon || $slots.append" class="input-group-append">
        <span class="input-group-text">
            <slot name="append">
                <i :class="appendIcon"></i>
            </slot>
        </span>
      </div>
      <slot name="infoBlock"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: "base-input-light",
    props: {
      required: {
        type: Boolean,
        description: "Whether input is required (adds an asterix *)"
      },
      group: {
        type: Boolean,
        description: "Whether input is an input group (manual override in special cases)"
      },
      alternative: {
        type: Boolean,
        description: "Whether input is of alternative layout"
      },
      label: {
        type: String,
        description: "Input label (text before input)"
      },
      labelClasses: {
        type: String,
        description: "Input label css classes",
        default: "form-control-label"
      },
      inputClasses: {
        type: String,
        description: "Input css classes"
      },
      inputGroupClasses: {
        type: String,
        description: "Input group css classes"
      },
      formGroupClasses: {
        type: String,
        description: "Form group css classes"
      },
      type: {
        type: String,
        description: "Input type",
        default: "text"
      },
      appendIcon: {
        type: String,
        description: "Append icon (right)"
      },
      prependIcon: {
        type: String,
        description: "Prepend icon (left)"
      }
    },
    data() {
      return {
        focused: false
      };
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue,
          focus: this.onFocus,
          blur: this.onBlur
        };
      },
      slotData() {
        return {
          focused: this.focused,
          ...this.listeners
        };
      },
      hasIcon() {
        const { append, prepend } = this.$slots;
        return (
          append !== undefined ||
          prepend !== undefined ||
          this.appendIcon !== undefined ||
          this.prependIcon !== undefined ||
          this.group
        );
      }
    },
    methods: {
      updateValue(evt) {
        let value = evt.target.value;
        this.$emit("input", value);
      },
      onFocus(evt) {
        this.focused = true;
        this.$emit("focus", evt);
      },
      onBlur(evt) {
        this.focused = false;
        this.$emit("blur", evt);
      }
    }
  };
</script>
<style>
</style>