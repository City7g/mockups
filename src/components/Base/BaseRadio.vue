<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: {
    type: Number,
    require: true,
  },
  options: {
    type: Array,
    require: true,
  },
  error: {
    type: String,
    require: false,
  },
  name: {
    type: String,
    require: false,
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="radio-main">
    <h5 class="radio-main__title">Select your position</h5>
    <label v-for="option in options" :key="option.id" class="radio-main__item">
      <input
        type="radio"
        :checked="modelValue === option.id"
        @change="$emit('update:modelValue', option.id)"
        :value="option.id"
        :name="name"
      />
      <span class="radio-main__name">{{ option.name }}</span>
    </label>
    <p v-if="error" class="text-error radio-main__error">{{error}}</p>
  </div>
</template>

<style lang="scss">
.radio-main {
  &__title {
    margin-bottom: 14px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  &__name {
    font-size: 16px;
    line-height: 26px;
  }

  &__item ~ &__item {
    margin-top: 7px;
  }

  &__error {
    margin-top: 10px;
  }
}
</style>
