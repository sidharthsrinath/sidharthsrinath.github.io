import { on } from "events"
import React, { useEffect, useState } from "react"
import Info from '../json/technicalSkills.json'
import { set } from "lodash";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Expand, ExpandLess, ExpandMore } from "@mui/icons-material";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

type ListSectionProps = {
    data: JSON
    type: string
    name: string
    id: string
    layer: number,
    cornerRadius: number,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontStyle: string,
    textColor: string,
    bgColor: string,
    bgOpacity: number,
    border: string,
    listSpacing: number,
    activeTab: string,
    expandWidth: number
}
const ListSection: React.FC<ListSectionProps> = ({ id, type, layer, cornerRadius, fontFamily, fontSize, listSpacing, fontWeight, fontStyle, textColor, bgColor, bgOpacity, border, activeTab, expandWidth }) => {

    const [hoveredElement, setHoveredElement] = useState<string>('')
    const [listExpanded, setListExpanded] = useState<boolean>(false)

    const sectionCSS = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        gap: '2.5px',
    } as React.CSSProperties
    const titleCSS = {
        position: 'relative',
        cursor:'default',
        width: '100%',
        fontFamily,
        fontStyle,
        fontSize,
        fontWeight,
        color: textColor,
        borderBottom: border,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: ' 0 2px',
        overflowX: 'hidden',
    } as React.CSSProperties

    const listContainerCSS = {
        width: '100%',
        height: listExpanded ? '100%' : '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        gap: `${listSpacing}px`,
        overflowY: 'clip',
        scrollbarWidth: 'none',
    } as React.CSSProperties

    return (
        <div /** List Section Container */
            key={`${activeTab.split('-')[1]}-${id}-container`}
            style={sectionCSS}
        >
            {/** Tools Title  Area */}
            <span
                onClick={() => setListExpanded(!listExpanded)}
                style={titleCSS}
            >
                {/** Close Items */}
                <span
                    style={{
                        height: '100%',
                        transform: listExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ExpandMore
                        style={{
                            width: `${expandWidth}px`,
                        }}
                    />
                </span>
                <span
                    style={{
                        minWidth: '95%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {type}
                </span>

            </span>

            {/** Tools List Container*/}
            <div
                id={`${type}-list-container`}
                style={listContainerCSS}
            >
                {/** Tools List */}
                {Array.from(Info[activeTab ? activeTab.split('-')[1] : 'Data Science'][type]).map((tool: string, index) => {
                    const currId = `tools-${tool}`

                    return (
                        <div
                            key={`${activeTab.split('-')[1]}-${id}-${index}`}
                            id={currId}
                            onMouseEnter={() => {
                                setHoveredElement(currId)
                            }}
                            onMouseLeave={() => {
                                setHoveredElement('')
                            }}
                            style={{
                                position: 'relative',
                                zIndex: layer + 5,
                                width: '100%',
                                minHeight: fontSize * 1.5,
                                height: '5%',
                                borderRadius: cornerRadius,
                                border: border,
                                fontFamily,
                                fontStyle,
                                fontSize,
                                fontWeight,
                                color: textColor,
                                backgroundColor: (hoveredElement === currId) ? `${bgColor}${bgOpacity}` : 'transparent',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    right: '2px',
                                }}>
                                {tool}
                            </span>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

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
    layer?: number,
    isBigScreen: boolean,
    isMediumScreen: boolean,
    plainBgColor: string,
    mainColor: string,
    canvasBgColor: string,
}
const TechnicalProficienciesArea: React.FC<TechnicalProficienciesAreaProps> = ({ layer = 0, isBigScreen, isMediumScreen, plainBgColor, mainColor, canvasBgColor }) => {

    const info = JSON.parse(JSON.stringify(Info))

    const [headers, setHeaders] = useState<string[]>([])

    const [hoveredTab, setHoveredTab] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string>('tab-Data Science')
    const activeSectionName = activeTab.split('-')[1]
    const activeSectionData = info[activeSectionName]
    const [toolsExpanded, setToolsExpanded] = useState<boolean>(true)
    
    const animationDelay = (isBigScreen || isMediumScreen) ? 100 : 0 //ms
    const contrastColor = '#F8DE22'
    const contrastOpacity = 35

    const font = "VT323, monospace"

    const activeTabBgInitLeft = -50

    const tabFontSize = isBigScreen || isMediumScreen ? 18 : 13
    const tabFontWeight = 400
    const tabFontStyle = 'normal'

    const listFontSize = isBigScreen || isMediumScreen ? 18 : 14
    const listFontWeight = 400
    const listFontStyle = 'normal'
    const listSpacing = 2

    const expandWidth = (isBigScreen || isMediumScreen) ? 20 : 15

    const contentAreaMaxHeight = 95
    const contentAreaSpacing = 5

    const contentListWidth = '30%'

    const outerPadding = 10
    const innerPadding = '.5vh .5vw'
    const containerWidth = isBigScreen || isMediumScreen ? 85 : 80
    const containerHeight = isBigScreen || isMediumScreen ? 80 : 70
    const containerBorder = `1px solid ${mainColor}`
    const containerBgColor = `${canvasBgColor}`
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
        const activeTabBg = document.getElementById(`active-tab-bg-${layer}`)
        const activeTabEl = document.getElementById(activeTab)
        const containerLeft = document.getElementById(`tabs-container-${layer}`).getBoundingClientRect().left

        if (activeTabBg && activeTabEl) {
            const activeTabRect = activeTabEl.getBoundingClientRect()
            activeTabBg.style.width = `${activeTabRect.width}px`
            activeTabBg.style.height = `${activeTabRect.height}px`
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
        setHeaders(Object.keys(info).reverse())
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
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/** Tabs Container*/}
                <div
                    id={`tabs-container-${layer}`}
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
                                    await setTimeout(() => setActiveTab(`tab-${tab}`), animationDelay) //give effect of slight delay
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
                        key={`active-tab-bg-${layer}`}
                        id={`active-tab-bg-${layer}`}
                        style={{
                            zIndex: Math.min(1, layer + 2),
                            position: 'absolute',
                            padding: `1vh 1vw`,
                            width: '1px',
                            left: activeTabBgInitLeft,
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
                        maxHeight: `${contentAreaMaxHeight}%`,
                        borderLeft: containerBorder,
                        borderBottom: containerBorder,
                        borderBottomLeftRadius: cornerRadius,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'start',
                        padding: `${contentAreaSpacing}px`,
                        gap: `${contentAreaSpacing}px`,
                    }}
                >
                    {/** Info Area Container */}
                    <div
                        style={{
                            zIndex: layer + 4,
                            position: 'relative',
                            border: containerBorder,
                            borderRadius: cornerRadius,
                            width: contentListWidth,
                            height: '100%',
                            alignItems: 'center',
                            padding: '2.5px',
                            overflow: 'scroll',
                            scrollbarWidth: 'none',

                        }}
                    >
                        {/**  */}
                        {activeSectionData && // Ensure the data exists
                            Array.from(Object.entries(activeSectionData)).map(([type, data], index) => {
                                if (type === 'Tags' || type === 'Experiences') return //skip tags and experiences here
                                return (
                                    <ListSection
                                        key={`${activeSectionName}-${type}`}
                                        type={type}
                                        data={info}
                                        name={type}
                                        id={`list-${activeSectionName}-${type}`}
                                        layer={index * 5}
                                        cornerRadius={cornerRadius}
                                        fontFamily={font}
                                        fontSize={listFontSize}
                                        fontWeight={listFontWeight}
                                        fontStyle={listFontStyle}
                                        textColor={mainColor}
                                        bgColor={contrastColor}
                                        bgOpacity={contrastOpacity}
                                        border={containerBorder}
                                        listSpacing={listSpacing}
                                        expandWidth={expandWidth}
                                        activeTab={activeTab}
                                    />
                                )
                            })}
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
                        <h1 style={{ fontSize: '40px', }}> {activeTab?.split('-')[1]} <br /> Experiences</h1>
                        <p style={{ fontSize: '20px', }}>Coming soon....</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TechnicalProficienciesArea