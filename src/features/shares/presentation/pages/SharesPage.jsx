import React from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    Link,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";
import Banner from "../components/Banner";
import HistoryItem from "../../../dashboard/presentation/components/HistoryItem";
import NFT from "../../../dashboard/presentation/components/Share"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import Card from "../../../common/presentation/layouts/CardLayout";
import Nft1 from "../../../../assets/img/nfts/Nft1.png";
import Nft2 from "../../../../assets/img/nfts/Nft2.png";
import Nft3 from "../../../../assets/img/nfts/Nft3.png";
import Nft4 from "../../../../assets/img/nfts/Nft4.png";
import Nft5 from "../../../../assets/img/nfts/Nft5.png";
import Nft6 from "../../../../assets/img/nfts/Nft6.png";
import Avatar1 from "../../../../assets/img/avatars/avatar1.png";
import Avatar2 from "../../../../assets/img/avatars/avatar2.png";
import Avatar3 from "../../../../assets/img/avatars/avatar3.png";
import Avatar4 from "../../../../assets/img/avatars/avatar4.png";
import tableDataTopCreators from "./data.json";
import TableTopCreators from "../components/TableTopCreators";


function SharesPage() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");

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
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <Grid
                mb='20px'
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}>
                    <Banner/>
                    <TableTopCreators
                        tableData={tableDataTopCreators}
                        columnsData={tableColumnsTopCreators}
                    />
                </Flex>
            </Grid>
        </Box>
    );
}

export default SharesPage;