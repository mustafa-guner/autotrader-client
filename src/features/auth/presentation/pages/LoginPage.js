import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AlertMessage from "../../../common/presentation/components/AlertMessage";
import AuthLayout from "../layouts/AuthLayout";
import {login} from "../redux/action";
import {authLinks, dashboardLinks} from "../../../../utils/constants";


function LoginPage({auth, login}) {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);

    //Authentication action-reducers
    const [disable, setDisable] = useState(false);
    const [formData, setFormData] = useState({});
    const {email = 'rexyx@mailinator.com', password = 'Pa$$w0rd!'} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        setDisable(true);
        e.preventDefault();

        login(formData).then(() => {
            setDisable(false)
            navigate(dashboardLinks.dashboard);
        }).catch(() => {
            setDisable(false);
        });
    }

    const errorMessage = () => {
        const hasError = auth.errors.login.length > 0;
        if (hasError) {
            auth.errors.login.map((errorMessage) => {
                return (
                    <AlertMessage status={'error'} title={'Failed!'}
                                  message={errorMessage}/>
                );
            })
        }
    }

    const handleClick = () => setShow(!show);
    return (
        <AuthLayout>
            <Flex
                alignItems='start'
                justifyContent='center'
                mt={{base: "10px", md: "12vh"}}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Sign In
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your email and password to sign in!
                    </Text>
                </Box>
                {errorMessage}
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{base: "100%", md: "420px"}}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{base: "auto", lg: "unset"}}
                    me='auto'
                    mb={{base: "20px", md: "auto"}}>
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
                            isRequired={true}
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
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                name='password'
                                value={password}
                                disabled={disable}
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Min. 8 characters'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
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
                        <Flex justifyContent='space-between' align='center' mb='24px'>
                            <NavLink to={authLinks.forgotPassword}>
                                <Text
                                    color={textColorBrand}
                                    fontSize='sm'
                                    w='124px'
                                    fontWeight='500'>
                                    Forgot password?
                                </Text>
                            </NavLink>
                        </Flex>
                        <Button
                            type='submit'
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            isDisabled={disable}
                            mb='24px'>
                            Sign In
                        </Button>
                    </FormControl>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            Not registered yet?
                            <NavLink to={authLinks.register}>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>
                                    Create an Account
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </AuthLayout>
    );
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {login})(LoginPage);
