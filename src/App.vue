<script setup lang="ts">
import { isDark } from '~/logic';
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
	title: 'Vitesse',
	meta: [
		{ name: 'description', content: 'Opinionated Vite Starter Template' },
	],
});
</script>

<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <router-view />
  </v-app>
</template>
