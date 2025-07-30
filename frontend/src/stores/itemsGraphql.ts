import { defineStore, acceptHMRUpdate } from 'pinia';
import { graphqlApi } from 'boot/axios';

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
      const query = `
        query ($id: ID!) {
          items {
            documentId
            name
            images {
              documentId
            }
          }
          item(documentId: $id) {
            documentId
            name
            images {
              documentId
              url
            }
          }
        }
      `

      const variables = {
        id: 'nil0j5j7du22vwyd0i4wvmpp'
      }


      const response = await graphqlApi.post('', { query, variables });
      this.items = response.data.data.items;
      console.log('response', response.data.data);
      console.log('items', this.items);
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreItems, import.meta.hot));
}
