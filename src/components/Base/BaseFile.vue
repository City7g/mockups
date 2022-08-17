<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    require: true
  },
  error: {
    type: [String, null],
    require: false
  },
  name: {
    type: String,
    require: false
  }
})

const shortPath = computed(() => {
  const path = props.modelValue.split('\\')
  return path[path.length - 1]
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="input-file">
    <input type="file" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" :name="name"
      class="input-file__field" :class="{ error: error }">
    <p class="input-file__placeholder" :class="{ active: modelValue }">
      {{ modelValue ? shortPath : 'Upload your photo' }}
    </p>
    <span class="input-file__upload">Upload</span>

    <span v-if="error" class="text-error input-file__error">{{ error }}</span>
  </label>
</template>

<style lang="scss">
.input-file {
  position: relative;
  display: block;
  width: 100%;

  &__field {
    position: relative;
    width: 100%;
    padding: 13px 20px 13px 100px;
    background: #F8F8F8;
    border: 1px solid #D0CFCF;
    border-radius: 4px;
    max-width: 100%;
    cursor: pointer;
    font-size: 16px;
    line-height: 26px;
    opacity: 0;

    &::file-selector-button,
    &::-webkit-file-upload-button {
      display: none;
    }

    &.error {
      border-color: #CB3D40;
    }
  }

  &__upload {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 13px 15px 13px 15px;
    border: 1px solid rgba(0, 0, 0, 0.87);
    border-radius: 4px 0px 0px 4px;
    font-size: 16px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.87);
    cursor: pointer;

    .error~& {
      border-color: #CB3D40 !important;
      outline: 1px solid #CB3D40;
    }
  }

  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 13px 20px 13px 100px;
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #D0CFCF;
    border-radius: 4px;
    color: #7E7E7E;

    &.active {
      color: rgba(0, 0, 0, 0.87);
    }

    .error~& {
      border-color: #CB3D40;
      outline: 1px solid #CB3D40;
    }
  }

  &__error {
    position: absolute;
    left: 16px;
    top: calc(100% + 2px);
  }
}
</style>