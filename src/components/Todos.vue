<template>
    <div>
      <h1>JADWAL KEGIATAN</h1>
    
      <!-- Tambah kegiatan form -->
      <div class="input-container">
        <input
          type="text"
          v-model="newActivity.name"
          placeholder="Tambahkan kegiatan baru mu"
          @keyup.enter="tambahkegiatan"
        />
        <input type="date" v-model="newActivity.date" required />
        <button @click="tambahkegiatan">Tambah</button>
      </div>
    
      <!-- Tombol filter -->
      <div class="tombol-filter">
        <button @click="semua">Semua Kegiatan</button>
        <button @click="belumselesai">Kegiatan Belum Selesai</button>
        <button @click="selesai">Kegiatan Selesai</button>
      </div>
      <br />
    
      <!-- Tabel kegiatan -->
      <table v-if="filteredActivities.length > 0" class="activity-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in filteredActivities" :key="activity.id">
            <td>{{ index + 1 }}</td>
            <td :class="{ completed: activity.completed }">
              <template v-if="index !== editingIndex">{{ activity.name }}</template>
              <template v-else>
                <input
                  type="text"
                  v-model="editedActivity"
                  placeholder="Kegiatan Baru"
                />
              </template>
            </td>
            <td :class="{ completed: activity.completed }">{{ activity.date }}</td>
            <td>
              <input type="checkbox" v-model="activity.completed" />
            </td>
            <td :class="{ completed: activity.completed }">
              {{ activity.completed ? "Selesai" : "Belum Selesai" }}
            </td>
            <td>
              <template v-if="index !== editingIndex">
                <button @click="editkegiatan(index)">Edit</button>
              </template>
              <template v-else>
                <button @click="simpaneditan(index)">Simpan</button>
                <button @click="bataledit">Batal</button>
              </template>
              <button @click="hapuskegiatan(index)" class="cancel-button">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    
      <!-- Pesan jika tidak ada kegiatan -->
      <p v-else>Kegiatanmu belum ada, ayo tambahkan sekarang!! :)</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const props = defineProps({
    activities: {
      type: Array,
      required: true
    }
  });
  
  const emits = defineEmits(['addActivity', 'editActivity', 'saveEdit', 'cancelEdit', 'deleteActivity']);
  
  const newActivity = ref({ name: "", date: "" });
  const editingIndex = ref(null);
  const editedActivity = ref("");
  const originalActivity = ref("");
  const filter = ref("all");
  
  const tambahkegiatan = () => {
    if (newActivity.value.name.trim() !== "" && newActivity.value.date !== "") {
      emits('addActivity', { ...newActivity.value });
      newActivity.value = { name: "", date: "" };
    }
  };
  
  const editkegiatan = (index) => {
    editingIndex.value = index;
    editedActivity.value = props.activities[index].name;
    originalActivity.value = props.activities[index].name;
  };
  
  const simpaneditan = (index) => {
    if (editedActivity.value.trim() !== "") {
      emits('saveEdit', { index, name: editedActivity.value });
    }
    editingIndex.value = null;
    editedActivity.value = "";
    originalActivity.value = "";
  };
  
  const bataledit = () => {
    editingIndex.value = null;
    editedActivity.value = "";
    originalActivity.value = "";
  };
  
  const hapuskegiatan = (index) => {
    emits('deleteActivity', index);
    if (index === editingIndex.value) {
      bataledit();
    }
  };
  
  const semua = () => {
    filter.value = "all";
  };
  
  const belumselesai = () => {
    filter.value = "incomplete";
  };
  
  const selesai = () => {
    filter.value = "completed";
  };
  
  const filteredActivities = computed(() => {
    if (filter.value === "incomplete") {
      return props.activities.filter((activity) => !activity.completed);
    } else if (filter.value === "completed") {
      return props.activities.filter((activity) => activity.completed);
    } else {
      return props.activities;
    }
  });
  </script>
  
  <style scoped>
  .input-container {
    display: flex;
    align-items: center;
  }
  
  .input-container input[type="text"] {
    flex: 1;
    margin-right: 10px;
  }
  
  .input-container input[type="date"] {
    width: 14%;
    margin-right: 10px;
  }
  
  .activity-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  .activity-table th,
  .activity-table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }
  
  .activity-table th {
    background-color: #dddcdc;
    text-align: center;
  }
  
  .completed {
    text-decoration: line-through;
    color: #888;
  }
  
  input[type="text"],
  input[type="date"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="checkbox"] {
    margin-right: 6px;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: #f44336;
  }
  
  .cancel-button:hover {
    background-color: #d6392e;
  }
  
  button:hover {
    background-color: #45a049ae;
  }
  
  .tombol-filter {
    margin-top: 20px;
  }
  
  .tombol-filter button {
    margin-right: 10px;
    background-color: #ff5811cb;
    color: #fff;
  }
  
  .tombol-filter button:hover {
    background-color: #447ab4a1;
  }
  </style>
