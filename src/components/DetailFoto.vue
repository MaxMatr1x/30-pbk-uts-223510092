<template>
    <div class="photo-detail" v-if="photo">
      <h2>Detail Foto</h2>
      <img :src="photo.url" :alt="photo.title" class="photo-img" />
      <div class="photo-info">
        <p><strong>ID:</strong> {{ photo.id }}</p>
        <p><strong>Album ID:</strong> {{ photo.albumId }}</p>
        <p><strong>Judul:</strong> {{ photo.title }}</p>
        <a :href="photo.url" target="_blank" class="photo-link">Lihat Gambar Penuh</a>
      </div>
      <button @click="closeDetail" class="close-button">Tutup Detail</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    photo: Object
  });
  
  const emits = defineEmits(['closeDetail']);
  
  const closeDetail = () => {
    emits('closeDetail');
  };
  </script>
  
  <style scoped>
  .photo-detail {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
  }
  
  .photo-img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .photo-info {
    margin-bottom: 20px;
  }
  
  .photo-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .photo-link:hover {
    text-decoration: underline;
  }
  
  .close-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .close-button:hover {
    background-color: #0056b3;
  }
  </style>
  