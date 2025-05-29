<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { ref } from 'vue';
  import InfoBanner from './components/InfoBanner.vue';

  const [bannerMessage, bannerType, showBanner] = [ref(''), ref('error'), ref(false)];

  //elected to use this method so that we can maintain clear event handler names all the way until here
  const triggerError = (message: string) => triggerBanner(message, 'error');
  const triggerSuccess = (message: string) => triggerBanner(message, 'success');

  function triggerBanner(message: string, type: string){
    bannerMessage.value = message;
    bannerType.value = type;
    showBanner.value = true;
  }

</script>

<template>
  <ErrorBanner v-model:show="showBanner" :message="bannerMessage" :type="bannerType" />
  <RouterView @error="triggerError" @success="triggerSuccess" />
</template>

<style scoped>
</style>
