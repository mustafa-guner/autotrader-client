import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUser} from "../../../auth/presentation/redux/action";
import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    SimpleGrid,
    useColorModeValue,
    Grid
} from "@chakra-ui/react";
import MiniStatistics from "../components/MiniStatistics";
import {MdAttachMoney, MdBarChart, MdFileCopy} from "react-icons/md";
import IconBox from "../../../common/presentation/layouts/IconBoxLayout";
import CardLayout from "../../../common/presentation/layouts/CardLayout";

import Usa from "../../../../assets/img/flags/usa.png";
import Summary from "../components/Summary";
import React from "react";
import TableTopCreators from "../components/TableTopCreators";
import tableDataTopCreators from '../../data.json';

function DashboardPage({auth, loadUser}) {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const tableColumnsTopCreators = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Artworks",
            accessor: "artworks",
        },
        {
            Header: "Rating",
            accessor: "rating",
        },
    ];

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
                    flexDirection='column'>
                    <Flex direction='column'>
                        <SimpleGrid mb="20px" columns={{base: 1, md: 2}} gap='20px'>
                            <Summary/>
                        </SimpleGrid>
                        <CardLayout>
                            <Box>
                                <Grid
                                    mb='20px'
                                    gap={{base: "20px", xl: "20px"}}
                                    display={{base: "block", xl: "grid"}}>
                                    <Flex
                                        flexDirection='column'
                                        gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}>
                                        <TableTopCreators
                                            tableData={tableDataTopCreators}
                                            columnsData={tableColumnsTopCreators}
                                        />
                                    </Flex>
                                </Grid>
                            </Box>
                        </CardLayout>
                    </Flex>
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