<script setup lang="ts">
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import Tab from './Tab.vue'
const current1 = ref('profile')
const current2 = ref('profile')
const current3 = ref('profile')
</script>

<template>
  <div class="border border-black p-4 rounded-xl">
    <Tabs v-model="current1" variant="underline">
    <Tab title="Профіль" slug="profile">Вміст профілю...</Tab>
    <Tab title="Налаштування" slug="settings">Форма налаштувань...</Tab>
    <Tab title="Контакти" slug="contacts">Контактна інформація...</Tab>
  </Tabs>
  </div>
  <div class="border border-black p-4 rounded-xl">
    <Tabs v-model="current2" variant="pills">
      <Tab title="Info" slug="info">Інфо...</Tab>
      <Tab title="Data" slug="data">Дані...</Tab>
    </Tabs>
  </div>
  <div class="border border-black p-4 rounded-xl">
    <Tabs v-model="current3" variant="boxed">
      <Tab title="Info" slug="info">Інфо...</Tab>
      <Tab title="Data" slug="data">Дані...</Tab>
      <Tab title="Other" slug="other">Інше...</Tab>
    </Tabs>
  </div>

  <div class="flex flex-col gap-2">
    
  </div>
</template>
