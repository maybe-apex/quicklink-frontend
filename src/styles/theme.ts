import {extendTheme} from "@chakra-ui/react";
import {ButtonStyles as Button} from "./buttonStyles"
import {AlertStyle as Alert} from "@/styles/alertStyles";

export const customTheme = extendTheme({
        colors: {
            red200: "#FEB2B2",
            red300: "#FC8181",
            gray1: "#1A202C"
        },
        components: {
            Button,
            Alert
        }
    }
)