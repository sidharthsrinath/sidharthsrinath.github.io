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
import CustomScrollbar from '../components/CustomScrollbar'


type PortfolioPageProps = {
    isDarkMode: boolean
    isBigScreen: boolean
    isMediumScreen: boolean
}
export const PortfolioPage: React.FC<PortfolioPageProps> = ({ isDarkMode, isBigScreen, isMediumScreen }) => {
    const bgColorMain = isDarkMode ? '#B70404' : '#FFFFFF'
    const textColorMain = isDarkMode ? "#FEF2F4" : '#F31559'

    const bgColorSecondary = isDarkMode ? '#B70404' : '#FFFFFF'
    const textColorSecondary = isDarkMode ? '#378CE7' : "#C21292"

    const highlightColor = isDarkMode ? "#FEF2F4" : '#F31559'
    const highlightTextColor = isDarkMode ? '#B70404' : '#FBFBFB'

    const textUnderlineColor = isDarkMode ? '#FB8B24' : '#FF9800'

    const titleBgColor = isDarkMode ? '#FB8B24' : "#72FFFF"

    return (
        <div
            style={{
                position: 'relative', // Positioned relatively to restrict cursor circle
                // overflowX: 'hidden', // meant for cursor circle to npt create extra space - taken out cuz no more cursor circle + dynamic
                // width: '100%',
                // overflowY: 'auto',
                // scrollbarWidth: 'none',
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
                {/** FIXED POSITION: Custom Scrollbar */}
                <CustomScrollbar colors={[bgColorMain, bgColorSecondary,bgColorSecondary,bgColorSecondary]} pageColors={[textColorMain, textColorSecondary, textColorSecondary, textColorSecondary]} />
                {/** FIXED POSITION: Transitionary arrow */}
                <TransitionArrow arrowColor={textColorMain} />

                {/** ITEM 1 */}
                <IntroArea accentColor={textUnderlineColor} bgColor={bgColorMain} textColor={textColorMain} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} />

                {/** ITEM 2-4 */}
                <ProjectArea key={1} titleBgColor={titleBgColor} bgColor={bgColorSecondary} textColor={textColorSecondary} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} layer={2}/>
                <ProjectArea key={2} titleBgColor={titleBgColor} bgColor={bgColorSecondary} textColor={textColorSecondary} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} layer={3}/>
                <ProjectArea titleBgColor={titleBgColor} bgColor={bgColorSecondary} textColor={textColorSecondary} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} layer={4}/>


            </div>
        </div >
    );
};
