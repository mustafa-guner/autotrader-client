import {SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import Information from "./Information";
import CardLayout from "../../../common/presentation/layouts/CardLayout";

export default function GeneralInformation(props) {
    const {dob,gender,country,member_since} = props;
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    return (
        <CardLayout mb={{base: "0px", "2xl": "20px"}}
                    gridArea={{base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3"}}
                    minH="365px"
                    pe="20px">
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='4px'>
                Profile Information
            </Text>
            <SimpleGrid columns='2' gap='20px'>
                <Information
                    boxShadow={cardShadow}
                    title='Birthday'
                    value={dob}
                />
                <Information
                    boxShadow={cardShadow}
                    title='Gender'
                    value={gender}
                />
                <Information
                    boxShadow={cardShadow}
                    title='Member Since'
                    value={member_since}
                />
                <Information
                    boxShadow={cardShadow}
                    title='Country'
                    value={country}
                />
            </SimpleGrid>
        </CardLayout>
    );
}