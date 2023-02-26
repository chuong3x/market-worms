import { useState, useEffect } from "react";
import { Flex, Tag, Text } from "@chakra-ui/react";

import { TestingResultItem } from "../models";
import { DateTime } from "luxon";

interface ResultITemProps {
  result: TestingResultItem;
}
const ResultITem: React.FC<ResultITemProps> = ({ result }) => {
  const [isWin, setIsWin] = useState(false);
  const [gain, setGain] = useState(0);
  const fee = 0.04 / 100;

  useEffect(() => {
    if (result.side === "L") {
      result.closePrice - result.openPrice >
      result.closePrice * fee + result.openPrice * fee
        ? setIsWin(true)
        : setIsWin(false);

      setGain(
        result.closePrice -
          result.openPrice -
          (result.closePrice * fee + result.openPrice * fee)
      );
    } else {
      result.openPrice - result.closePrice >
      result.closePrice * fee + result.openPrice * fee
        ? setIsWin(true)
        : setIsWin(false);
      setGain(
        result.openPrice -
          result.closePrice -
          (result.closePrice * fee + result.openPrice * fee)
      );
    }
  }, [result]);

  return (
    <Flex
      w="full"
      h="10"
      p="2"
      flexWrap="wrap"
      direction="column"
      justify="space-between"
      align="center"
      borderTop={"1px solid rgba(255,255,255,0.1)"}
    >
      <Flex fontSize={"12px"} justify="space-between" flex="1">
        <Text mx="2">{`Position: ${result.side}`}</Text>
        <Text mx="2">{`Open: ${result.openPrice.toString()}`}</Text>
        <Text mx="2">{`At: ${result.openTime}`}</Text>
        <Text mx="2">{`Close: ${result.closePrice.toString()}`}</Text>
        <Text mx="2">{`At: ${result.closeTime}`}</Text>
      </Flex>
      <Flex fontSize={"12px"} justify="space-between" flex="1">
        <Flex>
          <Text mx="2">Status</Text>
          <Tag
            size="sm"
            variant="solid"
            colorScheme={isWin ? "green" : "red"}
            ml="2"
          >
            {isWin ? "Win" : "Loss"}
          </Tag>
        </Flex>

        <Text mx="4">{`Gain: ${gain.toFixed(6).toString()}`}</Text>
      </Flex>
    </Flex>
  );
};

export default ResultITem;
