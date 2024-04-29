<template>
  <div class="container">
    <h1>JADWAL KEGIATAN</h1>
    <div class="input-container">
      <input type="text" v-model="newActivity.name" placeholder="Tambahkan kegiatan baru mu" @keyup.enter="tambahkegiatan">
      <input type="date" v-model="newActivity.date" required>
      <button @click="tambahkegiatan">Tambah</button>
    </div>

    <div class="tombol-filter">
      <button @click="semua">Semua Kegiatan</button>
      <button @click="belumselesai">Kegiatan Belum Selesai</button>
      <button @click="selesai">Kegiatan Selesai</button>
    </div>
    <br>

    <table v-if="filterkegiatan.length > 0" class="activity-table">
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
        <tr v-for="(activity, index) in filterkegiatan" :key="index">
          <td>{{ index + 1 }}</td>
          <td :class="{ 'completed': activity.completed }">
            <template v-if="index !== editingIndex">{{ activity.name }}</template>
            <template v-else>
              <input type="text" v-model="editedActivity" placeholder="Kegiatan Baru">
            </template>
          </td>
          <td :class="{ 'completed': activity.completed }">{{ activity.date }}</td>
          <td>
            <input type="checkbox" v-model="activity.completed" @change="updateStatus(activity)">
          </td>
          <td :class="{ 'completed': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</td>
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
    <p v-else>Kegiatanmu belum ada, ayo tambahkan sekarang!! :)</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: { name: '', date: '' },
      editingIndex: null,
      editedActivity: '',
      filter: 'all'
    };
  },
  computed: {
    filterkegiatan() {
      if (this.filter === 'incomplete') {
        return this.activities.filter(activity => !activity.completed);
      } else if (this.filter === 'completed') {
        return this.activities.filter(activity => activity.completed);
      } else {
        return this.activities;
      }
    }
  },
  methods: {
    tambahkegiatan() {
      if (this.newActivity.name.trim() !== '' && this.newActivity.date !== '') {
        this.activities.push({ id: Date.now(), name: this.newActivity.name, date: this.newActivity.date, completed: false });
        this.newActivity = { name: '', date: '' };
      }
    },
    editkegiatan(index) {
      this.editingIndex = index;
      this.editedActivity = this.activities[index].name;
    },
    simpaneditan(index) {
      if (this.editedActivity.trim() !== '') {
        this.activities[index].name = this.editedActivity;
      }
      this.editingIndex = null;
      this.editedActivity = '';
    },
    bataledit() {
      this.editingIndex = null;
      this.editedActivity = '';
    },
    hapuskegiatan(index) {
      this.activities.splice(index, 1);
      if (index === this.editingIndex) {
        this.cancelEdit();
      }
    },
    semua() {
      this.filter = 'all';
    },
    belumselesai() {
      this.filter = 'incomplete';
    },
    selesai() {
      this.filter = 'completed';
    },
    updateStatus(activity) {
     
    }
  }
};
</script>

<style scoped>

.container {
  max-width:700px;
  margin: 20px auto;
  padding: 20px;
  background-color:rgba(249, 249, 168, 0.621);
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

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


input[type="text"], input[type="date"] {
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
