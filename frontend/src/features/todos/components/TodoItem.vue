<template>
  <div class="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-2 bg-indigo-50 border-indigo-900">
    <div>
      <div class="text-lg font-medium text-slate-900" :class="{ 'line-through text-slate-500': todo.completedAt }">
        {{ todo.description }}
      </div>
      <div class="text-sm text-slate-500">
        <span v-if="todo.completedAt">Completed at: {{ formatDate(todo.completedAt) }}</span>
        <span v-else>Not completed</span>
      </div>
    </div>
    <button
      @click="toggleComplete"
      :disabled="!!todo.completedAt"
      class="ml-4 px-3 py-1 text-sm rounded-lg border border-indigo-900 text-indigo-900 hover:bg-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{'hidden' : todo.completedAt}"
    >
      {{ todo.completedAt ? 'Done' : 'Complete' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import type { Todo } from '../services/todoServices';

export default defineComponent({
  name: 'TodoItem',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  emits: ['completed'], // <- define event
  methods: {
    async toggleComplete() {
      try {
        await this.$emit('completed', this.todo.id); // hanya emit ID ke parent
      } catch (error) {
        console.error('Emit failed', error);
      }
    },
    formatDate(dateStr: string) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
  },
});
</script>
