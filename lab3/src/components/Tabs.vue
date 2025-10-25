<template>
  <div>
    <!-- Header (список вкладок) -->
    <div
      class="flex border-b border-gray-200 mb-4 space-x-2"
      :class="{
        'border-none': variant === 'pills' || variant === 'boxed'
      }"
    >
      <button
        v-for="tab in tabs"
        :key="tab.slug"
        @click="setActiveTab(tab.slug)"
        class="px-4 py-2 font-medium transition-colors"
        :class="[
          variantClasses(tab.slug === activeTab),
        ]"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Контент активної вкладки -->
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, onMounted } from 'vue'

interface TabItem {
  title: string
  slug: string
}

const props = defineProps<{
  modelValue: string
  variant?: 'underline' | 'pills' | 'boxed'
}>()

const emit = defineEmits(['update:modelValue'])

const activeTab = ref(props.modelValue)
const tabs = ref<TabItem[]>([])

const setActiveTab = (slug: string) => {
  activeTab.value = slug
  emit('update:modelValue', slug)
}

provide('activeTab', activeTab)
provide('setActiveTab', setActiveTab)
provide('registerTab', (tab: TabItem) => {
  if (!tabs.value.find(t => t.slug === tab.slug)) {
    tabs.value.push(tab)
  }
})

watch(
  () => props.modelValue,
  (val) => {
    activeTab.value = val
  }
)

const variant = props.variant ?? 'underline'

const variantClasses = (isActive: boolean) => {
  switch (variant) {
    case 'underline':
      return isActive
        ? 'border-b-2 border-blue-500 text-blue-600'
        : 'text-gray-200 hover:text-blue-600'
    case 'pills':
      return isActive
        ? 'bg-blue-500 text-white rounded-md'
        : 'text-gray-300 hover:bg-blue-100 rounded-md'
    case 'boxed':
      return isActive
        ? 'border border-blue-500 bg-blue-50 rounded-t-md text-blue-600'
        : 'border border-transparent hover:border-gray-300 rounded-t-md text-gray-200'
  }
}
</script>
