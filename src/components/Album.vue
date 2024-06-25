<template>
  <div class="album-page">
    <form @submit.prevent="getAlbums" class="form">
      <div class="search">
        <h3>Cari Album</h3>
      </div>
      <div v-if="searchType === 'albumId'" class="search-field">
        <label for="albumId">Album ID:</label>
        <input type="number" v-model.number="searchValue" id="albumId" required class="input">
        <button type="submit" class="button">Tampilkan Album</button>
      </div>
    </form>

    <div v-if="loading" class="loading-container">
      Loading...
    </div>

    <div v-if="!loading && !showAlbumDetail">
      <div class="search-albums">
        <h3>Cari Detail Album</h3>
        <label for="searchAlbums">Masukkan Judul:</label>
        <input type="text" v-model="searchQuery" id="searchAlbums" placeholder="Cari berdasarkan judul" class="input">
        <button type="button" class="button" @click="showDetail">Tampilkan detail</button>
      </div>
      <br>
      <div class="cards-container">
        <div v-for="album in filteredAlbums" :key="album.id" class="my-card" @click="selectPhoto(album)">
          <q-img :src="album.thumbnailUrl" alt="Thumbnail" class="album-thumbnail" />
          <q-card-section>
            <div class="text-h6">
              <strong>User ID: </strong>{{ album.userId }}
            </div>
            <div class="text-h6">
              <strong>ID: </strong>{{ album.id }}
            </div>
            <div class="text-h6">
              <strong>Title: </strong>{{ album.title }}
            </div>
            <div>
              <strong>URL: </strong>
              <a :href="album.url" target="_blank" class="url">{{ album.url }}</a>
            </div>
          </q-card-section>
        </div>
      </div>
    </div>

    <DetailFoto v-if="showAlbumDetail && selectedPhoto" :photo="selectedPhoto" @closeDetail="closeDetail" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { QCardSection, QImg } from 'quasar';
import DetailFoto from './DetailFoto.vue';

const searchType = ref('albumId');
const searchValue = ref(null);
const albums = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const photos = ref([]);
const selectedPhoto = ref(null);
const showAlbumDetail = ref(false);

const filteredAlbums = computed(() => {
  return albums.value.filter(album =>
    album.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchPhotos = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    photos.value = await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error.message);
  }
};

const getAlbums = async () => {
  loading.value = true;
  if (photos.value.length === 0) {
    await fetchPhotos();
  }
  selectByAlbumId();
  loading.value = false;
};

const selectByAlbumId = () => {
  albums.value = photos.value.filter(photo => photo.albumId === parseInt(searchValue.value));
};

const selectPhoto = (album) => {
  selectedPhoto.value = album;
};

const showDetail = () => {
  if (filteredAlbums.value.length > 0) {
    selectPhoto(filteredAlbums.value[0]); // Pilih detail album yang pertama kali difilter
    showAlbumDetail.value = true;
  }
};

const closeDetail = () => {
  showAlbumDetail.value = false;
  selectedPhoto.value = null;
};

onMounted(fetchPhotos);
</script>

<style scoped>
.album-page {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(249, 249, 249, 0.404);
  backdrop-filter: blur(4px);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff89;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search {
  margin-bottom: 10px;
}

.search-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  margin-bottom: 10px;
}

.button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.loading-container {
  text-align: center;
  font-size: 1.2em;
  color: #555;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.my-card {
  width: calc(33.333% - 10px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.album-thumbnail {
  border-radius: 8px;
}

.url {
  color: #007bff;
  text-decoration: none;
}

.url:hover {
  text-decoration: underline;
}

.text-h6, .text-subtitle2, .url {
  margin: 5px 0;
}
</style>
