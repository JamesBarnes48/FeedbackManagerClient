<script lang="ts">
    import type { Feedback } from '../interfaces/Feedback';
    import type { PropType } from 'vue';
    import { watch, computed, ref } from 'vue';

    export default {
        name: 'OverviewComponent',
        components: {},
        props: {
            feedbackArray: {type: Array as PropType<Feedback[]>, default(){return []}}
        },
        setup(props) {
            //watch feedback and group up properties for each manipulation
            const collectedValues = ref<Record<string, any>>({rating: [], expectation: [], details: [], addedBy: []});
            watch(() => props.feedbackArray, (newFeedbackArray) => {
                newFeedbackArray.forEach((newFeedback) => {
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
            return {
                collectedValues,
                averageRating
            }
        }
    }
</script>

<template>
    <div class="overview-container">
        <h3 @click="() => {console.log(collectedValues)}">do it</h3>
        <div class="input-row">
            <h3>Average Rating:</h3>
            <p>{{ averageRating }}</p>
        </div>
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