import {Avatar, Box, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import CardLayout from "../../../common/presentation/layouts/CardLayout";

export default function Banner(props) {
    const {banner, name, email} = props;

    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const borderColor = useColorModeValue(
        "white !important",
        "#111C44 !important"
    );
    return (
        <CardLayout mb={{base: "0px", lg: "20px"}} align='center'>
            <Box
                bg={`url(${banner})`}
                bgSize='cover'
                borderRadius='16px'
                h='131px'
                w='100%'
            />
            <Avatar
                mx='auto'
                color="white"
                name={name}
                bg="#11047A"
                h='87px'
                w='87px'
                mt='-43px'
                border='4px solid'
                borderColor={borderColor}
            />
            <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
                {name}
            </Text>
            <Text color={textColorSecondary} fontSize='sm'>
                {email}
            </Text>
        </CardLayout>
    );
}