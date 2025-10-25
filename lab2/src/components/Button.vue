<script setup>
import { computed } from 'vue'

const {color,icon,label,size} = defineProps({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue',
    validator: value => ['blue', 'red', 'green'].includes(value),
  },
  size: {
    type: String,
    default: 'base',
    validator: value => ['large', 'base', 'small'].includes(value),
  },
  icon: {
    type: [Object, Function, null],
    default: null
  }
})

// Обчислення класів на основі пропсів
const buttonClass = computed(() => {
  const base = 'px-4 py-2 rounded font-semibold cursor-pointer'
  const colorMap = {
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  }
  const sizeMap = {
    large: 'size-30',
    base: 'size-25',
    small: 'size-20',
  }

  return `${base} ${colorMap[color] || colorMap.blue} ${sizeMap[size] || sizeMap.base}`;
})

function handleClick() {
  alert('Clicked!')
};

</script>

<template>
  <button :class="buttonClass" @click="handleClick">{{ label }}</button>

</template>
