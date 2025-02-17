import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Array<{ id: number; title: string; body: string }>,
    isPostsLoading: false,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержимому' },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    sortedAndSearchedPosts(state) {
      return this.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  actions: {
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.error(e);
      }
    },
    setPosts(posts: Array<{ id: number; title: string; body: string }>) {
      this.posts = posts;
    },
    setLoading(loading: boolean) {
      this.isPostsLoading = loading;
    },
    setPage(page: number) {
      this.page = page;
    },
    setSelectedSort(selectedSort: string) {
      this.selectedSort = selectedSort;
    },
    setTotalPages(totalPages: number) {
      this.totalPages = totalPages;
    },
    setSearchQuery(searchQuery: string) {
      this.searchQuery = searchQuery;
    },
  },
});
