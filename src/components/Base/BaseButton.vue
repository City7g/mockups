<script setup>
import { defineProps } from 'vue'

defineProps({
  text: {
    require: false,
    default: 'Text'
  }
})
</script>

<template>
  <button class="btn-main">{{ text }}</button>
</template>

<style lang="scss">
.btn-main {
  padding: 4px 19px;
  min-width: 100px;
  font-size: 16px;
  line-height: 26px;
  background-color: #F4E041;
  border-radius: 17px;
  cursor: pointer;
  transition: 0.3s background-color ease, 0.3s color ease;

  @media (max-width: 359px) {
    min-width: max-content;
  }

  &:hover {
    background-color: #FFE302;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.87);
    background-color: #B4B4B4;
    cursor: auto;
  }
}
</style>