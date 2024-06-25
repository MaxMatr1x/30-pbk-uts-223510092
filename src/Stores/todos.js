// stores/todos.js or stores/todos.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodosStore = defineStore('todos', () => {
  const activities = ref([]);
  const filter = ref('all');
  const editingIndex = ref(null);
  const editedActivity = ref('');

  const filteredActivities = computed(() => {
    if (filter.value === 'incomplete') {
      return activities.value.filter(activity => !activity.completed);
    } else if (filter.value === 'completed') {
      return activities.value.filter(activity => activity.completed);
    } else {
      return activities.value;
    }
  });

  const addActivity = (newActivity) => {
    if (newActivity.name.trim() !== '' && newActivity.date !== '') {
      activities.value.push({
        id: Date.now(),
        name: newActivity.name,
        date: newActivity.date,
        completed: false,
      });
    }
  };

  const editActivity = (index) => {
    editingIndex.value = index;
    editedActivity.value = activities.value[index].name;
  };

  const saveEdit = ({ index, name }) => {
    if (name.trim() !== '') {
      activities.value[index].name = name;
    }
    editingIndex.value = null;
    editedActivity.value = '';
  };

  const cancelEdit = () => {
    editingIndex.value = null;
    editedActivity.value = '';
  };

  const deleteActivity = (index) => {
    activities.value.splice(index, 1);
    if (index === editingIndex.value) {
      cancelEdit();
    }
  };

  const showAll = () => {
    filter.value = 'all';
  };

  const showIncomplete = () => {
    filter.value = 'incomplete';
  };

  const showCompleted = () => {
    filter.value = 'completed';
  };

  return {
    activities,
    filter,
    editingIndex,
    editedActivity,
    filteredActivities,
    addActivity,
    editActivity,
    saveEdit,
    cancelEdit,
    deleteActivity,
    showAll,
    showIncomplete,
    showCompleted,
  };
});
