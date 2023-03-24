<template>
  <router-link :to="{path: link}" class="user-profile-picture" :style="{backgroundColor: bgcolor}">
    <span class="initials" :style="{color: text_color}">{{ initials }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores/UserStore';
import { computed, ref } from 'vue';

const user = useUserInfoStore();
const {username, firstname, lastname} = user;


const first_initial = firstname.charAt(0).toUpperCase()
const last_initial = lastname.charAt(0).toUpperCase()

const initials = ref(first_initial + last_initial)
const link = ref('/user/' + username)

const stringToColour = (str: String) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    let twoChar = ("00" + value.toString(16))

    colour += twoChar.substring(twoChar.length - 2);
  }
  return colour;
}

// if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 else use #ffffff
const chooseBlackOrWhite = (color: {r: number, g: number, b: number}) => {
  const {r, g, b} = color
  if (r*0.299 + g*0.587 + b*0.114 > 186) {
    return '#000000'
  } else {
    return '#ffffff'
  }
}


function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}




const bgcolor = ref(stringToColour(username))
const text_color = ref(chooseBlackOrWhite(hexToRgb(bgcolor.value) as {r: number, g: number, b: number}));

console.log(bgcolor.value)
console.log(text_color.value)
</script>

<style scoped>
a {
  display: flex;
  text-decoration: none;
  width: 2em;
  height: 2em;
  justify-content: center;
  align-items: center;
}

.user-profile-picture {
  border-radius: 50%;
  width: 3em;
  height: 3em;
} 

.initials {
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 3em;
}
</style>