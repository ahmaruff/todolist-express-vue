<template>
  <div>
    <div>{{ todo.description }}</div>
    <div v-if="todo.completedAt">Completed at: {{ todo.completedAt }}</div>
    <div v-else>Not completed</div>
  </div>
</template>
  
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Todo } from '../services/todoServices';

  export default defineComponent({
    name: 'TodoItem',
    props: {
      todo: {
        type: Object as PropType<Todo>,
        required: true
      }
    }
  });
</script>
  