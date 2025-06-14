<script lang="ts">
    import { PositiveFeedback } from '../classes/PositiveFeedback';
    import type { Feedback } from '../interfaces/Feedback';
    import type { PropType } from 'vue';
    import { computed, onMounted, ref } from 'vue';
    import api from '../api';

    export default {
        name: 'FeedbackComponent',
        components: {},
        props: {
            feedback: {type: Object as PropType<Feedback>, required: true}
        },
        setup(props, {emit}) {
            const feedback = props.feedback;
            const ownsFeedback = ref(false);

            const expectationMarkerPositions = {
                'strongly disagree': {magnitude: 0, orientation: 'left'},
                'disagree': {magnitude: 25, orientation: 'left'},
                'neither agree nor disagree': {magnitude: 50, orientation: 'left'},
                'agree': {magnitude: 25, orientation: 'right'},
                'strongly agree': {magnitude: 0, orientation: 'right'},
            };

            onMounted(async () => {
                const user = await api.checkAuth();
                ownsFeedback.value = user.username === feedback.addedBy
            })

            const getExpectationMarkerPosition = computed(() => {
                if(!feedback.expectation) return;
                const lookup = expectationMarkerPositions[feedback.expectation as keyof typeof expectationMarkerPositions];
                return lookup.orientation === 'right'? {right: `${lookup.magnitude}%`}: {left: `${lookup.magnitude}%`};
            })

            const deleteFeedback = async () => {
                const user = await api.checkAuth();
                if(user.username !== feedback.addedBy) return emit('error', 'You do not have permission to delete this feedback');
                const apiResult = await api.deleteFeedback(feedback.id);
                if(apiResult.success) emit('reload');
                else emit('error', apiResult.message);
            }

            return {
                feedback,
                ownsFeedback,
                getExpectationMarkerPosition,
                deleteFeedback,
                PositiveFeedback
            }
        }
    }
</script>

<template>
    <div :class="feedback.className" class="inner-feedback-container">
        <span v-if="ownsFeedback" class="button delete-button" @click="deleteFeedback">X</span>
        <h3 class="hovering-feedback-label">{{ feedback instanceof PositiveFeedback? 'Positive': 'Negative' }}</h3>
        <div v-if="feedback.rating" class="rating-container">
            <img v-for="n in feedback.rating" class="rating-img" src="../../public/star.png" alt="star">
        </div>
        <div v-if="feedback.expectation" class="response-bar">
            <div class="scale-label">Strongly Disagree</div>
            <div class="bar-gradient">
                <div class="expectation-marker" :style="getExpectationMarkerPosition"></div>
            </div>
            <div class="scale-label">Strongly Agree</div>
        </div>
        <div class="duo-container">
            <div v-if="feedback.details">
                <p class="flavour-text">They said:</p>
                <p>{{ feedback.details }}</p>
            </div>
            <div class="inline-children bottom-corner" v-if="feedback.addedBy">
                <p>Created by:</p>
                <h3>{{ feedback.addedBy }}</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .inner-feedback-container {
        position: relative;
        border: 1px solid black;
        padding: 25px 15px 10px 15px;
        min-height: 60px;
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

    .inner-feedback-container .delete-button {
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 5px 10px;
    }

    .duo-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
    }

    .inline-children > * {
        display: inline-block;
        margin: 0 5px;
    }

    .inner-feedback-container .bottom-corner {
        position: absolute;
        right: 5px;
        bottom: 3px;
    }

    .rating-img {
        height: 55px;
    }

    .flavour-text {
        font-weight: bold;
    }

    .response-bar {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 50px 0 20px 0;
    }

    .rating-container + .response-bar {
        margin: 20px 0;
    }

    .scale-label {
        width: 120px;
        font-size: 14px;
        text-align: center;
    }

    .bar-gradient {
        flex: 1;
        height: 20px;
        border-radius: 10px;
        background: linear-gradient(to right, red, orange, yellow, lightgreen, green);
        position: relative;
    }

    .expectation-marker {
        position: absolute;
        height: 19px;
        width: 19px;
        border: 2px solid black;
        border-radius: 50%;
        background-color: white;
    }

</style>