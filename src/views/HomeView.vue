<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FeedbackInput from '../components/FeedbackInput.vue'
    import AllFeedbackContainer from '../components/AllFeedbackContainer.vue';
    import OverviewComponent from '../components/OverviewComponent.vue';
    import { useRouter } from 'vue-router';
    import api from '../api';
    import type { Feedback } from '../interfaces/Feedback';

    const feedbacks = ref<Feedback[]>([]);
    let username = ref('');

    //quirk of using the script setup - have to do this to use emits
    const emit = defineEmits();
    const router = useRouter();

    onMounted(async () => {
        username.value = (await api.checkAuth()).username || '';
        getFeedback();
    })

    async function getFeedback(){
        feedbacks.value = [];
        const apiResult = await api.getFeedback();
        const feedback = apiResult.data || [];
        feedbacks.value = feedback.reverse();
        if(apiResult.error) emit('error', apiResult.error) //make a popup that says an error occurred
    }

    function reload(){
        getFeedback();
    }

    function logout(){
        api.logout();
        router.push('/login');
    }
</script>

<template>
    <div>
        <h1 class="page-title">Feedback Manager</h1>
        <h3>Welcome back, {{ username }}</h3>
        <h3 class="subtitle">Enter New Feedback:</h3>
        <FeedbackInput @error="(message) => {$emit('error', message)}" @reload="reload" />
        <h3 class="subtitle">Your Feedback:</h3>
        <AllFeedbackContainer :feedbackArray="feedbacks" @error="(message) => {$emit('error', message)}" @reload="reload" />
        <h3 class="subtitle">An Overview</h3>
        <OverviewComponent :feedbackArray="feedbacks"/>
        <span class="button" @click="logout">Logout</span>
    </div>
</template>

<style scoped>
</style>