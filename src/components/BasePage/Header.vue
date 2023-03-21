<template>
  <header id="navigation-bar">
    <nav>
      <ul>
        <li>
          <router-link to="/">{{ $t('navigation.home') }}</router-link>
        </li>
        <li>
          <router-link to="/register">{{ $t('navigation.register') }}</router-link>
        </li>
        <li>
          <router-link to="/create-listing">create listing</router-link>
        </li>
      </ul>
      <locale-selector />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LocaleSelector from '@/components/BasePage/LocaleSwitcher.vue';
export default defineComponent({
  components: {
    LocaleSelector,
  },
});
</script>

<style scoped>
#navigation-bar {
  position: sticky;
}
</style>
