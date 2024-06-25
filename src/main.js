// main.js

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router';
import './index.css';

// Import Quasar
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css'; // Import icon libraries
import 'quasar/src/css/index.sass'; // Import Quasar CSS

const app = createApp(App);
const pinia = createPinia(); // Declare pinia only once

// Use Quasar with Vue app
app.use(Quasar, {
  config: {}, // Add Quasar config here
  plugins: {}, // Import Quasar plugins and add here if needed
});

app.use(pinia); // Use Pinia for state management
app.use(router); // Use Vue router

// Mount the app
app.mount('#app');
