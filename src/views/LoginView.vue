<script setup lang="ts">
    import { ref } from 'vue';
    import ErrorBanner from '../components/ErrorBanner.vue';
    import api from '../api';

    const errorMessage = ref('');
    const showError = ref(false);

    function triggerError(message: string){
        errorMessage.value = message;
        showError.value = true;
    }
</script>

<template>
    <div>
        <ErrorBanner v-model:show="showError" :message="errorMessage" />
        <h1 class="page-title">Welcome to Feedback Manager</h1>
        <a href="/">login</a>
    </div>
</template>

<style scoped>
</style>