import { max } from "lodash"
import { useEffect, useState } from "react"

type SinglePageScrollProps = {
    containerColor: string
    scrollColor: string
    pageNum: number
    isActive: boolean
    full?: boolean
}
const SinglePageScroll: React.FC<SinglePageScrollProps> = ({ containerColor, scrollColor, isActive, pageNum, full = false }) => {
    const [progress, setProgress] = useState<number>(0) //percentage of one page height that has been scrolled
    const [isHovered, setIsHovered] = useState<boolean>(false)

    //shared style
    const width = 15
    const borderRadius = '10px'
    const transitionTime = 0.3
    const interactTransform = isHovered && isActive ? '' : ''

    //container style
    const minContainerHeight = '10px'
    const containerHeight = isActive ? isHovered ? 9 : 7 : 2
    const containerBorder = `1px solid ${scrollColor}`
    const containerTransition = `all ${transitionTime}s`

    //inner bar style
    const innerVertOffset = full ? 0 : isActive ? `${Math.min(0, progress - 100)}%` : isHovered ? 0 : -100
    const innerBarHeight = 100
    const innerBarTransition = isActive && !full ? `` : `all ${1.5 * transitionTime}s`
    const innerBarBorder = `2px solid ${scrollColor}`

    useEffect(() => {
        const scrollHandler = () => {
            setProgress(((window.scrollY % window.innerHeight) / window.innerHeight) * 100)
        }
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [])

    const scrollToPosition = (pageNum: number, innerHeight: number, clickY: number, elementHeight: number) => {
        const clickPositionPercentage = clickY / elementHeight
        const scrollPosition = (pageNum * innerHeight) + (clickPositionPercentage * innerHeight)
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        })
    }

    return (
        <div
            onClick={(event) => {
                if (!isActive) {
                    window.scrollTo({
                        top: pageNum * window.innerHeight,
                        behavior: 'smooth'
                    })
                }
                else {
                    const clickY = event.clientY - event.currentTarget.offsetTop;

                    // Scroll to the relative position
                    scrollToPosition(pageNum, window.innerHeight, clickY, containerHeight/100 * window.innerHeight);
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                cursor: 'pointer',
                position: 'relative',
                width: `${width}px`,
                minHeight: minContainerHeight,
                height: `${containerHeight}%`,
                backgroundColor: containerColor,
                border: containerBorder,
                borderRadius,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: containerTransition,
                transform: interactTransform,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: `${width}px`,
                    height: `${innerBarHeight}%`,
                    top: innerVertOffset,
                    backgroundColor: scrollColor,
                    border:innerBarBorder,
                    borderRadius,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: .8,
                    transition:innerBarTransition
                }}
            >
            </div>
        </div>
    )
}
type CustomScrollBarProps = {
    pageColors: string[]
    colors: string[]
    showLastPage?: boolean
}

const CustomScrollbar: React.FC<CustomScrollBarProps> = ({ colors, pageColors, showLastPage=false }) => {
    const [pageNum, setPageNum] = useState<number>(0)
    const [numPages, setNumPages] = useState<number>(-1)
    //container style
    const containerVertOffset = 0
    const containerRightOffset = 10
    const containerHeight = 100
    const spacing = 10
    
    useEffect(() => {
        // const maxHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
        const maxHeight = document.body.scrollHeight
        const n = Math.floor(maxHeight / window.innerHeight) - (showLastPage ? 0: 1) * (maxHeight % window.innerHeight === 0 ? 1 : 0)
        setNumPages(n)

        const scrollHandler = () => {
            setPageNum(Math.floor(window.scrollY / window.innerHeight))
        }
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [])

    return (
        <div         /** Container */
            style={{
                zIndex: 100,
                position: 'fixed',
                right: containerRightOffset,
                top: containerVertOffset,
                height: `${containerHeight}%`,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/** Page 1 */}
            {numPages > 0 &&
                Array.from({ length: numPages }).map((_, i) => (
                    <SinglePageScroll
                        key={i}
                        containerColor={colors[i]}
                        scrollColor={pageColors[i]}
                        isActive={pageNum === i}
                        pageNum={i}
                        full={pageNum > i}
                    />
                ))
            }
            {/** Page 2 */}


        </div>

    )
}

export default CustomScrollbar