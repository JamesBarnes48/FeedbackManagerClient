<script lang="ts">
    export default {
        name: 'FeedbackInput',
        components: {},
        props: {},
        setup(props) {
            return {}
        }
    }
</script>

<template>
    <div class="form-container">
        <div class="input-row">
            <label>Did you enjoy the product?</label>
            <select v-model="enteredEnjoyment">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        <div class="input-row">
            <label>Would you agree that this product met your expectations?</label>
            <select v-model="enteredExpectation">
                <option value="0">Strongly disagree</option>
                <option value="1">Disagree</option>
                <option value="2">Neutral</option>
                <option value="3">Agree</option>
                <option value="4">Strongly agree</option>
            </select>
        </div>
        <div class="over-under-input-row">
            <label>Please elaborate in more detail:</label>
            <textarea v-model="enteredOpinion" type="text" />
        </div>
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

.over-under-input-row {
    display: grid;
    height: 150px;
    grid-template-rows: 20% 80%;
}
</style>