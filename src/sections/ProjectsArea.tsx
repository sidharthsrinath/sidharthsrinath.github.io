import { useEffect, useState } from "react";
import ProjectEntry from "../components/ProjectEntry"
import Grid from '../assets/grid.png'

function getRandomRadiusAndPosition(screenWidth: number, screenHeight: number) {
    const randomRadius = Math.floor(Math.random() * 20) + 20; // Radius between 200 and 500
    const randomX = Math.floor(Math.random() * (screenWidth - randomRadius * 2)); // Ensure it fits within the screen
    const randomY = Math.floor(Math.random() * (screenHeight - randomRadius * 2)); // Ensure it fits within the screen

    return {
        radius: randomRadius,
        x: randomX,
        y: randomY,
    };
}

type RandomCirclesProps = {
    count: number
    screenWidth: number
    screenHeight: number
    color: string
}

// React component to render circular divs with randomized parameters
const RandomCircles: React.FC<RandomCirclesProps> = ({ count, screenWidth, screenHeight, color }) => {
    // Generate an array of random circles
    const circles = Array.from({ length: count }, (_, index) => {
        const { radius, x, y } = getRandomRadiusAndPosition(screenWidth, screenHeight);

        // Style for the circular div
        const circleStyle: React.CSSProperties = {
            position: "absolute",
            top: y,
            left: x,
            width: radius * 2,
            height: radius * 2,
            borderRadius: "50%",
            backgroundColor: color, // Example color
            opacity: .5,
        };

        return <div key={index} style={circleStyle} />; // Return the circular div
    });

    return <>{circles}</>; // Render the array of circular divs
};


type ProjectAreaProps = {
    isBigScreen: boolean
    isMediumScreen: boolean
    textColor: string
    bgColor: string
    titleBgColor: string
}

const ProjectArea: React.FC<ProjectAreaProps> = ({ isBigScreen, isMediumScreen, textColor, bgColor, titleBgColor }) => {
    const titleFontSize = isMediumScreen ? isBigScreen ? '60px' : '40px' : '40px'
    const titleMinHeight = isMediumScreen || isBigScreen ? '100px' : '70px'

    const randomizeHexString = (hexString: string): string => {
        // Extract all but the last two digits
        const mainPart = hexString.slice(0, -1);

        // Generate a random hex value for the last two digits
        const randomLastTwo = Math.floor(Math.random() * 256).toString(16).padStart(1, "0");

        // Combine the main part with the randomized last two digits
        const randomizedHexString = mainPart + randomLastTwo;

        return randomizedHexString;
    }

    const [imgFix, setImgFix] = useState<'fixed' | 'absolute'>('absolute')

    useEffect(() => {
        const handleScroll = (e) => {
            if (window.scrollY >= window.innerHeight) {
                setImgFix('fixed')
            }
            else {
                setImgFix('absolute')
            }
        }

        window.addEventListener('scroll', handleScroll)

        return(() => window.removeEventListener('scroll', handleScroll))
    }, [])





    return (
        <div
            id="top"
            style={{
                position: 'relative',
                minHeight: '100vh',
                zIndex: 10000,
                overflowX: 'hidden',
            }}
        >
            
            <div
                style={{
                    zIndex: 2,
                    top: 0,
                    position: 'absolute',
                    color: textColor,
                    fontSize: titleFontSize,
                    fontWeight: 300,
                    fontFamily: "Nanum Gothic Coding",
                    backgroundColor: titleBgColor,
                    // minHeight: titleMinHeight,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Projects
            </div>

            <div
                style={{
                    zIndex: 2,
                    display: 'grid',
                    gridTemplateColumns: isBigScreen ? 'repeat(1, 1fr)' : 'auto',
                    gridTemplateRows: isBigScreen ? 'repeat(2, 1fr)' : 'auto',
                    padding: '0px 0px',
                }}
            >
                <ProjectEntry
                    key={1}
                    textColor={textColor}
                    bgColor={bgColor}
                    // bgColor="transparent"
                    descInfo={""}
                    imgInfo={require('/Users/sidharthsrinath/Documents/sansidpoonal/sansidpoonal/src/assets/example2.png')}
                    toolsInfo={"Typescript, React"}
                    tagInfo={"Spring 2024, Sidharth Srinath"}
                    isBigScreen={isBigScreen}
                    isMediumScreen={isMediumScreen}
                />
                <ProjectEntry
                    key={2}
                    textColor={textColor}
                    bgColor={"#FEFEFA"}
                    // bgColor="transparent"
                    descInfo={"Hello World Description"}
                    imgInfo={require('/Users/sidharthsrinath/Documents/sansidpoonal/sansidpoonal/src/assets/example2.png')}
                    toolsInfo={"Typescript, React"}
                    tagInfo={"Spring 2024, Sidharth Srinath"}
                    isBigScreen={isBigScreen}
                    isMediumScreen={isMediumScreen}
                />


            </div>
        </div>
    )
}

export default ProjectArea