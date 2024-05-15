<template>
  <div class="container">
    <div class="buttons-container">
      <button @click="showUsers">User</button>
      <button @click="showTodos">Todos</button>
    </div>

    <!-- User section -->
    <div v-if="activeSection === 'users'">
      <h1>Users</h1>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <h1>Posts</h1>
      <div class="post" v-for="post in posts" :key="post.id">
        <p>
          <b>{{ getUserById(post.userId).name }}</b> - <i>{{ post.title }}</i>
        </p>
        <hr />
        <p>{{ post.body }}</p>
      </div>
    </div>

    <!-- Todos section -->
    <div v-if="activeSection === 'todos'">
      <h1>JADWAL KEGIATAN</h1>
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

      <div class="tombol-filter">
        <button @click="semua">Semua Kegiatan</button>
        <button @click="belumselesai">Kegiatan Belum Selesai</button>
        <button @click="selesai">Kegiatan Selesai</button>
      </div>
      <br />

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
          <tr v-for="(activity, index) in filterkegiatan" :key="activity.id">
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
            <td :class="{ completed: activity.completed }">
              {{ activity.date }}
            </td>
            <td>
              <input
                type="checkbox"
                v-model="activity.completed"
              />
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
              <button @click="hapuskegiatan(index)" class="cancel-button">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Kegiatanmu belum ada, ayo tambahkan sekarang!! :)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const users = ref([]);
const selectedUser = ref(null);
const posts = ref([]);
const activeSection = ref("users");
const newActivity = ref({ name: "", date: "" });
const editingIndex = ref(null);
const editedActivity = ref("");
const filter = ref("all");

const getData = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(url);
  users.value = await response.json();
};

const getPosts = async () => {
  if (selectedUser.value !== null) {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`;
    const response = await fetch(url);
    posts.value = await response.json();
  }
};

const getUserById = (userId) => users.value.find((user) => user.id === userId);

const showUsers = () => {
  activeSection.value = "users";
  getData();
  watch(selectedUser, getPosts);
};

const showTodos = () => {
  activeSection.value = "todos";
};

const tambahkegiatan = () => {
  if (newActivity.value.name.trim() !== "" && newActivity.value.date !== "") {
    activities.value.push({
      id: Date.now(),
      name: newActivity.value.name,
      date: newActivity.value.date,
      completed: false,
    });
    newActivity.value = { name: "", date: "" };
  }
};

const editkegiatan = (index) => {
  editingIndex.value = index;
  editedActivity.value = activities.value[index].name;
};

const simpaneditan = (index) => {
  if (editedActivity.value.trim() !== "") {
    activities.value[index].name = editedActivity.value;
  }
  editingIndex.value = null;
  editedActivity.value = "";
};

const bataledit = () => {
  editingIndex.value = null;
  editedActivity.value = "";
};

const hapuskegiatan = (index) => {
  activities.value.splice(index, 1);
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

const activities = ref([]);

const filterkegiatan = computed(() => {
  if (filter.value === "incomplete") {
    return activities.value.filter((activity) => !activity.completed);
  } else if (filter.value === "completed") {
    return activities.value.filter((activity) => activity.completed);
  } else {
    return activities.value;
  }
});

showUsers();
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(249, 249, 168, 0.621);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.buttons-container {
  margin-bottom: 20px;
}

.buttons-container button {
  margin-right: 10px;
  background-color: #ff5811cb;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.buttons-container button:hover {
  background-color: #447ab4a1;
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

.post {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
