<template>
  <header id="navigation-bar">
    <nav>
      <div class="logo-clickable">
        <FunnLogo @click="router.push({ name: 'home' })" />
      </div>
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
        <li v-if="loggedIn">
        <UserProfilePicture/>
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
import { useRouter } from 'vue-router';

const user = useUserInfoStore();
const router = useRouter();
const loggedIn = computed(() => user.isLoggedIn);
const {username, firstname, lastname} = user;

</script>

<style scoped>
#navigation-bar {
  top: 0;
  position: sticky;
  background-color: aliceblue; /* <3 */
  z-index: 100;
}

.logo-clickable {
  cursor: pointer;
}
</style>
