<template>
  <button @click="handleClick" :disabled="isDisabled || isChecked" class="app-item">
    <XIcon v-if="isCloseIcon" class="app-item__close" />
    <CheckIcon v-if="isChecked" color="green" :size="64" class="app-item__disabled-icon" />
    {{ data.name }}
  </button>
</template>

<script setup lang="ts">
import type { IBasicData } from '@/interfaces/data.interface';
import { XIcon, CheckIcon } from 'lucide-vue-next'

interface IProps {
  data: IBasicData
  isCloseIcon?: boolean
  isDisabled?: boolean
  isChecked?: boolean
}

const { data, isCloseIcon, isDisabled, isChecked } = defineProps<IProps>()

const emits = defineEmits<{
  'click': [IBasicData]
}>()

const handleClick = () => {
  if (isDisabled) { return false }
  emits('click', data)
}

</script>

<style lang="scss">
.app-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: v.$white;
  transition: background-color v.$A, color v.$A;
  border-radius: 3px;
  @include m.overflow-ellipsis;

  &:hover {
    background-color: v.$accent;
  }

  &:disabled {
    cursor: default;
  }

  &:disabled:hover {
    background-color: v.$white;
  }

  &__disabled-icon {
    @include m.absolute-center
  }

  &__close {
    position: absolute;
    right: 0px;
    top: 0px;
  }
}
</style>
