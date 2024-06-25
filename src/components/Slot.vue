<template>
  <div class="slot-container">
    <h3>MOTTO HIDUP:</h3>
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.slot-container {
  background-color: #79e5f6c4;
  padding: 5px; /* Mengurangi padding */
  border-radius: 10px;
  margin-top: 30px; /* Mengurangi margin-top */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Mengurangi shadow */
  max-width: 500px; /* Membatasi lebar maksimum */
  margin-left: auto; /* Memusatkan kotak secara horizontal */
  margin-right: auto; /* Memusatkan kotak secara horizontal */
}

.slot-container h3 {
  font-size: 16px; /* Mengatur ukuran font judul */
  margin: 5px 0; /* Mengurangi margin judul */
  text-align: center; /* Memusatkan teks judul */
}
</style>
