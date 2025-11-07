# Vue Document Uploader

> Drag & Drop компонент для завантаження документів і файлів у **Vue 3 + TypeScript**  
> Підтримує прев’ю зображень, іконки документів, максимальну кількість файлів, двосторонню прив’язку (`v-model`)  
> та глобальну реєстрацію через `install(app: App)`.

---

## Встановлення

```bash
npm install vue-document-uploader
```

---

## Підключення

1. Глобально (через плагін)

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueDocumentUploader from 'vue-document-uploader'

const app = createApp(App)
app.use(VueDocumentUploader)
app.mount('#app')
```

Після цього компонент DocumentUploader доступний у всіх шаблонах без імпорту.

2. Локально (через import)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DocumentUploader } from 'vue-document-uploader'

const uploadedFiles = ref<File[]>([])
const availableDocuments = ref([
  { type: 'pdf', icon: '/icons/pdf.svg', name: 'Contract.pdf' },
  { type: 'docx', icon: '/icons/docx.svg', name: 'Report.docx' },
])
</script>

<template>
  <DocumentUploader
    v-model="uploadedFiles"
    :documents="availableDocuments"
    :maxFiles="5"
    @update:documents="availableDocuments = $event"
  />
</template>
```