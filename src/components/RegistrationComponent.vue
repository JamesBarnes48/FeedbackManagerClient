<script lang="ts">
    import {ref} from 'vue';
    export default {
        name: 'RegistrationComponent',
        components: {},
        props: {},
        setup(props, {emit}){
            return {}
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
        <span class="button submit-button" @click="login">Login</span>
    </div>
</template>

<style scoped>
    .form-container {
        width: 40%;
    }
</style>