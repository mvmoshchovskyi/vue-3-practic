<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePostStore } from '@/stores/postStore';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';

const postStore = usePostStore();

const dialogVisible = ref(false);
const showDialog = () => {
  dialogVisible.value = true;
};

const createPost = (post: any) => {
  postStore.addPost(post);
  dialogVisible.value = false;
};

const removePost = (post: any) => {
  postStore.removePost(post.id);
};

onMounted(() => {
  postStore.fetchPosts();
});
</script>

<template>
  <div>
    <h1>Page with post</h1>
    <my-input
      :model-value="postStore.searchQuery"
      @update:model-value="postStore.setSearchQuery"
      placeholder="Find...."
      v-focus
    />
    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select
        :model-value="postStore.selectedSort"
        @update:model-value="postStore.setSelectedSort"
        :options="postStore.sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="postStore.sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!postStore.isPostsLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="postStore.loadMorePosts" class="observer"></div>
    <div class="page__wrapper">
      <div
        v-for="pageNumber in postStore.totalPages"
        :key="pageNumber"
        class="page"
        :class="{ 'current-page': postStore.page === pageNumber }"
        @click="postStore.setPage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
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
