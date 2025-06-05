<script setup lang="ts">
    import { ref, computed } from 'vue';
    import RegistrationComponent from '../components/RegistrationComponent.vue';
    import LoginComponent from '../components/LoginComponent.vue';

    // quirk of script setup - need this to be able to use emits
    const emit = defineEmits();

    const showRegister = ref(false);
    const registrationButtonName = computed(() => showRegister.value? 'Hide': 'Show registration');
    function toggleRegister(){
        showRegister.value = !showRegister.value;
    }

    function successfulRegister(message: string){
        showRegister.value = false;
        emit('success', message);
    }
</script>

<template>
    <div>
        <h1 class="page-title">Welcome to Feedback Manager</h1>
        <LoginComponent
         @error="(message) => {$emit('error', message)}"
         @success="(message) => {$emit('success', message)}"
        />
        <h3>No account? <span class="button" @click="toggleRegister">{{ registrationButtonName }}</span></h3>
        <RegistrationComponent 
        @error="(message) => {$emit('error', message)}" 
        @success="successfulRegister"
        v-if="showRegister" 
        />
    </div>
</template>

<style scoped>

</style>