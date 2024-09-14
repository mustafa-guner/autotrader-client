import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AuthLayout from "../layouts/AuthLayout";
import {forgotPassword} from "../redux/action";
import {links} from "../../../../utils/constants";

function ForgotPasswordPage({forgotPassword}) {
    const navigate = useNavigate();
    const textColor = useColorModeValue("navy.700", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [disable, setDisable] = useState(false);
    const [formData, setFormData] = useState({});
    const {email} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisable(true);
        forgotPassword(formData).finally(() => {
            setDisable(false);
            navigate(links.public.auth.resetPassword);
        })
    };

    return (
        <AuthLayout heading={'Forgot Password'} description={'Enter your email address to reset your password!'}>
            <Flex
                zIndex='2'
                direction='column'
                w={{base: "100%", md: "420px"}}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{base: "auto", lg: "unset"}}
                me='auto'
                mb={{base: "20px", md: "auto"}}
            >
                <FormControl as='form' onSubmit={handleSubmit}>
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name='email'
                        value={email}
                        disabled={disable}
                        isRequired
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='email'
                        placeholder='mail@simmmple.com'
                        mb='24px'
                        fontWeight='500'
                        size='lg'
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        w='100%'
                        h='50'
                        isDisabled={disable}
                        mb='24px'
                    >
                        Submit
                    </Button>
                </FormControl>
                <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='start'
                    maxW='100%'
                    mt='0px'
                >
                    <Text color={textColor} fontWeight='400' fontSize='14px'>
                        Remembered your password?
                        <NavLink to={links.public.auth.login}>
                            <Text
                                color={textColorBrand}
                                as='span'
                                ms='5px'
                                fontWeight='500'>
                                Sign In
                            </Text>
                        </NavLink>
                    </Text>
                </Flex>
            </Flex>
        </AuthLayout>
    );
}

ForgotPasswordPage.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, {forgotPassword})(ForgotPasswordPage);
