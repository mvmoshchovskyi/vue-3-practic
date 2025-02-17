<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyNavbar from '@/components/MyNavbar.vue'
</script>

<template>
  <my-navbar></my-navbar>
  <div class="app">
    <RouterView/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
