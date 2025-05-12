<script lang="ts">
    import {ref} from 'vue';

    export default {
        name: 'FeedbackInput',
        components: {},
        props: {},
        setup(props) {
            let enjoymentInput = ref(true),
            expectationInput = ref(2),
            detailsInput = ref('');

            const submitFeedback = (feedbackData: [boolean, number, string]) => {
                console.info(feedbackData);
            };

            return {
                enjoymentInput,
                expectationInput,
                detailsInput,
                submitFeedback
            }
        }
    }
</script>

<template>
    <div class="form-container">
        <div class="input-row">
            <label>Did you enjoy the product?</label>
            <select v-model="enjoymentInput">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
            </select>
        </div>
        <div class="input-row">
            <label>Would you agree that this product met your expectations?</label>
            <select v-model.number="expectationInput">
                <option value="0">Strongly disagree</option>
                <option value="1">Disagree</option>
                <option value="2">Neutral</option>
                <option value="3">Agree</option>
                <option value="4">Strongly agree</option>
            </select>
        </div>
        <div class="input-row">
            <label>Please elaborate in more detail:</label>
            <input v-model="detailsInput" type="text" />
        </div>
        <span class="submit-button" @click="submitFeedback([enjoymentInput, expectationInput, detailsInput])">Submit</span>
    </div>
</template>

<style scoped>
.form-container {
    border: 1px solid black;
    width: 100%;
    padding: 10px 15px;
}

.input-row {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 10px 0;
}

.submit-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50; /* Green */
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:active {
  background-color: #3e8e41;
}
</style>