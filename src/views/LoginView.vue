<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import RegistrationComponent from '../components/RegistrationComponent.vue';
    import api from '../api';

    // quirk of script setup - need this to be able to use emits
    const emit = defineEmits();
    const router = useRouter();

    const usernameInput = ref('');
    const passwordInput = ref('');

    const showRegister = ref(false);
    const registrationButtonName = computed(() => showRegister.value? 'Hide': 'Show registration');
    function toggleRegister(){
        showRegister.value = !showRegister.value;
    }

    function resetFields(){
        usernameInput.value = '';
        passwordInput.value = '';
    }

    function successfulRegister(message: string){
        showRegister.value = false;
        emit('success', message);
    }

    async function login(){
        const result = await api.login({username: usernameInput.value, password: passwordInput.value});
        if(!result.success){
            resetFields();
            return emit('error', result.message);
        }
        emit('success', result.message);
        router.push('/');
    }
</script>

<template>
    <div>
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
        <RegistrationComponent 
        @error="(message) => {$emit('error', message)}" 
        @success="successfulRegister"
        v-if="showRegister" 
        />
    </div>
</template>

<style scoped>
    .form-container {
        width: 40%;
    }
</style>