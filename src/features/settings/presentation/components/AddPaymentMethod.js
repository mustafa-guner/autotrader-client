import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Icon,
    Input,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import SettingsService from "../../data/settings_service";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import InputMask from "react-input-mask";

function AddPaymentMethod() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const [formData, setFormData] = useState({
        card_number: '',
        card_holder: '',
        cvv: '',
        expiration_date: ''
    });
    const [disable, setDisable] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setDisable(true);
        try {
            const response = await SettingsService.addPaymentMethod(formData);
            toast({
                position: 'bottom-left',
                title: 'Success',
                description: response.data.message,
                status: 'success',
            });

            setFormData({
                card_number: '',
                card_holder: '',
                cvv: '',
                expiration_date: ''
            });
        } catch (e) {
            toast({
                position: 'bottom-left',
                title: 'Error',
                description: e.response?.data?.message || 'An error occurred',
                status: 'error',
            });
        }
        setDisable(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const isFormEmpty = () => {
        return !formData.card_number || !formData.card_holder || !formData.cvv || !formData.expiration_date;
    };

    return (
        <CardLayout mb={{base: "30px", "2xl": "20px"}}>
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='4px'>
                Add Payment Method
            </Text>
            <Text color={textColorSecondary} fontSize='md' me='26px' mb='25px'>
                Here you can add a new payment method to your account.
            </Text>
            <FormControl as='form' onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap='24px'>
                    <Box>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Card Number<Text>*</Text>
                            <Box ml={2} display="flex" alignItems="center">
                                <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCcVisa} />
                                <FontAwesomeIcon icon={faCcMastercard} />
                            </Box>
                        </FormLabel>
                        <Input
                            name='card_number'
                            value={formData.card_number}
                            isRequired
                            onChange={handleChange}
                            variant='auth'
                            fontSize='sm'
                            type='text'
                            placeholder={'Enter your card number'}
                            fontWeight='500'
                            size='lg' />
                    </Box>
                    <Box>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}>
                            Card Holder<Text>*</Text>
                        </FormLabel>
                        <Input
                            name='card_holder'
                            value={formData.card_holder}
                            isRequired
                            onChange={handleChange}
                            variant='auth'
                            fontSize='sm'
                            type='text'
                            placeholder={'Please enter'}
                            fontWeight='500'
                            size='lg' />
                    </Box>
                    <Box>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            CVV<Text>*</Text>
                        </FormLabel>
                        <Input
                            name='cvv'
                            value={formData.cvv}
                            isRequired
                            onChange={handleChange}
                            variant='auth'
                            fontSize='sm'
                            type='text'
                            placeholder={'CVV'}
                            mb='24px'
                            fontWeight='500'
                            size='lg' />
                    </Box>
                    <Box>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Expiry Date<Text>*</Text>
                        </FormLabel>
                        <InputMask
                            mask={'99/99'}
                            value={formData.expiration_date}
                            onChange={handleChange}
                        >
                            {() => (
                                <Input
                                    name='expiration_date'
                                    value={formData.expiration_date}
                                    isRequired
                                    onChange={handleChange}
                                    variant='auth'
                                    fontSize='sm'
                                    type='text'
                                    placeholder={'MM/YY'}
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg' />
                            )}
                        </InputMask>
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
                        Add Payment Method<Icon ml='5px' fontSize='20px' as={MdAdd} />
                    </Button>
                </Flex>
            </FormControl>
        </CardLayout>
    )
}

AddPaymentMethod.propTypes = {
    settings: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    settings: state.settings
});

export default connect(mapStateToProps, {})(AddPaymentMethod);
