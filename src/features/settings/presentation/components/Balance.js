import {
    Box,
    Flex, FormLabel, Grid, Input, Link,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Spinner,
    Text,
    useColorModeValue, useDisclosure, useToast
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Badge
} from '@chakra-ui/react';
import {connect} from "react-redux";
import {MinusIcon, AddIcon} from "@chakra-ui/icons";
import ModalLayout from "../../../common/presentation/layouts/ModalLayout";
import {loadBankAccounts, loadPaymentMethods} from "../../../profile/presentation/redux/action";
import {maskCardNumber, maskedAccountNo} from "../../../../utils/helpers";
import SettingsService from "../../data/settings_service";
import {faCcVisa, faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {links} from "../../../../utils/constants";
import InputMask from 'react-input-mask';


function Balance({loadBankAccounts, loadPaymentMethods, paymentMethods, bankAccounts, auth}) {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const toast = useToast();
    const navigate = useNavigate();

    // Separate useDisclosure hooks for Deposit and Withdraw modals
    const {isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit} = useDisclosure();
    const {isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw} = useDisclosure();
    const [formData, setFormData] = React.useState({});
    const [balanceHistories, setBalanceHistories] = React.useState([])

    function showMessage(message, isSuccess) {
        return new Promise((resolve, reject) => {
            resolve(
                toast({
                    position: 'bottom-left',
                    title: isSuccess ? 'Success' : 'Error',
                    description: message,
                    status: isSuccess ? 'success' : 'error',
                })
            );
        });
    }

    function onDeposit() {
        return SettingsService.deposit(formData).then((response) => {
            return showMessage(response.data.message, true)
        }).then(() => {
            onCloseDeposit();
            // window.location.reload();
        }).catch((e) => showMessage(e.response.data.message, false))
    }

    function onWithdraw() {
        return SettingsService.withdraw(formData).then((response) => {
            return showMessage(response.data.message, true)
        }).then(() => {
            onCloseWithdraw();
            // window.location.reload();
        }).catch((e) => showMessage(e.response.data.message, false))
    }

    function handleNavigation() {
        navigate(links.protected.settings);
        if (isOpenDeposit) {
            onCloseDeposit();
        }
        if (isOpenWithdraw) {
            onCloseWithdraw();
        }
    }

    useEffect(() => {
        function fetchBalanceHistories() {
            return SettingsService.balanceHistories().then((response) => {
                setBalanceHistories(response.data.data);
            });
        }

        fetchBalanceHistories();

        if (isOpenWithdraw) {
            loadBankAccounts();
        }

        if (isOpenDeposit) {
            loadPaymentMethods();

        }
    }, [isOpenWithdraw, isOpenDeposit, loadBankAccounts, loadPaymentMethods]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const resetFormData = () => setFormData({});

    const closeDeposit = () => {
        resetFormData();
        onCloseDeposit();
    };

    const closeWithdraw = () => {
        resetFormData();
        onCloseWithdraw();
    };


    return (
        <>
            <CardLayout mb={{base: "0px", "2xl": "20px"}}>
                <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='2xl'
                    mt='10px'
                    mb='4px'>
                    Balance
                </Text>
                <Text color={textColorSecondary} fontSize='md' me='26px' mb='25px'>
                    Here you can view your account balance and withdraw or deposit funds.
                </Text>
                <Box>
                    <Text color={textColor} fontSize='4xl' fontWeight='bold'>
                        {auth.user?.userBalance.balance ? `${auth.user.userBalance.balance} ${auth.user.userBalance.currency}` :
                            <Spinner size="sm"/>}
                    </Text>
                    <Flex justifyContent={'start'}>
                        <Button
                            type='submit'
                            fontSize='xs'
                            onClick={onOpenDeposit}
                            variant='brand'
                            mr={'10px'}
                            size={'sm'}
                            fontWeight='500'
                            mb='24px'>
                            <AddIcon mr={'10px'}/> Deposit
                        </Button>
                        <Button
                            type='submit'
                            fontSize='xs'
                            onClick={onOpenWithdraw}
                            size={'sm'}
                            variant='brand'
                            fontWeight='500'
                            mb='24px'>
                            <MinusIcon mr={'10px'}/> Withdraw
                        </Button>
                    </Flex>
                </Box>

                <TableContainer maxW="full" overflowX="auto" borderRadius="md">
                    <div>
                        <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px' mb='4px'>
                            Balance History
                        </Text>
                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='25px'>
                            Here you can view your account balance history.
                        </Text>
                    </div>
                    <Table whiteSpace={'nowrap'} size={'sm'} variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Bank</Th>
                                <Th>Account No</Th>
                                <Th>Card No</Th>
                                <Th>Transaction Type</Th>
                                <Th>Amount</Th>
                                <Th>Transaction Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {balanceHistories.length == 0 ? (
                                <Tr p={'20px'}>
                                    <Td textAlign={'center'} colSpan={6}>No balance history found</Td>
                                </Tr>
                            ) : balanceHistories.map((balanceHistory, index) => (
                                <Tr key={balanceHistory.id}>
                                    <Td>{balanceHistory.bank_account?.bank?.name ? balanceHistory.bank_account.bank.name : '-'}</Td>
                                    <Td>{balanceHistory.bank_account ? maskedAccountNo(balanceHistory.bank_account?.account_number) : '-'}</Td>
                                    <Td>{balanceHistory.payment_method ? maskCardNumber(balanceHistory.payment_method?.card_number) : '-'}</Td>
                                    <Td>
                                        <Badge size='sm' colorScheme='green'>
                                            {balanceHistory.transaction_type?.definition}
                                        </Badge>
                                    </Td>
                                    <Td>{balanceHistory.amount} {balanceHistory.currency}</Td>
                                    <Td>{balanceHistory.created_at}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardLayout>

            {/* Deposit Modal */}
            <ModalLayout onClose={closeDeposit} isOpen={isOpenDeposit} isCentered>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)'/>
                <ModalContent>
                    <ModalHeader pb={'0'}>Deposit</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text color={'gray.400'} fontSize='sm' mb='10px'>
                            You can select a payment method (if available) and enter the amount you wish to deposit.
                            Alternatively, you can manually add a new payment method below (in USD).
                        </Text>
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
                            <Grid templateColumns={{base: "1fr", md: "1fr"}} gap='24px'>
                                <Box>
                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        Amount<Text>*</Text>
                                    </FormLabel>
                                    <Input
                                        name='amount'
                                        value={formData.amount}
                                        isRequired
                                        onChange={handleChange}
                                        variant='auth'
                                        fontSize='sm'
                                        type='number'
                                        placeholder={'Please Enter'}
                                        mb='24px'
                                        fontWeight='500'
                                        size='lg'/>
                                    {paymentMethods.length > 0 && (
                                        <>
                                            <FormLabel
                                                display='flex'
                                                ms='4px'
                                                fontSize='sm'
                                                fontWeight='500'
                                                color={textColor}
                                                mb='8px'>
                                                Payment Methods<Text>*</Text>
                                            </FormLabel>
                                            <Select
                                                name='payment_method_id'
                                                placeholder='Please Select'
                                                onChange={handleChange}
                                                value={formData.payment_method_id}
                                                fontSize='sm'
                                                variant='auth'
                                                size='lg'
                                                disabled={paymentMethods.length === 0}
                                                mb='24px'>
                                                {Array.isArray(paymentMethods) && paymentMethods.map((paymentMethod, index) => (
                                                    <option key={index}
                                                            value={paymentMethod.id}>({maskedAccountNo(paymentMethod.card_number)})</option>
                                                ))}
                                            </Select>
                                            <Flex align="center" my="10px">
                                                <Box flex="1">
                                                    <hr style={{borderTop: '1px solid #ccc', margin: 'auto'}}/>
                                                </Box>
                                                <Text mx="10px" fontSize='lg' fontWeight='500'>
                                                    OR
                                                </Text>
                                                <Box flex="1">
                                                    <hr style={{borderTop: '1px solid #ccc', margin: 'auto'}}/>
                                                </Box>
                                            </Flex>
                                        </>
                                    )}

                                </Box>
                            </Grid>
                            <Box>
                                <FormLabel
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    <Flex>
                                        <Text>Card Number*</Text>
                                        <Box ml={2} display="flex" alignItems="center">
                                            <FontAwesomeIcon style={{marginRight: '5px'}} icon={faCcVisa}/>
                                            <FontAwesomeIcon icon={faCcMastercard}/>
                                        </Box>
                                    </Flex>
                                    <Text fontSize={'xs'} color={'gray.400'}>Card number must be 16 digits.</Text>
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
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'/>
                            </Box>
                            <Box>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
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
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'/>
                            </Box>
                            <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap='24px'>
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
                                        size='lg'/>
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
                                                size='lg'/>
                                        )}
                                    </InputMask>
                                </Box>
                            </Grid>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseDeposit}>Close</Button>
                        <Button
                            type='submit'
                            fontSize='sm'
                            variant='brand'
                            ml={'10px'}
                            onClick={onDeposit}
                            fontWeight='500'>
                            Deposit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalLayout>

            {/* Withdraw Modal */}
            <ModalLayout onClose={closeWithdraw} size={'lg'} isOpen={isOpenWithdraw} isCentered>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)'/>
                <ModalContent>
                    <ModalHeader pb={'0'}>Withdraw</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text color={'gray.400'} fontSize='sm' mb='10px'>
                            Select your bank account and enter the amount you want to withdraw. (USD)
                        </Text>
                        <Flex my={'10px'} alignItems={'start'} justifyContent={'start'}>
                            <Text color={textColorPrimary} fontWeight='900'>Current Balance:</Text>
                            <Badge size='sm' colorScheme='purple'
                                   ml={'10px'}>{auth.user?.userBalance.balance ? `${auth.user.userBalance.balance} ${auth.user.userBalance.currency}` :
                                <Spinner size="sm"/>}</Badge>
                        </Flex>
                        {bankAccounts.length === 0 && (
                            <Text my={'10px'} fontSize='xs' me='26px' fontWeight={'500'} color={'red.500'}>
                                As you don't have a bank account on the system yet, you have to add a bank to proceed.
                                <Link size={'xs'} color={'brand.300'} fontWeight={'900'} onClick={handleNavigation}> Add
                                    Bank Account </Link>
                            </Text>
                        )}
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
                            <Grid templateColumns={{base: "1fr", md: "1fr"}} gap='24px'>
                                <Box>
                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        Bank Account<Text>*</Text>
                                    </FormLabel>
                                    <Select
                                        name='bank_account_id'
                                        placeholder='Please Select'
                                        fontSize='sm'
                                        variant='auth'
                                        size='lg'
                                        value={formData.bank_account_id}
                                        onChange={handleChange}
                                        disabled={bankAccounts.length === 0}
                                        mb='24px'>
                                        {Array.isArray(bankAccounts) && bankAccounts.map((account, index) => (
                                            <option key={index}
                                                    value={account.id}>{account.bank.name} ({maskedAccountNo(account.account_number)})</option>
                                        ))}
                                    </Select>

                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        Amount<Text>*</Text>
                                    </FormLabel>
                                    <Input
                                        name='amount'
                                        isRequired
                                        onChange={handleChange}
                                        variant='auth'
                                        fontSize='sm'
                                        value={formData.amount}
                                        type='number'
                                        placeholder={'Please Enter'}
                                        mb='24px'
                                        fontWeight='500'
                                        size='lg'/>
                                </Box>
                            </Grid>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseWithdraw}>Close</Button>
                        <Button
                            type='submit'
                            fontSize='sm'
                            variant='brand'
                            ml={'10px'}
                            onClick={onWithdraw}
                            fontWeight='500'>
                            Withdraw
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalLayout>
        </>
    );
}

const mapStateToProps = (state) => ({
    bankAccounts: state.profile.bankAccounts,
    paymentMethods: state.profile.paymentMethods,
    auth: state.auth
});
export default connect(mapStateToProps, {loadBankAccounts, loadPaymentMethods})(Balance);
