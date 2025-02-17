<script setup lang="ts">
import MyButton from '@/components/UI/MyButton.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

</script>

<template>
  <div class="navbar">
    <div @click="navigateTo('/')">Vue TS</div>
    <div class="navbar__btns">
      <my-button @click="navigateTo('/posts')">Posts</my-button>
      <my-button style="margin-left: 20px" @click="navigateTo('/about')">About site</my-button>
      <my-button style="margin-left: 20px" @click="navigateTo('/store')">Store</my-button>
      <my-button style="margin-left: 20px" @click="navigateTo('/composition')">Composition</my-button>
    </div>
  </div>
</template>


<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
