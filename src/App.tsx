import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTheme } from './slices/theme-slice';
import { lightState, darkState } from './states/theme-states'; // Assume you export these

import MenuLite from './components/MenuLite';
import { PortfolioPage } from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ChatBox from './components/ChatBox';
import SimplePortfolio from './pages/SimplePortfolio';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = (e) => setMatches(e.matches);
        media.addEventListener('change', listener);
        
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export const App = () => {
    /**
     * Control Current Page Centrally
     */
    const [currentPage, setCurrentPage] = useState<'portfolio' | 'about' | 'technical'>('portfolio')

    /**
     * Control Theme Mode Centrally
     */
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const dispatch = useDispatch();

    /**
     * Control Media Query-Based Sizing: Big Screens
     */
    const isMobileScreen = useMediaQuery("(max-width: 767px)");

    // Laptop screens (typically screens between 768px and 1440px)
    const isLaptopScreen = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");

    // Desktop screens (typically screens 1440px and wider)
    const isDesktopScreen = useMediaQuery("(min-width: 1440px)");

    return (
        <ChakraProvider>
                
                {/* * Menu Item  */}
                {/* <MenuLite isSmall={isDesktopScreen} currPage={currentPage} pageSetter={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} /> */}

                {/** Main Portfolio Page */}
                {/* {currentPage === 'portfolio' && <PortfolioPage isDarkMode={darkMode} isBigScreen={isDesktopScreen} isMediumScreen={isLaptopScreen} />} */}

                {/** About Me Page */}
                {/* {currentPage === 'about' && <AboutPage isMediumScreen={isLaptopScreen} />} */}

                <SimplePortfolio isDarkMode={darkMode} isDesktopScreen={isDesktopScreen} isLaptopScreen={isLaptopScreen} isMobileScreen={isMobileScreen}/>
                

        </ChakraProvider>
    );
};
