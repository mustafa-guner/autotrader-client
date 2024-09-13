import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {
    Spinner,
} from "@chakra-ui/react"
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AuthLayout from "../layouts/AuthLayout";
import PublicService from "../../../common/data/public_service";
import {register} from "../redux/action";
import {links} from "../../../../utils/constants";


function RegisterPage({auth, register}) {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [countries, setCountries] = useState([]);
    const [genders, setGenders] = useState([]);

    const [formData, setFormData] = useState({});
    const {firstname, lastname, email, password, password_confirmation, country_id, gender_id} = formData;

    useEffect(() => {
        const fetchData = async () => {
            const countries = await PublicService.countries();
            const genders = await PublicService.genders();
            return [countries.data.data, genders.data.data];
        };

        fetchData().then(([countries, genders]) => {
            setCountries(countries);
            setGenders(genders);
        });
    }, []);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisable(true);

        register(formData).then(() => {
            setDisable(false);
        }).catch((error) => {
            setDisable(false);
        });
    }

    const handleClick = () => setShow(!show);

    return (
        <AuthLayout heading={'Sign Up'} description={'Create your account by filling in the details below.'} auth={auth}>
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
                        <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap='24px'>
                            <Box>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    First Name<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Input
                                    name='firstname'
                                    value={firstname}
                                    disabled={disable}
                                    isRequired
                                    variant='auth'
                                    fontSize='sm'
                                    type='text'
                                    placeholder='John'
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    Last Name<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Input
                                    name='lastname'
                                    value={lastname}
                                    disabled={disable}
                                    isRequired
                                    variant='auth'
                                    fontSize='sm'
                                    type='text'
                                    placeholder='Doe'
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'
                                    onChange={handleChange}
                                />
                            </Box>
                        </Grid>
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
                                isRequired
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
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Password Confirmation<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                name='password_confirmation'
                                value={password_confirmation}
                                disabled={disable}
                                isRequired
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
                        <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap='24px'>
                            <Box>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    Country<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Select
                                    name='country_id'
                                    value={country_id}
                                    disabled={disable}
                                    placeholder='Please Select'
                                    onChange={handleChange}
                                    fontSize='sm'
                                    variant='auth'
                                    size='lg'
                                    mb='24px'>
                                    {countries.map(country => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    Gender<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Select
                                    name='gender_id'
                                    value={gender_id}
                                    disabled={disable}
                                    placeholder='Please Select'
                                    onChange={handleChange}
                                    fontSize='sm'
                                    variant='auth'
                                    size='lg'
                                    mb='24px'>
                                    {genders.map(gender => (
                                        <option key={gender.id} value={gender.id}>
                                            {gender.definition}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                        </Grid>
                        <Button
                            type='submit'
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            isDisabled={disable}>
                            Sign Up
                            {
                                auth.loading && (
                                    <Spinner>
                                        <Icon as={RiEyeCloseLine} w='20px' h='20px' color='inherit'/>
                                    </Spinner>
                                )
                            }
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

RegisterPage.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {register})(RegisterPage);
