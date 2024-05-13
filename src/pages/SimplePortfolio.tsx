import CustomScrollbar from "../components/CustomScrollbar"
import Intro from "../components/SimplePortfolio/Intro"



type SimplePortfolioProps = {
    isDarkMode: boolean
    isDesktopScreen: boolean
    isLaptopScreen: boolean
    isMobileScreen: boolean
}

const SimplePortfolio: React.FC<SimplePortfolioProps> = ({ isDarkMode, isDesktopScreen, isLaptopScreen, isMobileScreen }) => {

    const bgColorMain = isDarkMode ? '#BC7FCD' : '#FFFFFF'
    const textColorMain = isDarkMode ? "#FEF2F4" : '#524C42'

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
                position: 'relative',
                backgroundColor: bgColorMain,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CustomScrollbar key={0} colors={[textColorMain, textColorTertiary, textColorSecondary, textColorSecondary]} pageColors={[bgColorMain, bgColorTertiary, bgColorSecondary, bgColorSecondary]} showLastPage={true} />


            <Intro key={1} isDarkMode={isDarkMode} isDesktopScreen={isDesktopScreen} isLaptopScreen={isLaptopScreen} isMobileScreen={isMobileScreen} textColor={textColorMain} bgColor={bgColorMain} />

        </div>
    )
}

export default SimplePortfolio