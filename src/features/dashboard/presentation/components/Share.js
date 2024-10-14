import React from "react";
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";


const Share = (props) => {
    const { image, name, ticker } = props;
    const textColor = useColorModeValue("brands.900", "white");
    const bgItem = useColorModeValue(
        { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
        { bg: "navy.700", boxShadow: "unset" }
    );
    return (
        <CardLayout
            onClick ={()=>props.handleCompanySelect(props.ticker)}
            _hover={bgItem}
            bg='transparent'
            cursor='pointer'
            boxShadow='unset'
            py='15px'
            transition='0.2s linear'>
            <Flex direction={{ base: "column" }} justify='center'>
                <Flex position='relative' align='center'>
                    <Image src={image? image : 'https://horizon-ui.com/horizon-ui-chakra/static/media/Nft3.3b3e6a4b3ada7618de6c.png'} w='66px' h='66px' borderRadius='20px' me='16px' />
                    <Flex
                        direction='column'
                        w={{ base: "70%", md: "100%" }}
                        me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "md",
                            }}
                            mb='5px'
                            fontWeight='bold'
                            me='14px'>
                            {ticker}
                        </Text>
                        <Text
                            color='secondaryGray.600'
                            fontSize={{
                                base: "sm",
                            }}
                            fontWeight='400'
                            me='14px'>
                            {name}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </CardLayout>
    );
}
export default Share;
