import axios from 'axios';
import { PositiveFeedback } from './classes/PositiveFeedback';
import { NegativeFeedback } from './classes/NegativeFeedback';

export type expectedApiType = {id: string, isPositive: boolean, rating: number, expectation: string, details: string};

export default {
    apiUrl: import.meta.env.MODE === 'development'? 'http://localhost:3000': 'https://dummy-prod-url',

    async getFeedback() {
        try{
            const result = await axios.get(`${this.apiUrl}/feedback`);
            return {success: true, data: (<expectedApiType[]>result.data?.feedbacks || [])
                .map((f) => 
                    f.isPositive
                    ? new PositiveFeedback(f.rating, f.expectation, f.details)
                    : new NegativeFeedback(f.rating, f.expectation, f.details)
                ) || []};
        }catch(err){
            console.error(err);
            return {success: false, error: 'Failed to fetch feedback'};
        }
    }
}