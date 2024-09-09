import React, {useEffect, useState} from "react";
import {
    Box,
    Button, Flex,
    FormControl,
    FormLabel,
    Heading, Icon,
    Input, InputGroup, InputRightElement,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {RiEyeCloseLine} from "react-icons/ri";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {NavLink, useNavigate} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import {resetPassword} from "../redux/action";
import AlertMessage from "../../../common/presentation/components/AlertMessage";
import {authLinks} from "../../../../utils/constants";

function ResetPasswordPage({auth, resetPassword}) {
    const textColor = useColorModeValue("navy.700", "white");
    const navigate = useNavigate();
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [formData, setFormData] = useState({});
    const {token, password} = formData;

    useEffect(() => {
        //Prevent user from accessing the page if the password reset link has not been sent
        if (!auth.isPasswordResetLinkSent) {
            navigate(authLinks.forgotPassword);
        }
    }, [auth, navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisable(true);
        resetPassword(formData)
            .then(() => setDisable(false))
            .catch(() => setDisable(false));
    };
    const handleClick = () => setShow(!show);

    return (
        <AuthLayout>
            <Flex
                me='auto'
                alignItems='start'
                w={{base: "100%", md: "420px"}}
                justifyContent='center'
                mt={{base: "10px", md: "12vh"}}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Reset Password
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'
                    >
                        Enter the code that we sent to your email address to reset your password!
                    </Text>

                    {auth.isPasswordResetLinkSent && (
                        <AlertMessage title={'Success!'} message={'Verification code has been sent to your email.'}/>
                    )}
                </Box>
                <FormControl as='form' onSubmit={handleSubmit}>
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Code<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name="token"
                        defaultValue={token}
                        disabled={disable}
                        isRequired
                        variant="auth"
                        fontSize="sm"
                        ms={{base: "0px", md: "0px"}}
                        placeholder="Enter the code"
                        mb="24px"
                        fontWeight="500"
                        size="lg"
                        onChange={handleChange}
                    />
                    <FormLabel
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        display='flex'>
                        New Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="password"
                            defaultValue={password}
                            disabled={disable}
                            isRequired
                            fontSize="sm"
                            placeholder="Min. 8 characters"
                            mb="24px"
                            size="lg"
                            type={show ? "text" : "password"}
                            variant="auth"
                            onChange={handleChange}
                        />

                        <InputRightElement display='flex' alignItems='center' mt='4px'>
                            <Icon
                                color={textColorSecondary}
                                _hover={{cursor: "pointer"}}
                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                onClick={handleClick}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        type='submit'
                        fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        w='100%'
                        h='50'
                        isDisabled={disable}
                        mb='24px'>Reset
                    </Button>
                </FormControl>
                <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='start'
                    maxW='100%'
                    mt='0px'>
                    <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                        Already have an account?
                        <NavLink to={authLinks.login}>
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

ResetPasswordPage.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {resetPassword})(ResetPasswordPage);
