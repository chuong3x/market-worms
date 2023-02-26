import React, { useEffect } from "react";
import { Button, Divider, Flex, HStack, VStack } from "@chakra-ui/react";

import PositionList from "./PositionList";
import {
    useGetTradingQuery,
    useTradeMutation,
    useStopTradeMutation,
} from "../features/trade.api";
import FakeControl from "./FakeControl";
import Setting from "./Setting";

interface TradeContentProps {}
const TradeContent: React.FC<TradeContentProps> = () => {
    const { data } = useGetTradingQuery();
    const [trade, tradeResult] = useTradeMutation();
    const [stopTrade, stopTradeResult] = useStopTradeMutation();

    const handleClickTrade = (event: React.MouseEvent) => {
        event.preventDefault();
        trade();
    };
    const handleClickStop = (event: React.MouseEvent) => {
        event.preventDefault();
        stopTrade();
    };
    return (
        <HStack
            h="full"
            w={{ md: "900px", lg: "1200px" }}
            m="-6"
            spacing="0"
            borderRadius="14px"
            boxShadow="md"
            backdropBlur="md"
            bg="blackAlpha.600"
        >
            <VStack w="260px" h="full" my="-6" justify="space-between">
                <Flex h="32px" w="full" px="4">
                    <FakeControl />
                </Flex>
                <Flex flex="1" w="full">
                    <Setting />
                </Flex>
                <Divider />
                <Flex h="48px" w="full" align="center" justify="center">
                    <Button
                        variant="outline"
                        colorScheme="teal"
                        size="sm"
                        maxW="100px"
                        mx="2"
                        isActive={true}
                        isLoading={data?.data}
                        loadingText="Running"
                        disabled={data?.data}
                        onClick={handleClickTrade}
                    >
                        Run
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme="orange"
                        size="sm"
                        maxW="100px"
                        mx="2"
                        isActive={true}
                        loadingText="Trading"
                        disabled={!data?.data}
                        onClick={handleClickStop}
                    >
                        Stop
                    </Button>
                </Flex>
            </VStack>
            <Flex flex="1" h="full" my="-6">
                <PositionList />
            </Flex>
        </HStack>
    );
};

export default TradeContent;
