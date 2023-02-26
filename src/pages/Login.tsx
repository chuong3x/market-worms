import { useEffect } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

import LoginForm from "../components/LoginForm";
import { authSelector } from "../features/auth.slice";

const Login = () => {
    const { isLogging, isLogged, message } = useAppSelector(authSelector);
    const toast = useToast();

    useEffect(() => {
        if (message) {
            toast({ title: message, isClosable: true, duration: 2000 });
        }
    }, [message]);
    return isLogged ? (
        <Navigate to="/trade" />
    ) : (
        <Flex
            w="full"
            h="full"
            direction="column"
            justify="center"
            align="center"
        >
            <LoginForm isLogging={isLogging} />
        </Flex>
    );
};

export default Login;
