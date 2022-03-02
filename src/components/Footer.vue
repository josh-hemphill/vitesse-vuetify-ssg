<script setup lang="ts">
import { mdiBrightness2, mdiBrightness5, mdiGithub, mdiHome, mdiInformation, mdiTranslate as mdiTr } from '@mdi/js';
import { isDark, toggleDark } from '~/logic';

const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
	// change to some real logic
	const locales = availableLocales;
	locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
</script>

<template>
  <v-footer
    class="text-xl justify-center"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        density="compact"
        flat
        icon
        class="icon-btn mx-3"
        to="/"
        :title="t('s.button.home')"
        @click="()=>''"
      >
        <v-icon
          size="large"
          :icon="mdiHome"
        />
      </v-btn>

      <v-btn
        density="compact"
        flat
        icon
        class="mx-3"
        :title="t('s.button.toggle_dark')"
        @click="toggleDark()"
      >
        <v-icon
          v-if="isDark"
          size="large"
          :icon="mdiBrightness2"
        />
        <v-icon
          v-else
          size="large"
          :icon="mdiBrightness5"
        />
      </v-btn>

      <v-btn
        density="compact"
        flat
        icon
        class="mx-3"
        :title="t('s.button.toggle_langs')"
        @click="toggleLocales"
      >
        <v-icon
          size="large"
          :icon="mdiTr"
        />
      </v-btn>

      <v-btn
        density="compact"
        flat
        icon
        class="mx-3"
        to="/about"
        :title="t('s.button.about')"
        @click="()=>''"
      >
        <v-icon
          size="large"
          :icon="mdiInformation"
        />
      </v-btn>

      <v-btn
        density="compact"
        flat
        icon
        class="mx-3"
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
        title="GitHub"
        @click="()=>''"
      >
        <v-icon
          size="large"
          :icon="mdiGithub"
        />
      </v-btn>
    </v-row>
  </v-footer>
</template>
