<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from 'vue'

const props = defineProps<{
  title: string
  slug: string
}>()

const activeTab = inject<any>('activeTab')
const registerTab = inject<Function>('registerTab')
const setActiveTab = inject<Function>('setActiveTab')

if (!activeTab || !registerTab) {
  throw new Error('Tab must be used inside Tabs component')
}

onMounted(() => {
  registerTab({
    title: props.title,
    slug: props.slug
  })
})

const isActive = computed(() => activeTab.value === props.slug)
</script>
