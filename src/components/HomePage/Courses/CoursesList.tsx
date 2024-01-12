import { Flex, Image } from "antd";
import styles from "../../../pages/home/Home.module.scss";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";

function CoursesList() {
  const courses = [
    "https://s3-alpha-sig.figma.com/img/352d/ab07/300606634c0ed625b34753dc13ee50ac?Expires=1702252800&Signature=CnGRAb84-u3fnzJqoY0hCzuAey1TFelCR4jbQBKQc5eBi6A3cGjhKg7fDTrN4fRfhxaBrr5gRBdzBuZscmnQj11gqwXTGR0fOZ7erPp48mtB6-HWfRaEOoJy~PfnDbIbZdrtv4nlGYXBUMCBnvRTrd4Qco8rXzSlsgVBZkqESdeiMWiW6EsdyI~w9CUe25t88oj5Kx~~cgKyQwnIfV3uX-6Ki~a~GYFdqiUDPnKU1jjcmjvrSxokInQp6wCzvC8fjXQMCsrnkLIZqWwT3EIo1rEh-3ho~g5DnQ97SExKtfQAdU8xfnLcMyflEukqgZ3FQDskgkkaycX2KTWVrCupwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3aad/9e48/d040e2bdcfd23a58b785abb88960eb10?Expires=1702252800&Signature=h-EFBEMpW0WqkT3yfiQZQbqK97~qlCV2oWt24pnm0FlUiCFnPFOszVzBIWr8dmQnWvhwjt0jv7cq5za5k4insvzEJIDfZ2akPmkr1g~ws-pp19X0NNIvhWubi4mNxOAyuA5B17hW3ViZhUc6fgL2ex8SDJFK~12YFvhD760KJtJSRkqbIb1SupG1XiHZA5GvKRNkIBlgu6Z3D~8PO8zwRhYAQMowBB5Oj62F0biWHGIqr0c~UOsNyNLFJz88O5XWR3NbtsDvN3j73~7MjTNQZGt5ycsK0JnWz3kW~aHEYY8RUxfdSvl~uCiyOvh6JRP3XURfzPP7LNPTDAoIda-KRw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/e954/683e/0689f3012a24a815bbfb9046d19eb63d?Expires=1702252800&Signature=pROpWE71ELLNXQddC7z277xXUVeLqPv9-xoBv3Qke8Vxa-QF5VICuLlgB6qPdg~WEJPkG9MRz2bT8u0AbJyLfiAWWPr4mOnSlnHE~RbwlSZRU6Yh3LVy9KBwow-tkadLtiVsM75hvGFqrb96G-58stvKnCJXSABsHEtGLSpufiGehdP6MPMmjC~w3zZGDhGaPB-gBIybTe3lWVkYTHQwMUlxOaQyKgts0f0P7Uta5k59C7D4dSEjjl0Q2puKipY7JaGF7YQMS0eW1CvySkGnvMWV-Usti6H5MUg6p4HbqN6TeWrdrND2yPqbHgwNSD-VncU-V3TsamttSIpUPa6CQg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/25c9/c478/02a01dd6debca16610951381536cad66?Expires=1702252800&Signature=HDPJ-7FbzDqkTh9IQlMkd3EBjCSmd9-agm~LC~imnCuein2OoIlS4E3QBkil~WJf0GJATaf5CFiqd1gvKRz0frQAA7hdQofmFB46d~FEN8RnTDALqXo-7HFeE7hADSJBnYVvVqYf5Xh5~jUUJTSqbhpEwHwlFcdHD0MI0XtpqA03pWvOULZodAWc9NYI7ZCfzKKHwcoq36JE-rbQJos2vccbYoaO7HD~P2ylUXB3ZGmCdLKEaPwhE~7bLGpqcF9-Yqnf-lXQVq~Ho37fFZo~VfonKOOIzk-~spbAEWCRT1ud6pzPqnWgRCNKORn~gCPc5MLLSLXnJRUf9~m5OiqxMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/79c4/671c/a04a6e923c93a2dcd4a820d30076c224?Expires=1702252800&Signature=eoaloWFlKkdMACPduRNK5LtqjlmgA3rIUkhWhw4Ur5IS4p52jNynQEopZWtr736UBavlCVhTPPGtloe7~mj-1bTjAMH3oAW4XbXn0lbWtzYmUv4Fcr-65~tNwL0adx~qgrSq2-m6sDcxHykwE7A3MH9vl3soBP4Hcg-jaSymylTDpp9UnXDvJxCZ1wyEsvJyXZnBk1wNNyqoKw5IgQEQ05Hw0rCMZaLNsXHlA8ZvhB5ekLh4oF250Xo5D9391O1Zd9sYdzWC7zyKdhaiB2LLW1Cy-ucoXsmF3MGB1DR9y4Qu4CgXPgq4jzZn2~7tyhUz9NZZsK0sUtjdjuHZPMXSZA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  ];
  const breakPoint = useBreakPoint();

  const getSmallCardHeight = (): number => {
    if (breakPoint?.xl) {
      return 300;
    }
    if (breakPoint?.lg) {
      return 270;
    }
    if (breakPoint?.md) {
      return 240;
    }
    if (breakPoint?.sm) {
      return 210;
    }
    return 130;
  };

  return (
    <div
      className={`${styles.titleWrapper} text-center`}
      style={{ paddingTop: 0 }}
    >
      <div className={styles.titleContent}>
        <LeftCurve />
        <p className="main-header font-bold">Courses</p>
        <p className={`${styles.subHeader} sub-header font-bold`}>
          Choose the latest courses offered
          <br /> curated by our professionals
        </p>
        <RightCurve />
      </div>

      <div className="w-100">
        <Flex
          gap={"2rem"}
          style={{ padding: "2.5rem 0", overflow: "auto", maxWidth: "100%" }}
        >
          {courses.map((course, index) => (
            <div className="course-card small-card" key={index}>
              <Image
                height={getSmallCardHeight()}
                width={getSmallCardHeight()}
                src={course}
                fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div className="card-bottom-wrapper">
                <span className="card-bottom-title">
                  Leadership and Business Management
                </span>
                <span className="font-bold font-default">20 Topics</span>
              </div>
            </div>
          ))}
        </Flex>
      </div>
    </div>
  );
}
export default CoursesList;
