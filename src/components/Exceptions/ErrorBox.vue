<template>
  <div class="error-box" v-if="errorMessage" data-testid="error-box">
    <span>
      <v-icon name="bi-exclamation-triangle" />
      <button @click="wrapText = !wrapText" class="error-message-button">
        <h4>{{ $t(errorMessage) }}</h4>
      </button>
      <button class="error-remove-button" @click="$emit('update:errorMessage', '')" data-testid="hide-button">
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
    errorMessage: {
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
  top: 2em;
  left: 50%;
  transform: translate(-50%, 0);
  top: 2em;
  max-width: 700px;
  background-color: rgb(202, 60, 60);
  padding: 7px;
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
  border: none;
}

.error-message-button h4 {
  overflow: hidden;
  text-overflow: ellipsis;
}

.error-box * {
  margin: 2px;
}

.error-box button {
  background-color: transparent;
  box-shadow: none;
  color: black;
  cursor: pointer;
}

.error-remove-button {
  color: rgb(79, 77, 77);
  border: solid black 0.5px;
  padding: 0.3em;
}

.error-box button:hover {
  color: rgb(40, 38, 38);
}
</style>
