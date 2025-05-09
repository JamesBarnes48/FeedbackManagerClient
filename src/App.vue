<script setup lang="ts">
import FeedbackInput from './components/FeedbackInput.vue'
</script>

<template>
  <div>
    <h1 class="page-title">Feedback Manager</h1>
    <div class="feedback-container">
      <h3 class="subtitle">Enter New Feedback:</h3>
      <FeedbackInput />
    </div>
    <h3 class="subtitle">Your Feedback:</h3>
  </div>
</template>

<style scoped>
.feedback-container {
  width: 70%;
}
</style>
