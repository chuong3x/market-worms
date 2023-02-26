import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { Box, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";

import { useAppDispatch } from "../app/hooks";
import { loginAsync } from "../features/auth.slice";

export interface LoginPayload {
    username: string;
    password: string;
}

const SigninSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "Username too short")
        .max(30, "Username too long"),
    password: Yup.string()
        .min(6, "Password length at least 6 characters")
        .max(30, "Maximum password length is 30 characters"),
});

interface LoginFormProps {
    isLogging: boolean;
}
const LoginForm: React.FC<LoginFormProps> = ({ isLogging }) => {
    const dispatch = useAppDispatch();
    return (
        <Flex
            w="360px"
            h="450px"
            p="6"
            direction="column"
            justify="center"
            align="center"
            border="1px solid #ffffff52"
            borderRadius="16px"
            boxShadow="md"
            backdropBlur="md"
            bg="blackAlpha.100"
        >
            <Flex
                w="full"
                h="fit-content"
                mb="4"
                direction="column"
                align="center"
                justify="center"
                color="green.400"
            >
                <Text fontSize="5xl">Marketworms</Text>
                <Text fontSize="xl">Trade to fly</Text>
            </Flex>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={SigninSchema}
                onSubmit={(values) => {
                    dispatch(loginAsync(values));
                }}
            >
                {(props: FormikProps<LoginPayload>) => (
                    <Form style={{ width: "100%" }}>
                        <Flex direction="column" color="red.300" mb="4">
                            <Text>Username</Text>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={props.values.username}
                                onChange={props.handleChange}
                            />
                            {props.errors.username && props.touched.username ? (
                                <Text
                                    h="2"
                                    fontSize="12px"
                                    ml="4"
                                    color="yellow.600"
                                >
                                    {props.errors.username}
                                </Text>
                            ) : (
                                <Box h="2"></Box>
                            )}
                        </Flex>
                        <Flex direction="column" color="red.300" mb="6">
                            <Text>Password</Text>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={props.values.password}
                                onChange={props.handleChange}
                            />
                            {props.errors.password && props.touched.password ? (
                                <Text
                                    h="2"
                                    fontSize="12px"
                                    ml="4"
                                    color="yellow.600"
                                >
                                    {props.errors.password}
                                </Text>
                            ) : (
                                <Box h="2"></Box>
                            )}
                        </Flex>
                        <Divider my="4" />
                        <Button
                            type="submit"
                            colorScheme="whatsapp"
                            size="sm"
                            variant="outline"
                            disabled={isLogging}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Flex>
    );
};

export default LoginForm;
