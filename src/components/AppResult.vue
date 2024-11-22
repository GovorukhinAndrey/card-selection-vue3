<template>
  <AppCard :isButton="data.length > 0" @click="handleReset" class="app-result">

    <div v-if="data.length > 0" class="app-result__wrapper">
      <div v-if="choiceLimitation === 1" class="app-result__one-item">Selected <br>{{ data[0].name }}</div>
      <template v-else>
        <AppItem v-for="item in data" :key="item.id" @click="handleRemove" isCloseIcon class="app-result__item"
          :data="item" />
      </template>
    </div>

    <p v-if="choiceLimitation > 1" class="app-result__selected"> selected: {{ data.length }} / {{ choiceLimitation }}
    </p>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/AppCard.vue';
import AppItem from '@/components/AppItem.vue';
import type { IBasicData } from '@/interfaces/data.interface';

interface IProps {
  choiceLimitation: number
  data: IBasicData[]
}

const { choiceLimitation, data } = defineProps<IProps>()

const emits = defineEmits<{
  'reset': [],
  'remove': [IBasicData]
}>()

const handleReset = () => {
  emits('reset')
}

const handleRemove = (data: IBasicData) => {
  emits('remove', data)
}
</script>

<style lang="scss">
.app-result {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__wrapper {
    display: flex;
    flex-wrap: nowrap;
    gap: 15px;
    flex-grow: 1;
    overflow-x: auto;
    width: 100%;
  }

  &__item {
    @include m.size(75px);
    flex: 0 0 auto;
  }

  &__one-item {
    display: flex;
    width: 100%;
    align-self: center;
    justify-content: center;
    font-size: m.rem(18);

    @include m.media-md() {
      font-size: m.rem(22);

    }
  }

  &__selected {
    text-align: center;
    margin-bottom: 0;
    font-size: m.rem(18);
  }
}
</style>
