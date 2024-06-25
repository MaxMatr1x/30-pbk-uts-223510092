<template>
    <div v-if="photo">
      <h1>{{ photo.title }}</h1>
      <img :src="photo.url" :alt="photo.title">
    </div>
    <p v-else>Memuat foto...</p>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const photo = ref(null);
  
  const fetchPhoto = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${route.params.id}`);
    photo.value = await response.json();
  };
  
  onMounted(fetchPhoto);
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>
  