import { Course } from "../models/Course";
import { PurchasePayload } from "../models/PurchasePayload";

export const mapPurchasePayLoad = (courses: Course[]): PurchasePayload[] => {
  const purchases: PurchasePayload[] = [];

  const getLocation = (course: Course) => {
    if (course.location) {
      return course.location[course?.locationIndex ?? -1] ?? null;
    }
    return null;
  };

  courses.forEach((course) => {
    const payload = new PurchasePayload();

    payload.courseId = course.id;
    payload.location = getLocation(course)?.locationName ?? 'Virtual';
    payload.courseDate = getLocation(course)?.date;
    payload.courseAmt = course.price ?? 0;
    payload.transactionId = "transactionid";
    payload.slug = course.slug;

    purchases.push(payload);
  });

  return purchases;
};
