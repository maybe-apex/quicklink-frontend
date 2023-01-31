import React from 'react';
import {Box, Input} from "@chakra-ui/react";

function Index() {
    return (
        <div className={"bg-gray-800 w-screen h-screen flex justify-center"}>
            <div className={"mt-72 "}>
                <Box>
                    <Input colorScheme={"whiteAlpha"}
                           placeholder={"tests"}
                           _placeholder={{fontSize: '18px'}}
                           variant={'filled'}
                           focusBorderColor={"red.500"}/>
                    <Input/>
                </Box>
            </div>
        </div>
    );
}

export default Index;