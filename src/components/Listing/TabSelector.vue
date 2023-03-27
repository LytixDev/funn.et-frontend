<template>
  <div class="tab-selector">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{ 'active-tab': tab.id === activeTab }"
      @click="() => setActiveTab(tab.id)">
      <span>{{ $t(tab.name) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  tabs: {
    id: string;
    name: string;
  }[];
  activeTab: string;
}>();
const emit = defineEmits<{
  (event: 'update:activeTab', value: string): void;
}>();

const tabs = ref(props.tabs);
const activeTab = ref(props.activeTab);

watch(activeTab, (newVal) => {
  emit('update:activeTab', newVal);
});

const setActiveTab = (id: string) => {
  activeTab.value = id;
};
</script>

<style scoped>
.tab-selector {
  display: flex;
  width: 50%;
  border-radius: 10px;
  margin: 1em;
  box-shadow: var(--button-box-shadow);
  overflow: hidden;
}

.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: none;
  cursor: pointer;
  border-left: 1px solid #e0e0e0;
}

.tab.active-tab {
  background-color: var(--secondary-color);
}

.tab:first-child {
  border: none;
}

.tab:hover {
  background-color: #e0e0e0;
}

.tab.tab.active-tab:hover {
  background-color: var(--secondary-color);
}
</style>
