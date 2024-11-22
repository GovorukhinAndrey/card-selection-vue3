<script lang="ts" setup>

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}

</script>

<template>
  <button @click="handleClick" v-bind="$attrs">
    <slot>Submit</slot>
  </button>
</template>

<style lang="scss" scoped>
@use "sass:color";

button {
  cursor: pointer;
  border: none;
  transition: background-color v.$A;
  border-radius: 10px;
  background-color: v.$primary;
  color: v.$white;
  padding: 10px;

  &:hover {
    background-color: color.adjust(v.$primary, $lightness: 10%);
  }
}
</style>
