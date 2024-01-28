import { Flex, Result } from "antd";
import ExceptionProps from "../../models/ExceptionProps";

export default function Exception({ status, subTitle }: Readonly<ExceptionProps>) {
  return (
    <Flex justify="center">
      <Result status={status} subTitle={subTitle} />
    </Flex>
  );
}
