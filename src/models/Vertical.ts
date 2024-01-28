import { APIData } from "./APIData";

export interface Vertical {
    id: number;
    slug: string;
    title: string;
    imageUrl: string;
    noOfCourses: number;
}

export interface VerticalData extends APIData {
    data: Vertical[];
}