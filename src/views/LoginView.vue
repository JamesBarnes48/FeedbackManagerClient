<script setup lang="ts">
    import { ref } from 'vue';
    import ErrorBanner from '../components/ErrorBanner.vue';
    import api from '../api';

    const errorMessage = ref('');
    const showError = ref(false);

    const usernameInput = ref('');
    const passwordInput = ref('');

    function triggerError(message: string){
        errorMessage.value = message;
        showError.value = true;
    }

    function login(){
        if(!/^[a-zA-Z0-9_]{3,30}$/.test(usernameInput.value)) return triggerError('Invalid username field. Username must only consist of letters, digits and underscores and be at least 3 characters long');
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,32}$/.test(passwordInput.value)) return triggerError('Invalid password field. Password must contain at least one uppercase letter, lowercase letter and digit and be at least 6 characters long');

    }
</script>

<template>
    <div>
        <ErrorBanner v-model:show="showError" :message="errorMessage" />
        <h1 class="page-title">Welcome to Feedback Manager</h1>
        <div class="form-container">
            <div class="input-row">
                <label>Username</label>
                <input v-model="usernameInput" type="text">
            </div>
            <div class="input-row">
                <label>Password</label>
                <input v-model="passwordInput" type="text">
            </div>
        </div>
        <span class="button submit-button" @click="login">Login</span>
    </div>
</template>

<style scoped>
    .form-container {
        width: 40%;
    }
</style>