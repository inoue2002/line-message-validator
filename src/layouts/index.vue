<script lang="ts" setup>
</script>

<template>
  <v-app>
    <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>
    <v-app-bar color="grey-lighten-2"></v-app-bar>
    <v-main>
      <v-card height="200px">
        <slot></slot>
      </v-card>
    </v-main>
  </v-app>
</template>

<style lang="scss">
</style>