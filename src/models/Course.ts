
export interface Course {
    id: number;
    slug: string;
    imageUrl: string;
    campaignTemplateRating: number;
    campaignTemplateCourseName: string;
    courseContent: string;
    keyTakeAway: Array<string>;
}