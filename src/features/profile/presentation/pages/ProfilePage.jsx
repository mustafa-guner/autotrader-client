import { Grid, Spinner } from "@chakra-ui/react";
import banner from "../../../../assets/img/auth/banner.png";
import avatar from "../../../../assets/img/avatars/avatar4.png";
import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Transactions from "../components/Transactions";
import GeneralInformation from "../components/General";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadProfile } from "../redux/action";

function ProfilePage({ profile, loadProfile }) {

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    if (profile.loading) {
        return <Spinner size="xl" />;
    }

    const { profile: profileData } = profile;
    const full_name = profileData ? profileData.full_name : "N/A";
    const country = profileData && profileData.country ? profileData.country.name : "N/A";

    return (
        <CardLayout pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Grid gap={{ base: "20px", xl: "20px" }}>
                <Banner
                    gridArea="1 / 1 / 2 / 2"
                    banner={banner}
                    avatar={avatar}
                    name={full_name}
                    country={country}
                    posts="17"
                    followers="9.7k"
                    following="274"
                />
            </Grid>
            <Grid
                mb="20px"
                
                gap={{ base: "20px", xl: "20px" }}>
                <Transactions
                    gridArea="1 / 2 / 2 / 2"
                    banner={banner}
                    avatar={avatar}
                    name="Adela Parkson"
                    job="Product Designer"
                    posts="17"
                    followers="9.7k"
                    following="274"
                />
                <GeneralInformation
                    gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
                    minH="365px"
                    pe="20px"
                />
            </Grid>
        </CardLayout>
    );
}

ProfilePage.propTypes = {
    profile: PropTypes.shape({
        profile: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }).isRequired,
    loadProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { loadProfile })(ProfilePage);
