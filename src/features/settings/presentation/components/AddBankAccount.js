import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid, Icon,
    Input,
    Select,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import SettingsService from "../../data/settings_service";
import {MdAdd} from "react-icons/md";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addBankAccount} from "../redux/action";

function AddBankAccount({addBankAccount}) {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const textColorSecondary = "gray.400";
    const [formData, setFormData] = useState({});
    const [disable, setDisable] = useState(false);
    const [banks, setBanks] = useState([]);
    const {bank_id, account_number} = formData;

    useEffect(() => {
        const fetchData = async () => {
            const banks = await SettingsService.banks();
            return [banks.data.data];
        };

        fetchData().then(([banks]) => {
            setBanks(banks);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisable(true);
        addBankAccount(formData).finally(() => {
            setDisable(false);
            setFormData({});  // Reset form fields after submission
        });
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <CardLayout mb={{base: "0px", "2xl": "20px"}}>
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='4px'>
                Add Bank Account
            </Text>
            <Text color={textColorSecondary} fontSize='md' me='26px' mb='25px'>
                Here you can add your bank account to receive payments and deposit funds.
            </Text>
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
                            Bank<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Select
                            name='bank_id'
                            value={bank_id || ''}
                            disabled={disable}
                            placeholder='Please Select'
                            onChange={handleChange}
                            fontSize='sm'
                            variant='auth'
                            size='lg'
                            mb='24px'>
                            {banks.map(bank => (
                                <option key={bank.id} value={bank.id}>
                                    {bank.name}
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
                            Account No<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            name='account_number'
                            value={account_number || ''}
                            disabled={disable}
                            isRequired
                            variant='auth'
                            fontSize='sm'
                            type='text'
                            placeholder='123456789'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            onChange={handleChange}
                        />
                    </Box>
                </Grid>

                <Flex justifyContent={'start'}>
                    <Button
                        type='submit'
                        fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        mb='24px'
                        isDisabled={disable}>
                        Add Bank Account <Icon ml='5px' fontSize='20px' as={MdAdd}/>
                    </Button>
                </Flex>
            </FormControl>
        </CardLayout>
    )
}

AddBankAccount.propTypes = {
    settings: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    settings: state.settings
});

export default connect(mapStateToProps, {addBankAccount})(AddBankAccount);
