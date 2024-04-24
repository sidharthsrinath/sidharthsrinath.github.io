import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTheme } from './slices/theme-slice';
import { lightState, darkState } from './states/theme-states'; // Assume you export these

import MenuLite from './components/MenuLite';
import { PortfolioPage } from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ChatBox from './components/ChatBox';


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
        window.matchMedia("(min-width: 1900px)").matches
    )
    useEffect(() => {
        window
            .matchMedia("(min-width: 1900px)")
            .addEventListener('change', e => {
                setIsBigScreen(e.matches)
            });
    }, []);

    /**
     * Control Media Query-Based Sizing: Small Screens
     */
    const [isMediumScreen, setIsMediumScreen] = useState(
        window.matchMedia("(min-width: 1500px)").matches
    )
    useEffect(() => {
        window
            .matchMedia("(min-width: 1500px)")
            .addEventListener('change', e => {
                setIsMediumScreen(e.matches)
            });
    }, []);

    return (
        <ChakraProvider>

                {/** Menu Item */}
                <MenuLite isSmall={isMediumScreen} currPage={currentPage} pageSetter={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />

                {/** Main Portfolio Page */}
                {currentPage === 'portfolio' && <PortfolioPage isDarkMode={darkMode} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} />}

                {/** About Me Page */}
                {currentPage === 'about' && <AboutPage isMediumScreen={isMediumScreen} />}
        </ChakraProvider>
    );
};
