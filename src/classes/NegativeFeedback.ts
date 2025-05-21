import type { Feedback } from "../interfaces/Feedback.js";

export class NegativeFeedback implements Feedback{
    constructor(
        readonly id: string,
        readonly rating: number,
        readonly expectation: string,
        readonly details: string,
        public className: string = 'negative'
    ){}

    toString(): string{
        return `The user did not enjoy the product. They ${this.expectation.toLocaleLowerCase()} that it met their expectations. They rated it ${this.rating}/5 stars and had this to say: ${this.details}`;
    }
}