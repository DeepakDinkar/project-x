import { Course } from "./Course";

export interface VerticalCourse {
    slug: string;
    title: string;
    imageUrl: string;
    courses: Course[];
}