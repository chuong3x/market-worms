import { Flex } from "@chakra-ui/react";

import TradeContent from "./TradeContent";

const Main = () => {
    return (
        <Flex
            flex="1"
            w="full"
            p="6"
            bg="transparent"
            justify="center"
            align="center"
        >
            <TradeContent />
        </Flex>
    );
};

export default Main;
