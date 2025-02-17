<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Option {
  value: string;
  name: string;
}

defineProps<{
  modelValue: string;
  options: Option[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const changeOption = (event: Event): void => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Select from list</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>



<style scoped>

</style>
