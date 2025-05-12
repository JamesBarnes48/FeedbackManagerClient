import type { Feedback } from "../interfaces/Feedback.js";

export class PositiveFeedback implements Feedback{
    constructor(
        readonly rating: number,
        readonly expectation: string,
        readonly details: string
    ){}

    toString(){
        return `The user ${this.expectation.toLocaleLowerCase()}s that this met their expectations. They rated it ${this.rating}/5 stars and had this to say: ${this.details}`;
    }
}