import { useEffect, useState } from "react";
import ProjectEntry from "../components/ProjectEntry"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const randomizeHexString = (hexString: string): string => {
    // Extract all but the last two digits
    const mainPart = hexString.slice(0, -1)
    // Generate a random hex value for the last two digits
    const randomLastTwo = Math.floor(Math.random() * 256).toString(16).padStart(1, "0")
    // Combine the main part with the randomized last two digits
    const randomizedHexString = mainPart + randomLastTwo
    return randomizedHexString
}

type ScrollButtonProps = {
    color?: string
    maxLoc: number
    direction: 'right' | 'left'
    currLoc: number
    setNewLoc: (arg0: number) => void
    layer: number
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ color = 'inherit', direction, currLoc, maxLoc, setNewLoc, layer}) => {
    const isInactive = (direction === 'left') ? (currLoc === 0) : (currLoc === maxLoc)
    const [isHovered, setIsHovered] = useState(false)

    const buttonCSS = {
        zIndex: 11,
        position: 'absolute',
        top: '50%',
        left: (direction === 'left') ? 50 : undefined,
        right: (direction === 'right') ? 50 : undefined,
    } as React.CSSProperties
    const iconCSS = {
        opacity: isInactive ? .3 : 1,
        cursor: isInactive ? 'auto' : 'pointer',
        color,
        width: '40px',
        height: '40px',
    } as React.CSSProperties

    return (
        <div
            onClick={() => {
                if (!isInactive) {
                    const n = (direction === 'left') ? Math.max(0, currLoc - 1) : Math.min(maxLoc, currLoc + 1)
                    const newEl = `project${n}${layer ? `-${layer}` : ''}`
                    console.log(newEl)
                    const el = document.getElementById(newEl)
                    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                    setNewLoc(n)
                }
            }}
            style={buttonCSS}
        >
            {(direction === 'left') ?
                <ArrowBackIos style={iconCSS} /> :
                <ArrowForwardIos style={iconCSS} />
            }
        </div>
    )
}

type ProjectAreaProps = {
    isBigScreen: boolean
    isMediumScreen: boolean
    textColor: string
    bgColor: string
    titleBgColor: string
    layer: number
}

const ProjectArea: React.FC<ProjectAreaProps> = ({ isBigScreen, isMediumScreen, textColor, bgColor, titleBgColor, layer}) => {
    const titleFontSize = isMediumScreen ? isBigScreen ? '60px' : '40px' : '40px'
    const titleMinHeight = isMediumScreen || isBigScreen ? '100px' : '70px'
    const [currEl, setCurrEl] = useState<number>(0)
    const numEls = 8
    const [position, setPosition] = useState<'fixed' | 'relative'>('relative')

    return (

            <div
                id="top"
                style={{
                    position,
                    minHeight: '100vh',
                    zIndex: 2,
                    backgroundColor: bgColor
                }}
            >
                <ScrollButton direction="left" currLoc={currEl} setNewLoc={setCurrEl} maxLoc={numEls - 1} color={textColor} layer={layer}/>
                <ScrollButton direction="right" currLoc={currEl} setNewLoc={setCurrEl} maxLoc={numEls - 1} color={textColor} layer={layer}/>

                <div
                    style={{
                        zIndex: layer,
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
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                    }}
                >
                    {Array.from(Array(numEls)).map((v, i, a) => {
                        const currId = `project${i}${layer ? `-${layer}` : ''}`
                        return (<ProjectEntry
                            id={currId}
                            key={i}
                            textColor={textColor}
                            descInfo={"Hello World Description"}
                            imgInfo={require('/Users/sidharthsrinath/Documents/portfolio/sansidpoonal/src/assets/example2.png')}
                            toolsInfo={"Typescript, React"}
                            tagInfo={"Spring 2024, Sidharth Srinath"}
                            isBigScreen={isBigScreen}
                            isMediumScreen={isMediumScreen}
                        />)
                    })}
                </div>

        </div>
    )
}

export default ProjectArea
