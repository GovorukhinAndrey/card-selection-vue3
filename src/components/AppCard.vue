<template>
  <div class="app-card">
    <slot></slot>
    <UiButton v-if="props.isButton" @click="handleClick">Reset</UiButton>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'

interface IProps {
  isButton?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  isButton: false
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}

</script>

<style lang="scss">
.app-card {
  border: 2px solid v.$primary;
  border-radius: v.$border-radius;
  padding: 10px;
}
</style>
