<template>
  <div class="container">
    <div class="buttons-container">
      <button @click="showUsers">User</button>
      <button @click="showTodos">Todos</button>
    </div>

    <User v-if="activeSection === 'users'" :users="users" @selectUser="getPosts" />
    <Todos v-if="activeSection === 'todos'" :activities="filterkegiatan" @addActivity="tambahkegiatan" @editActivity="editkegiatan" @saveEdit="simpaneditan" @cancelEdit="bataledit" @deleteActivity="hapuskegiatan" />
    <SlotVue>
      <p><i>"Jadilah orang yang lebih baik setiap harinya"</i></p>
    </SlotVue>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import User from './components/User.vue';
import Todos from './components/Todos.vue';
import SlotVue from './components/Slot.vue';

const users = ref([]);
const selectedUser = ref(null);
const posts = ref([]);
const activeSection = ref("users");

const showUsers = () => {
  activeSection.value = "users";
  getData();
};

const showTodos = () => {
  activeSection.value = "todos";
};

const getData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await response.json();
};

const getPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  posts.value = await response.json();
  selectedUser.value = userId;
};

const activities = ref([]);
const editingIndex = ref(null);
const editedActivity = ref("");

const tambahkegiatan = (newActivity) => {
  if (newActivity.name.trim() !== "" && newActivity.date !== "") {
    activities.value.push({
      id: Date.now(),
      name: newActivity.name,
      date: newActivity.date,
      completed: false,
    });
  }
};

const editkegiatan = (index) => {
  editingIndex.value = index;
  editedActivity.value = activities.value[index].name;
};

const simpaneditan = ({ index, name }) => {
  if (name.trim() !== "") {
    activities.value[index].name = name;
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

const filter = ref("all");

const semua = () => {
  filter.value = "all";
};

const belumselesai = () => {
  filter.value = "incomplete";
};

const selesai = () => {
  filter.value = "completed";
};

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
</style>