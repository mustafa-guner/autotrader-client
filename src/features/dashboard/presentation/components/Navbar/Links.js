import {
    Avatar, Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList,
    Text, useColorMode, useColorModeValue, Spinner
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import {MdNotificationsNone} from 'react-icons/md';
import {FaEthereum} from 'react-icons/fa';
import {SidebarResponsive} from "../../layouts/SidebarLayout";
import {logout} from '../../../../auth/presentation/redux/action';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {links} from "../../../../../utils/constants";
import {IoMdMoon, IoMdSunny} from "react-icons/io";

function Links(props) {
    const {secondary, logout, auth} = props;
    const navigate = useNavigate();
    const navbarIcon = useColorModeValue('gray.400', 'white');
    let menuBg = useColorModeValue('white', 'navy.800');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorBrand = useColorModeValue('brand.700', 'brand.400');
    const ethColor = useColorModeValue('gray.700', 'white');
    const {colorMode, toggleColorMode} = useColorMode();

    const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
    const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
    const ethBox = useColorModeValue('white', 'navy.800');
    const shadow = useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
    );

    const handleLogout = (e) => {
        e.preventDefault();
        return logout().finally(() => navigate(links.public.auth.login));
    }

    return (
        <Flex
            w={{sm: '100%', md: 'auto'}}
            alignItems="center"
            flexDirection="row"
            justifyContent="end"
            flexWrap={secondary ? {base: 'wrap', md: 'nowrap'} : 'unset'}
            p="10px"
            borderRadius="30px">
            {/*<SearchBar mb={secondary ? {base: '10px', md: 'unset'} : 'unset'} me="10px" borderRadius="30px"/>*/}
            <Flex
                bg={ethBg}
                display={secondary ? 'flex' : 'none'}
                borderRadius="30px"
                ms="auto"
                p="6px"
                align="center"
                me="6px">
                <Flex align="center" justify="center" bg={ethBox} h="29px" w="29px" borderRadius="30px" me="7px">
                    <Icon color={ethColor} w="9px" h="14px" as={FaEthereum}/>
                </Flex>
                <Text w="max-content" color={ethColor} fontSize="sm" fontWeight="700" me="6px">
                    1,924
                    <Text as="span" display={{base: 'none', md: 'unset'}}>
                        {' '}
                        ETH
                    </Text>
                </Text>
            </Flex>
            <SidebarResponsive/>
            <Menu>
                <MenuButton p="0px">
                    <Icon mt="6px" as={MdNotificationsNone} color={navbarIcon} w="18px" h="18px" me="10px"/>
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="20px"
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    mt="22px"
                    me={{base: '30px', md: 'unset'}}
                    minW={{base: 'unset', md: '400px', xl: '450px'}}
                    maxW={{base: '360px', md: 'unset'}}>
                    <Flex justify="space-between" w="100%" mb="20px">
                        <Text fontSize="md" fontWeight="600" color={textColor}>
                            Notifications
                        </Text>
                        <Text fontSize="sm" fontWeight="500" color={textColorBrand} ms="auto" cursor="pointer">
                            Mark all read
                        </Text>
                    </Flex>
                    <Flex flexDirection="column">
                        <MenuItem _hover={{bg: 'none'}} _focus={{bg: 'none'}} px="0" borderRadius="8px" mb="10px">
                            Alicia
                        </MenuItem>
                        <MenuItem _hover={{bg: 'none'}} _focus={{bg: 'none'}} px="0" borderRadius="8px" mb="10px">
                            Henry
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
            <Button
                variant="no-hover"
                bg="transparent"
                p="0px"
                minW="unset"
                minH="unset"
                h="18px"
                w="max-content"
                onClick={toggleColorMode}
            >
                <Icon
                    me="10px"
                    h="18px"
                    w="18px"
                    color={navbarIcon}
                    as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
                />
            </Button>
            <Menu>
                <MenuButton p="0px">
                    <Avatar
                        _hover={{cursor: 'pointer'}}
                        color="white"
                        name={auth.user ? auth.user.full_name : ''}
                        bg="#11047A"
                        size="sm"
                        w="40px"
                        h="40px"
                    >
                        {!auth.user && <Spinner size="sm"/>}
                    </Avatar>
                </MenuButton>
                <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
                    <Flex w="100%" mb="0px">
                        <Text
                            ps="20px"
                            pt="16px"
                            pb="10px"
                            w="100%"
                            borderBottom="1px solid"
                            borderColor={borderColor}
                            fontSize="sm"
                            fontWeight="700"
                            color={textColor}>
                            👋&nbsp; Hey, {auth.user?.firstname || 'loading...'}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" p="10px">
                        <MenuItem onClick={() => navigate(links.protected.profile)} _hover={{bg: 'none'}}
                                  _focus={{bg: 'none'}} borderRadius="8px" px="14px">
                            <Text fontSize="sm">Profile</Text>
                        </MenuItem>
                        <MenuItem onClick={() => navigate(links.protected.settings)} _hover={{bg: 'none'}}
                                  _focus={{bg: 'none'}} borderRadius="8px" px="14px">
                            <Text fontSize="sm">Settings</Text>
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                            _hover={{bg: 'none'}}
                            _focus={{bg: 'none'}}
                            color="red.400"
                            borderRadius="8px"
                            px="14px">
                            <Text fontSize="sm">Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

Links.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
    logout: PropTypes.func,
    auth: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Links);
