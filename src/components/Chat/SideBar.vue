<template>
  <div class="main__box">
    <div class="sidebar">
      <div class="options">
        <h2 class="sidebar__title">Chats</h2>
        <div class="item" v-for="chat in chatDTOs" :key="chat.id">
          <router-link
            :key="chat.id"
            :to="{ name: 'chat', params: { id: chat.listingId, username: chat.messager.username } }"
            ><div class="inner" v-if="chat.messager.username !== username">{{ chat.messager.username }}</div>
            <div class="inner" v-else>{{ chat.listingUser.username }}</div></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChatDTO } from '@/api';
export default {
  name: 'SideBar',
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
  methods: {},
};
</script>

<style scoped>
.sidebar {
  color: white;
  width: 15vw;
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

button,
a {
  background: none !important;
  box-shadow: none !important;
  border-radius: none !important;
  border: none !important;
  padding: none !important;
  font-size: none !important;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  max-height: 100%;
  min-height: 100%;
  position: relative;
  overflow-y: scroll;
}

.item {
  margin: 0.1rem 0.5rem 0.1rem 0.5rem;
  background: var(--primary-color);
  font-size: 1rem;
  text-align: left;
  text-decoration: none;
  color: white;
  border-radius: 0.5rem;
}

.inner {
  color: white;
  margin-left: 1rem;
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
</style>
