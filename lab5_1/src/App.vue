<script setup lang="ts">
import DocumentUploader from "./components/DocumentUploader.vue";
import { ref } from 'vue'

const uploadedFiles = ref<File[]>([])
const availableDocuments = [
  { type: 'pdf', icon: '/pdf.svg', name: 'Contract.pdf' },
  { type: 'docx', icon: '/docx.svg', name: 'Report.docx' },
  { type: 'xlsx', icon: '/xlsx.svg', name: 'Data.xlsx' }
]
</script>

<template>
  <div class="app-container">
    <DocumentUploader
      v-model="uploadedFiles"
      :documents="availableDocuments"
      :maxFiles="5"
      @update:documents="availableDocuments = $event"
    />
  </div>
</template>