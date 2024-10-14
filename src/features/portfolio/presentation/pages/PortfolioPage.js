import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Box,
    Text,
    Spinner,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DashboardService } from "../../../dashboard/data/dashboard_service";

function PortfolioPage({ auth }) {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPortfolio() {
            setLoading(true);
            try {
                const res = await DashboardService.fetchShares();
                setPortfolio(res.data.data);
            } catch (error) {
                console.error("Error fetching portfolio", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPortfolio();
    }, []);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Text fontSize="lg" mb={6}>
                Portfolio
            </Text>
            <Box
                height="75vh"
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius="md"
                p={4}
                overflowY="auto"
            >
                {loading ? (
                    <Spinner size="xl" />
                ) : portfolio.length === 0 ? (
                    <Text color="gray.400">No portfolio data available.</Text>
                ) : (
                    <Table variant="simple" width="100%">
                        <Thead>
                            <Tr>
                                <Th>Company</Th>
                                <Th>Shares</Th>
                                <Th>Value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {portfolio.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.company}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>${item.totalValue}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>
        </Box>
    );
}

PortfolioPage.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(PortfolioPage);
