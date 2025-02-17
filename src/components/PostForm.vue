<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import MyInput from '@/components/UI/MyInput.vue';
import MyButton from '@/components/UI/MyButton.vue'

interface Post {
  id?: number;
  title: string;
  body: string;
}

const post = ref<Post>({ title: '', body: '' });
const emit = defineEmits<["create"]>();

const createPost = () => {
  post.value.id = Date.now();
  emit('create', { ...post.value });
  post.value = { title: '', body: '' };
};
</script>

<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input v-focus v-model="post.title" type="text" placeholder="Name" />
    <my-input v-model="post.body" type="text" placeholder="Description" />
    <my-button style="align-self: flex-end; margin-top: 15px" @click="createPost">
      Create
    </my-button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
