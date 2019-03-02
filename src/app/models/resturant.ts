export class ResturantClass {
    public name: string;
    public city: string;
    public cuisineStyle: Array<string> = [];
    public ranking: number;
    public rating: number;
    public noOfReviews: number;
}

export class ResturantFilterClass {
    public allState: Array<string> = [];
    public allNames: Array<string> = [];
    public allCusines: Array<string> = [];
}