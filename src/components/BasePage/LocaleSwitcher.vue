<template>
  <div class="button-wrapper">
    <button
      v-on:mouseenter="() => (showLocales = !showLocales)"
      v-on:mouseleave="() => (showLocales = false)"
      v-on:click="() => (showLocales = !showLocales)">
      {{ $t('locale.' + $i18n.locale) }}
      <div :class="showLocales ? 'block' : 'hidden'">
        <ul>
          <li v-for="(lang, i) in selectableLocales" :key="lang">
            <div v-on:click="switchToLocale(lang)">
              <div>
                {{ $t('locale.' + lang) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLanguageStore } from '@/stores/LanguageStore';

export default defineComponent({
  data: () => ({
    showLocales: false,
  }),
  computed: {
    selectableLocales() {
      let locales = this.$i18n.availableLocales;
      locales.splice(locales.indexOf(this.$i18n.locale), 1);
      return locales;
    },
  },
  methods: {
    switchToLocale(locale: string) {
      let store = useLanguageStore();
      store.setLanguage(locale);
      this.$i18n.locale = locale;
    },
  },
});
</script>

<style scoped>

.button-wrapper {
  position: relative;
  width: 3em;
}

button {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  overflow: hidden;
  max-width: 200%;
}

ul {
  list-style-type: none;
  padding: 0.5em;
  margin: 0;
  max-width: 200%;
}

li {
  padding: 0.2rem 0.4rem;
  border-radius: 10%;
  max-width: 200%;
}

button ul li:hover {
  background-color: #333;
  color: #fff;
}

button > div {
  border-top: 1px solid #333;
}

.hidden {
  display: none;
}

.block {
  display: block;
}
</style>
