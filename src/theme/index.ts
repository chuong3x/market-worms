import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
const colors = {
    brand: {
        900: "#00ff1e",
        800: "#00e51b",
        700: "#00cc18",
        600: "#00b215",
        500: "#009912",
        400: "#007f07",
    },
    upcolor: {
        900: "#3AF277",
    },
    downcolor: {
        900: "#FF6341",
    },
    background: {
        primary: "#b3edc6",
        secondary: "#00ff1e",
    },
};
const styles = {
    global: {
        "*::-webkit-scrollbar": {
            display: "none",
        },
        "html, body": {
            overflow: "hidden",
            color: "red.300",
            lineHeight: "tall",
        },
        a: {
            color: "teal.500",
        },
    },
};
const components = {
    Button: {
        sizes: {
            sm: {
                h: "32px",
                px: "20px",
                borderRadius: "32px",
            },
            macos: {
                borderRadius: "50%",
                w: "20px",
                h: "20px",
                p: "0",
                m: "0",
            },
        },
        variants: {
            // solid: (props: StyleFunctionProps) => ({
            //     // bg: props.colorMode === "dark" ? "green.300" : "green.400",
            // }),
        },
    },
    NumberInput: {
        sizes: {
            macos: {
                h: "14px",
                w: "14px",
            },
        },
    },
};
const theme = extendTheme({ colors, styles, components });

export default theme;
