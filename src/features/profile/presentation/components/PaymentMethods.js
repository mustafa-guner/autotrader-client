import BankAccount from "./BankAccount";
import {Box, Button, Flex, Icon, Link, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import {useNavigate} from "react-router-dom";
import {links} from "../../../../utils/constants";
import {MdAdd} from "react-icons/md";
import PaymentMethod from "./PaymentMethod";

function PaymentMethods(props) {
    const {paymentMethods} = props;
    const navigate = useNavigate();
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const bg = useColorModeValue("white", "navy.700");
    const textColorSecondary = "gray.400";
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    return (
        <CardLayout mt={{base:'15px', md:'0px'}} mb={{base: "0px", "2xl": "20px"}}>
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='4px'>
                Payment Methods
            </Text>
            <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                Here you can view the payment methods you've added.
                You can have a maximum of <span className={'fw-bold'}>3 accounts</span>.
            </Text>
            {paymentMethods.length ? paymentMethods.map(paymentMethod => {
                return (
                    <PaymentMethod
                        boxShadow={cardShadow}
                        mb='20px'
                        paymentMethod={paymentMethod}
                    />
                )
            }) : <Box bg={bg} p='14px' height='100%'>
                <Flex align='center' height='100%' justifyContent='center' direction={{base: "column", md: "row"}}>
                    <Box mt={{base: "10px", md: "0"}}>
                        <Text
                            color={textColorPrimary}
                            fontWeight='500'
                            textAlign='center'
                            fontSize='md'
                            mb='4px'>
                            You haven't added any payment method yet.
                        </Text>
                        <Text
                            color={textColorPrimary}
                            fontWeight='500'
                            textAlign='center'
                            fontSize='md'
                            mb='4px'>
                            <Link onClick={() => navigate(links.protected.settings)}>
                                <Button
                                    variant='darkBrand'
                                    color='white'
                                    fontSize='sm'
                                    fontWeight='500'
                                    borderRadius='70px'
                                    px='24px'
                                    py='5px'>
                                    Add Now <Icon ml='5px' fontSize='20px' as={MdAdd}/>
                                </Button>
                            </Link>
                        </Text>
                    </Box>
                </Flex>
            </Box>}
        </CardLayout>
    );
}

export default PaymentMethods;