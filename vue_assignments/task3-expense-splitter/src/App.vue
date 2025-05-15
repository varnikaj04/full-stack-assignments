<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Let’s Do Dutch</h1>
    <RouterView />
  </div>
</template>

<style>
body {
  background: linear-gradient(135deg, #d0eaff, #6fb1fc) no-repeat;
  min-height: 100vh;
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

.card {
  background-color: #fff;
  border: none;
}
</style>
