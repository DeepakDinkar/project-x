import { Flex, Result } from "antd";
import ExceptionProps from "../../models/ExceptionProps";

export default function Exception({
  status,
  subTitle,
  className,
}: Readonly<ExceptionProps>) {
  return (
    <Flex justify="center" className={className}>
      <Result status={status} subTitle={subTitle} />
    </Flex>
  );
}
