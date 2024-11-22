<template>
  <div class="app-items-wrapper">
    <div v-if="isLoading" class="app-items-wrapper__loading">Loading...</div>
    <template v-else>
      <AppResult :class="['app-items-wrapper__result', handleGetSide()]" :data="state.results"
        @remove="handleRemoveItem" @reset="handleResetResult" :choiceLimitation />
      <AppCard class="app-items-wrapper__collection">
        <div class="app-items-wrapper__wrapper">
          <AppItem v-for="item in data" :key="item.id" @click="handleAddToResult" :isDisabled
            :isChecked="handleCheck(item.id)" class="app-items-wrapper__item" :data="item" />
        </div>
      </AppCard>
    </template>
  </div>
</template>

<script lang="ts" setup>

import { reactive, computed } from 'vue';
import AppCard from '@/components/AppCard.vue';
import AppItem from '@/components/AppItem.vue';
import AppResult from '@/components/AppResult.vue';
import type { IBasicData } from '@/interfaces/data.interface';

const state = reactive<{ results: IBasicData[] }>({
  results: []
})

export type TResultSide = 'left' | 'right' | ''

interface IProps {
  choiceLimitation?: number
  data: IBasicData[] | null
  isLoading: boolean
  resultSide?: TResultSide
}

const props = withDefaults(defineProps<IProps>(), {
  choiceLimitation: 6,
  resultSide: ''
})

const handleGetSide = (): string => {

  switch (props.resultSide) {
    case 'left':
      return 'app-items-wrapper__result--left'
    case 'right':
      return 'app-items-wrapper__result--right'
    default:
      return ''
  }

}

const handleAddToResult = (data: IBasicData) => {

  if (props.choiceLimitation > 1 && state.results.length + 1 > props.choiceLimitation) return false

  state.results = props.choiceLimitation > 1 ? [...state.results, data] : [data]
}

const handleRemoveItem = (data: IBasicData) => {
  state.results = state.results.filter(el => el.id !== data.id)
}

const handleResetResult = () => {
  state.results = []
}

const handleCheck = (id: number): boolean => {
  return state.results.some(el => el.id === id)
}

const isDisabled = computed<boolean>(() => {
  if (props.choiceLimitation === 1) return false
  return state.results.length === props.choiceLimitation
})
</script>

<style lang="scss">
.app-items-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;

  &__result {
    margin-bottom: 30px;
    min-height: 200px;

    &--right {
      @include m.media-md() {
        width: 350px;
        align-self: flex-end;
      }
    }

    &--left {
      @include m.media-md() {
        width: 350px;
        align-self: flex-start;
      }
    }
  }

  &__collection {
    flex-grow: 1;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    gap: 15px;
  }

  &__item {
    @include m.size(75px);

    @include m.media-sm() {
      @include m.size(100px);
    }

    @include m.media-md() {
      @include m.size(150px);
    }
  }

  &__loading {
    @include m.absolute-center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
