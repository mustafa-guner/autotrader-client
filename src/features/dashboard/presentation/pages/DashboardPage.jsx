import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../../auth/presentation/redux/action";
import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    SimpleGrid,
    useColorModeValue,
    Grid,
    Select,
    Button,
    Input,
    FormControl,
    FormHelperText
} from "@chakra-ui/react";
import { MdAttachMoney, MdBarChart, MdFileCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import IconBox from "../../../common/presentation/layouts/IconBoxLayout";
import CardLayout from "../../../common/presentation/layouts/CardLayout";
import Usa from "../../../../assets/img/flags/usa.png";
import MiniStatistics from "../components/MiniStatistics";

 // const apiKey = 'GuBYvd7s_tmsrFqUYrOw9cmoaSZH2kN5';
 const apiKey = 'test'
function DashboardPage({ auth, loadUser }) {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [stockData, setStockData] = useState([]);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const [portfolio, setPortfolio] = useState([]);
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await axios.get(`https://api.polygon.io/v3/reference/tickers?apiKey=${apiKey}`);
                setCompanies(res.data.results);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        }
        fetchCompanies();
    }, []);

    const [tickerInfo, setTickerInfo] = useState({});

    const handleCompanyChange = async (e) => {
        const company = e.target.value;
        setSelectedCompany(company);

        try {
            const res = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${company}/range/1/day/2023-01-01/2023-12-31?apiKey=${apiKey}`);
            setStockData(res.data.results);

            const infoRes = await axios.get(`https://api.polygon.io/v3/reference/tickers/${company}?apiKey=${apiKey}`);
            setTickerInfo(infoRes.data.results);
        } catch (error) {
            console.error('Error fetching stock data or ticker info', error);
        }
    };

    const handleBuy = () => {
        if (buyAmount > 0 && selectedCompany) {
            setPortfolio([...portfolio, { company: selectedCompany, amount: buyAmount }]);
            setBuyAmount(0);
        }
    };

    const handleSell = (company) => {
        if (sellAmount > 0) {
            setPortfolio(prevPortfolio =>
                prevPortfolio.map(stock =>
                    stock.company === company
                        ? { ...stock, amount: stock.amount - sellAmount }
                        : stock
                ).filter(stock => stock.amount > 0) // Remove if amount is 0
            );
            setSellAmount(0);
        }
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }} gap='20px' mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
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
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
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
                                <Avatar src={Usa} />
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
                                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
                            }
                        />
                    }
                    name='Total Shares'
                    value='22'
                />
            </SimpleGrid>
            <Grid gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }} gap={{ base: "20px", xl: "20px" }}>
                <Flex flexDirection='column'>
                    <Flex direction='column'>
                        <CardLayout>
                            <Box>
                                <FormControl>
                                    <FormLabel>Select Company</FormLabel>
                                    <Select placeholder="Select company" onChange={handleCompanyChange}>
                                        {companies.map((company) => (
                                            <option key={company.ticker} value={company.ticker}>
                                                {company.name} ({company.ticker})
                                            </option>
                                        ))}
                                    </Select>
                                    <FormHelperText>Select a company to see its stock data.</FormHelperText>
                                </FormControl>

                                {selectedCompany && (
                                    <Box mt='20px'>
                                        <h2>{tickerInfo.name} ({tickerInfo.ticker})</h2>
                                        <p>Market Cap: ${tickerInfo.market_cap ? tickerInfo.market_cap.toLocaleString() : "N/A"}</p>
                                        <p>Currency: {tickerInfo.currency_name}</p>
                                        <p>Description: {tickerInfo.description}</p>
                                    </Box>
                                )}

                                <Box mt='20px'>
                                    {stockData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={stockData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="t" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                                                <YAxis />
                                                <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                                                <Line type="monotone" dataKey="c" stroke={brandColor} dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p>No stock data available</p>
                                    )}
                                </Box>

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
                                    <Button mt='10px' colorScheme="red" onClick={() => handleSell(selectedCompany)}>
                                        Sell Stock
                                    </Button>
                                </Box>

                                <Box mt='20px'>
                                    <h3>Your Portfolio</h3>
                                    <ul>
                                        {portfolio.map((stock, idx) => (
                                            <li key={idx}>
                                                {stock.company}: {stock.amount} shares
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
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

export default connect(mapStateToProps, { loadUser })(DashboardPage);
