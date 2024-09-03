import {Flex} from "@chakra-ui/react";
import React from "react";
import ThemeButton from "../../../common/presentation/components/ThemeButton";

function AuthLayout(props) {
    const {children} = props;

    return (
        <Flex>
            <Flex
                mx='auto'
                justifyContent='start'
                direction='column'>
                {children}
            </Flex>
            <ThemeButton/>
        </Flex>
    );
}

export default AuthLayout;
