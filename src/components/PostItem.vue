<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

interface Post {
  id: number;
  title: string;
  body: string;
}

const props = defineProps<{ post: Post }>();
const emit = defineEmits<["remove"]>();
const router = useRouter();

const navigateToPost = () => {
  router.push(`/posts/${props.post.id}`);
};

</script>

<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Name:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="navigateToPost">Open</my-button>
      <my-button @click="emit('remove', post)">Remove</my-button>
    </div>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>
