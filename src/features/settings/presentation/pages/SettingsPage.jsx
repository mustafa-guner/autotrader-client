import {Box, Grid} from "@chakra-ui/react";
import React, {useEffect} from "react";
import ProfileUpdate from "../components/ProfileUpdate";
import AddBankAccount from "../components/AddBankAccount";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AlertMessage from "../../../common/presentation/components/AlertMessage";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import SwitchField from "../../../common/presentation/components/SwitchField";
import {clearErrors, clearMessages} from "../redux/action";

function SettingsPage({settings, clearErrors, clearMessages}) {

    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            clearErrors();
            clearMessages();
        }, 3000);

        return () => clearTimeout(errorTimeout);
    }, [settings.errors, settings.successMessages, clearErrors, clearMessages]);

    const errorMessages = () => {
        return settings.errors.map((errorMessage, index) => {
            return (
                <AlertMessage key={index} status={'error'} title={'Failed!'} message={errorMessage}/>
            );
        });
    };

    const successMessages = () => {
        return settings.successMessages.map((message, index) => {
            return <AlertMessage key={index} status={'success'} title={'Success!'} message={message}/>;
        });
    };

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            {settings.errors.length > 0 && errorMessages()}
            {settings.successMessages.length > 0 && successMessages()}
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
    clearErrors: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    settings: state.settings
});

export default connect(mapStateToProps, {clearMessages, clearErrors})(SettingsPage);