<script setup>
import { RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="content">
      <!-- <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      /> -->

      <HelloWorld msg="Welcome to Cegid Help" />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
}

.content {
  text-align: center;
}

.logo {
  display: block;
  margin-bottom: 1rem; /* Space between logo and welcome message */
}

@media (min-width: 1024px) {
  header {
    height: auto; /* Adjust header height based on content */
  }
}
</style>
