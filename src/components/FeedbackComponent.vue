<script lang="ts">
    import { PositiveFeedback } from '../classes/PositiveFeedback';
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
                feedback,
                PositiveFeedback
            }
        }
    }
</script>

<template>
    <div :class="feedback.className" class="inner-feedback-container">
        <h3 class="hovering-feedback-label">{{ feedback instanceof PositiveFeedback? 'Positive': 'Negative' }}</h3>
        <div class="rating-container">
            <img v-for="n in feedback.rating" class="rating-img" src="../../public/star.png" alt="star">
        </div>
        <p class="flavour-text">They said:</p>
        <p>{{ feedback.details }}</p>
    </div>
</template>

<style scoped>
    .inner-feedback-container {
        position: relative;
        border: 1px solid black;
        padding: 10px 15px;
        min-height: 40px;
    }

    .positive {
        background-color: #80cc64;
    }

    .negative {
        background-color: #b86570;
    }

    .inner-feedback-container .hovering-feedback-label {
        position: absolute;
        top: 10px;
        right: 35px;
        margin-top: 0;
        font-size: 1.7rem;
        pointer-events: none;
    }

    .inner-feedback-container.positive .hovering-feedback-label {
        color: #4f803d;
    }

    .inner-feedback-container.negative .hovering-feedback-label {
        color: #784148;
    }

    .rating-img {
        height: 55px;
    }

    .flavour-text {
        font-weight: bold;
    }

</style>