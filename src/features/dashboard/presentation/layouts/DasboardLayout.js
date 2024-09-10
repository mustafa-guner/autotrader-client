import React, {useState} from 'react';
import {Box, Portal, useDisclosure} from "@chakra-ui/react";
import SidebarLayout from "./SidebarLayout";
import NavbarContent from "../components/Navbar/Content";

function DashboardLayout({children}) {
    const {onOpen} = useDisclosure();
    const [fixed] = useState(false);

    return (
        <Box>
            <Box>
                <SidebarLayout display='none'/>
                <Box
                    float='right'
                    minHeight='100vh'
                    height='100%'
                    paddingX={'2.2rem'}
                    paddingY={'1rem'}
                    overflow='auto'
                    position='relative'
                    maxHeight='100%'
                    w={{base: '100%', xl: 'calc( 100% - 290px )'}}
                    maxWidth={{base: '100%', xl: 'calc( 100% - 290px )'}}
                    transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                    transitionDuration='.2s, .2s, .35s'
                    transitionProperty='top, bottom, width'
                    transitionTimingFunction='linear, linear, ease'>
                    <Portal>
                        <Box>
                            <NavbarContent
                                onOpen={onOpen}
                                logoText={'Horizon UI Dashboard PRO'}
                                fixed={fixed}
                            />
                        </Box>
                    </Portal>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardLayout;
