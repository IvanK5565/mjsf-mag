<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  
  <h1>Kozlovksyi Ivan Viktorovych</h1>
  <h2>Specialty: Software Engineering</h2>
  <h2>Group: 8.1214</h2>
  <h2>2nd year of master's degree.</h2>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
