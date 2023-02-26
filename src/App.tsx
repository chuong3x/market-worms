import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Page from "./components/Page";

import routes from "./routers";
import RouteProtector from "./routers/PrivateRoute";

function App() {
    return (
        <Flex direction={"column"} h="100vh" w="100vw" bg="background.primary">
            <Routes>
                {routes.map((route) => {
                    const { path, title, isPrivate } = route;
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                isPrivate ? (
                                    <Page title={title}>
                                        <route.element />
                                    </Page>
                                ) : (
                                    // <RouteProtector>
                                    // </RouteProtector>
                                    <Page title={title}>
                                        <route.element />
                                    </Page>
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </Flex>
    );
}

export default App;
