import {Box, Flex, Stack, Text} from "@chakra-ui/react";
import React from "react";
import Links from "./Links";

function Content() {
    return (
        <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
            <Flex align='center' direction='column'>
                <Text fontWeight={'bold'}>AutoTrader</Text>
            </Flex>
            <Stack direction='column' mb='auto' mt='8px'>
                <Box ps='20px' pe={{md: "16px", "2xl": "1px"}}>
                    <Links/>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Content;
