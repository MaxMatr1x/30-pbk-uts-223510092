<template>
  <div v-if="users.length > 0">
    <h1>Users</h1>
    <select v-model="selectedUser" @change="selectUser">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <h1>Posts</h1>
    <div class="post" v-for="post in posts" :key="post.id">
      <p><b>{{ getUserById(post.userId).name }}</b> - <i>{{ post.title }}</i></p>
      <hr />
      <p>{{ post.body }}</p>
    </div>
  </div>
  <p v-else>No users available</p>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['selectUser']);

const selectedUser = ref(null);
const posts = ref([]);

const getUserById = (userId) => {
  return props.users.find((user) => user.id === userId);
};

const selectUser = () => {
  if (selectedUser.value !== null) {
    fetchPosts(selectedUser.value);
    emits('selectUser', selectedUser.value);
  }
};

const fetchPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  posts.value = await response.json();
};

watch(selectedUser, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectUser();
  }
});

onMounted(() => {
  if (props.users.length > 0) {
    selectedUser.value = props.users[0].id;
    fetchPosts(selectedUser.value);
  }
});
</script>

<style scoped>
.post {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
