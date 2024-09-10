import { Grid} from "@chakra-ui/react";
import banner from "../../../../assets/img/auth/banner.png";
import avatar from "../../../../assets/img/avatars/avatar4.png";
import React from "react";
import Banner from "../components/Banner";
import Transactions from "../components/Transactions";
import GeneralInformation from "../components/General";
import CardLayout from "../../../common/presentation/layouts/CardLayout";

function ProfilePage() {
    return (
        <CardLayout pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Grid
                gap={{base: "20px", xl: "20px"}}>
                <Banner
                    gridArea='1 / 1 / 2 / 2'
                    banner={banner}
                    avatar={avatar}
                    name='Adela Parkson'
                    job='Product Designer'
                    posts='17'
                    followers='9.7k'
                    following='274'
                />
            </Grid>
            <Grid
                mb='20px'
                templateColumns={{
                    base: "1fr",
                    lg: "repeat(2, 1fr)",
                    "2xl": "1.34fr 1.62fr 1fr",
                }}
                templateRows={{
                    base: "1fr",
                    lg: "repeat(2, 1fr)",
                    "2xl": "1fr",
                }}
                gap={{base: "20px", xl: "20px"}}>
                <Transactions
                    gridArea='1 / 2 / 2 / 2'
                    banner={banner}
                    avatar={avatar}
                    name='Adela Parkson'
                    job='Product Designer'
                    posts='17'
                    followers='9.7k'
                    following='274'
                />
                <GeneralInformation
                    gridArea={{base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3"}}
                    minH='365px'
                    pe='20px'
                />
            </Grid>
        </CardLayout>
    );
}

export default ProfilePage;