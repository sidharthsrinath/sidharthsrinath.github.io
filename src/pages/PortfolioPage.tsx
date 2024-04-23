import React, { useState, useEffect } from 'react'
/**
 * Theme Dependancies (ancitipated use in later versions)
 */
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '../slices/theme-slice'
import { lightState, darkState } from '../states/theme-states'
/**
 * Main Page Components
 */
import IntroArea from '../sections/IntroArea'
import TransitionArrow from '../components/TransitionArrow'
import CustomCarousel from '../components/ContentCarousel'
import ProjectArea from '../sections/ProjectsArea'


/**
 * Styles
 */
import './PortfolioPage.css'


type PortfolioPageProps = {
    isDarkMode: boolean
    isBigScreen: boolean
    isMediumScreen: boolean
}
export const PortfolioPage: React.FC<PortfolioPageProps> = ({ isDarkMode, isBigScreen, isMediumScreen }) => {
    const bgColorMain = isDarkMode ? '#B70404' : '#FFFAFA'
    const textColorMain = isDarkMode ? "#FEF2F4"  : '#F31559'
// FFF7F1
    const bgColorSecondary = isDarkMode ? '#FFB562' : '#FFFFFF'
    const textColorSecondary = isDarkMode ? '#B70404' : "#C21292"

    const highlightColor = isDarkMode ? "#FEF2F4"  : '#F31559'
    const highlightTextColor = isDarkMode ? '#B70404' : '#FBFBFB' 

    const textUnderlineColor = isDarkMode ? '#FB8B24' : '#FF9800'
    
    const titleBgColor = isDarkMode ? '#FB8B24' : "#FCFFE7"
    
    return (
        <div
            style={{
                position: 'relative', // Positioned relatively to restrict cursor circle
                // overflowX: 'hidden', // meant for cursor circle to npt create extra space - taken out cuz no more cursor circle + dynamic
                width: '100%',
                // height: '300vh', // meant for cursor circle to npt create extra space - taken out cuz no more cursor circle + dynamic
            }}
        >
            <div
                className='styled-div'
                style={{
                    height: window.innerHeight,
                    "--text-color": highlightTextColor,
                    "--selection-color": highlightColor,
                } as React.CSSProperties}
            >
                {/** ITEM 1 */}
                <IntroArea accentColor={textUnderlineColor} bgColor={bgColorMain} textColor={textColorMain} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen}/>

                {/** ITEM 2 */}
                <TransitionArrow arrowColor={textColorMain}/>

                {/** ITEM 3 */}
                <ProjectArea titleBgColor={titleBgColor} bgColor={bgColorSecondary} textColor={textColorSecondary} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen}/>
            </div>
        </div >
    );
};
