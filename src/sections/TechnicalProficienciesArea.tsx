import { on } from "events"
import React, { useEffect, useState } from "react"
import Info from '../json/technicalSkills.json'
import { set } from "lodash";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Expand, ExpandLess, ExpandMore } from "@mui/icons-material";

const StrikeThrough: React.FC<{ id: string; hoveredTab: string, layer: number }> = ({ id, hoveredTab, layer }) => {
    return (
        <div
            id={`strike-${id}`}
            style={{
                zIndex: layer,
                position: 'absolute',
                // width: (id === hoveredTab) ? '100%' : 0,
                left: (hoveredTab === id) ? 0 : '-100%',
                width: '100%',
                height: '5px',
                backgroundColor: 'red',
                transition: 'all .3s', // Explicitly transitioning the 'transform' property
                // transform: hoveredTab === id ? 'translateX(0px)' : 'translateX(-200px)',
            }}
        />
    )
}

type TechnicalProficienciesAreaProps = {
    layer?: number
}
const TechnicalProficienciesArea: React.FC<TechnicalProficienciesAreaProps> = ({ layer = 0 }) => {

    const [headers, setHeaders] = useState<string[]>([])

    const [hoveredTab, setHoveredTab] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string>(undefined)
    const [toolsExpanded, setToolsExpanded] = useState<boolean>(true)

    const plainBgColor = '#FFFFFF'
    const mainColor = '#F94C10'
    const contrastColor = '#F8DE22'
    const contrastOpacity = 35

    const font = "VT323, monospace"

    const tabFontSize = 18
    const tabFontWeight = 400
    const tabFontStyle = 'normal'

    const listFontSize = 18
    const listFontWeight = 400
    const listFontStyle = 'normal'
    const listSpacing = 2

    const outerPadding = 10
    const innerPadding = '.5vh .5vw'
    const containerWidth = 80
    const containerHeight = 80
    const containerBorder = `1px solid ${mainColor}`
    const containerBgColor = `${mainColor}20`
    const containerBgBlur = `blur(10px)`

    const cornerRadius = 6

    const onHover = (id: string) => {
        setHoveredTab(id)
        document.getElementById(id).style.opacity = '.7'
    }
    const onUnHover = (id: string) => {
        setHoveredTab('')
        document.getElementById(id).style.opacity = '1'
    }

    const updateActiveBg = () => {
        const activeTabBg = document.getElementById('active-tab-bg')
        const activeTabEl = document.getElementById(activeTab)
        const containerLeft = document.getElementById('tabs-container').getBoundingClientRect().left

        if (activeTabBg && activeTabEl) {
            const activeTabRect = activeTabEl.getBoundingClientRect()
            activeTabBg.style.width = `${activeTabRect.width}px`
            activeTabBg.style.left = `${activeTabRect.left - containerLeft}px`
        }
    }

    const tabCSS = {
        zIndex: layer + 3,
        padding: innerPadding,
        position: 'relative',
        color: mainColor,
        fontFamily: font,
        fontStyle: tabFontStyle,
        fontSize: tabFontSize,
        fontWeight: tabFontWeight,
        cursor: 'pointer',
        borderLeft: containerBorder,
        borderBottom: containerBorder,
        borderBottomLeftRadius: cornerRadius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        transition: 'all .3s',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    } as React.CSSProperties

    useEffect(() => {
        updateActiveBg()
    }, [activeTab,])

    useEffect(() => {
        setHeaders(Object.keys(Info).reverse())
    }, [])

    return (
        <div
            style={{
                zIndex: layer,
                position: 'relative',
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: plainBgColor,
            }}
        >

            {/** Canvas container */}
            <div
                style={{
                    zIndex: layer + 1,
                    backgroundColor: containerBgColor,
                    borderRadius: cornerRadius,
                    width: `${containerWidth}%`,
                    height: `${containerHeight}%`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5rem',
                    padding: outerPadding,
                }}
            >
                {/** Tabs Container*/}
                <div
                    id={'tabs-container'}
                    style={{
                        width: '100%',
                        minHeight: '5%',
                        padding: '2px',
                        zIndex: layer + 2,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '1rem',
                        overflow: 'hidden',
                    }}
                >
                    {/** Info Tabs*/}
                    {
                        Array.from(headers).map((tab, index) => (
                            <div
                                id={`tab-${tab}`}
                                key={`key-${tab}`}
                                onMouseEnter={async () => {
                                    await setTimeout(() => setActiveTab(`tab-${tab}`), 100) //give effect of slight delay
                                }}
                                onMouseDown={() => {
                                    const curr = document.getElementById(`tab-${tab}`)
                                }}
                                style={tabCSS}
                            >
                                {tab}
                                {/** strikethrough */}
                                <StrikeThrough key={index} id={`tab-${tab}`} hoveredTab={hoveredTab} layer={layer + 3} />
                            </div>
                        ))
                    }

                    {/** Active Tab Background */}
                    <div
                        id={'active-tab-bg'}
                        style={{
                            zIndex: Math.min(1, layer + 2),
                            position: 'absolute',
                            padding: `1vh 1vw`,
                            width: '1px',
                            left: -50,
                            height: '100%',
                            backgroundColor: `${contrastColor}${contrastOpacity}`,
                            borderBottomLeftRadius: cornerRadius,
                            opacity: 1,
                            transition: 'all .5s',
                        }}
                    />
                </div>

                {/** Info + Experiences Area Container */}
                <div
                    style={{
                        zIndex: layer + 2,
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        maxHeight: '95%',
                        borderLeft: containerBorder,
                        borderBottom: containerBorder,
                        borderBottomLeftRadius: cornerRadius,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'start',
                        padding: '5px',
                        gap: '5px',
                    }}
                >
                    {/** Info Area Container */}
                    <div
                        style={{
                            zIndex: layer + 4,
                            position: 'relative',
                            border: containerBorder,
                            borderRadius: cornerRadius,
                            width: '30%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: '2.5px',
                            overflow: 'scroll',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {/** Tools Container */}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                alignItems: 'center',
                                gap: '2.5px',
                            }}
                        >
                            {/** Tools Title  Area */}
                            <span
                                style={{
                                    position: 'relative',
                                    width:'100%',
                                    fontFamily: font,
                                    fontStyle: tabFontStyle,
                                    fontSize: tabFontSize,
                                    fontWeight: tabFontWeight,
                                    color: mainColor,
                                    borderBottom: containerBorder,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {/** Close Items */}
                                <span
                                    style={{
                                        height:'100%',
                                        position: 'absolute',
                                        left:0,
                                        top:0,
                                        cursor: 'pointer',
                                        transform: toolsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    }}
                                    onClick={() => setToolsExpanded(!toolsExpanded)}
                                >
                                    <ExpandMore />
                                </span>
                                Tools
                            </span>

                            {/** Tools List Container*/}
                            <div
                                id={'tools-list-container'}
                                style={{
                                    width: '100%',
                                    height: toolsExpanded ? '100%' : '0%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    gap: `${listSpacing}px`,
                                    overflowY: 'scroll',
                                    scrollbarWidth: 'none',
                                }}
                            >
                                {/** Tools List */}
                                {Array.from(Info[activeTab ? activeTab.split('-')[1] : 'Data Science']['Tools']).map((tool: string, index) => (
                                    <div
                                        id={`tools-${tool}`}
                                        onMouseEnter={() => {
                                            document.getElementById(`tools-${tool}`).style.backgroundColor = `${contrastColor}${contrastOpacity}`
                                        }}
                                        onMouseLeave={() => {
                                            document.getElementById(`tools-${tool}`).style.backgroundColor = ''
                                        }}
                                        style={{
                                            position: 'relative',
                                            zIndex: layer + 5,
                                            width: '100%',
                                            minHeight: tabFontSize * 1.5,
                                            height: '5%',
                                            borderRadius: cornerRadius,
                                            border: containerBorder,
                                            fontFamily: font,
                                            fontStyle: listFontStyle,
                                            fontSize: listFontSize,
                                            fontWeight: listFontWeight,
                                            color: mainColor,
                                        }}
                                    >
                                        <span
                                            style={{
                                                position: 'absolute',
                                                right: '5px',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                            }}>
                                            {tool}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/** Experiences Area Container */}
                    <div
                        style={{
                            zIndex: layer + 4,
                            position: 'relative',
                            border: containerBorder,
                            borderRadius: cornerRadius,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2.5px',
                            backgroundColor: `${contrastColor}${contrastOpacity}`,
                            fontFamily: font,
                            fontStyle: tabFontStyle,
                            fontSize: tabFontSize,
                            color: mainColor,
                        }}
                    >   
                        <h1 style={{fontSize: '40px',}}>Experiences</h1>
                        <p style={{fontSize: '20px',}}>Coming soon....</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TechnicalProficienciesArea