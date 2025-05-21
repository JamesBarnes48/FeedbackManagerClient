<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FeedbackInput from '../components/FeedbackInput.vue'
    import ErrorBanner from '../components/ErrorBanner.vue';
    import AllFeedbackContainer from '../components/AllFeedbackContainer.vue';
    import api from '../api';
    import type { Feedback } from '../interfaces/Feedback';

    const feedbacks = ref<Feedback[]>([]);
    let errorMessage = ref('');
    let showError = ref(false);

    onMounted(() => {
        getFeedback();
    })

    function triggerError(message: string){
        errorMessage.value = message;
        showError.value = true;
    }

    async function getFeedback(){
        const apiResult = await api.getFeedback();
        feedbacks.value = apiResult.data || [];
        if(apiResult.error) triggerError(apiResult.error) //make a popup that says an error occurred
    }

    function reload(){
        getFeedback();
    }
</script>

<template>
    <div>
        <ErrorBanner v-model:show="showError" :message="errorMessage" />
        <h1 class="page-title">Feedback Manager</h1>
        <h3 class="subtitle">Enter New Feedback:</h3>
        <FeedbackInput @error="triggerError" @reload="reload" />
        <h3 class="subtitle">Your Feedback:</h3>
        <AllFeedbackContainer :feedbackArray="feedbacks" />
    </div>
</template>

<style scoped>
</style>