<template>
  <div class="relative w-full" @keydown.down.prevent="moveDown" @keydown.up.prevent="moveUp" @keydown.enter.prevent="selectHighlighted">
    <!-- Input field -->
    <div class="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
      <input
        type="text"
        v-model="searchQuery"
        @focus="isOpen = true"
        @blur="handleBlur"
        placeholder="Оберіть значення"
        class="flex-grow outline-none text-black"
      />
      <button v-if="selectedItems.length" @click="clearSelection" class="ml-2 text-gray-500 hover:text-red-500">
        ✕
      </button>
    </div>

    <!-- Dropdown options -->
    <ul v-show="isOpen" class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto">
      <li
        v-for="(item, index) in filteredOptions"
        :key="getItemKey(item)"
        :class="[
          'px-4 py-2 cursor-pointer flex items-center gap-2 text-black',
          index === highlightedIndex ? 'bg-blue-100' : '',
          isSelected(item) ? 'font-semibold text-blue-600' : ''
        ]"
        @mousedown.prevent="selectItem(item)"
        @mouseenter="highlightedIndex = index"
      >
        <slot name="option" :item="item">
          {{ getItemLabel(item) }}
        </slot>
      </li>
      <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-500">Нічого не знайдено</li>
    </ul>

    <!-- Selected Items Preview (for multi-select) -->
    <div v-if="multiple && selectedItems.length" class="mt-2 flex flex-wrap gap-2">
      <span
        v-for="item in selectedItems"
        :key="getItemKey(item)"
        class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
      >
        {{ getItemLabel(item) }}
        <button @click="removeItem(item)" class="text-blue-500 hover:text-red-500">✕</button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const { options, multiple, modelValue, optionKey, optionLabel } = defineProps({
  options: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Array, Object, String, Number, null],
    default: null
  },
  optionKey: {
    type: String,
    default: 'id'
  },
  optionLabel: {
    type: String,
    default: 'label'
  }
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const isOpen = ref(false)
const highlightedIndex = ref(0)
const selectedItems = ref([])

const getItemLabel = (item) => (typeof item === 'object' ? item[optionLabel] : item)
const getItemKey = (item) => (typeof item === 'object' ? item[optionKey] : item)

watch(
  () => modelValue,
  (val) => {
    if (multiple) {
      selectedItems.value = Array.isArray(val) ? val : []
    } else {
      selectedItems.value = val ? [val] : []
    }
  },
  { immediate: true }
)

const filteredOptions = computed(() =>
  options.filter((item) =>
    getItemLabel(item).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const isSelected = (item) => selectedItems.value.some((selected) => getItemKey(selected) === getItemKey(item))

function selectItem(item) {
  if (multiple) {
    if (!isSelected(item)) {
      selectedItems.value.push(item)
    }
    searchQuery.value = ''
  } else {
    selectedItems.value = [item]
    isOpen.value = false
    searchQuery.value = getItemLabel(item)
  }
  emit('update:modelValue', multiple ? selectedItems.value : item)
}

function removeItem(item) {
  selectedItems.value = selectedItems.value.filter((i) => getItemKey(i) !== getItemKey(item))
  emit('update:modelValue', selectedItems.value)
}

function clearSelection() {
  selectedItems.value = []
  searchQuery.value = ''
  emit('update:modelValue', multiple ? [] : null)
}

function handleBlur() {
  setTimeout(() => {
    isOpen.value = false
    if (!multiple && selectedItems.value.length) {
      searchQuery.value = getItemLabel(selectedItems.value[0])
    }
  }, 150)
}

function moveDown() {
  if (!isOpen.value) isOpen.value = true
  highlightedIndex.value = (highlightedIndex.value + 1) % filteredOptions.value.length
}

function moveUp() {
  if (!isOpen.value) isOpen.value = true
  highlightedIndex.value =
    (highlightedIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length
}

function selectHighlighted() {
  if (filteredOptions.value[highlightedIndex.value]) {
    selectItem(filteredOptions.value[highlightedIndex.value])
  }
}
</script>

<style scoped>
/* Optional: smooth transition */
ul {
  transition: all 0.2s ease-in-out;
}
</style>
