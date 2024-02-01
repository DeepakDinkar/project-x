import { APIData } from "./APIData";
import { Course } from "./Course";
import { Vertical } from "./Vertical";

export interface GlobalSearchValue {
    courses: Course[];
    verticals: Vertical[];
}

export interface GlobalSearchData extends APIData {
    data: GlobalSearchValue;
}