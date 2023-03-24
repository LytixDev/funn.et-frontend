<template>
  <div class="image-uploader">
    <div class="image-upload-area">
      <input type="file" @change="handleImageChange($event)" />

      <div v-if="errors.length > 0">
        <div class="file-upload-error" v-for="error in errors">
          {{ error }}
        </div>
      </div>
    </div>

    <div v-if="previewImage && image.isUploaded" class="upload-preview">
      <img :src="image.url" class="file-image" alt="" />
    </div>
    <div v-if="image.isUploaded">
      <button @click="resetImage">{{ $t('Form.ImageUpload.clear') }}</button>
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
  data?: Blob;
  isUploaded: boolean;
};

export default defineComponent({
  props: {
    modelValue: {
      type: Object as () => Image,
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
      image: {
        name: '',
        size: 0,
        type: '',
        url: '',
        data: undefined,
        isUploaded: false,
      } as Image,
      errors: [] as string[],
    };
  },
  methods: {
    handleImageChange(e: Event) {
      this.errors = [];
      if (!((e.target as HTMLInputElement).files || (e.target as HTMLInputElement).files!![0])) return;

      const file: File = (e.target as HTMLInputElement).files!![0];
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
      this.image = image;
      this.emitToParent();
    },
    resetImage() {
      this.image = {
        name: '',
        size: 0,
        type: '',
        url: '',
        data: undefined,
        isUploaded: false,
      };
    },
    emitToParent() {
      this.$emit('update:modelValue', this.image);
    },
  },
});
</script>

<style scoped></style>
