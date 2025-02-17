import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import directives from '@/directives';

import App from './App.vue'
import router from './router'

const app = createApp(App);

directives.forEach(directive => {
  app.directive(directive.name, directive)
});

app
  .use(createPinia())
  .use(router)
  .mount('#app');
