import React from 'react';
import Sidebar from "../../../../App";
import {Box} from "@chakra-ui/react";

function DashboardLayout({children}) {
    return (
        <Box>
            <Box>
                <Sidebar display='none'/>
                <Box
                    float='right'
                    minHeight='100vh'
                    height='100%'
                    overflow='auto'
                    position='relative'
                    maxHeight='100%'
                    w={{base: '100%', xl: 'calc( 100% - 290px )'}}
                    maxWidth={{base: '100%', xl: 'calc( 100% - 290px )'}}
                    transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                    transitionDuration='.2s, .2s, .35s'
                    transitionProperty='top, bottom, width'
                    transitionTimingFunction='linear, linear, ease'>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardLayout;
