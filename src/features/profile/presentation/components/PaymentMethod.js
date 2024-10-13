import {
    Badge,
    Box, Button,
    Flex,
    Icon,
    Image,
    Text, useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {MdCancel} from "react-icons/md";

import DarkModePaymentMethodImage from '../../../../assets/img/payment_methods/payment-method-dark-mode.png';
import LightModePaymentMethodImage from '../../../../assets/img/payment_methods/payment-method-light-mode.png';
import {maskCardNumber} from "../../../../utils/helpers";
import Swal from "sweetalert2";
import ProfileService from "../../data/profile_service";

function PaymentMethod(props) {
    const {paymentMethod, ...rest} = props;
    const {colorMode} = useColorMode();
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const bg = useColorModeValue("white", "navy.700");
    const maskedCardNumber = maskCardNumber(paymentMethod.card_number);

    const handlePaymentMethodDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this payment method?",
            icon: 'warning',
            confirmButtonText: 'Delete',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                ProfileService.removePaymentMethod(paymentMethod.id).then((data) => {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => window.location.reload())
                });
            }
        }).catch((error) => {
            Swal.fire(
                'Error!',
                error.message,
                'error'
            );
        })
    }

    const setDefaultPaymentMethod = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to set this payment method as default?",
            icon: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                ProfileService.setDefaultPaymentMethod(paymentMethod.id).then((data) => {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => window.location.reload())
                });
            }
        }).catch((error) => {
            Swal.fire(
                'Error!',
                error.message,
                'error'
            );
        })
    }

    return (
        <Box bg={bg} {...rest} p='14px'>
            <Flex align='center' justifyContent="space-between" direction={{base: "column", md: "row"}}>
                <Flex align='center' direction={{base: 'column', md: 'row'}}>
                    <Image width={'80px'} height={'80px'}
                           src={colorMode == 'light' ? LightModePaymentMethodImage : DarkModePaymentMethodImage}
                           borderRadius='8px' me={{base: '0px', md: '20px'}}/>
                    <Box mt={{base: "10px", md: "0"}} textAlign={{base: 'center', md: 'left'}}>
                        <Text
                            color={textColorPrimary}
                            fontWeight='500'
                            fontSize='md'
                            mb='4px'>
                            {paymentMethod.place_holder}
                        </Text>
                        <Text
                            fontWeight='500'
                            color={textColorSecondary}
                            fontSize='sm'
                            me='4px'>
                            {paymentMethod.expiration_date}
                        </Text>
                        <Text
                            fontWeight='500'
                            color={textColorSecondary}
                            fontSize='sm'
                            me='4px'>
                            {maskedCardNumber}
                        </Text>
                    </Box>
                </Flex>
                <Flex align={'end'} alignItems={'center'} justifyContent={'end'}>
                    {!paymentMethod.is_default ? (
                        <Text
                            color={'blue.500'}
                            cursor={'pointer'}
                            onClick={setDefaultPaymentMethod}
                            size={'xs'}>
                            Set As Default
                        </Text>
                    ) : <Badge size='sm' colorScheme='green'>
                        Default
                    </Badge>}
                    <Button
                        onClick={handlePaymentMethodDelete}
                        variant='no-hover'
                        size={'xs'}>
                        <Icon as={MdCancel} color='red.500' h='18px' w='18px'/>
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}

export default PaymentMethod;