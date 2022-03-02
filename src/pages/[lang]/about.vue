<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const user = useUserStore();
const name = ref(user.savedName);
const { t } = useI18n();
</script>

<template>
  <div>
    <p>
      {{ t('s.intro.hi', { name }) }}
    </p>

    <template v-if="user.otherNames.length">
      <p
        class="text-sm mx-auto mt-4"
        style="max-width: 300px;"
      >
        <v-list
          disabled
        >
          <v-list-subheader>
            {{ t('s.intro.aka') }}:
          </v-list-subheader>
          <v-list-item
            v-for="(item, i) in user.otherNames"
            :key="i"
          >
            <v-list-item-title
              class="mx-auto"
              v-text="item"
            />
          </v-list-item>
        </v-list>
      </p>
    </template>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
