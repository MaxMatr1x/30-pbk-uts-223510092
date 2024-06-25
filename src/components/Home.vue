<template>
    <div class="home">
      <q-card ref="card" class="q-ma-md q-pa-lg card" :class="{ spinning: isSpinning, 'bg-change': bgChange }">
        <q-card-section class="bg-primary text-white text-center">
          <div class="text-h4">Selamat Datang di Situs Saya</div>
        </q-card-section>
        <q-card-section>
          <p>
            Situs ini adalah platform yang dirancang untuk menyelesaikan tugas akhir saya. 
            Di sini, Anda dapat menjelajahi berbagai fitur yang telah saya kembangkan dengan penuh dedikasi.<br><br>
            Anda dapat menemukan beberapa menu inti seperti <strong>User</strong>, <strong>Todos</strong>, dan <strong>Album</strong> 
            yang masing-masing menyediakan fungsi khusus untuk membantu Anda dalam berbagai aktivitas. 
            Gunakan drawer atau ikon garis tiga di pojok kiri atas untuk menavigasi ke setiap fitur.<br><br>
            <em>Mari jelajahi fitur-fitur yang ada di situs ini dan temukan cara untuk memanfaatkan semua yang saya tawarkan.</em>
          </p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" label="Press To See Cool Stuff" @click="toggleSpin" />
        </q-card-actions>
      </q-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isSpinning = ref(false);
  const bgChange = ref(false);
  const card = ref(null);
  
  function toggleSpin() {
    if (isSpinning.value) {
      // Restart the animation
      card.value.classList.remove('spinning');
      void card.value.offsetWidth;  // Trigger a reflow
      card.value.classList.add('spinning');
      bgChange.value = !bgChange.value;  // Toggle background change
    } else {
      isSpinning.value = true;
      bgChange.value = true;
      setTimeout(() => {
        isSpinning.value = false;
        bgChange.value = false;
      }, 2000);  // Duration of the animation
    }
  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    
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
  
  .card.spinning {
    animation: spin 1s linear 8;  /* 8 iterations */
  }
  
  .card.bg-change {
    background-color: #95060d; /* Changed background color */
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  