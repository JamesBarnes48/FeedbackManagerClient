<script lang="ts">
    import type { Feedback } from '../interfaces/Feedback';
    import type { PropType } from 'vue';

    export default {
        name: 'FeedbackComponent',
        components: {},
        props: {
            feedback: {type: Object as PropType<Feedback>, required: true}
        },
        setup(props) {
            const feedback = props.feedback;

            return {
                feedback
            }
        }
    }
</script>

<template>
    <div class="feedback-container">
        <div>
            <h1>feed</h1>
        </div>
    </div>
</template>

<style scoped>
.feedback-container {
    display: flex;
    justify-content: space-evenly;
    border: 1px solid black;
    width: 70%;
    padding: 10px 15px;
}
</style>