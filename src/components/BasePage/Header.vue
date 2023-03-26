<template>
  <header id="navigation-bar">
    <nav>
      <div class="logo-clickable">
        <FunnLogo @click="router.push({ name: 'home' })" />
      </div>
      <OhVueIcon name="co-hamburger-menu" class="hamburger-icon" @click="() => (showMobileMenu = !showMobileMenu)" />
      <div class="nav-content" :class="showMobileMenu ? 'open-menu' : 'closed-menu'">
        <ul>
          <li>
            <router-link to="/">{{ $t('navigation.home') }}</router-link>
          </li>
          <li v-if="role === 'ADMIN'">
            <router-link :to="{ name: 'admin' }">Manage</router-link>
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
            <UserProfilePicture />
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import LocaleSelector from '@/components/BasePage/LocaleSwitcher.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { computed, ref, watch } from 'vue';
import FunnLogo from '@/components/BaseComponents/FunnLogo.vue';
import { useRouter } from 'vue-router';
import UserProfilePicture from '@/components/User/UserProfilePicture.vue';
import { CoHamburgerMenu } from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';

addIcons(CoHamburgerMenu);

const user = useUserInfoStore();
const router = useRouter();
const loggedIn = computed(() => user.isLoggedIn);
const role = computed(() => user.role);
const showMobileMenu = ref(false);

watch(router.currentRoute, () => {
  showMobileMenu.value = false;
});
</script>

<style scoped>
#navigation-bar {
  top: 0;
  position: sticky;
  z-index: 100;
}

.logo-clickable {
  cursor: pointer;
}

.hamburger-icon {
  display: none;
}
nav {
  align-self: center;
}

@media screen and (max-width: 768px) {
  .hamburger-icon {
    display: block;
    width: 4em;
    height: 2.5em;
  }

  .nav-content {
    display: none;
  }

  .nav-content.open-menu {
    display: block;
    position: absolute;
    top: 4em;
    right: 0;
    background-color: var(--background-color);
    width: 100%;
    padding: 1em;
    border-bottom: var(--primary-color) solid 2px;
    z-index: 50;
  }

  .nav-content ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
  }

  .nav-content ul li {
    margin: 2em 0;
  }
}
</style>
