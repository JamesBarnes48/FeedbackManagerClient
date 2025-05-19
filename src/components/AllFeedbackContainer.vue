<script lang="ts">
    import FeedbackComponent from './FeedbackComponent.vue';
    import type { Feedback } from '../interfaces/Feedback';
    import type { PropType } from 'vue';

    export default {
        name: 'AllFeedbackContainer',
        components: {FeedbackComponent},
        props: {
            feedbackArray: {type: Array as PropType<Feedback[]>, default(){return []}}
        },
        setup(props) {
            const feedbackArray = props.feedbackArray;

            return {
                feedbackArray
            }
        }
    }
</script>

<template>
    <div class="feedback-container">
        <FeedbackComponent 
        v-for="feedback in feedbackArray"
        :feedback="feedback"
        />
    </div>
</template>

<style scoped>
.feedback-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 8px;
    border: 1px solid black;
    width: 70%;
    padding: 10px 15px;
}
</style>