<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Projek UAS 
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" label="Home" @click="clearDrawerContent" />
        <q-route-tab to="/about" label="About Me" @click="clearDrawerContent" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="custom-drawer" style="background-color:rgba(81, 187, 223, 0.651);">
      <q-list>
        <q-item clickable v-ripple @click="showUsers">
          <q-item-section>
            <q-item-label>User</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showTodos">
          <q-item-section>
            <q-item-label>Todos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showAlbums">
          <q-item-section>
            <q-item-label>Albums</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-if="!drawerContent" />
      <User v-if="drawerContent === 'users'" :users="users" :loading="loading" @selectUser="getPosts" />
      <Todos v-if="drawerContent === 'todos'" :activities="filterkegiatan" @addActivity="tambahkegiatan" @editActivity="editkegiatan" @saveEdit="simpaneditan" @cancelEdit="bataledit" @deleteActivity="hapuskegiatan" />
      <Album v-if="drawerContent === 'albums'" />
      <SlotVue v-if="isHomeOrAboutRoute">
        <p style="text-align: center;"><i>"Jadilah orang yang lebih baik setiap harinya"</i></p>
      </SlotVue>
    </q-page-container>
  </q-layout>
</template>


<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import User from './components/User.vue';
import Todos from './components/Todos.vue';
import Album from './components/Album.vue';
import SlotVue from './components/Slot.vue';

const router = useRouter();
const route = useRoute();

const users = ref([]);
const loading = ref(false);
const selectedUser = ref(null);
const posts = ref([]);
const activities = ref([]);
const editingIndex = ref(null);
const editedActivity = ref("");
const filter = ref("all");

const drawerContent = ref(null);
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const clearDrawerContent = () => {
  drawerContent.value = null;
};

const showUsers = () => {
  drawerContent.value = 'users';
  getData();
  router.push('/home');
};

const showTodos = () => {
  drawerContent.value = 'todos';
  router.push('/home');
};

const showAlbums = () => {
  drawerContent.value = 'albums';
  router.push('/home');
};

const getData = async () => {
  loading.value = true;
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await response.json();
  loading.value = false;
};

const getPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  posts.value = await response.json();
  selectedUser.value = userId;
};

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

const isHomeOrAboutRoute = computed(() => {
  return route.path === '/home' || route.path === '/about';
});
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

