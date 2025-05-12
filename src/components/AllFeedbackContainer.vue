<script lang="ts">
    import FeedbackContainer from './FeedbackContainer.vue';

    export default {
        name: 'AllFeedbackContainer',
        components: {FeedbackContainer},
        props: {},
        setup() {
            return {
            }
        }
    }
</script>

<template>
    <div class="all-feedback-container">
        <div>
            <h3>Positive Feedback</h3>
            <FeedbackContainer />
        </div>
        <div>
            <h3>Negative Feedback</h3>
            <FeedbackContainer />
        </div>
    </div>
</template>

<style scoped>
.all-feedback-container {
    display: flex;
    justify-content: space-evenly;
    border: 1px solid black;
    width: 70%;
    padding: 10px 15px;
}
</style>