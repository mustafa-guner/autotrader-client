import {useNavigate} from "react-router-dom";
import {Box, Button, useColorMode} from "@chakra-ui/react";

import NotFoundImageDark from "../../../../../assets/img/errors/404-error-dark.png";
import NotFoundImageLight from "../../../../../assets/img/errors/404-error-dark.png";

function NotFoundPage() {
    const navigate = useNavigate();
    const {colorMode} = useColorMode();

    const handleGoBack = () => {
        navigate(-1); //means go back to previous page stack
    }

    return (
        <Box
            width="100vw"
            backgroundColor={colorMode === 'light' ? '#dfe7f5' : 'navy.900'}
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            {<img src={colorMode === 'light' ? NotFoundImageLight : NotFoundImageDark} alt="404 Not Found"/>}
            <Button onClick={handleGoBack}>
                Go Back
            </Button>
        </Box>
    )
}

export default NotFoundPage;