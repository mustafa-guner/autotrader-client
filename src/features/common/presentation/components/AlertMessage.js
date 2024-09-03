import {Alert, AlertDescription, AlertIcon, AlertTitle, useColorModeValue} from "@chakra-ui/react";
import React from "react";

function AlertMessage(props) {
    const textColor = useColorModeValue("navy.700", "white");

    const {title, message, status} = props;
    return (
        <Alert status={status} borderRadius='10px' mb='24px'>
            <AlertIcon/>
            <AlertTitle mr={2} color={textColor} fontSize='sm' fontWeight='900'>
                {title}
            </AlertTitle>
            <AlertDescription color={textColor} fontSize='sm'>
                {message}
            </AlertDescription>
        </Alert>
    );
}

export default AlertMessage;