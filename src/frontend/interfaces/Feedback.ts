export interface Feedback{
    rating: number
    expectation: string,
    details: string,
    className: string,
    toString(): string
}