export interface Feedback{
    id: string,
    rating: number,
    expectation: string,
    details: string,
    className: string,
    toString(): string
}