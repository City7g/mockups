<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    require: true
  },
  placeholder: {
    require: false,
    type: String
  },
  type: {
    require: false,
    type: String,
    default: 'text'
  },
  error: {
    type: Boolean,
    require: true
  },
  helperText: {
    type: String,
    require: false
  },
  name: {
    type: String,
    require: false
  }
})

defineEmits(['update:modelValue'])

const isInputFocus = ref(false)

const isPlaceholderTop = computed(() => {
  return (props.modelValue.length || isInputFocus.value) ? true : false
})
</script>

<template>
  <label class="input-main">
    <input :type="type ?? 'text'" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      @focus="isInputFocus = true" @blur="isInputFocus = false" class="input-main__field" :class="{ error: error }"
      :name="name">
    <span v-if="placeholder" class="input-main__placeholder" :class="{ active: isPlaceholderTop }">
      {{ placeholder }}
    </span>
    <span v-if="error" class="text-error input-main__error">{{ error }}</span>
    <span v-else-if="helperText" class="input-main__helper">{{ helperText }}</span>
  </label>
</template>

<style lang="scss">
.input-main {
  display: block;
  position: relative;

  &__placeholder {
    position: absolute;
    left: 12px;
    top: calc(50% - 1px);
    pointer-events: none;
    padding: 0 4px;
    background: #F8F8F8;
    white-space: nowrap;
    transition: 0.2s all ease;
    transform: translateY(-50%);
    color: #7E7E7E;

    &.active {
      top: -1px;
      left: 10px;
      font-size: 12px;
      line-height: 16px;
    }

    .error~& {
      color: $error;
    }
  }

  &__field {
    background-color: transparent;

    &.error {
      border-color: $error !important;

      &:focus {
        outline-color: $error !important;
      }
    }
  }

  &__helper {
    position: absolute;
    left: 16px;
    top: calc(100% + 2px);
    font-size: 12px;
    line-height: 14px;
  }
}
</style>