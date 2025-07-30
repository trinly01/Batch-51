<template>
  <q-page class="col">
    <h1>Inventory GraphQL</h1>
    <div class="row q-gutter-md q-pa-md">
      <q-card class="my-card " flat bordered v-for="item in items" :key="item.id">
        <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->
        <q-img :src="`${strapiUrl}${item.images[0]?.url}`" fit="cover" height="200px" />
        
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ item.name }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating :model-value="4" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey ellipsis-3-lines">
            {{ strapiUrl }}{{ item.images[0]?.url }}
            <!-- {{ item.images[0]?.url }} -->
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useStoreItems } from 'stores/itemsGraphql';
import { computed } from 'vue';

const strapiUrl = process.env.STRAPI_URL;

const storeItems = useStoreItems();

await storeItems.fetchItems();

const items = computed(() => storeItems.items);
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>