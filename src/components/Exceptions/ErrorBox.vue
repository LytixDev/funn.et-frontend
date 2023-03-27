<template>
  <div class="error-box" v-if="modelValue" data-testid="error-box">
    <span>
      <v-icon name="bi-exclamation-triangle" />
      <button @click="wrapText = !wrapText" class="error-message-button">
        <h4>{{ $t(modelValue) }}</h4>
      </button>
      <button @click="$emit('update:modelValue', '')" data-testid="hide-button">
        <v-icon scale="2" name="bi-dash" />
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiDash, BiExclamationTriangle } from 'oh-vue-icons/icons';

addIcons(BiDash, BiExclamationTriangle);

export default defineComponent({
  components: {
    'v-icon': OhVueIcon,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      wrapText: false,
    };
  },
});
</script>

<style scoped>
.error-box {
  position: fixed;
  left: 20px;
  bottom: 20px;
  right: 20px;
  max-width: 700px;
  background-color: rgb(202, 60, 60);
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
}

.error-box span {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message-button {
  white-space: v-bind('wrapText ? "normal" : "nowrap"');
  overflow: hidden;
}

.error-message-button h4 {
  overflow: hidden;
  text-overflow: ellipsis;
}

.error-box * {
  margin: 4px;
}

.error-box button {
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
}

.error-box button:hover {
  color: rgb(79, 77, 77);
}
</style>
