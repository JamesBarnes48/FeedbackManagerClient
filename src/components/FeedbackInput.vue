<script lang="ts">
    import {ref} from 'vue';
    import api from '../api';

    export default {
        name: 'FeedbackInput',
        components: {},
        props: {},
        setup(props, {emit}) {
            let enjoymentInput = ref(true),
            ratingInput = ref(0),
            expectationInput = ref(''),
            detailsInput = ref('');

            const resetFields = () => {
                enjoymentInput.value = true;
                ratingInput.value = 0;
                expectationInput.value = '';
                detailsInput.value = '';
            }

            const validateFeedback = () => {
                //validation here: for inputs that might not be optional!
                //currently we leverage the flexibility of mongodb documents by letting people choose which fields they fill out - only mandatory one is enjoyment
                return false;
            }

            const submitFeedback = async () => {
                const validationResult = validateFeedback();
                if(validationResult){
                    emit('error', validationResult);
                    return;
                }
                const apiResult = await api.addNewFeedback({isPositive: enjoymentInput.value, rating: ratingInput.value, expectation: expectationInput.value, details: detailsInput.value});
                if(apiResult.success){
                    emit('reload');
                    resetFields();
                }
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
                <option value="0">Select one:</option>
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
                <option value="">Select one:</option>
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
        <span class="button submit-button" @click="submitFeedback">Submit</span>
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
</style>