<script lang="ts">
    import {ref} from 'vue';
    import api from '../api'

    export default {
        name: 'RegistrationComponent',
        components: {},
        props: {},
        setup(props, {emit}){
            const usernameInput = ref('');
            const passwordInput = ref('');
            const reenterPasswordInput = ref('');

            function resetFields(){
                usernameInput.value = '';
                passwordInput.value = '';
                reenterPasswordInput.value = '';
            }

            async function register(): Promise<void>{
                //ensure both passwords match
                if(passwordInput.value !== reenterPasswordInput.value) return emit('error', 'Password fields do not match');

                const result = await api.registerUser({username: usernameInput.value, password: passwordInput.value});
                if(result.success){
                    resetFields();
                    emit('success', 'Successfully registered new user');
                }else{
                    emit('error', result.message);
                }
            }
            return {
                usernameInput,
                passwordInput,
                reenterPasswordInput,
                register
            }
        }
    }
</script>

<template>
    <div class="form-container">
        <h3>Register</h3>
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
                    <input v-bind="props" v-model="passwordInput" type="password">
                </template>
            </v-tooltip>
        </div>
        <div class="input-row">
            <label>Reenter Password</label>
            <input v-model="reenterPasswordInput" type="password">
        </div>
    </div>
    <span class="button submit-button" @click="register">Register</span>
</template>

<style scoped>
    .form-container{
        width: 40%;
    }
</style>