import React, { useState, useEffect } from 'react';
/**
 * Theme Dependancies (ancitipated use in later versions)
 */
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../slices/theme-slice';
import { lightState, darkState } from '../states/theme-states';
/**
 * Main Page Components
 */
import IntroArea from '../components/IntroArea';
import TransitionArrow from '../components/TransitionArrow';
import CustomCarousel from '../components/ContentCarousel';

/**
 * Styles
 */
import './PortfolioPage.css'


type PortfolioPageProps = {
    isBigScreen: boolean
}
export const PortfolioPage: React.FC<PortfolioPageProps> = ({ isBigScreen }) => {
    const [page1TransitionClicked, setPage1TransitionClicked] = useState(false);

    return (
        <div
            className='styled-div'
            style={{
                height: window.innerHeight,
                "--text-color": 'green',
                "--selection-color": 'beige',
            } as React.CSSProperties}
        >
            {/** ITEM 1 */}
            <IntroArea matches={isBigScreen} />

            {/** ITEM 2 */}
            <TransitionArrow setTransitionState={setPage1TransitionClicked} />

            {/** ITEM 3 */}
            <CustomCarousel />
        </div>

    );
};
