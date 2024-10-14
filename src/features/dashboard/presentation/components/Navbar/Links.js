import {
    Avatar,
    Button,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    Spinner,
    Box
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import { SidebarResponsive } from "../../layouts/SidebarLayout";
import { logout, updateBalance } from '../../../../auth/presentation/redux/action';
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { links } from "../../../../../utils/constants";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { addNotification, getNotifications } from "../../redux/action";
import Pusher from 'pusher-js';

function Links(props) {
    const dispatch = useDispatch();
    const { secondary, logout, auth, notifications, getNotifications } = props;
    const navigate = useNavigate();
    const navbarIcon = useColorModeValue('gray.400', 'white');
    const menuBg = useColorModeValue('white', 'navy.800');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorBrand = useColorModeValue('brand.700', 'brand.400');
    const ethColor = useColorModeValue('gray.700', 'white');
    const { colorMode, toggleColorMode } = useColorMode();
    const [isNewNotification, setIsNewNotification] = useState(false);

    useEffect(() => {
        if (auth.user?.id) {
            getNotifications();
            const pusher = new Pusher('cce57173e8fb1f1e49d0', {
                cluster: 'eu',
                authEndpoint: 'http://trader.test/api/pusher/auth',
            });

            const channel = pusher.subscribe(`private-notifications.${auth.user.id}`);
            channel.bind('App\\Events\\NotificationCreated', function (data) {
                console.log('Notification received: ', data);
                dispatch(addNotification(data));

                if (data.balance) {
                    dispatch(updateBalance(data.balance));
                }

                setIsNewNotification(true); // Trigger the animation
                setTimeout(() => setIsNewNotification(false), 1000); // Reset after 1 second
            });

            return () => {
                pusher.unsubscribe(`private-notifications.${auth.user.id}`);
            };
        }
    }, [auth.user?.id, getNotifications]);

    const handleLogout = (e) => {
        e.preventDefault();
        return logout().finally(() => navigate(links.public.auth.login));
    }

    const handleSettingsClick = () => {
        navigate(`${links.protected.settings}?tab=balance`);
    };

    return (
        <Flex
            w={{ sm: '100%', md: 'auto' }}
            alignItems="center"
            flexDirection="row"
            justifyContent="end"
            flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
            p="10px"
            borderRadius="30px">
            <Text me="6px" fontSize="sm"
                  onClick={handleSettingsClick}
                  cursor="pointer"
                  fontWeight="700" color={ethColor}>
                {auth.user?.userBalance.balance ? `${auth.user.userBalance.balance} ${auth.user.userBalance.currency}` :
                    <Spinner size="sm" />}
            </Text>
            <SidebarResponsive />
            <Menu>
                <MenuButton position={'relative'} p="0px">
                        <Icon
                            mt="6px"
                            as={MdNotificationsNone}
                            color={navbarIcon}
                            w="20px"
                            h="20px"
                            me="10px"
                        />
                        {notifications.notifications.length > 0 && (
                            <Box
                                position="absolute"
                                top="-5px"
                                width={'17px'}
                                height={'17px'}
                                right="3px"
                                bg="red.400"
                                textAlign={'center'}
                                display={"flex"}
                                alignItems={'center'}
                                justifyContent={'center'}
                                borderRadius="full"
                                color="white"
                                fontSize="xs"
                                zIndex="1"
                            >
                                {notifications.notifications.length}
                            </Box>
                        )}
                </MenuButton>
                <MenuList
                    boxShadow="lg"
                    p="20px"
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    height={'422px'}
                    overflowY={'scroll'}
                    mt="22px"
                    me={{ base: '30px', md: 'unset' }}
                    minW={{ base: 'unset', md: '400px', xl: '450px' }}
                    maxW={{ base: '360px', md: 'unset' }}>
                    <Flex justify="space-between" w="100%" mb="20px">
                        <Text fontSize="md" fontWeight="600" color={textColor}>Notification</Text>
                    </Flex>
                    <Flex flexDirection="column">
                        {Array.isArray(notifications.notifications) && notifications.notifications.length > 0 ? (
                            notifications.notifications.map((notification, index) => (
                                <MenuItem key={index} _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px="3"
                                          borderRadius="8px" mb="10px">
                                    <Icon me="10px" as={notification.icon} color={textColorBrand} />
                                    {notification.message}
                                </MenuItem>
                            ))
                        ) : (
                            <Text>You don't have any notifications</Text>
                        )}
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
                        _hover={{ cursor: 'pointer' }}
                        color="white"
                        name={auth.user ? auth.user.full_name : ''}
                        bg="#11047A"
                        size="sm"
                        w="40px"
                        h="40px"
                    >
                        {!auth.user && <Spinner size="sm" />}
                    </Avatar>
                </MenuButton>
                <MenuList boxShadow="lg" p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
                    <Flex w="100%" mb="0px">
                        <Text
                            ps="20px"
                            pt="16px"
                            pb="10px"
                            w="100%"
                            borderBottom="1px solid"
                            borderColor="gray.200"
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
                        <MenuItem onClick={() => navigate(links.protected.settings)} _hover={{ bg: 'none' }}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout} _hover={{ bg: 'none' }}>
                            Logout
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

Links.propTypes = {
    secondary: PropTypes.bool,
    auth: PropTypes.object,
    notifications: PropTypes.object,
    getNotifications: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    notifications: state.notifications,
});

export default connect(mapStateToProps, { logout, getNotifications })(Links);
