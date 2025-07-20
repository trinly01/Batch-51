import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import qs from 'qs';

interface Image {
  id: number;
  url: string;
}

interface Item {
  id: number;
  name: string;
  images: Image[];
}

export const useStoreItems = defineStore('items', {
  state: () => ({
    items: [] as Item[],
  }),
  getters: {
    getItems: (state) => state.items,
  },
  actions: {
    async fetchItems() {
      const query = qs.stringify({
        populate: ['images'],
      });
      const response = await api.get(`/items?${query}`);
      this.items = response.data.data;
      console.log('items', this.items);
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreItems, import.meta.hot));
}
