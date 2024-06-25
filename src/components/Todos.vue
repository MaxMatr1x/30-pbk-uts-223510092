<template>
  <div>
    <h3 class="text-center">JADWAL KEGIATAN</h3>

    <div class="input-container">
      <input
        type="text"
        v-model="newActivity.name"
        placeholder="Tambahkan kegiatan baru mu"
        @keyup.enter="addActivity"
      />
      <input type="date" v-model="newActivity.date" required />
      <button @click="addActivity">Tambah</button>
    </div>

    <div class="tombol-filter">
      <button @click="showAll">Semua Kegiatan</button>
      <button @click="showIncomplete">Kegiatan Belum Selesai</button>
      <button @click="showCompleted">Kegiatan Selesai</button>
    </div>
    <br />

    <div class="table-container">
      <table class="activity-table">
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
          <tr v-if="filteredActivities.length === 0">
            <td colspan="6" style="text-align: center;">
              Kegiatanmu belum ada, ayo tambahkan sekarang!! :)
            </td>
          </tr>
          <tr v-for="(activity, index) in filteredActivities" :key="activity.id">
            <td>{{ index + 1 }}</td>
            <td :class="{ completed: activity.completed }">
              <template v-if="index !== editingIndex">{{ activity.name }}</template>
              <template v-else>
                <input
                  type="text"
                  v-model="editedActivity.name"
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
                <button @click="editActivity(index, activity)">Edit</button>
              </template>
              <template v-else>
                <button @click="saveEdit(index)">Simpan</button>
                <button @click="cancelEdit">Batal</button>
              </template>
              <button @click="deleteActivity(index)" class="cancel-button">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodosStore } from '../Stores/todos';

const store = useTodosStore();

const newActivity = ref({ name: '', date: '' });

const addActivity = () => {
  if (newActivity.value.name.trim() !== '' && newActivity.value.date !== '') {
    store.addActivity(newActivity.value);
    newActivity.value = { name: '', date: '' };
  }
};

const editActivity = (index, activity) => {
  store.editingIndex = index;
  store.editedActivity = { ...activity };
};

const saveEdit = (index) => {
  store.saveEdit({ index, name: store.editedActivity.name });
};

const cancelEdit = () => {
  store.cancelEdit();
};

const deleteActivity = (index) => {
  store.deleteActivity(index);
};

const showAll = () => {
  store.showAll();
};

const showIncomplete = () => {
  store.showIncomplete();
};

const showCompleted = () => {
  store.showCompleted();
};

const editingIndex = computed(() => store.editingIndex);
const editedActivity = computed(() => store.editedActivity);
const filteredActivities = computed(() => store.filteredActivities);
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.input-container input[type="text"],
.input-container input[type="date"] {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.table-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.activity-table {
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  margin: 0 auto;
}

.activity-table th,
.activity-table td {
  padding: 12px;
  border: 1px solid #d55454;
  text-align: center;
}

.activity-table th {
  background-color: #eb8787;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

input[type="checkbox"] {
  margin-right: 6px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
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
  background-color: #0056b3;
}

.tombol-filter {
  display: flex;
  justify-content: center;
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

.text-center {
  text-align: center;
}
</style>
