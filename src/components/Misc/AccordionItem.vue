Inspired by https://github.com/ztrehagem/vue-accordion

<template>
  <div class="accordion-wrapper">
    <div class="accordion-header">
      <slot name="header" />
    </div>
    <Transition @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave" @leave="onLeave">
      <div v-if="props.expanded" class="accordion-expander" ref="elWrapper" :style="wrapperStyle">
        <div class="accordion-container" ref="elInner">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, CSSProperties } from 'vue';

const props = defineProps({
  expanded: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 300,
  },
});

const elWrapper = ref<HTMLElement | undefined>();
const elInner = ref<HTMLElement | undefined>();

const wrapperStyle = computed<Partial<CSSProperties>>(() => ({
  transitionDuration: `${props.duration}ms`,
}));

const onEnter = (el: Element): void => {
  const { height } = elInner.value!.getBoundingClientRect();
  (el as HTMLElement).style.height = `${height}px`;
  (el as HTMLElement).style.overflowY = 'hidden';
};

const onAfterEnter = (el: Element): void => {
  (el as HTMLElement).style.height = 'auto';
  (el as HTMLElement).style.overflowY = '';
};

const onBeforeLeave = (el: Element): void => {
  const { height } = (el as HTMLElement).getBoundingClientRect();
  (el as HTMLElement).style.height = `${height}px`;
  (el as HTMLElement).style.overflowY = 'hidden';
};

const onLeave = (el: Element): void => {
  (el as HTMLElement).style.height = '0px';
};

onMounted(() => {
  if (props.expanded) {
    elWrapper.value!.style.height = 'auto';
  }
});
</script>

<style scoped>
.accordion-expander {
  transition-timing-function: ease;
  transition-property: height;
  height: 0;
}

.accordion-container {
  display: table;
  width: 100%;
}

.accordion-wrapper {
  width: 100%;
  border: 1px solid black;
}

.accordion-header {
  padding: 1rem;
  cursor: pointer;
}
</style>
