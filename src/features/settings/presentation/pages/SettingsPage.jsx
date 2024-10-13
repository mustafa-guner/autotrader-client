import {Box, Grid, TabIndicator} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import ProfileUpdate from "../components/ProfileUpdate";
import AddBankAccount from "../components/AddBankAccount";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import SwitchField from "../../../common/presentation/components/SwitchField";
import Balance from "../components/Balance";
import {useLocation, useNavigate} from "react-router-dom";
import AddPaymentMethod from "../components/AddPaymentMethod";

function SettingsPage({settings}) {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const activeTab = query.get('tab');

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        if (activeTab === 'balance') {
            setActiveTabIndex(1);
        } else {
            setActiveTabIndex(0);
        }
    }, [activeTab]);

    const handleTabChange = (index) => {
        setActiveTabIndex(index);
        // Update URL with the corresponding tab
        const newTab = index === 0 ? '' : '?tab=balance';
        navigate(`/settings${newTab}`);
    };

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Grid mb="20px" gap={{base: "20px", xl: "20px"}}>
                <Tabs index={activeTabIndex} onChange={handleTabChange} position='relative' variant='unstyled'>
                    <TabList mx={'25px'}>
                        <Tab _selected={{color: 'brand'}}>General</Tab>
                        <Tab _selected={{color: 'brand'}}>Account Balance</Tab>
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='brandScheme.400' borderRadius='1px'/>
                    <TabPanels>
                        <TabPanel>
                            <ProfileUpdate/>
                            <AddBankAccount/>
                            <AddPaymentMethod/>
                            <CardLayout>
                                <SwitchField
                                    isChecked={false}
                                    reversed={true}
                                    fontSize="sm"
                                    mb="20px"
                                    id="1"
                                    label="Enable AI to manage your account"
                                    desc="AI will manage your account and make decisions on your behalf."
                                />
                            </CardLayout>
                        </TabPanel>
                        <TabPanel>
                            <Balance/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Grid>
        </Box>
    );
}

SettingsPage.propTypes = {
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    settings: state.settings,
});

export default connect(mapStateToProps, {})(SettingsPage);
