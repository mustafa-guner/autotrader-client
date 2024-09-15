import {Box, Grid, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import banner from "../../../../assets/img/auth/banner.png";
import React, {useEffect} from "react";
import Banner from "../components/Banner";
import BankAccounts from "../components/BankAccounts";
import GeneralInformation from "../components/General";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadBankAccounts, loadProfile} from "../redux/action";
import {dateFormater} from "../../../../utils/helpers";

function ProfilePage({profile, loadProfile, loadBankAccounts}) {

    useEffect(() => {
        loadProfile();
        loadBankAccounts();
    }, [loadProfile, loadBankAccounts]);

    if (profile.loading) {
        return <Spinner size="xl" />;
    }

    // Safe check for profileData
    const profileData = profile.profile || {};
    const bankAccounts = profile.bankAccounts || [];

    // Provide default values for profile data
    const full_name = profileData.full_name || '-';
    const country = profileData.country?.name || 'N/A';
    const email = profileData.email || 'N/A';
    const dob = profileData.dob ? dateFormater(profileData.dob) : 'N/A';
    const gender = profileData.gender?.definition || 'N/A';
    const member_since = profileData.email_verified_at ? dateFormater(profileData.email_verified_at) : 'N/A';

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Grid gap={{base: "20px", xl: "20px"}}>
                <Banner
                    banner={banner}
                    name={full_name}
                    email={email}
                    posts="17"
                    followers="9.7k"
                    following="274"
                />
            </Grid>
            <SimpleGrid
                columns={{base: 1, md: 2, lg: 2, "2xl": 2}} gap='20px'
                mb='20px'>
                <BankAccounts bankAccounts={bankAccounts}/>
                <GeneralInformation
                    dob={dob}
                    gender={gender}
                    member_since={member_since}
                    country={country}
                />
            </SimpleGrid>
        </Box>
    );
}

ProfilePage.propTypes = {
    profile: PropTypes.shape({
        profile: PropTypes.object,
        bankAccounts: PropTypes.array,
        loading: PropTypes.bool.isRequired,
    }).isRequired,
    loadProfile: PropTypes.func.isRequired,
    loadBankAccounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {loadProfile, loadBankAccounts})(ProfilePage);
