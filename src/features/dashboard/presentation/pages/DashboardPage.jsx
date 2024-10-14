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
    Grid,
    Button,
    Input,
    Text,
    Spinner, useToast,
} from "@chakra-ui/react";
import {MdFileCopy} from "react-icons/md";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import IconBox from "../../../common/presentation/layouts/IconBoxLayout";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import Usa from "../../../../assets/img/flags/usa.png";
import MiniStatistics from "../components/MiniStatistics";
import Share from "../components/Share";
import {DashboardService} from "../../data/dashboard_service";

function DashboardPage({auth}) {
    const toast = useToast();
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [stockData, setStockData] = useState([]);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const [portfolio, setPortfolio] = useState([]);
    const [tickerInfo, setTickerInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await DashboardService.fetchTickers();
                setCompanies(res.data.data);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        }

        async function fetchPortfolio() {
            try {
                const res = await DashboardService.fetchShares();
                setPortfolio(res.data.data);
            } catch (error) {
                console.error('Error fetching portfolio', error);
            }
        }

        fetchCompanies();
    }, []);

    const handleCompanyChange = async (ticker) => {
        const company = ticker;
        setSelectedCompany(company);
        setLoading(true);
        try {
            const apiKey = 'L4UpQeptdTZhC94xjP7W9laT_JL0WXZl';
            const url = `https://api.polygon.io/v2/aggs/ticker/${company}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${apiKey}`;
            const res = await axios.get(url);
            setStockData(res.data.results);

            const infoRes = await axios.get(`https://api.polygon.io/v3/reference/tickers/${company}?apiKey=${apiKey}`);
            setTickerInfo(infoRes.data.results);
        } catch (error) {
            console.error('Error fetching stock data or ticker info', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async () => {
        if (buyAmount > 0 && selectedCompany) {
            const data = {
                name: selectedCompany,
                amount: buyAmount,
                price: 100,
                exchange: 'usd',
                symbol: '$'
            }
            try {
                const res = await DashboardService.buyShares(data);
                setPortfolio([...portfolio, {company: selectedCompany, amount: buyAmount}]);
                setBuyAmount(0);
                toast({
                    title: 'Success',
                    description: 'Stock bought successfully',
                    status: 'success',
                    position: 'bottom-left',
                    duration: 3000,
                    isClosable: true,
                })
            } catch (e) {
                toast({
                    title: 'Error',
                    position: 'bottom-left',
                    description: e.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    };

    const handleSell = async (company) => {
        if (sellAmount > 0) {
            const data = {
                name: company,
                amount: sellAmount,
                price:100
            }
            try {
                const res = await DashboardService.sellShares(data);
                setPortfolio(prevPortfolio =>
                    prevPortfolio.map(stock =>
                        stock.company === company
                            ? {...stock, amount: stock.amount - sellAmount}
                            : stock
                    ).filter(stock => stock.amount > 0)
                );
                setSellAmount(0);
            } catch (e) {
                toast({
                    title: 'Error',
                    position: 'bottom-left',
                    description: e.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    };

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3, "2xl": 5}} gap='20px' mb='20px'>
                <MiniStatistics
                    endContent={
                        <Flex me='-16px' mt='10px'>
                            <FormLabel htmlFor='balance'>
                                <Avatar src={Usa}/>
                            </FormLabel>
                        </Flex>
                    }
                    name='Your balance'
                    value={auth.user?.userBalance.balance ? `$${auth.user.userBalance.balance}` :
                        <Spinner size="sm"/>}
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
                    value={portfolio ? portfolio.length : <Spinner size="sm"/>}
                />
            </SimpleGrid>
            <Grid templateColumns={{base: "1fr", md: "2fr 4fr"}} gap='20px'>
                <Flex flexDirection='column'>
                    <CardLayout height={'70vh'} overflowY={'scroll'}>
                        {companies.length > 0 && companies.map((company) => {
                            return (
                                <Share
                                    key={company.ticker}
                                    ticker={company.ticker}
                                    handleCompanySelect={handleCompanyChange}
                                    image={company.icon_url}
                                    name={company.name}
                                    currency_name={company.currency_name}
                                />
                            );
                        })}
                    </CardLayout>
                </Flex>
                <Flex flexDirection='column'>
                    <Flex direction='column'>
                        <CardLayout>
                            {loading ? (
                                <Flex justifyContent="center" alignItems="center" height="100vh">
                                    <Spinner size="xl"/>
                                </Flex>
                            ) : (
                                selectedCompany ? (
                                    <>
                                        <Flex justifyContent={'space-between'} alignItems={'center'}>
                                            <Text
                                                color={textColorPrimary}
                                                fontWeight='bold'
                                                fontSize='2xl'
                                                mt='10px'
                                                mb='4px'>
                                                {tickerInfo.name ? (
                                                    <h2>{tickerInfo.name} ({tickerInfo.ticker})</h2>
                                                ) : '-'}
                                            </Text>
                                        </Flex>
                                        <Text color={textColorSecondary} fontSize='md' me='26px'>
                                            {tickerInfo.market_cap ? tickerInfo.market_cap.toLocaleString() : '-'}
                                        </Text>
                                        <Text fontSize={'sm'} mt={'10px'} color={textColorSecondary}>
                                            {tickerInfo.description || 'No Description'}
                                        </Text>

                                        <Box mt='20px'>
                                            {Array.isArray(stockData) && stockData.length > 0 ? (
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <LineChart data={stockData}>
                                                        <CartesianGrid strokeDasharray="3 3"/>
                                                        <XAxis dataKey="t"
                                                               tickFormatter={(tick) => new Date(tick).toLocaleDateString()}/>
                                                        <YAxis/>
                                                        <Tooltip
                                                            labelFormatter={(label) => new Date(label).toLocaleDateString()}/>
                                                        <Line type="monotone" dataKey="c" stroke={brandColor}
                                                              dot={false}/>
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <p>No stock data available</p>
                                            )}
                                        </Box>
                                        <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap='24px'>
                                            <Box mt='20px'>
                                                <FormLabel>Amount to Buy</FormLabel>
                                                <Input
                                                    type="number"
                                                    value={buyAmount}
                                                    onChange={(e) => setBuyAmount(e.target.value)}
                                                    placeholder="Enter amount"
                                                />
                                                <Button mt='10px' colorScheme="green" onClick={handleBuy}>
                                                    Buy Stock
                                                </Button>
                                            </Box>

                                            <Box mt='20px'>
                                                <FormLabel>Amount to Sell</FormLabel>
                                                <Input
                                                    type="number"
                                                    value={sellAmount}
                                                    onChange={(e) => setSellAmount(e.target.value)}
                                                    placeholder="Enter amount"
                                                />
                                                <Button mt='10px' colorScheme="red"
                                                        onClick={() => handleSell(selectedCompany)}>
                                                    Sell Stock
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </>
                                ) : (
                                    <Box
                                        height={'75vh'}
                                        width="100%"
                                        display="flex"
                                        flexDirection={'column'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        borderRadius="md"
                                        p={4}
                                    >
                                        <Text fontSize={'lg'} textAlign={'center'}>
                                            Please select a company to view stock data
                                        </Text>
                                    </Box>

                                )
                            )}
                        </CardLayout>
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    );
}

DashboardPage.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {loadUser})(DashboardPage);
