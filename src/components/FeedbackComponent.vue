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
    <div :class="feedback.className" class="inner-feedback-container">

    </div>
</template>

<style scoped>
    .inner-feedback-container {
        border: 1px solid black;
        padding: 10px 15px;
    }

    .positive {
        background-color: #80cc64;
    }

    .negative {
        background-color: #b86570;
    }
</style>