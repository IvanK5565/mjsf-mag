<script setup lang="ts">
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import Tab from './Tab.vue'
const current = ref('profile')
const another = ref('profile')
</script>

<template>
  <div class=" border border-black p-4 rounded-xl">
    <Tabs v-model="current" variant="underline">
    <Tab title="Профіль" slug="profile">Вміст профілю...</Tab>
    <Tab title="Налаштування" slug="settings">Форма налаштувань...</Tab>
    <Tab title="Контакти" slug="contacts">Контактна інформація...</Tab>
  </Tabs>
  </div>
  <div class=" border border-black p-4 rounded-xl">
    <Tabs v-model="another" variant="pills">
      <Tab title="Info" slug="info">Інфо...</Tab>
      <Tab title="Data" slug="data">Дані...</Tab>
    </Tabs>
  </div>

  <div class="flex flex-col gap-2">
    
  </div>
</template>
