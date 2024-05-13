import React, { useState, useEffect } from 'react'
/**
 * utils
 */
import getResultantColor from '../utils/ColorUtils'

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
import TechnicalProficienciesArea from '../sections/TechnicalProficienciesArea'


type PortfolioPageProps = {
    isDarkMode: boolean
    isBigScreen: boolean
    isMediumScreen: boolean
}
export const PortfolioPage: React.FC<PortfolioPageProps> = ({ isDarkMode, isBigScreen, isMediumScreen }) => {
    const bgColorMain = isDarkMode ? '#BC7FCD' : '#FFFFFF'
    const textColorMain = isDarkMode ? "#FEF2F4" : '#F31559'

    const bgColorSecondary = isDarkMode ? '#75BBA7' : '#FFFFFF'
    const textColorSecondary = isDarkMode ? '#FDFF00' : "#C21292"

    const bgColorTertiary = isDarkMode ? '#FB6D48' : '#FFFFFF'
    const textColorTertiary = isDarkMode ? '#F7EEDD' : "#F94C10"

    const highlightColor = isDarkMode ? "#FEF2F4" : '#F31559'
    const highlightTextColor = isDarkMode ? '#B70404' : '#FBFBFB'

    const textUnderlineColor = isDarkMode ? '#FB8B24' : '#FF9800'

    const titleBgColor = isDarkMode ? '#FB8B24' : "#72FFFF"

    return (
        <div
            style={{
                position: 'relative', // Positioned relatively to restrict cursor circle
                maxWidth:'100vw',
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
                <CustomScrollbar key={0} colors={[textColorMain, textColorTertiary, textColorSecondary, textColorSecondary]} pageColors={[bgColorMain, bgColorTertiary,bgColorSecondary,bgColorSecondary]} showLastPage={true} />
                {/** FIXED POSITION: Transitionary arrow */}
                <TransitionArrow key={1} arrowColor={textColorMain} />

                {/** ITEM 1 */}
                <IntroArea key={2} accentColor={textUnderlineColor} bgColor={bgColorMain} textColor={textColorMain} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} />

                {/** ITEM 2 */}
                <TechnicalProficienciesArea key={3} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} plainBgColor={bgColorTertiary} mainColor={textColorTertiary} canvasBgColor={`${getResultantColor(textColorTertiary, bgColorTertiary)}`} layer={3}/>

                {/** ITEM 3 */}

                <TechnicalProficienciesArea key={3} isBigScreen={isBigScreen} isMediumScreen={isMediumScreen} plainBgColor={bgColorSecondary} mainColor={textColorSecondary} canvasBgColor={`${getResultantColor(textColorSecondary, bgColorSecondary)}`} layer={4}/>



            </div>
        </div >
    );
};
