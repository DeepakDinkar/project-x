/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Course {
    id: number;
    slug: string;
    imageUrl: string;
    campaignTemplateRating: number;
    campaignTemplateCourseName: string;
    courseContent: string;
    keyTakeAway: Array<string>;
    courseAddedDate: string;
    isTrending?: boolean;
    locationIndex?: number;
    location?: Array<any>;
    price: number;
}