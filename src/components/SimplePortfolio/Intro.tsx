import React, { useEffect, useState } from 'react';
import IntroSection from './IntroSection';
import BackgroundSection from './BackgroundSection';
import TechnicalProficienciesArea from '../../sections/TechnicalProficienciesArea';
import getResultantColor from '../../utils/ColorUtils';
import ProjectsSection from './ProjectsSection';
import { Email, GitHub, LinkedIn } from '@mui/icons-material';

type IntroProps = {
    bgColor: string;
    isDarkMode: boolean;
    isDesktopScreen: boolean;
    isLaptopScreen: boolean;
    isMobileScreen: boolean;
    textColor: string;
}

const Intro: React.FC<IntroProps> = ({ bgColor, isDarkMode, isDesktopScreen, isLaptopScreen, isMobileScreen, textColor }) => {
    const [currSection, setCurrSection] = useState<'intro' | 'about' | 'experience' | 'projects'>('intro');

    const gapShift = isMobileScreen ? 20 : 20;

    const menuFontMultiplier = isMobileScreen ? .8 : .8;
    const menuFontSize = `${menuFontMultiplier * (window.innerWidth * 0.01) + menuFontMultiplier * (window.innerHeight * 0.01)}px`;

    const iconFontMultiplier = isMobileScreen ? 1.5 : 1.5;
    const iconFontSize = `${iconFontMultiplier * (window.innerWidth * 0.01) + iconFontMultiplier * (window.innerHeight * 0.01)}px`;

    const border = `1px solid ${textColor}`
    const cardBorderRadius = 20

    const bgColorTertiary = isDarkMode ? '#FB6D48' : '#FFFFFF'
    const textColorTertiary = isDarkMode ? '#F7EEDD' : "#F2613F"

    const menuItemStyle = {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '7px 10px',
    } as React.CSSProperties

    const menuBgStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        display: 'flex',
        borderRadius: cardBorderRadius,
        backgroundColor: '#8CABFF40',
        transition: 'all 0.2s ease-in-out',
    } as React.CSSProperties



    useEffect(() => {
        const menubg = document.getElementById('menu-bg');
        const currSec = document.getElementById(`menu-${currSection}`);
        if (menubg && currSec) {
            menubg.style.width = `${currSec.clientWidth}px`;
            menubg.style.height = `${currSec.clientHeight}px`;
            menubg.style.left = `${currSec.offsetLeft}px`;
        }


    }, [currSection]);

    return (
        <div
            style={{
                minHeight: '100vh',
                height: '100vh',
                width: '100vw',
                minWidth: '100vw',
                maxWidth: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <IntroSection isMobileScreen={isMobileScreen} isDesktopScreen={isDesktopScreen} isLaptopScreen={isLaptopScreen} textColor={textColor} />

            {/* <BackgroundSection isMobileScreen={isMobileScreen} isDesktopScreen={isDesktopScreen} isLaptopScreen={isLaptopScreen} textColor={textColor} /> */}

            <ProjectsSection isMobileScreen={isMobileScreen} isDesktopScreen={isDesktopScreen} isLaptopScreen={isLaptopScreen} textColor={textColor} />
        </div>

    );
}

export default Intro;
