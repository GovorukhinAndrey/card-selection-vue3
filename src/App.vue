<template>
  <main class="wrapper">
    <AppItemsWrapper :data="state.userItems" resultSide='left' :isLoading="state.isLoadingUserItems" />
    <AppItemsWrapper :data="state.items" resultSide='right' :isLoading="state.isLoadingItems" :choiceLimitation="1" />
  </main>
</template>


<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import AppItemsWrapper from '@/components/AppItemsWrapper.vue';
import type { IBasicData } from '@/interfaces/data.interface';
import { ItemsApi } from '@/services/items.service';
import { UserItemsApi } from '@/services/user-items.service';



interface IState {
  items: IBasicData[] | null
  userItems: IBasicData[] | null
  isLoadingItems: boolean
  isLoadingUserItems: boolean
}

const itemsApi = new ItemsApi()
const userItemsApi = new UserItemsApi()

const state = reactive<IState>({
  isLoadingItems: true,
  isLoadingUserItems: true,
  items: null,
  userItems: null
})

onMounted(() => {
  getItems()
  getUserItems()
})

const getItems = async () => {
  try {
    state.isLoadingItems = true;
    state.items = await itemsApi.getAll();
    throw new Error()
  } finally {
    state.isLoadingItems = false
  }
}

const getUserItems = async () => {
  try {
    state.isLoadingUserItems = true;
    state.userItems = await userItemsApi.getAll();
    throw new Error()
  } finally {
    state.isLoadingUserItems = false
  }
}

</script>


<style scoped lang="scss">
.wrapper {
  height: 100vh;
  grid-template-columns: minmax(0, 1fr);
  display: grid;
  gap: 50px;
  padding: 20px;

  @include m.media-md() {
    gap: 30px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
