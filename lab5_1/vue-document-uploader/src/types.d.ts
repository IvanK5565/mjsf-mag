import { ComponentPublicInstance } from 'vue'
import type DocumentUploader from './DocumentUploader.vue'

declare module 'vue' {
  export interface GlobalComponents {
    DocumentUploader: typeof DocumentUploader
  }

  export interface ComponentCustomProperties {
    $documentUploader?: ComponentPublicInstance<typeof DocumentUploader>
  }
}

export {}
