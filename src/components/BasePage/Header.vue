<template>
  <header id="navigation-bar">
    <nav>
      <FunnLogo/>
      <ul>
        <li>
          <router-link to="/">{{ $t('navigation.home') }}</router-link>
        </li>
        <li>
          <router-link to="/register">{{ $t('navigation.register') }}</router-link>
        </li>
        <li>
          <router-link to="/login">{{ $t('navigation.login') }}</router-link>
        </li>
        <li>
          <router-link to="/signout">{{ $t('navigation.signout') }}</router-link>
        </li>
        <li>
          <router-link to="/create-listing">create listing</router-link>
        </li>
      </ul>
      <locale-selector />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import LocaleSelector from '@/components/BasePage/LocaleSwitcher.vue';
import FunnLogo from '@/components/BaseComponents/FunnLogo.vue';
</script>

<style scoped>
#navigation-bar {
  position: sticky;
}
</style>
