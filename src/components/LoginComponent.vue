<script lang="ts">
    import {ref} from 'vue';
    import { useRouter } from 'vue-router';
    import api from '../api';

    export default {
        name: 'LoginComponent',
        props: {},
        components: {},
        setup(props, {emit}){
            const usernameInput = ref('');
            const passwordInput = ref('');

            const router = useRouter();

            function resetFields(){
                usernameInput.value = '';
                passwordInput.value = '';
            }

            async function login(){
                const result = await api.login({username: usernameInput.value, password: passwordInput.value});
                if(!result.success){
                    resetFields();
                    return emit('error', result.message);
                }
                //set small delay to ensure token is stored properly
                setTimeout(() => {
                    emit('success', result.message);
                    router.push('/');
                }, 300);
            }
            return {
                usernameInput,
                passwordInput,
                login
            }
        }
    }
</script>

<template>
    <div class="form-container">
        <div class="input-row">
            <label>Username</label>
            <v-tooltip location="top" text="Valid characters include letters, digits and underscores. Must be at least 3 characters long">
                <template v-slot:activator="{ props }">
                    <input v-bind="props" v-model="usernameInput" type="text">
                </template>
            </v-tooltip>
        </div>
        <div class="input-row">
            <label>Password</label>
            <v-tooltip location="top" text="Password must contain at least one uppercase letter, lowercase letter and digit and be at least 6 characters long">
                <template v-slot:activator="{ props }">
                    <input v-bind="props" v-model="passwordInput" type="password">
                </template>
            </v-tooltip>
        </div>
    </div>
    <span class="button submit-button" @click="login">Login</span>
</template>

<style scoped>
    .form-container {
        width: 40%;
    }
</style>