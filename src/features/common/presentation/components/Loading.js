import { Spinner, Box } from "@chakra-ui/react";

const Loading = () => (
    <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(255, 255, 255, 0.7)" // Semi-transparent overlay
        zIndex="1000" // Ensure it's above other content
        backdropFilter="blur(4px)" // Optional: adds blur effect to background
    >
        <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.400" />
    </Box>
);

export default Loading;
