import {Spinner, Box, useColorMode} from "@chakra-ui/react";

const Loading = () => {
    const {colorMode} = useColorMode();
    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={colorMode === 'light' ? 'white' : 'navy.800'}
        >
            <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.400"/>
        </Box>
    );
}

export default Loading;
