import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AuthLayout from "../layouts/AuthLayout";
import {forgotPassword} from "../redux/action";
import AlertMessage from "../../../common/presentation/components/AlertMessage";

function ForgotPasswordPage({auth, forgotPassword}) {
    const navigate = useNavigate();
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
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
        forgotPassword(formData)
            .then(() => {
                setDisable(false);
                if (auth.isPasswordResetLinkSent) {
                    navigate('/auth/reset-password');
                }
            })
            .catch(() => setDisable(false));
    };

    return (
        <AuthLayout>
            <Flex
                maxW={{base: "100%", md: "max-content"}}
                w='100%'
                mx={{base: "auto", lg: "0px"}}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{base: "30px", md: "60px"}}
                px={{base: "25px", md: "0px"}}
                mt={{base: "40px", md: "14vh"}}
                flexDirection='column'
            >
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Forgot Password
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your email address to reset your password!
                    </Text>
                </Box>

                {auth.errors.forgotPassword.length > 0 && auth.errors.forgotPassword.map((errorMessage) => {
                    return (
                        <AlertMessage status={'error'} title={'Failed!'}
                                      message={errorMessage}/>
                    );
                })}

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
                            <NavLink to='/auth/login'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'
                                >
                                    Sign In
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </AuthLayout>
    );
}

ForgotPasswordPage.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {forgotPassword})(ForgotPasswordPage);
