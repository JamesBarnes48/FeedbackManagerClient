<script lang="ts">
    import type { Feedback } from '../interfaces/Feedback';
    import type { PropType } from 'vue';
    import { watch, computed, ref } from 'vue';
    import { PositiveFeedback } from '../classes/PositiveFeedback';

    export default {
        name: 'OverviewComponent',
        components: {},
        props: {
            feedbackArray: {type: Array as PropType<Feedback[]>, default(){return []}}
        },
        setup(props) {
            //watch feedback and group up properties for each manipulation
            const collectedValues = ref<Record<string, any>>({enjoyment: [], rating: [], expectation: [], details: [], addedBy: []});
            watch(() => props.feedbackArray, (newFeedbackArray) => {
                collectedValues.value = {enjoyment: [], rating: [], expectation: [], details: [], addedBy: []};

                newFeedbackArray.forEach((newFeedback) => {
                    collectedValues.value['enjoyment'].push(newFeedback instanceof PositiveFeedback? true: false);
                    newFeedback.getFields().forEach((field) => {
                        if(!newFeedback[field as keyof Feedback]) return;
                        collectedValues.value[field] = collectedValues.value[field]? [...collectedValues.value[field], newFeedback[field as keyof Feedback]]: [newFeedback[field as keyof Feedback]];
                    })
                });
            });

            const averageRating = computed(() => {
                const sum = collectedValues.value['rating'].reduce((acc: number, current: number) => acc + +current, 0);
                return (sum / collectedValues.value['rating'].length) || 'N/A';
            })

            const expectationLookup = {
                'strongly disagree': 1,
                'disagree': 2,
                'neither agree nor disagree': 3,
                'agree': 4,
                'strongly agree': 5,
            }

            const averageExpectation = computed(() => {
                //would be easier if expectation was a number instead
                const sum = collectedValues.value['expectation'].reduce((acc: number, current: string) => acc + expectationLookup[current as keyof typeof expectationLookup], 0);
                if(!sum) return 'N/A';

                const average = Math.round(sum / collectedValues.value['expectation'].length);
                return Object.keys(expectationLookup).find((key) => expectationLookup[key as keyof typeof expectationLookup] === average) || 'N/A';
            })

            const mostPopularEnjoyment = computed(() => {
                let counts = {true: 0, false: 0};
                collectedValues.value['enjoyment'].forEach((val: boolean) => {
                    if(val) counts.true++;
                    else counts.false++;
                });
                return counts.true === counts.false? '50/50': counts.true > counts.false? 'Positive': 'Negative';
            })

            return {
                collectedValues,
                averageRating,
                averageExpectation,
                mostPopularEnjoyment
            }
        }
    }
</script>

<template>
    <div class="overview-container">
        <div class="input-row">
            <h3>Mostly positive or negative:</h3>
            <p>{{ mostPopularEnjoyment }}</p>
        </div>
        <div class="input-row">
            <h3>Average Rating:</h3>
            <p>{{ averageRating }}</p>
        </div>
        <p v-if="averageExpectation !== 'N/A'">The general consensus was that people <span style="font-weight: 700">{{averageExpectation}}</span> that he product met expectations</p>
    </div>
</template>

<style scoped>
    .overview-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 8px;
        border: 1px solid black;
        width: 70%;
        padding: 10px 15px;
    }
</style>