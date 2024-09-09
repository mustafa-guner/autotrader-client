import {NavLink, useLocation} from "react-router-dom";
import {Box, Flex, HStack, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import {links} from "../../../../../utils/constants";
import {
    MdBarChart,
    MdHome,
    MdOutlineShoppingCart
} from "react-icons/md";

const sideBarLinks = [
    {
        path: links.protected.dashboard,
        name: "Dashboard",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
    },
    {
        path: links.protected.shares,
        name: "Shares",
        icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit'/>
    },
    {
        path: links.protected.reports,
        name: "Reports",
        icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit'/>
    },
];

function Links() {
    let location = useLocation();
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue(
        "secondaryGray.600",
        "secondaryGray.600"
    );
    let activeIcon = useColorModeValue("brand.500", "white");
    let textColor = useColorModeValue("secondaryGray.500", "white");
    let brandColor = useColorModeValue("brand.500", "brand.400");
    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    }

    const generateLinks = () => {
        return sideBarLinks.map((link, index) => {
            return (
                <NavLink key={index} to={link.path}>
                    {link.icon ? (
                        <Box>
                            <HStack
                                spacing={
                                    activeRoute(link.path.toLowerCase()) ? "22px" : "26px"
                                }
                                py='5px'
                                ps='10px'>
                                <Flex w='100%' alignItems='center' justifyContent='center'>
                                    <Box
                                        color={
                                            activeRoute(link.path.toLowerCase())
                                                ? activeIcon
                                                : textColor
                                        }
                                        me='18px'>
                                        {link.icon}
                                    </Box>
                                    <Text
                                        me='auto'
                                        color={
                                            activeRoute(link.path.toLowerCase())
                                                ? activeColor
                                                : textColor
                                        }
                                        fontWeight={
                                            activeRoute(link.path.toLowerCase())
                                                ? "bold"
                                                : "normal"
                                        }>
                                        {link.name}
                                    </Text>
                                </Flex>
                                <Box
                                    h='36px'
                                    w='4px'
                                    bg={
                                        activeRoute(link.path.toLowerCase())
                                            ? brandColor
                                            : "transparent"
                                    }
                                    borderRadius='5px'
                                />
                            </HStack>
                        </Box>
                    ) : (
                        <Box>
                            <HStack
                                spacing={
                                    activeRoute(link.path.toLowerCase()) ? "22px" : "26px"
                                }
                                py='5px'
                                ps='10px'>
                                <Text
                                    me='auto'
                                    color={
                                        activeRoute(link.path.toLowerCase())
                                            ? activeColor
                                            : inactiveColor
                                    }
                                    fontWeight={
                                        activeRoute(link.path.toLowerCase()) ? "bold" : "normal"
                                    }>
                                    {link.name}
                                </Text>
                                <Box h='36px' w='4px' bg='brand.400' borderRadius='5px'/>
                            </HStack>
                        </Box>
                    )}
                </NavLink>
            );
        });
    }

    return generateLinks();
}

export default Links;