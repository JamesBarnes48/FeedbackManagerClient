<script lang="ts">
    export default {
        name: 'FeedbackContainer',
        components: {},
        props: {
            feedbackArray: {type: Array, default(){return []}}
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
        <div>
            
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