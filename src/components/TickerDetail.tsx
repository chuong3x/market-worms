import { Flex, Text } from "@chakra-ui/react";
import { Ticker } from "../models";

interface TickerDetailProps {
  ticker: Ticker;
}
const TickerDetail: React.FC<TickerDetailProps> = ({ ticker }) => {
  return (
    <Flex direction="column">
      <Flex h="16px">
        <Flex
          p="1"
          mr="2"
          align="center"
          justify="center"
          border="1px solid #ffffff5a"
          borderRadius="6px"
        >
          <Text fontSize="10px" fontWeight="600" color="#ffffff8a">
            {ticker.symbol.toLocaleUpperCase()}
          </Text>
        </Flex>
        <Text fontSize="10px" fontWeight="600" color="#ffffff8a">
          BINANCE
        </Text>
      </Flex>
      <Flex>
        <Flex>
          <Text
            fontSize="20px"
            fontWeight="600"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {ticker.name.toLocaleUpperCase()}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex h="full" w="136px" justify="start" align="center">
          <Text fontSize="32px" fontWeight="600" lineHeight="40px">
            {ticker.currentPrice.toLocaleString()}
          </Text>
        </Flex>
        <Flex flex="1" direction="column">
          <Text>{ticker.orderedPrice}</Text>
          <Text>{`${ticker.currentPrice - ticker.orderedPrice}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TickerDetail;
