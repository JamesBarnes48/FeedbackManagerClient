<script lang="ts">
    import type { Feedback } from '../interfaces/Feedback';
    import type { PropType } from 'vue';
    import { computed } from 'vue';

    export default {
        name: 'OverviewComponent',
        components: {},
        props: {
            feedbackArray: {type: Array as PropType<Feedback[]>, default(){return []}}
        },
        setup(props) {
            const getStuff = () => {
                props.feedbackArray.forEach((arr) => {console.log(arr)});
            }
            return {
                getStuff
            }
        }
    }
</script>

<template>
    <div class="overview-container">
        <h3 @click="getStuff">do it</h3>
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