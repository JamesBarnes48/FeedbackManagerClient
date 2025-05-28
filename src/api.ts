import axios from 'axios';
import { PositiveFeedback } from './classes/PositiveFeedback';
import { NegativeFeedback } from './classes/NegativeFeedback';

type expectedGetType = {id: string, isPositive: boolean, rating: number, expectation: string, details: string};
type expectedPostType = {isPositive: boolean, rating: number, expectation: string, details: string};
type expectedUser = {username: string, password: string};
const validExpectations = ['strongly disagree', 'disagree', 'neither agree nor disagree', 'agree', 'strongly agree'];

let authCache: {authenticated: boolean, username?: string} | null = null;


//if we do provide vals for most of the fields ensure they are valid
const validateFeedback = (feedback: expectedPostType) => !!((feedback.isPositive !== undefined) && (!feedback.rating || feedback.rating > 0 && feedback.rating <= 5) && (!feedback.expectation || validExpectations.includes(feedback.expectation)));
const validateUser = (user: expectedUser): {valid: boolean, error: string} => {
    if(!/^[a-zA-Z0-9_]{3,30}$/.test(user.username)) return {valid: false, error: 'Invalid username field'};
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,32}$/.test(user.password)) return {valid: false, error: 'Invalid password field'};
    return {valid: true, error: ''};
}

export default {
    //allows us to set default config for all our api requests, saves us specifying withCredentials (for sending login cookies) and our base path each time
    api: axios.create({
        baseURL: import.meta.env.MODE === 'development'? 'http://localhost:3000': 'https://dummy-prod-url',
        withCredentials: true
    }),

    async getFeedback(){
        try{
            const result = await this.api.get(`/feedback`);
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
            const result = await this.api.post(`/feedback`, {feedbackProps: input});
            return {success: true, message: result.data};
        }catch(err){
            console.error(err);
            return {success: false, message: 'Failed to add feedback'};
        }
    },

    async deleteFeedback(id: string){
        try{
            if(!id?.length || typeof id !== 'string') return {success: false, message: 'A valid id is required to delete feedback'};
            const result = await this.api.delete(`/feedback/${id}`);
            return {success: true, message: result.data};
        }catch(err){
            console.error(err);
            return {success: false, message: 'Failed to delete feedback'};
        }
    },

    async registerUser(user: {username: string, password: string}){
        try{
            const validUser = validateUser(user);
            if(!validUser.valid) return {success: false, message: validUser.error};
            const result = await this.api.post(`/auth/register`, user);
            return {success: true, message: result.data};
        }catch(err){
            console.error(err);
            return {success: false, message: 'Failed to register user'};
        }
    },

    async login(user: {username: string, password: string}){
        try{
            if(!user?.username || !user?.password) return {success: false, message: 'Username or password is empty'};
            if(!/^[a-zA-Z0-9_]{3,30}$/.test(user.username)) return {success: false, message: 'Invalid username field'};
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,32}$/.test(user.password)) return {success: false, message: 'Invalid password field'};

            const result = await this.api.post(`/auth/login`, user);
            return {success: true, message: result.data};
        }catch(err){
            console.error(err);
            return {success: false, message: 'Failed to login user'};
        }
    },

    async checkAuth(): Promise<{authenticated: boolean, username?: string}>{
        if(authCache !== null) return authCache;

        try{
            const result = await this.api.get('/auth/heartbeat') as {data: {authenticated: boolean, username?: string}};
            if(!result.data?.authenticated) throw new Error();
            authCache = result.data;
            return authCache;
        }catch(err){
            authCache = {authenticated: false};
            return authCache;
        }
    }
}