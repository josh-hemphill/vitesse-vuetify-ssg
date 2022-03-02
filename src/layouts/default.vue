<template>
  <v-main
    style="min-height: 90vh;"
    class="pt-10 text-center text-gray-700 dark:text-gray-200 d-flex flex-col"
  >
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>
  <Footer />
</template>
