import { Badge, Button, Drawer, Flex, Image } from "antd";
import { Dustbin } from "../../../utils/svgs/Dustbin";

type Props = {
  isDrawerVisible: boolean;
  closeDrawer: () => void;
};

export default function CartDrawer({ isDrawerVisible, closeDrawer }: Props) {
  const getCartCount = (): number => {
    return 5;
  };

  return (
    <Drawer
      size="default"
      className="cart-drawer"
      placement="right"
      closable={true}
      onClose={() => closeDrawer()}
      open={isDrawerVisible}
      style={{ zIndex: 99999 }}
      title={
        <>
          <span className="font-roboto-slab font-bold sub-header">
            Add to Cart
          </span>
          <Badge count={getCartCount()} offset={[10, -10]} />
        </>
      }
    >
      <div>
        <Flex vertical gap={"2.5rem"}>
          <Flex gap={"1.5rem"}>
            <Image
              style={{ borderRadius: "10px" }}
              width={64}
              height={64}
              preview={false}
              src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
            />
            <Flex vertical style={{ flex: 1, justifyContent: "space-evenly" }}>
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
            <Dustbin />
          </Flex>
          <Flex gap={"1.5rem"}>
            <Image
              style={{ borderRadius: "10px" }}
              width={64}
              height={64}
              preview={false}
              src="https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GVbJStIOTTtQg6q4GqdJUWaqMNoEUpDqRn0MWPBMIF6rWWZYNlZEr20zcQK6NfVZsTrb-lJTwxouHUtVNtMjDQ6zjXposIB71hSlpOMuQL0aaQ6j0k4sKbgbFeMT-Z04FqShggkzZ9Tx8AENUO3hdeVFANeM-lH0shU3gOPhf4IksgWFTpvsf9FvbQDFB9mMeCpCV22fNn9QPwGVUwaGHychqN5x9W5QRSAlwBzULMfuivyK6dfJzU9TvAxBxQpj27Ks6Qb8I8VdjOfrzma7XDQLaEPZqVRxgKzzl3bxAWWyKsluiOifUQtiy5~Vzwh~vaCpEf6SGR86JIW-A1CG1Q__"
            />
            <Flex vertical style={{ flex: 1, justifyContent: "space-evenly" }}>
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
            <Dustbin />
          </Flex>
          <Button
            type="primary"
            className="font-default font-bold text-uppercase"
            style={{ alignSelf: "self-end", width: "fit-content" }}
          >
            Checkout
          </Button>
        </Flex>
      </div>
    </Drawer>
  );
}
