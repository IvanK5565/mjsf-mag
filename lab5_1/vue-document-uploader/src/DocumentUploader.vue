<script setup lang="ts">
import { ref, computed, watch, onUnmounted, defineProps, defineEmits } from 'vue'

interface DocumentPreview {
  type: string
  icon: string
  name: string
}

const props = defineProps<{
  modelValue: File[]
  documents: DocumentPreview[]
  maxFiles: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
  (e: 'update:documents', value: DocumentPreview[]): void
}>()

const dragOver = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const filePreviews = ref<{ file: File; url: string }[]>([])

const updatePreviews = () => {
  filePreviews.value.forEach(p => URL.revokeObjectURL(p.url))
  filePreviews.value = props.modelValue.map(file => ({
    file,
    url: URL.createObjectURL(file)
  }))
}

watch(() => props.modelValue, updatePreviews, { immediate: true })

onUnmounted(() => {
  filePreviews.value.forEach(p => URL.revokeObjectURL(p.url))
})

const handleFiles = (files: FileList | null) => {
  if (!files) return
  const newFiles = Array.from(files)
  const combined = [...props.modelValue, ...newFiles]
  emit('update:modelValue', combined.slice(0, props.maxFiles))
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  dragOver.value = false
  handleFiles(e.dataTransfer?.files || null)
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  dragOver.value = true
}

const onDragLeave = () => {
  dragOver.value = false
}

const removeItem = (item: CombinedItem) => {
  if (item.isFile) {
    const updated = [...props.modelValue]
    updated.splice(item.index, 1)
    emit('update:modelValue', updated)
  } else {
    const updatedDocs = [...props.documents]
    updatedDocs.splice(item.index, 1)
    emit('update:documents', updatedDocs)
  }
}

const triggerFileSelect = () => {
  fileInput.value?.click()
}

const remainingSlots = computed(() => props.maxFiles - props.modelValue.length)

interface CombinedItem {
  id: string
  name: string
  type: string
  url: string
  isFile: boolean
  index: number
}

const combinedList = computed<CombinedItem[]>(() => {
  const docs = props.documents.map((doc, i) => ({
    id: 'doc-' + i,
    name: doc.name,
    type: doc.type,
    url: doc.icon,
    isFile: false,
    index: i
  }))

  const files = filePreviews.value.map((p, i) => ({
    id: 'file-' + i,
    name: p.file.name,
    type: p.file.type,
    url: p.url,
    isFile: true,
    index: i
  }))

  return [...docs, ...files]
})
</script>

<template>
  <div class="uploader">
    <div
      class="dropzone"
      :class="{ 'is-dragover': dragOver }"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @click="triggerFileSelect"
    >
      <input
        type="file"
        ref="fileInput"
        multiple
        class="hidden-input"
        @change="handleFiles(($event.target as HTMLInputElement).files)"
      />
      <p v-if="remainingSlots > 0">
        Перетягніть файли сюди або натисніть, щоб вибрати (залишилось {{ remainingSlots }})
      </p>
      <p v-else>Досягнуто максимум файлів ({{ maxFiles }})</p>
    </div>

    <div class="file-list">
      <div
        v-for="item in combinedList"
        :key="item.id"
        class="file-item"
      >
        <template v-if="item.isFile && item.type.startsWith('image/')">
          <img :src="item.url" alt="preview" class="file-preview" />
        </template>
        <template v-else-if="item.type === 'application/pdf'">
          <img src="../../public/pdf.svg" alt="pdf" class="file-icon" />
        </template>
        <template v-else>
          <img :src="item.url || '../../public/file.svg'" alt="file" class="file-icon" />
        </template>

        <span class="file-name">{{ item.name }}</span>
        <button class="remove-btn" @click.stop="removeItem(item)">✕</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dropzone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #777;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropzone.is-dragover {
  border-color: #42b983;
  background-color: #f0fdf4;
  color: #2c7a7b;
}

.hidden-input {
  display: none;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  justify-content: space-between;
}

.file-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  color: red;
}

.file-preview {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
}

.file-name {
  flex: 1;
  font-size: 0.9rem;
  color: #333;
  margin-left: 0.5rem;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ff4d4f;
  font-size: 1rem;
  cursor: pointer;
}
</style>
