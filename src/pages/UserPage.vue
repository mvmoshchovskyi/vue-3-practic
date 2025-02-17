<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import PostForm from "./../components/PostForm.vue";
import PostList from "./../components/PostList";
import MyButton from "./../components/UI/MyButton";
import MySelect from "./../components/UI/MySelect";
import MyInput from "./../components/UI/MyInput";

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[]>([]);
const dialogVisible = ref<boolean>(false);
const isPostsLoading = ref<boolean>(false);
const selectedSort = ref<string>('');
const searchQuery = ref<string>('');
const page = ref<number>(1);
const limit = ref<number>(10);
const totalPages = ref<number>(0);

const sortOptions = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По содержимому' },
];

const createPost = (post: Post) => {
  posts.value.push(post);
  dialogVisible.value = false;
};

const removePost = (post: Post) => {
  posts.value = posts.value.filter(p => p.id !== post.id);
};

const showDialog = () => {
  dialogVisible.value = true;
};

const changePage = (pageNumber: number) => {
  page.value = pageNumber;
};

const fetchPosts = async () => {
  try {
    isPostsLoading.value = true;
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit.value
      }
    });
    totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
    posts.value = response.data;
  } catch (e) {
    alert('Ошибка');
  } finally {
    isPostsLoading.value = false;
  }
};

const loadMorePosts = async () => {
  try {
    page.value += 1;
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit.value
      }
    });
    totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
    posts.value = [...posts.value, ...response.data];
  } catch (e) {
    alert('Ошибка');
  }
};

const sortedPosts = computed(() => {
  return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]));
});

const sortedAndSearchedPosts = computed(() => {
  return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

watch(page, () => {
  fetchPosts();
});

onMounted(() => {
  fetchPosts();

  const options = {
    rootMargin: '0px',
    threshold: 1.0
  };

  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries[0].isIntersecting && page.value < totalPages.value) {
      loadMorePosts();
    }
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.getElementById('observer') as Element);
});
</script>

<template>
  <div>
    <h1>Page with posts</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Find...."
      v-focus
    />
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >
        Create post
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
        @create="createPost"
      />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
        <div class="page__wrapper">
          <div
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="page"
            :class="{
              'current-page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
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
