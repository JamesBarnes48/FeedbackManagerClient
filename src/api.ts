import axios from 'axios';
import { PositiveFeedback } from './classes/PositiveFeedback';
import { NegativeFeedback } from './classes/NegativeFeedback';

export type expectedGetType = {id: string, isPositive: boolean, rating: number, expectation: string, details: string};
export type expectedPostType = {isPositive: boolean, rating: number, expectation: string, details: string};

export default {
    apiUrl: import.meta.env.MODE === 'development'? 'http://localhost:3000': 'https://dummy-prod-url',

    async getFeedback(){
        try{
            const result = await axios.get(`${this.apiUrl}/feedback`);
            return {success: true, data: (<expectedGetType[]>result.data?.feedbacks || [])
                .map((f) => 
                    f.isPositive
                    ? new PositiveFeedback(f.rating, f.expectation, f.details)
                    : new NegativeFeedback(f.rating, f.expectation, f.details)
                ) || []};
        }catch(err){
            console.error(err);
            return {success: false, error: 'Failed to fetch feedback'};
        }
    },

    async addNewFeedback(input: expectedPostType){
        try{
            const result = await axios.post(`${this.apiUrl}/feedback`, input);
            return {success: true, message: result.data};
        }catch(err: {message: string}){
            console.error(err);
            return {success: false, message: err.message};
        }
    }
}