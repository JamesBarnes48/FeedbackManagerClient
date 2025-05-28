<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { ref } from 'vue';
  import ErrorBanner from './components/ErrorBanner.vue';

  const errorMessage = ref('');
  const showError = ref(false);

  function triggerError(message: string){
    errorMessage.value = message;
    showError.value = true;
  }
</script>

<template>
  <ErrorBanner v-model:show="showError" :message="errorMessage" />
  <RouterView @error="triggerError" />
</template>

<style scoped>
</style>
