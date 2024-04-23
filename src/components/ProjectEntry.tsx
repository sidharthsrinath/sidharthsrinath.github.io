import { BackHand, CloseSharp } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"

type Element = {
    id: string
    left?: string
    top?: string
    bottom?: string
    width?: string
    height?: string
}

type ProjectEntryProps = {
    key: number
    isBigScreen: boolean
    isMediumScreen: boolean
    textColor: string
    bgColor: string
    descInfo: string
    imgInfo: string
    toolsInfo: string
    tagInfo: string
}

const ProjectEntry: React.FC<ProjectEntryProps> = ({ key, textColor, imgInfo, descInfo, toolsInfo, tagInfo, isBigScreen, isMediumScreen, bgColor }) => {
    //references
    const elementRef = useRef(null)
    const expandedElRef = useRef(null)

    //hover states
    const [descIsHovered, setDescIsHovered] = useState<boolean>(false)
    const [imgIsHovered, setImgIsHovered] = useState<boolean>(false)
    const [toolsIsHovered, setToolsIsHovered] = useState<boolean>(false)
    const [tagIsHovered, setTagIsHovered] = useState<boolean>(false)
    const [openButtonIsHovered, setOpenButtonIsHovered] = useState<boolean>(false)

    //expanded states
    const [expandedElement, setExpandedElement] = useState<string>('')
    const [prevElement, setPrevElement] = useState<Element>(null)

    //transition states
    const [contentTransition, setContentTransition] = useState<boolean>(false)
    const transitionTime = .5

    //size (structural) variables
    const bgWidth = isBigScreen ? 800 : isMediumScreen ? 700 : 500
    const bgHeight = isBigScreen ? 700 : isMediumScreen ? 700 : 500

    const innerPadding = isBigScreen || isMediumScreen ? '0px 25px' : '0px 15px'
    const outsideOffset = 30
    const border = `1px solid ${textColor}`
    const spacing = isBigScreen ? 150 : isMediumScreen ? 100 : 80

    const [transform, setTransform] = useState(``)

    //typography attributes
    const font = "Ruda, sans-serif"
    const defaultBgColor = 'transparent'
    const highlightBgColor = '#FDFFF0'
    // const shadowColor = '#363636'
    // const shadow = `3px 3px 2px ${shadowColor}`
    const shadowColor = '#B0B0B0';  // A lighter gray color

    // Adjusted shadow settings
    const shadow = `1px 1px 4px ${shadowColor}`; // Reduced offset, increased blur, and lighter color

    const bgOpacity = '90'
    const descBgColor = '#FBFBFB' + bgOpacity

    //Tag Element specific
    const tagFontSize = 15
    const tagFontWeight = 350


    //effect of expanding info

    useEffect(() => {

        const shiftToExpand = (src: HTMLElement) => {
            if (src.id == `img${key}`) {
                setTransform(`translateX(${2 * outsideOffset + bgWidth + spacing}px) translateY(${1 * outsideOffset}px)`)
            } else if (src.id == `tools${key}`) {
                setTransform(`translateX(${2 * outsideOffset + bgWidth + spacing}px) translateY(${-1 * outsideOffset}px)`)
            }
            else if (src.id == `desc${key}`) {
                setTransform(`translateX(${bgWidth + spacing}px) translateY(${1 * outsideOffset}px)`)

            }
            else if (src.id == `tag${key}`) {
                setTransform(`translateX(${bgWidth + spacing}px) translateY(${-1 * outsideOffset}px)`)
            }

        }
        const shiftRevert = () => {
            setTransform(``)
        }

        if (expandedElement !== '' && expandedElRef.current && contentTransition) {

            //revert previous element to place
            if (prevElement && (prevElement.id !== 'close')) shiftRevert()
            //thats all we'll do if current element is close
            if (expandedElement == 'close') return

            const srcEl = document.getElementById(expandedElement)

            //destructure source element
            if (srcEl) shiftToExpand(srcEl)
        }
    }, [expandedElement, prevElement, contentTransition]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: spacing,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: bgColor, //main background area
            }}
        >
            <div
                ref={elementRef}
                style={{
                    margin: innerPadding,
                    minWidth: bgWidth + 2 * outsideOffset,
                    minHeight: bgHeight + 2 * outsideOffset,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: font,
                    fontStyle: 'normal',
                    fontSize: `${tagFontSize}px`,
                    fontWeight: tagFontWeight,
                    color: textColor,
                }}
            >

                {/** Background */}
                <div
                    style={{
                        zIndex: 2,
                        width: bgWidth,
                        height: bgHeight,
                        border: border,
                        borderRadius: contentTransition ? '128px 64px' : '0',
                        display: 'flex', //two columns to begin
                        flexDirection: 'row',
                        transition: `all ${transitionTime}s`,
                        backgroundColor: `${descBgColor}`, //structural square's (background square's??) background 
                    }}
                >
                    {/** Column 1 - left */}
                    <div
                        style={{
                            position: 'relative',
                            width: '50%',
                            height: '100%',
                            borderRadius: contentTransition ? '128px 64px' : 0,
                            display: 'flex',
                            flexDirection: 'column',
                            transition: `all ${transitionTime}s`,
                        }}
                    >
                        {/** Image - top left */}
                        <div
                            id={`img${key}`}
                            onClick={() => {
                                if (contentTransition) {
                                    if (expandedElement) {
                                        setPrevElement({
                                            id: expandedElement,
                                        })
                                    }
                                    if (expandedElement == `img${key}`) setExpandedElement('')
                                    else setExpandedElement(`img${key}`)
                                }
                            }}
                            onMouseEnter={() => setImgIsHovered(true)}
                            onMouseLeave={() => setImgIsHovered(false)}
                            style={{
                                backgroundImage: `url(${imgInfo})`,
                                backgroundSize: 'cover', // or 'contain' based on your requirement
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                filter: imgIsHovered || (expandedElement == `img${key}`) ? 'grayscale(0)' : 'grayscale(.8)',
                                boxShadow: imgIsHovered ? shadow : 'none',
                                // position: contentTransition ? 'absolute' : 'relative',
                                position: 'absolute',
                                top: contentTransition ? -outsideOffset : 0,
                                left: contentTransition ? -outsideOffset : 0,
                                width: (expandedElement == `img${key}`) ? bgWidth : '100%',
                                height: (expandedElement == `img${key}`) ? bgHeight : '50%',
                                borderRadius: (expandedElement !== `img${key}`) && contentTransition && !imgIsHovered ? '128px 64px' : 0,
                                border: border,
                                transform: (expandedElement == `img${key}`) ? transform : ``,
                                transition: `all ${transitionTime}s`,
                            }}
                        >
                        </div>
                        {/** Tools - bottom left */}
                        <div
                            id={`tools${key}`}
                            onClick={() => {
                                if (contentTransition) {
                                    if (expandedElement) setPrevElement({
                                        id: expandedElement,
                                    })
                                    if (expandedElement == `tools${key}`) setExpandedElement('')
                                    else setExpandedElement(`tools${key}`)
                                }
                            }}
                            onMouseEnter={() => setToolsIsHovered(true)}
                            onMouseLeave={() => setToolsIsHovered(false)}
                            style={{
                                backgroundColor: toolsIsHovered ? highlightBgColor : defaultBgColor,
                                boxShadow: toolsIsHovered ? shadow : 'none',
                                // position: contentTransition ? 'absolute' : 'relative',
                                position: 'absolute',
                                bottom: contentTransition ? -outsideOffset : 0,
                                left: contentTransition ? -outsideOffset : 0,
                                width: (expandedElement == `tools${key}`) ? bgWidth : '100%',
                                height: (expandedElement == `tools${key}`) ? bgHeight : '50%',
                                borderRadius: (expandedElement !== `tools${key}`) && contentTransition ? '128px 64px' : 0,
                                border: border,
                                transition: `all ${transitionTime}s`,
                                transform: (expandedElement == `tools${key}`) ? transform : ``,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems:'center',
                            }}
                        >
                            <span
                                style={{
                                    // position: 'absolute',
                                    // bottom: 100,
                                    transition: `all ${transitionTime}s`,
                                }}
                            >
                                {toolsInfo}
                            </span>
                        </div>
                    </div>
                    {/** Column 2 - right */}
                    <div
                        style={{
                            position: 'relative',
                            width: '50%',
                            height: '100%',
                            borderRadius: contentTransition ? '128px 64px' : 0,
                            transition: `all ${transitionTime}s`,
                        }}
                    >
                        {/** Desc - entire column right when unactivated, top right when activated */}
                        <div
                            id={`desc${key}`}
                            onClick={() => {
                                if (contentTransition) {
                                    if (expandedElement) setPrevElement({
                                        id: expandedElement,
                                    })
                                    if (expandedElement == `desc${key}`) setExpandedElement('')
                                    else setExpandedElement(`desc${key}`)
                                }
                            }}
                            onMouseEnter={() => setDescIsHovered(true)}
                            onMouseLeave={() => setDescIsHovered(false)}
                            style={{
                                backgroundColor: descIsHovered ? highlightBgColor : defaultBgColor,
                                boxShadow: descIsHovered ? shadow : 'none',
                                // position: contentTransition ? 'absolute' : 'relative',
                                position: 'absolute',
                                top: contentTransition ? -outsideOffset : 0,
                                right: contentTransition ? -outsideOffset : 0,
                                width: (expandedElement == `desc${key}`) ? bgWidth : '100%',
                                height: contentTransition ? (expandedElement == `desc${key}`) ? bgHeight : '80%' : '100%',
                                borderRadius: (expandedElement !== `desc${key}`) && contentTransition ? '128px 64px' : 0,
                                border: border,
                                transition: `all ${transitionTime}s`,
                                transform: (expandedElement == `desc${key}`) ? transform : ``,
                                transformOrigin: "center",  // Ensure correct transform origin
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems:'center'
                            }}
                        >
                            <span
                                style={{
                                    // position: 'absolute',
                                    // bottom: 20,
                                    transition: `all ${transitionTime}s`,
                                }}
                            >
                                {descInfo}
                            </span>
                        </div>
                        {/** Row 2 - hidden when unactivated, bottom right when activated */}
                        <div
                            id={`tag${key}`}
                            onClick={() => {
                                if (contentTransition) {
                                    if (expandedElement) setPrevElement({
                                        id: expandedElement,
                                    })
                                    if (expandedElement == `tag${key}`) setExpandedElement('')
                                    else setExpandedElement(`tag${key}`)
                                }
                            }}
                            onMouseEnter={() => setTagIsHovered(true)}
                            onMouseLeave={() => setTagIsHovered(false)}
                            style={{
                                backgroundColor: tagIsHovered ? highlightBgColor : defaultBgColor,
                                boxShadow: tagIsHovered ? shadow : 'none',
                                position: 'absolute',
                                bottom: contentTransition ? -outsideOffset : 0,
                                right: contentTransition ? -outsideOffset : 0,
                                width: (expandedElement == `tag${key}`) ? bgWidth : '100%',
                                height: contentTransition ? (expandedElement == `tag${key}`) ? '100%' : '20%' : '0%',
                                borderRadius: (expandedElement !== `tag${key}`) && contentTransition ? '128px 64px' : 0,
                                border: contentTransition ? border : 0,
                                display: 'flex',
                                overflow: 'hidden',
                                transition: `all ${transitionTime}s`,
                                transform: (expandedElement == `tag${key}`) ? transform : ``,
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    top: (expandedElement == `tag${key}`) ? 20 : '40%',
                                    right: (expandedElement == `tag${key}`) ? 20 : '20%',
                                    transition: `all ${transitionTime/2}s`,
                                }}
                            >
                                {tagInfo}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    id='close'
                    style={{
                        zIndex: 2,
                        width: '100px',
                        height: '100px',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        onClick={async () => {
                            if (expandedElement) setPrevElement({
                                id: expandedElement,
                            })
                            setExpandedElement('close')
                            setOpenButtonIsHovered(!openButtonIsHovered)
                            await setTimeout(() => setContentTransition(!contentTransition), transitionTime * 100)
                        }}
                        onMouseEnter={async () => {
                            setOpenButtonIsHovered(true)
                            await setTimeout(() => setContentTransition(true), transitionTime * 100)
                        }}
                        onMouseLeave={async () => {
                            setOpenButtonIsHovered(false)
                            // await setTimeout(() => setContentTransition(false), transitionTime * 100)
                        }}
                        style={{
                            width: openButtonIsHovered || contentTransition ? '40px' : '100px',
                            height: openButtonIsHovered || contentTransition ? '40px' : '100px',
                            border: border,
                            // borderRadius: openButtonIsHovered ? '100%' : 0,
                            borderRadius: '100%',
                            transition: `all ${transitionTime}s`,
                            transform: openButtonIsHovered || contentTransition ? 'rotate(45deg) translateX(-60px) translateY(55px)' : '',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: openButtonIsHovered && contentTransition ? highlightBgColor : 'inherit',
                            boxShadow: openButtonIsHovered ? shadow : undefined,
                        }}
                    >
                        <CloseSharp
                            style={{
                                width: openButtonIsHovered || contentTransition ? '30px' : 0,
                                height: '20px',
                                transition: `all ${transitionTime}s`,
                                transform: openButtonIsHovered || contentTransition ? 'rotate(-45deg)' : 'rotate(0deg)',
                            }}
                        />
                    </div>
                </div>
            </div >
            <div
                ref={expandedElRef}
                id="expanded"
                style={{
                    width: bgWidth,
                    height: bgHeight,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: font,
                    fontStyle: 'normal',
                    fontSize: `${tagFontSize}px`,
                    fontWeight: tagFontWeight,
                    color: textColor,
                }}
            >
                {/** Background */}
                <div
                    id="expandedText"
                    style={{
                        width: bgWidth,
                        height: bgHeight,
                        backgroundColor: 'transparent',
                    }}
                >
                </div>
            </div>
        </div>
    )
}

export default ProjectEntry