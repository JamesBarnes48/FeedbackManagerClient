<script setup lang="ts">
import { ref } from 'vue';
import FeedbackInput from './components/FeedbackInput.vue'
import AllFeedbackContainer from './components/AllFeedbackContainer.vue';

const formData = ref([]);

function updateFeedbacks(data: {enjoymentInput: boolean, ratingInput: number, expectationInput: string, detailsInput: string}){
  console.info(formData.value);
}

</script>

<template>
  <div>
    <h1 class="page-title">Feedback Manager</h1>
    <div class="feedback-container">
      <h3 class="subtitle">Enter New Feedback:</h3>
      <FeedbackInput @submitFeedback="updateFeedbacks" />
    </div>
    <h3 class="subtitle">Your Feedback:</h3>
      <AllFeedbackContainer />
  </div>
</template>

<style scoped>
.feedback-container {
  width: 70%;
}
</style>
