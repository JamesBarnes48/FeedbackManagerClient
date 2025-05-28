<script setup lang="ts">
    import { ref, computed } from 'vue';
    import ErrorBanner from '../components/ErrorBanner.vue';
    import RegistrationComponent from '../components/RegistrationComponent.vue';
    import api from '../api';

    const errorMessage = ref('');
    const showError = ref(false);

    const usernameInput = ref('');
    const passwordInput = ref('');

    const showRegister = ref(false);
    const registrationButtonName = computed(() => showRegister.value? 'Hide': 'Show registration');
    function toggleRegister(){
        showRegister.value = !showRegister.value;
    }

    function triggerError(message: string){
        errorMessage.value = message;
        showError.value = true;
    }

    function login(){
        if(!/^[a-zA-Z0-9_]{3,30}$/.test(usernameInput.value)) return triggerError('Invalid username field.');
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,32}$/.test(passwordInput.value)) return triggerError('Invalid password field.');

        //hit login api here!
    }
</script>

<template>
    <div>
        <ErrorBanner v-model:show="showError" :message="errorMessage" />
        <h1 class="page-title">Welcome to Feedback Manager</h1>
        <div class="form-container">
            <div class="input-row">
                <label>Username</label>
                <v-tooltip location="top" text="Username must only consist of letters, digits and underscores and be at least 3 characters long">
                    <template v-slot:activator="{ props }">
                        <input v-bind="props" v-model="usernameInput" type="text">
                    </template>
                </v-tooltip>
            </div>
            <div class="input-row">
                <label>Password</label>
                <v-tooltip location="top" text="Password must contain at least one uppercase letter, lowercase letter and digit and be at least 6 characters long">
                    <template v-slot:activator="{ props }">
                        <input v-bind="props" v-model="passwordInput" type="text">
                    </template>
                </v-tooltip>
            </div>
        </div>
        <span class="button submit-button" @click="login">Login</span>
        <h3>No account? <span class="button" @click="toggleRegister">{{ registrationButtonName }}</span></h3>
        <RegistrationComponent @error="triggerError" v-if="showRegister" />
    </div>
</template>

<style scoped>
    .form-container {
        width: 40%;
    }
</style>