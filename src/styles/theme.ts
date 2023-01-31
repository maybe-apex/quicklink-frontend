import {extendTheme, type ThemeConfig} from "@chakra-ui/react";
import {ButtonStyles as Button} from "./buttonStyles"
import {AlertStyle as Alert} from "@/styles/alertStyles";

const _config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false
}
import {inputAnatomy} from '@chakra-ui/anatomy'
import {createMultiStyleConfigHelpers, defineStyle} from '@chakra-ui/react'

const {definePartsStyle, defineMultiStyleConfig} =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const pill = definePartsStyle({
    field: {
        border: '3px solid',
        borderColor: 'black',
        background: 'gray.50',
        borderRadius: 'full',

        // Let's also provide dark mode alternatives
        _dark: {
            border: '4px solid',
            borderColor: 'white',
            background: 'red',
        },
    },
    addon: {
        border: '1px solid',
        borderColor: 'gray.200',
        background: 'gray.200',
        borderRadius: 'full',
        color: 'gray.500',

        _dark: {
            borderColor: 'gray.600',
            background: 'gray.600',
            color: 'gray.400',
        },
    },
})

const inputTheme = defineMultiStyleConfig({
    variants: {pill},
})
export const customTheme = extendTheme({
        config: _config,
        colors: {
            red200: "#FEB2B2",
            red300: "#FC8181",
            gray1: "#1A202C"
        },
        components: {
            Button,
            Alert,
            inputTheme
        }
    }
)
