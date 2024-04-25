import { useEffect, useState } from "react";
import ProjectEntry from "../components/ProjectEntry"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

type ScrollButtonProps = {
    color?: string
    maxLoc: number
    direction: 'right' | 'left'
    currLoc: number
    setNewLoc: (arg0: number) => void
    layer: number
    sticky?: boolean
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ color = 'inherit', direction, currLoc, maxLoc, setNewLoc, layer, sticky = false }) => {
    const isInactive = (direction === 'left') ? (currLoc === 0) : (currLoc === maxLoc)
    const [isHovered, setIsHovered] = useState(false)

    const buttonCSS = {
        zIndex: layer + 1,
        position: 'absolute',
        top: '80%',
        left: (direction === 'left') ? '40%' : undefined,
        right: (direction === 'right') ? '40%' : undefined,
    } as React.CSSProperties
    const iconCSS = {
        opacity: sticky ? 0 : isInactive ? .3 : 1,
        cursor: isInactive ? 'auto' : 'pointer',
        color,
        width: '40px',
        height: '40px',
        transition: 'all .5s',
    } as React.CSSProperties

    return (
        <div
            onClick={() => {
                const n = (direction === 'left') ? Math.max(0, currLoc - 1) : Math.min(maxLoc, currLoc + 1)
                setNewLoc(n)
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

const ProjectArea: React.FC<ProjectAreaProps> = ({ isBigScreen, isMediumScreen, textColor, bgColor, titleBgColor, layer }) => {
    const titleFontSize = isMediumScreen ? isBigScreen ? '60px' : '40px' : '40px'
    const titleMinHeight = isMediumScreen || isBigScreen ? titleFontSize : titleFontSize
    const [prevEl, setPrevEl] = useState<number>(0)
    const [currEl, setCurrEl] = useState<number>(0)
    const numEls = 8
    const [position, setPosition] = useState<'fixed' | 'relative'>('relative')
    const thresh = 5
    const top = 0
    
    useEffect(() => {
        setPrevEl(currEl)
        /** Sticky Effect for the page */
        const handleScroll = () => {
            const currTop = window.scrollY
            if (layer === 2) console.log(currTop, (layer) * window.innerHeight)
            setPosition(currTop > (layer - 1) * window.innerHeight + thresh ? 'fixed' : 'relative')
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (prevEl !== currEl) {
            const el = document.getElementById(`project${currEl}${layer ? `-${layer}` : ''}`)
            el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            setPrevEl(currEl)
        }
    }, [currEl])

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor:titleBgColor,
            }}
        >
            <div
                id="top"
                style={{
                    position,
                    top,
                    minHeight: '100%',
                    zIndex: 2,
                    backgroundColor: bgColor,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 1s',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                    }}
                >
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
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Projects
                    </div>
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
                            prop_key={i}
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
            <ScrollButton direction="left" currLoc={currEl} setNewLoc={setCurrEl} maxLoc={numEls - 1} color={textColor} layer={layer} sticky={position === 'fixed'} />
            <ScrollButton direction="right" currLoc={currEl} setNewLoc={setCurrEl} maxLoc={numEls - 1} color={textColor} layer={layer} sticky={position === 'fixed'} />
        </div>
    )
}

export default ProjectArea