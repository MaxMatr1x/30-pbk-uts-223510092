<template>
    <div class="about">
      <div class="container">
        <q-card class="q-ma-md q-pa-lg card" :class="{ spinning: isSpinning, 'bg-change': bgChange }">
          <q-card-section class="bg-primary text-white text-center">
            <div class="text-h4">About Me</div>
          </q-card-section>
          <q-card-section>
            <p>
              Hai, saya <strong>Adhit</strong>, seorang junior programmer yang sedang menempuh pendidikan S1 di Universitas Islam Riau (UIR). Saya memiliki minat yang besar dalam pengembangan perangkat lunak dan selalu berusaha untuk meningkatkan keterampilan saya setiap hari.
            </p>
            <p>
              Di luar dunia coding, saya juga gemar membaca buku, bermain game, dan berolahraga untuk menjaga keseimbangan hidup. Saya percaya bahwa kombinasi dari pendidikan formal dan pengalaman praktis adalah kunci untuk menjadi seorang programmer yang handal.
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isSpinning = ref(false);
  const bgChange = ref(false);
  const card = ref(null);
  </script>
  
  <style scoped>
  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh; /* Menggunakan min-height untuk memastikan konten berada di tengah vertikal halaman */
    padding: 20px;
  }
  
  .container {
    max-width: 800px; /* Lebar maksimum q-card */
    width: 100%;
    margin-top: 50px; /* Menambahkan margin atas agar tidak terlalu dekat dengan navbar */
    margin-bottom: 50px;
  }
  
  .card {
    max-width: 700px;
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, background-color 0.3s ease;
    background-color: rgba(249, 249, 249, 0.404);
    backdrop-filter: blur(4px);
  }
  
  .card:hover {
    transform: translateY(-15px);
  }
  
  .text-primary {
    color: #007bff;
  }
  
  .bg-primary {
    background-color: #007bff;
  }
  
  .text-white {
    color: #fff;
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-h4 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .text-h5 {
    font-size: 1.25rem;
    font-weight: 500;
  }
  </style>
  