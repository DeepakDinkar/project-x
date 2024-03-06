import { Course } from "../models/Course";
import { PurchaseCourse, PurchasePayload } from "../models/PurchasePayload";
import { SaveAddressForm } from "../models/SaveAddressForm";

export const mapPurchasePayLoad = (
  courses: Course[],
  address: SaveAddressForm | undefined,
  saveAddres: boolean
): PurchasePayload => {
  const payload = new PurchasePayload();
  payload.address = address;
  payload.saveAddress = saveAddres;
  payload.courses = [];

  const getLocation = (course: Course) => {
    if (course.location) {
      return course.location[course?.locationIndex ?? -1] ?? null;
    }
    return null;
  };

  courses.forEach((course) => {
    const purchaseCourse = new PurchaseCourse();

    purchaseCourse.courseId = course.id;
    purchaseCourse.location = getLocation(course)?.locationName ?? "Virtual";
    purchaseCourse.courseDate = getLocation(course)?.date;
    purchaseCourse.courseAmt = course.courseAmt ?? 0;
    purchaseCourse.transactionId = "transactionid";
    purchaseCourse.slug = course.slug;
    purchaseCourse.imageUrl = course.imageUrl ?? "";

    payload.courses.push(purchaseCourse);
  });

  return payload;
};
