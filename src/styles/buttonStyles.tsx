import {mode, darken, whiten, StyleFunctionProps} from "@chakra-ui/theme-tools";

export const ButtonStyles = {
    variants: {
        red: (props: StyleFunctionProps | Record<string, any>) => ({
            bg: "red.300",
            color: "gray1",
            _hover: {
                bg: mode(darken("red300", 3), whiten("red", 20))(props)
            }
        })
    }
}