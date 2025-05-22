import axios from 'axios';
import { PositiveFeedback } from './classes/PositiveFeedback';
import { NegativeFeedback } from './classes/NegativeFeedback';

type expectedGetType = {id: string, isPositive: boolean, rating: number, expectation: string, details: string};
type expectedPostType = {isPositive: boolean, rating: number, expectation: string, details: string};
const validExpectations = ['strongly disagree', 'disagree', 'neither agree nor disagree', 'agree', 'strongly agree'];

//if we do provide vals for most of the fields ensure they are valid
const validateFeedback = (feedback: expectedPostType) => !!((feedback.isPositive !== undefined) && (!feedback.rating || feedback.rating > 0 && feedback.rating <= 5) && (!feedback.expectation || validExpectations.includes(feedback.expectation)));

export default {
    apiUrl: import.meta.env.MODE === 'development'? 'http://localhost:3000': 'https://dummy-prod-url',

    async getFeedback(){
        try{
            const result = await axios.get(`${this.apiUrl}/feedback`);
            return {success: true, data: (<expectedGetType[]>result.data?.feedbacks || [])
                .map((f) => 
                    f.isPositive
                    ? new PositiveFeedback(f.id, f.rating, f.expectation, f.details)
                    : new NegativeFeedback(f.id, f.rating, f.expectation, f.details)
                ) || []};
        }catch(err){
            console.error(err);
            return {success: false, error: 'Failed to fetch feedback'};
        }
    },

    async addNewFeedback(input: expectedPostType){
        try{
            if(!validateFeedback(input)) return {success: false, message: 'Failed to add feedback due to invalid input'};
            const result = await axios.post(`${this.apiUrl}/feedback`, {feedbackProps: input});
            return {success: true, message: result.data};
        }catch(err){
            console.error(err);
            return {success: false, message: 'Failed to add feedback'};
        }
    },

    async deleteFeedback(id: string){
        try{
            if(!id?.length || typeof id !== 'string') return {success: false, message: 'A valid id is required to delete feedback'};
            const result = await axios.delete(`${this.apiUrl}/feedback/${id}`);
            return {success: true, message: result.data};
        }catch(err){
            console.error(err);
            return {success: false, message: 'Failed to delete feedback'};
        }
    }
}