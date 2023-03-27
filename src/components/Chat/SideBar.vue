<template>
  <div class="main__box">
    <div id="sidebar" class="sidebar">
      <OhVueIcon
        :name="showMobileMenu ? 'oi-sidebar-expand' : 'oi-sidebar-collapse'"
        class="sidebar-icon"
        @click="
          () => {
            showMobileMenu = !showMobileMenu;
            displayMenu();
          }
        " />
      <div :class="showMobileMenu ? 'options open' : 'options'">
        <h2 class="sidebar__title">Chats</h2>
        <div class="item" v-for="chat in chatDTOs" :key="chat.id">
          <router-link
            class="item__link"
            @click="
              () => {
                showMobileMenu = false;
                displayMenu();
              }
            "
            :key="$route.path"
            :to="{ name: 'chat', params: { id: chat.listingId, username: chat.messager.username } }">
            {{ userToDisplay(chat.messager.username, chat.listingUser.username) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChatDTO } from '@/api/backend';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { OiSidebarCollapse, OiSidebarExpand } from 'oh-vue-icons/icons';

export default {
  name: 'SideBar',
  components: {
    OhVueIcon,
  },
  setup() {
    addIcons(OiSidebarCollapse);
    addIcons(OiSidebarExpand);
  },
  data() {
    return { showMobileMenu: false as boolean };
  },
  watch: {
    $route() {
      this.showMobileMenu = false;
    },
  },
  props: {
    chatDTOs: {
      type: Array<ChatDTO>,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  methods: {
    userToDisplay(username: string | undefined, listingUsername: string | undefined): string {
      if (username === undefined || listingUsername === undefined) {
        return '';
      }
      return username === this.username ? listingUsername : username;
    },
    displayMenu() {
      const sidebar = document.getElementById('sidebar');
      if (sidebar !== null) {
        if (this.showMobileMenu) {
          sidebar.style.width = '100%';
        } else if (!this.showMobileMenu && window.innerWidth < 768) {
          sidebar.style.width = '0px';
        }
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  color: white;
  width: 15vw;
  min-width: 170px;
  background: var(--secondary-color);
  height: 110vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}

.sidebar__title {
  font-size: 2rem;
  font-weight: 500;
  margin-top: 100px;
  text-align: center;
  position: relative;
  text-decoration: none;
  color: white;
  padding-top: 2rem;
}

.sidebar-icon {
  display: none;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  max-height: 100%;
  min-height: 100%;
  position: relative;
  overflow-y: scroll;
}

.item {
  font-size: smaller;
  width: 80%;
  align-content: center;
  text-align: center;
  height: 100%;
  margin-top: var(--spacing-2);
}

.item__link {
  display: block;
  text-decoration: none;
  text-align: center;
  position: relative;
}

.options::-webkit-scrollbar {
  width: 0.5rem;
  background: #999;
}

.options::-webkit-scrollbar-thumb {
  background: var(--primary-color);
}

.options::-webkit-scrollbar-track {
  background: #999;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 15px;
    min-width: 50px;
  }

  .options {
    width: 100%;
    height: 100%;
    position: absolute;
    display: none;
  }

  .options.open {
    display: flex;
  }

  .sidebar-icon {
    margin-top: 100px;
    display: block;
    width: 2.5em;
    height: 1.5em;
    float: left;
    z-index: 2;
    position: relative;
  }

  .item {
    font-size: smaller;
    width: 80%;
    align-content: center;
    text-align: center;
    height: auto;
    margin-top: var(--spacing-2);
  }

  .sidebar-icon:hover {
    cursor: pointer;
  }
}
</style>
