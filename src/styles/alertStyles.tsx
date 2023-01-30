import {alertAnatomy} from '@chakra-ui/anatomy'
import {createMultiStyleConfigHelpers} from '@chakra-ui/react'

const {definePartsStyle, defineMultiStyleConfig} =
    createMultiStyleConfigHelpers(alertAnatomy.keys)

const customError = definePartsStyle({
    container: {
        // background: 'red.200',
        rounded: 'sm',
        bgImage: "linear-gradient(rgba(254, 178, 178, 0.39),rgba(254, 178, 178, 0.39))"
        // // Let's also provide dark mode alternatives
        // _dark: {
        //     borderColor: 'gray.600',
        //     background: 'gray.800',
        // },
    },
    icon: {
        color: 'red.200',
    },
    description: {
        fontWeight: 'medium',
        color: 'gray.100',
        // _dark: {
        //     color: 'cyan.400',
        // },
    },
})

export const AlertStyle = defineMultiStyleConfig({
    variants: {custom: customError},
})