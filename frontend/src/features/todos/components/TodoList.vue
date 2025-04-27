<template>
  <div class="flex flex-col justify-start items-center w-full h-screen bg-gray-100">
    <div class="w-full max-w-xl p-4 mt-12 bg-gray-200 rounded-2xl shadow-xs shadow-gray-400">
      <h1 class="text-5xl text-center font-semibold pb-4">Simple Todo List</h1>
      <div class="flex items-center space-x-2 mt-6 mb-12">
        <input
          type="text"
          placeholder="Enter todo..."
          class="flex-1 rounded-lg border border-gray-300 p-2 focus:border-slate-500 focus:ring-2 focus:ring-gray-200 outline-none"
          v-model="inputValue"
        />
        <button
          class="rounded-lg bg-slate-500 text-white px-4 py-2 hover:bg-slate-600 transition"
          @click="handleAdd"
        >
          Add
        </button>
      </div>
      <div v-if="loading" class="text-center text-sm font-semibold p-4 text-gray-500">Loading...</div>
      <div v-if="error" class="text-center text-sm font-semibold p-4 text-red-400">{{ error }}</div>
  
      <ul v-if="todos.length > 0">
        <li v-for="todo in todos" :key="todo.id">
          <TodoItem :todo="todo" @completed="handleComplete(todo.id)" />
        </li>
      </ul>
      <p v-else class="text-center text-sm font-semibold p-4 text-gray-500">No todos available.</p>
    </div>
    <div class="text-center mt-6 text-slate-500">
      &copy; Ahmad Ma'ruf - 2025
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getTodos, createTodo, completeTodo, Todo } from '../services/todoServices';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
  },
  setup() {
    const inputValue = ref<string>('');
    const todos = ref<Todo[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        loading.value = true;
        todos.value = await getTodos({});
        loading.value = false;
      } catch (err) {
        error.value = 'Failed to load todos';
        loading.value = false;
      }
    });

    async function handleAdd() {
      if (inputValue.value.trim() === '') return;
      
      try {
        const todo = await createTodo(inputValue.value);
        todos.value.push(todo);
        inputValue.value = '';
        loading.value = false;
      } catch (err) {
        console.error('Failed to create todo', err);
        error.value = 'Failed to create todo';
        loading.value = false;
      }
    }

    async function handleComplete(id: string) {
      try {
        const updatedTodo = await completeTodo(id);
        const index = todos.value.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          todos.value[index] = updatedTodo; // update state UI
        }
      } catch (err) {
        console.error('Failed to complete todo', err);
        error.value = 'Failed to create todo';
        loading.value = false;
      }
    }

    return {
      inputValue,
      todos,
      loading,
      error,
      handleAdd,
      handleComplete,
    };
  },
});
</script>