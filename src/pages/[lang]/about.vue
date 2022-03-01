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
      <p class="text-sm mt-4">
        <v-list disabled>
          <v-subheader>{{ t('s.intro.aka') }}:</v-subheader>
          <v-list-item
            v-for="(item, i) in user.otherNames"
            :key="i"
          >
            <v-list-item-content class="mx-auto">
              <v-list-item-title
                class="mx-auto"
                v-text="item"
              />
            </v-list-item-content>
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
