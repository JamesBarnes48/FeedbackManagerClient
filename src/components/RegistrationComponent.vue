<script lang="ts">
    import {ref} from 'vue';
    export default {
        name: 'RegistrationComponent',
        components: {},
        props: {},
        setup(props, {emit}){
            const usernameInput = ref('');
            const passwordInput = ref('');
            const reenterPasswordInput = ref('');

            function register(): void{
                //ensure both passwords match
                if(passwordInput.value !== reenterPasswordInput.value) return emit('error', 'Password fields do not match');
                //ensure fields meet standard compliance
                if(!/^[a-zA-Z0-9_]{3,30}$/.test(usernameInput.value)) return emit('error', 'Invalid username field');
                if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,32}$/.test(passwordInput.value)) return emit('error', 'Invalid password field');
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
    <div>
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
                        <input v-bind="props" v-model="passwordInput" type="text">
                    </template>
                </v-tooltip>
            </div>
            <div class="input-row">
                <label>Reenter Password</label>
                <input v-model="reenterPasswordInput" type="text">
            </div>
        </div>
        <span class="button submit-button" @click="register">Register</span>
    </div>
</template>

<style scoped>
    .form-container {
        width: 40%;
    }
</style>