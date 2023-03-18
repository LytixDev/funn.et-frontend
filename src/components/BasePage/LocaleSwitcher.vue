<template>
  <div>
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
      this.$i18n.locale = locale;
    },
    logToConsole(message: string) {
      console.log(message);
    },
  },
});
</script>

<style scoped>
button {
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  background-color: #fff;
  color: #333;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0.5em;
  margin: 0;
}

li {
  padding: 0.2rem 0.4rem;
  border-radius: 10%;
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
