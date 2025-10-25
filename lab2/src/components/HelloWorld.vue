<script setup>
import { ref } from "vue";
import Button from "./Button.vue";
import SearchableDropdown from './SearchableDropdown.vue'
defineProps({
  msg: String,
})

const fruits = [
  { id: 1, name: 'Яблуко' },
  { id: 2, name: 'Банан' },
  { id: 3, name: 'Апельсин' },
]

const cars = [
  { id: 1, name: 'Audi' },
  { id: 2, name: 'BWM' },
  { id: 3, name: 'Mersedes' },
]

const selectedFriuts = ref(null)
const selectedCars = ref(null)
</script>

<template>
  <h1>{{ msg }}</h1>
  
  <h1>Kozlovksyi Ivan Viktorovych</h1>

  <div class="flex flex-col gap-2">
    <SearchableDropdown
    v-model="selectedFriuts"
    :options="fruits"
    option-label="name"
    option-key="id"
    multiple="false"
    />
    <SearchableDropdown
    v-model="selectedCars"
    :options="cars"
    option-label="name"
    option-key="id"
    multiple="true"
    />
  <div class="grid grid-cols-4 gap-4">
    <div></div>
    <div>small</div>
    <div>base</div>
    <div>large</div>

    <span>red</span>
    <Button label="Click me" color="red" size="small"></Button>
    <Button label="Click me" color="red" size="base"></Button>
    <Button label="Click me" color="red" size="large"></Button>
    
    <span>green</span>
    <Button label="Click me" color="green" size="small" ></Button>
    <Button label="Click me" color="green" size="base" ></Button>
    <Button label="Click me" color="green" size="large" ></Button>
    
    <span>blue</span>
    <Button label="Click me" color="blue" size="small" ></Button>
    <Button label="Click me" color="blue" size="base" ></Button>
    <Button label="Click me" color="blue" size="large" ></Button>
  </div>
</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>