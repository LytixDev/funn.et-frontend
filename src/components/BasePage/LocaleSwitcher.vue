<template>
  <div class="button-wrapper">
    <button
      v-on:mouseenter="() => (showLocales = !showLocales)"
      v-on:mouseleave="() => (showLocales = false)"
      v-on:click="() => (showLocales = !showLocales)">
      {{ $t('locale.' + $i18n.locale) }}
      <div class="list" :class="showLocales ? '' : 'hidden'">
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
  width: 5em;
}

.list {
  display: flex;
  justify-content: center;
}

button {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  overflow: hidden;
  width: 6em;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  border-radius: 10%;
  margin: 0.5em 0;
  padding: 0;
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
</style>
