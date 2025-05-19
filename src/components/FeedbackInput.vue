<script lang="ts">
    import {ref} from 'vue';
    import api from '../api';

    export default {
        name: 'FeedbackInput',
        components: {},
        props: {},
        setup(props, {emit}) {
            let enjoymentInput = ref(true),
            ratingInput = ref(3),
            expectationInput = ref('agree'),
            detailsInput = ref('');

            const resetFields = () => {
                enjoymentInput.value = true;
                ratingInput.value = 3;
                expectationInput.value = 'agree';
                detailsInput.value = '';
            }

            const submitFeedback = async () => {
                const apiResult = await api.addNewFeedback({isPositive: enjoymentInput.value, rating: ratingInput.value, expectation: expectationInput.value, details: detailsInput.value});
                console.info(apiResult);
                //emit('submitFeedback', data);
                resetFields();
            };

            return {
                enjoymentInput,
                ratingInput,
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
            <label>What would you rate the product out of 5 stars?</label>
            <select v-model.number="ratingInput">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div class="input-row">
            <label>Would you agree that the product meets your expectations?</label>
            <select v-model="expectationInput">
                <option value="strongly disagree">Strongly disagree</option>
                <option value="disagree">Disagree</option>
                <option value="neither agree nor disagree">Neither agree nor disagree</option>
                <option value="agree">Agree</option>
                <option value="strongly agree">Strongly agree</option>
            </select>
        </div>
        <div class="input-row">
            <label>Please elaborate in more detail:</label>
            <input v-model="detailsInput" type="text" />
        </div>
        <span class="submit-button" @click="submitFeedback">Submit</span>
    </div>
</template>

<style scoped>
.form-container {
    border: 1px solid black;
    width: 70%;
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