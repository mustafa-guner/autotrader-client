import {Box, Grid} from "@chakra-ui/react";
import React from "react";
import ProfileUpdate from "../components/ProfileUpdate";
import AddBankAccount from "../components/AddBankAccount";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import SwitchField from "../../../common/presentation/components/SwitchField";

function SettingsPage({settings}) {

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Grid
                mb="20px"
                gap={{base: "20px", xl: "20px"}}>
                <ProfileUpdate/>
                <AddBankAccount/>
                <CardLayout>
                    <SwitchField
                        isChecked={false}
                        reversed={true}
                        fontSize="sm"
                        mb="20px"
                        id="1"
                        label="Enable AI to manage your account"
                        desc="AI will manage your account and make decisions on your behalf."
                    ></SwitchField>
                </CardLayout>
            </Grid>
        </Box>

    );
}

SettingsPage.propTypes = {
    settings: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    settings: state.settings
});

export default connect(mapStateToProps, {})(SettingsPage);