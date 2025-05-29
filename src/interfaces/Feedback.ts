export interface Feedback{
    id: string,
    rating: number,
    expectation: string,
    details: string,
    addedBy: string,
    className: string,
    toString(): string
}