<template>
  <header id="navigation-bar">
    <nav>
      <FunnLogo/>
      <ul>
        <li>
          <router-link to="/">{{ $t('navigation.home') }}</router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link to="/login" class="attention">{{ $t('navigation.login') }}</router-link>
        </li>
        <li v-else>
          <router-link to="/signout" class="attention">{{ $t('navigation.signout') }}</router-link>
        </li>
        <li>
          <locale-selector />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import LocaleSelector from '@/components/BasePage/LocaleSwitcher.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { computed } from 'vue';
import FunnLogo from '@/components/BaseComponents/FunnLogo.vue';

const user = useUserInfoStore();
const loggedIn = computed(() => user.isLoggedIn);
</script>

<style scoped>
#navigation-bar {
  position: sticky;
}

.attention {
  background-color: var(--primary-color);
  color: white;
}

</style>
