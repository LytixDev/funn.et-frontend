<template>
  <div class="image-uploader">
    <div class="image-upload-area">
      <label for="file-upload" class="custom-file-upload">
        {{ $t('ListingForm.uploadImage') }}
      </label>
      <input id="file-upload" type="file" multiple @change="handleImageChange($event)" />

      <div v-if="errors.length > 0">
        <div class="file-upload-error" v-for="error in errors">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type Image = {
  name: string;
  size: number;
  type: string;
  url: string;
  alt?: string;
  data?: Blob;
  isUploaded: boolean;
};

export default defineComponent({
  props: {
    modelValue: {
      type: Object as () => Image[],
      required: false,
    },
    maxFileSizeMb: {
      type: Number,
      default: 100,
    },
    acceptedFileTypes: {
      type: Array,
      default: () => ['image/png', 'image/jpeg', 'image/jpg'],
    },
    previewImage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoading: false,
      images: this.modelValue || [],
      errors: [] as string[],
    };
  },
  methods: {
    handleImageChange(e: Event) {
      this.errors = [];
      if (!((e.target as HTMLInputElement).files || (e.target as HTMLInputElement).files!![0])) return;

      const files: FileList = (e.target as HTMLInputElement).files!!;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeMb = file.size / 1024 / 1024;
        if (fileSizeMb > this.maxFileSizeMb) {
          this.errors.push(this.$t('Form.ImageUpload.errorTooLarge', { size: this.maxFileSizeMb }));
          return;
        }

        if (this.acceptedFileTypes.indexOf(file.type) === -1) {
          this.errors.push(this.$t('Form.ImageUpload.errorBadType', { types: this.acceptedFileTypes.join(', ') }));
          return;
        }

        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => this.handleReaderLoaded(reader, file);
      }
    },
    handleReaderLoaded(reader: FileReader, file: File) {
      const buffer: ArrayBuffer = reader.result!! as ArrayBuffer;
      const image: Image = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        data: new Blob([buffer]) as Blob,
        isUploaded: true,
      };
      this.images.push(image);
      this.emitToParent();
    },
    resetImage() {
      this.images = [];
    },
    emitToParent() {
      this.$emit('update:modelValue', this.images);
    },
  },
});
</script>

<style scoped>
input[type='file'] {
  display: none;
}

.custom-file-upload {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
}
</style>
