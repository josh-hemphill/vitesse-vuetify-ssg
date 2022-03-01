<script setup lang="ts">
import { mdiBrightness2, mdiBrightness5, mdiGithub, mdiHome, mdiInformation, mdiTranslate } from '@mdi/js';
import { isDark, toggleDark } from '~/logic';

const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
	// change to some real logic
	const locales = availableLocales;
	locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
</script>

<template>
  <nav class="text-xl mt-6">
    <v-btn
      density="compact"
      color="transparent"
      flat
      icon
      class="icon-btn mx-2"
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
      color="transparent"
      flat
      icon
      class="mx-2"
      :title="t('s.button.toggle_dark')"
      @click="toggleDark()"
    >
      <v-icon
        v-if="isDark"
        :icon="mdiBrightness2"
      />
      <v-icon
        v-else
        :icon="mdiBrightness5"
      />
    </v-btn>

    <v-btn
      density="compact"
      color="transparent"
      flat
      icon
      class="mx-2"
      :title="t('s.button.toggle_langs')"
      @click="toggleLocales"
    >
      <v-icon
        size="large"
        :icon="mdiTranslate"
      />
    </v-btn>

    <v-btn
      density="compact"
      color="transparent"
      flat
      icon
      class="mx-2"
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
      color="transparent"
      flat
      icon
      class="mx-2"
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
  </nav>
</template>
