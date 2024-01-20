import { Flex, Image } from "antd";
import { useEffect } from "react";
import { useBreakPoint } from "../../../hooks/useBreakPoint";
import { Vertical } from "../../../models/Vertical";
import styles from "../../../pages/home/Home.module.scss";
import { getVerticals } from "../../../services/verticalsApi";
import { LeftCurve } from "../../../utils/svgs/LeftCurve";
import { RightCurve } from "../../../utils/svgs/RightCurve";
import { useNavigate } from "react-router-dom";

function CoursesList() {
  const navigate = useNavigate();

  const courses: Vertical[] = [
    {
      title: "Technology and AI",
      description:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
      imageURL:
        "https://s3-alpha-sig.figma.com/img/70d5/28e6/8a810224ca31b17a40991db177bf1dfc?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gOnUTmG1mEtlAVhCya4oXUaFBi8eOVr5hLgVQbLu8Sbsn9uDKQ2zJYdJKEDr8HCl8wd8uVSc5kA-juZri0jeJr-Xuyz8kzDIS-3-idhqFEwiHlsefcwCwO~kBLYSAqrGCzRwgkxVFNeB4mx1G9g7f8dmQl3o5HLJv7E-zU700ww55UZC1pF3kBDStFf2~WfUARtX1Dsup-EkcJYbIA5DNvOtDHO1rHZn09xtRuMUAuk3f87pp21W-upVmY8EYrFYZOzdZ4tcDV-VqnHLX08SaxY1WECCbs6~ratAVprJ~UXEAdC6PU9KjZVZ8-9Pb~YMyxLFE7Nq8IO78Xq64is1Gg__",
      noOfCourses: 61,
    },
    {
      title: "Procurement and Contracting",
      description:
        "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      imageURL:
        "https://s3-alpha-sig.figma.com/img/b941/5962/a237174677c55d963a86f68d5a178d5f?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j~O6d1DNe0udTsSiJNy10p9bPEYpEdBCu8JWKc1mqMscecT-pDCK8Ln43M4JLecaWv3f5W3aw~3qNE7v4VlHxWAKJqQ4zRALT5Jnx3ERbS0cqnxhTbjl9ZmzHiYdJbxDRtS8-KoTjsQuc7fb9HGRdMa8Mj1LbbIAjdMgNDMmoPr0DfT-4uk3OqjubCbk7U2LudTvxYgmw5rnJuoMYvuWB0jKupkMJmg8Wa~BgtyX2uxuJbQpJIkerzRaSZ5WnHv0nb8p9zI0fh1YqfTXRyo96r4lMHQauSxGTYcQ2mo65mJHOpZ4kWZVgzY-GXRQlyunx0-Mu4FO-zou9UNbt~Ycag__",
      noOfCourses: 39,
    },
    {
      title: "Finance and Accounting",
      description:
        "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
      imageURL:
        "https://s3-alpha-sig.figma.com/img/10b8/0716/f94b85b28d569e7ec95aae3ea8767bac?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NEQMPVzslZN5S3B06xwDIEoHfXOaj~3nFXv9-PZivt2W335~Mnzflv7ITcL0Qp4EC3ViUWwRCAPfQhdZLb4qxG5WWS36yIEWDUz2LNnyH7SqKfzWzdXYHYxOradYKxMusgOGaSMjEB6dYnz6rVwDpt~IvdeQIbr6TU7lzUYaklKUKFs6BcXmwIQE7aBSVHDOnpVMF7o7otiK1eOBox7HeT64M52IHwSAtilKuqliXog7Eq0MWpgLni9RT1F8tlxZuypeSFpO0UYFDYZL7xbtSNTqcpGUeOE3XHrL7Ea3s2iVS81SdDUEAgu9JWvctsAE-QHEjAMttj5eR9~RFTTAOQ__",
      noOfCourses: 78,
    },
    {
      title: "Leadership and business management",
      description:
        "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      imageURL:
        "https://s3-alpha-sig.figma.com/img/3666/b7f7/a019f10c54b515413ce5e06b7654ff9c?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bpdsy4Vn0QcIMvDsNKHwQ743QabxiLGKPmE71Gn5Jxti5RRlRY7kTFgY3TC5lS9o2WSFDULj7NjlCkQKzrpr95vGh~oioBaM7qpvN1PQixn3GU2P2Suj00XsvT0WM-H2frxh21-oAr7fCp1ekIr2KZWTntH8aoojpwE9kMMcT9oVYB~NuMZmkXLf3gJTX56LMSQr1m0liQRXTxyxSmVWiP2y0v0Usa5teaTNy1wH2PqHO5enWLVW4qQYyfERAnZpZJ3zl40Hq~-WG43skvZak~d5iUKoIs9JdzF9d4shO0kSyyuZGS521HJqpB5h1aM7FTJCycAOPAUUErb~4tEgGg__",
      noOfCourses: 30,
    },
    {
      title: "Corporate Development",
      description:
        "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      imageURL:
        "https://s3-alpha-sig.figma.com/img/68b2/bf5d/cf8f6597a2d3d8ecde08aca46bd7302b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EJeKLaKKYLghTSWUtpajFzK9HXCKLWeaTSC5r-46alk4xq~M0AylQWbh3f-fA7vtsM4qwR8DT-Dim6qO~6jfFot5Q2WQl5TCyO5FIG1yRd6pNc84gUIVGxNSIzULyMt4O8lQnR90BCv1thu59N8fZecu4Ri2orjRUZoQM42OLxtko3tz01PW8hGxs9-tvxHCcYQQXMDOMSrgihaojX7re26HTwffpMqbqOBBtoKlXEhX9poRl05Z3mufVJPoITc5vdw6ZzBBYujNeQG950HMRsyO0F-yaMHJht6IuvIYT7DZw5WT2sgDDMTgFKsMJgkkLZTPZ0fW2M25iK9a4-LuxQ__",
      noOfCourses: 79,
    },
  ];
  const breakPoint = useBreakPoint();

  useEffect(() => {
    const getCourses = async () => {
      const coursesData = await getVerticals();
      console.log(coursesData);
    };

    getCourses();
  }, []);

  const getSmallCardHeight = (): number => {

    if(breakPoint?.xxl) {
      return 330;
    }
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
        <p className="main-header font-bold">Verticals</p>
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
          {courses?.map((course, index) => (
            <div
              className="course-card small-card"
              role="button"
              key={index}
              onClick={() => navigate("/courses")}
              onKeyDown={() => {}}
            >
              <Image
                height={getSmallCardHeight()}
                width={getSmallCardHeight()}
                src={course.imageURL}
                fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
                preview={false}
              />
              <div className="card-bottom-wrapper">
                <span className="card-bottom-title">{course.title}</span>
                <span className="font-bold font-default">
                  {course.noOfCourses} Topics
                </span>
              </div>
            </div>
          ))}
        </Flex>
      </div>
    </div>
  );
}
export default CoursesList;
