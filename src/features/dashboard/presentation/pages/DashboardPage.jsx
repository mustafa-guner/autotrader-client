import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUser} from "../../../auth/presentation/redux/action";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Text,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
    Grid
} from "@chakra-ui/react";
import MiniStatistics from "../components/MiniStatistics";
import {MdAttachMoney, MdBarChart, MdFileCopy} from "react-icons/md";
import IconBox from "../../../common/presentation/layouts/IconBoxLayout";
import HistoryItem from "../components/HistoryItem";
import Share from "../components/Share";
import CardLayout from "../../../common/presentation/layouts/CardLayout";

//Place Holder Images
import Nft5 from '../../../../assets/img/shares/Nft5.png';
import Nft1 from "../../../../assets/img/shares/Nft1.png";
import Nft2 from "../../../../assets/img/shares/Nft2.png";
import Nft4 from "../../../../assets/img/shares/Nft4.png";
import Nft3 from "../../../../assets/img/shares/Nft3.png";
import Nft6 from "../../../../assets/img/shares/Nft6.png";
import Usa from "../../../../assets/img/flags/usa.png";
import Avatar1 from "../../../../assets/img/avatars/avatar1.png";
import Avatar2 from "../../../../assets/img/avatars/avatar2.png";
import Avatar3 from "../../../../assets/img/avatars/avatar3.png";
import Avatar4 from "../../../../assets/img/avatars/avatar4.png";
import Summary from "../components/Summary";

function DashboardPage({auth, loadUser}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                columns={{base: 1, md: 2, lg: 3, "2xl": 5}}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor}/>
                            }
                        />
                    }
                    name='Earnings'
                    value='$350.4'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                            }
                        />
                    }
                    name='Spend this month'
                    value='$642.39'
                />
                <MiniStatistics
                    endContent={
                        <Flex me='-16px' mt='10px'>
                            <FormLabel htmlFor='balance'>
                                <Avatar src={Usa}/>
                            </FormLabel>
                        </Flex>
                    }
                    name='Your balance'
                    value='$1,000'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor}/>
                            }
                        />
                    }
                    name='Total Shares'
                    value='22'
                />
            </SimpleGrid>

            <Grid
                gridTemplateColumns={{xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr"}}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}>
                    <Flex direction='column'>
                        <SimpleGrid columns={{base: 1, md: 1}} gap='20px'>
                            <Summary/>
                        </SimpleGrid>
                        <Text
                            mt='45px'
                            mb='36px'
                            color={textColor}
                            fontSize='2xl'
                            ms='24px'
                            fontWeight='700'>
                            Recently Added
                        </Text>
                        <SimpleGrid
                            columns={{base: 1, md: 3}}
                            gap='20px'
                            mb={{base: "20px", xl: "0px"}}>
                            <Share
                                name='Swipe Circles'
                                author='By Peter Will'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft4}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                            <Share
                                name='Colorful Heaven'
                                author='By Mark Benjamin'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft5}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                            <Share
                                name='3D Cubes Art'
                                author='By Manny Gates'
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft6}
                                currentbid='0.91 ETH'
                                download='#'
                            />
                        </SimpleGrid>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3"}}>
                    <CardLayout p='0px'>
                        <Flex
                            align={{sm: "flex-start", lg: "center"}}
                            justify='space-between'
                            w='100%'
                            px='22px'
                            py='18px'>
                            <Text color={textColor} fontSize='xl' fontWeight='600'>
                                History
                            </Text>
                            <Button variant='action'>See all</Button>
                        </Flex>

                        <HistoryItem
                            name='Colorful Heaven'
                            author='By Mark Benjamin'
                            date='30s ago'
                            image={Nft5}
                            price='0.91 ETH'
                        />
                        <HistoryItem
                            name='Abstract Colors'
                            author='By Esthera Jackson'
                            date='58s ago'
                            image={Nft1}
                            price='0.91 ETH'
                        />
                        <HistoryItem
                            name='ETH AI Brain'
                            author='By Nick Wilson'
                            date='1m ago'
                            image={Nft2}
                            price='0.91 ETH'
                        />
                        <HistoryItem
                            name='Swipe Circles'
                            author='By Peter Will'
                            date='1m ago'
                            image={Nft4}
                            price='0.91 ETH'
                        />
                        <HistoryItem
                            name='Mesh Gradients '
                            author='By Will Smith'
                            date='2m ago'
                            image={Nft3}
                            price='0.91 ETH'
                        />
                        <HistoryItem
                            name='3D Cubes Art'
                            author='By Manny Gates'
                            date='3m ago'
                            image={Nft6}
                            price='0.91 ETH'
                        />
                    </CardLayout>
                </Flex>
            </Grid>
        </Box>
    );
}

DashboardPage.propTypes = {
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(DashboardPage);