import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTheme } from './slices/theme-slice';
import { lightState, darkState } from './states/theme-states'; // Assume you export these

import MenuLite from './components/MenuLite';
import { PortfolioPage } from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';


export const App = () => {
    /**
     * Control Current Page Centrally
     */
    const [currentPage, setCurrentPage] = useState<'portfolio' | 'about'>('portfolio')

    /**
     * Control Theme Mode Centrally
     */
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const dispatch = useDispatch();

    /**
     * Control Media Query-Based Sizing: Big Screens
     */
    const [isBigScreen, setIsBigScreen] = useState(
        window.matchMedia("(min-width: 1200px)").matches
    )
    useEffect(() => {
        window
            .matchMedia("(min-width: 1200px)")
            .addEventListener('change', e => {
                setIsBigScreen(e.matches)
            });
    }, []);

    /**
     * Control Media Query-Based Sizing: Small Screens
     */
    const [isMediumScreen, setIsMediumScreen] = useState(
        window.matchMedia("(min-width: 800px)").matches
    )
    useEffect(() => {
        window
            .matchMedia("(min-width: 800px)")
            .addEventListener('change', e => {
                setIsMediumScreen(e.matches)
            });
    }, []);

    return (
        <ChakraProvider>
            {/** Menu Item */}
            <MenuLite currPage={currentPage} pageSetter={setCurrentPage}/>

            {/** Main Portfolio Page */}
            {currentPage === 'portfolio' && <PortfolioPage isBigScreen={isBigScreen} />}

            {/** About Me Page */}
            {currentPage == 'about' && <AboutPage isMediumScreen={isMediumScreen} />}

        </ChakraProvider>
    );
};
