<!-- components/HelloWorld.vue -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: "Welcome to Cegid Help",
  },
});
</script>

<style scoped>
.hello {
  text-align: center;
  margin-top: 20px;
}

.hello h1 {
  font-size: 2rem;
  color: #333;
}
</style>
