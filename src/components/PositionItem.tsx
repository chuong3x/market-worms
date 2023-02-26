import { useEffect, useRef, useMemo } from "react";
import { Flex, Icon, Tag, Text } from "@chakra-ui/react";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { FuturesAccountPosition } from "../models";
import { useGetSymbolsQuery } from "../features/symbol.api";
import { JsonValue } from "react-use-websocket/dist/lib/types";

interface PositionItemProps {
  isActive: boolean;
  position: FuturesAccountPosition;
}

const PositionItem: React.FC<PositionItemProps> = ({ isActive, position }) => {
  const { data } = useGetSymbolsQuery();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `wss://stream.binance.com:9443/stream`
  );
  const markPrice = useMemo(() => {
    return JSON.parse(String(lastJsonMessage as unknown)).p;
  }, [lastJsonMessage]);
  const index = useMemo(() => {
    return data?.data.findIndex(
      (symbol) => symbol.toLowerCase() === position.symbol.toLowerCase()
    );
  }, [position, data]);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  useEffect(() => {
    const param = [`${position.symbol.toLowerCase()}@ticker`] as unknown;
    sendJsonMessage({
      method: "SUBSCRIBE",
      params: param as JsonValue,
      id: index,
    });

    return () => {
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: param as JsonValue,
        id: index,
      });
    };
  }, [position]);
  return (
    <Flex
      pos="relative"
      h="59px"
      w="full"
      bg={isActive ? "rgba(10, 150, 255, 0.1)" : "transparent"}
      borderBottom="1px solid #ffffff1a"
      _before={{
        content: '""',
        display: `${isActive ? "block" : "none"}`,
        position: "absolute",
        left: 0,
        bg: "#006CBE",
        w: "4px",
        h: "full",
      }}
    >
      <Flex w="full" h="full" px="2" py="1" direction="column">
        <Flex justify="space-between">
          <Text>{position.symbol}</Text>
          <Flex>
            <Text>Position</Text>
            <Tag size="sm" variant="solid" colorScheme="red" ml="2">
              {Number(position.positionAmt) > 0 ? "Long" : "Short"}
            </Tag>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Text>{}</Text>
          <Flex>
            <Text>{markPrice ? markPrice : ""}</Text>
            <Flex color={"upcolor.900"}>
              <Icon w="5" h="5" as={RxTriangleUp} />
              <Text>
                {`${
                  (Number(position.unrealizedProfit) * 100) /
                  Number(position.initialMargin)
                }`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PositionItem;
