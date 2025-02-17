<script setup lang="ts">
import { ref } from 'vue';
import PostForm from "./../components/PostForm";
import PostList from "./../components/PostList";
import MyButton from "./../components/UI/MyButton";
import MySelect from "./../components/UI/MySelect";
import MyInput from "./../components/UI/MyInput";
import { usePosts } from "@/hooks/usePosts.ts";
import useSortedPosts from "@/hooks/useSortedPosts.ts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.ts";

interface SortOption {
  value: string;
  name: string;
}

const dialogVisible = ref<boolean>(false);
const sortOptions = ref<SortOption[]>([
  { value: 'title', name: 'By name' },
  { value: 'body', name: 'By content' },
]);

const { posts, isPostsLoading } = usePosts(10);
const { sortedPosts, selectedSort } = useSortedPosts(posts);
const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

const  createPost =(post)=> {
  posts.push(post);
};

</script>

<template>
  <div>
    <h1>Page with post</h1>
    <my-input v-model="searchQuery" placeholder="Find...." v-focus />
    <div class="app__btns">
      <my-button @click="dialogVisible = true">
        Create user
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form  @create="createPost"/>
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
  </div>
</template>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
