import {Box, Flex, Heading, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import AlertMessage from "../../../common/presentation/components/AlertMessage";
import PropTypes from "prop-types";
import {connect} from "react-redux";

function AuthLayout(props) {
    const {children, heading, description, auth} = props
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";

    const errorMessages = () => {
        return auth.errors.map((errorMessage) => {
            return (
                <AlertMessage status={'error'} title={'Failed!'} message={errorMessage}/>
            );
        })
    }

    const successMessages = () => {
        return auth.successMessages.map((message) => {
            return <AlertMessage status={'success'} title={'Success!'} message={message}/>
        })
    }

    return (
        <Flex>
            <Flex
                mx='auto'
                justifyContent='start'
                direction='column'>
                <Flex
                    alignItems='start'
                    justifyContent='center'
                    mt={{base: "10px", md: "12vh"}}
                    flexDirection='column'>
                    <Box me='auto'>
                        <Heading color={textColor} fontSize='36px' mb='10px'>
                            {heading}
                        </Heading>
                        <Text
                            mb='36px'
                            ms='4px'
                            color={textColorSecondary}
                            fontWeight='400'
                            fontSize='md'>
                            {description}
                        </Text>
                    </Box>
                    {auth.errors.length > 0 && errorMessages()}
                    {auth.successMessages.length > 0 && successMessages()}
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
}

AuthLayout.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AuthLayout);
