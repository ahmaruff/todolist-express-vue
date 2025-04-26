<template>
  <div>
    <h1 class="bg-red-500 text-5xl">Todo List</h1>
    <div v-if="loading" >Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  
    <ul v-if="todos.length > 0">
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" />
      </li>
    </ul>
    <p v-else>No todos available.</p> <!-- Fallback for empty list -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getTodos } from '../services/todoServices';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
  },
  setup() {
    const todos = ref([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    // Fetch todos when component is mounted
    onMounted(async () => {
      try {
        const fetchedTodos = await getTodos({});
        todos.value = fetchedTodos;
      } catch (err) {
        error.value = 'Failed to load todos';
      } finally {
        loading.value = false;
      }
    });

    return {
      todos,
      loading,
      error
    };
  }
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
