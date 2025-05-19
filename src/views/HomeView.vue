<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FeedbackInput from '../components/FeedbackInput.vue'
    import AllFeedbackContainer from '../components/FeedbackContainer.vue';
    import type { Feedback } from '../interfaces/Feedback';
    import axios from 'axios';

    const feedbacks = ref<Feedback[]>([]);
    const error = ref('');
    const apiUrl = import.meta.env.MODE === 'development'? 'http://localhost:3000': 'https://dummy-prod-url';

    onMounted(async () => {
        try{
            const result = await axios.get(`${apiUrl}/feedback`);
            feedbacks.value = result.data?.feedbacks as Feedback[] || [];
        }catch(err){
            error.value = 'Failed to fetch feedback';
            console.error(err);
        }
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