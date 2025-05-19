<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FeedbackInput from '../components/FeedbackInput.vue'
    import AllFeedbackContainer from '../components/AllFeedbackContainer.vue';
    import api from '../api';
    import type { Feedback } from '../interfaces/Feedback';

    const feedbacks = ref<Feedback[]>([]);
    const error = ref('');

    onMounted(async () => {
        const apiResult = await api.getFeedback();
        feedbacks.value = apiResult.data || [];
        if(apiResult.error){} //make a popup that says an error occurred
    })

    function updateFeedbacks(data: Feedback){
        feedbacks.value.push(data);
        console.info(feedbacks.value);
    }
</script>

<template>
    <div>
        <h1 class="page-title">Feedback Manager</h1>
        <h3 class="subtitle">Enter New Feedback:</h3>
        <FeedbackInput @submitFeedback="updateFeedbacks" />
        <h3 class="subtitle">Your Feedback:</h3>
        <AllFeedbackContainer :feedbackArray="feedbacks" />
    </div>
</template>

<style scoped>
</style>