import {
    Box, Button, Flex, FormControl,
    FormLabel,
    Grid,
    Icon,
    Input,
    InputGroup,
    InputRightElement, Select,
    Text,
    useColorModeValue, useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../../auth/presentation/redux/action";
import PublicService from "../../../common/data/public_service";
import { MdEdit } from 'react-icons/md';
import SettingsService from "../../data/settings_service";

function ProfileUpdate() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const textColorSecondary = "gray.400";
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [countries, setCountries] = useState([]);
    const [genders, setGenders] = useState([]);
    const { old_password, new_password, country_id, gender_id } = formData;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisable(true);
        SettingsService.updateProfile(formData).then((res) => toast({
            position: 'bottom-left',
            title: 'Success',
            description: res.data.message,
            status: 'success',
        })).catch(e => toast({
            position: 'bottom-left',
            title: 'Error',
            description: e.response.data.message,
            status: 'error',
        })).finally(() => setDisable(false));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClick = () => setShow(!show);

    // Function to check if any input has been entered
    const isFormEmpty = () => {
        return !old_password && !new_password && !country_id && !gender_id;
    };

    return (
        <CardLayout mb={{ base: "0px", "2xl": "20px" }}>
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='4px'>
                Profile Update
            </Text>
            <Text color={textColorSecondary} fontSize='md' me='26px' mb='25px'>
                Here you can update your profile. Keep your information up to date.
            </Text>
            <FormControl as='form' onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap='24px'>
                    <Box>
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Old Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                name='old_password'
                                value={old_password}
                                autoComplete='off'
                                disabled={disable}
                                required={new_password ? true : false}
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
                                    _hover={{ cursor: "pointer" }}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box>
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
                                name='new_password'
                                value={new_password}
                                disabled={disable}
                                autoComplete='off'
                                required={old_password ? true : false}
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
                                    _hover={{ cursor: "pointer" }}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Grid>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap='24px'>
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
                <Flex justifyContent={'start'}>
                    <Button
                        type='submit'
                        fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        mb='24px'
                        isDisabled={disable || isFormEmpty()}>
                        Update Profile <Icon ml='5px' fontSize='20px' as={MdEdit} />
                    </Button>
                </Flex>
            </FormControl>
        </CardLayout>
    );
}

ProfileUpdate.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { register })(ProfileUpdate);
