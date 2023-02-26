import { useState, useEffect } from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks";
import { accountSelector } from "../features/account.slice";
import { FuturesAccountPosition } from "../models/Account";
import PositionItem from "./PositionItem";
import { useGetTradingQuery } from "../features/trade.api";

interface PositionListProps {}

const PositionList: React.FC<PositionListProps> = () => {
    const { account, isLoading } = useAppSelector(accountSelector);
    const { data } = useGetTradingQuery();

    return (
        <Flex
            w="full"
            h="full"
            direction="column"
            justify="space-between"
            align="center"
            borderRadius="0 14px 14px 0"
            bg="whiteAlpha.900"
        >
            <Flex h="46px" w="full" align="center" justify="center">
                <Text fontSize="16px" ml="16px" fontWeight="600">
                    Positions
                </Text>
            </Flex>
            <Divider />
            <Flex
                direction="column"
                w="full"
                h="calc(100%-46px)"
                flex="1"
                overflowY="scroll"
            >
                {account.positions && account.positions.length > 0 ? (
                    account.positions.map((position) => (
                        <PositionItem
                            key={position.symbol.toString()}
                            position={position}
                            isActive={true}
                        />
                    ))
                ) : (
                    <Flex mx="auto">
                        {data?.data
                            ? "Don't have any LONG positions yet"
                            : "Please Run the bot to get the positions"}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default PositionList;
