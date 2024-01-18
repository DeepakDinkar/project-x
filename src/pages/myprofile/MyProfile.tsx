import { Divider, Flex, Image } from "antd";
import styles from "./MyProfile.module.scss";
import { useBreakPoint } from "../../hooks/useBreakPoint";
import GridCard from "../../components/GridCard/GridCard";

export default function MyProfile() {
  const breakPoints = useBreakPoint();

  return (
    <div className={styles.myprofileWrapper}>
      <div className="w-100">
        <Flex vertical style={{ alignItems: "center" }} gap={"4.5rem"}>
          <div className="main-header font-bold font-ubuntu">My Purchases</div>
          <Flex vertical gap={"1.5rem"}>
            <Flex gap={"1.5rem"}>
              <Image
                style={{ borderRadius: "10px" }}
                width={breakPoints?.md ? 132 : 64}
                height={breakPoints?.md ? 132 : 64}
                preview={false}
                src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
              />
              <Flex
                vertical
                style={{ flex: 1, justifyContent: "space-evenly" }}
              >
                <div className="font-sm text-uppercase">
                  leadership and business management
                </div>
                <div className="font-default font-bold">
                  International Leadership
                </div>
                <div>
                  <span className="font-sm" style={{ paddingRight: "10px" }}>
                    Qty: 10
                  </span>
                  <span className="font-sm">Price: $400</span>
                </div>
                <div className="font-sm">Dubai, UAE | Oct 7, 2023</div>
              </Flex>
            </Flex>
            <Flex gap={"1.5rem"}>
              <Image
                style={{ borderRadius: "10px" }}
                width={breakPoints?.md ? 132 : 64}
                height={breakPoints?.md ? 132 : 64}
                preview={false}
                src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
              />
              <Flex
                vertical
                style={{ flex: 1, justifyContent: "space-evenly" }}
              >
                <div className="font-sm text-uppercase">
                  leadership and business management
                </div>
                <div className="font-default font-bold">
                  International Leadership
                </div>
                <div>
                  <span className="font-sm" style={{ paddingRight: "10px" }}>
                    Qty: 10
                  </span>
                  <span className="font-sm">Price: $400</span>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Divider className={styles.divider} />
        <div className="common-header font-bold">Trending Topics</div>
        <GridCard />
      </div>
    </div>
  );
}
