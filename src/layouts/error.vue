<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js';
const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div>
      <p class="text-4xl">
        <v-icon
          :icon="mdiInformationOutline"
          class="inline-block"
        />
      </p>
    </div>
    <router-view />
    <div>
      <v-btn
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        {{ t('s.button.back') }}
      </v-btn>
    </div>
  </main>
</template>
