import type { Feedback } from "../interfaces/Feedback.js";

export class PositiveFeedback implements Feedback{
    constructor(
        readonly id: string,
        readonly rating: number,
        readonly expectation: string,
        readonly details: string,
        readonly addedBy: string,
        public className: string = 'positive'
    ){}

    toString(): string{
        return `The user enjoyed the product. They ${this.expectation.toLocaleLowerCase()} that it met their expectations. They rated it ${this.rating}/5 stars and had this to say: ${this.details}`;
    }
}