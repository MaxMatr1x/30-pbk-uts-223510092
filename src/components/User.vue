<template>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else-if="users.length > 0" class="user-container">
    <h3 class="text-center">Users</h3>
    <select v-model="selectedUser" @change="selectUser" class="select-user">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <h3 class="text-center">Selected User</h3>
    <div class="selected-user-container">
      <div v-if="selectedUser">
        <div class="post-list">
          <div class="post" v-for="post in posts" :key="post.id">
            <p><b>{{ getUserById(post.userId).name }}</b> - <i>{{ post.title }}</i></p>
            <hr />
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center">No user selected</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  users: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    required: true,
    default: false
  }
});

const emits = defineEmits(['selectUser']);

const selectedUser = ref(null);
const posts = ref([]);

const getUserById = (userId) => {
  return props.users.find((user) => user.id === userId);
};

const fetchPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  posts.value = await response.json();
};

const selectUser = () => {
  if (selectedUser.value !== null) {
    fetchPosts(selectedUser.value);
    emits('selectUser', selectedUser.value);
  }
};

watch(props.users, (newVal) => {
  if (newVal.length > 0) {
    selectedUser.value = newVal[0].id;
    fetchPosts(newVal[0].id);
  }
});

watch(selectedUser, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectUser();
  }
});
</script>

<style scoped>
.user-container {
  text-align: center;
}

.select-user {
  margin: 10px auto;
  padding: 5px;
  font-size: 16px;
  width: 200px;
}

.selected-user-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: rgba(249, 249, 249, 0.404);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.post-list {
  margin-top: 20px;
}

.post {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #ffffffb6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}
</style>
