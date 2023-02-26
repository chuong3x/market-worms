import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import { useAppDispatch } from "../app/hooks";
import { initActions } from "../features/init.slice";

import Main from "../components/Main";

const Trade = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const controller = new AbortController();
        dispatch(initActions.startConnecting());
        return () => controller.abort();
    }, []);
    return (
        <Flex direction="column" w="full" h="full">
            <Main />
        </Flex>
    );
};

export default Trade;
