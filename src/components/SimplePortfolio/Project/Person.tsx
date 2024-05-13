import { ArrowOutward } from "@mui/icons-material"
import { useState } from "react"
import { FaUser } from "react-icons/fa"

type PersonProps = {
    isMobileScreen?: boolean
    name: string
    textColor: string
    backgroundColor: string
    link?: string
}

const Person: React.FC<PersonProps> = ({ isMobileScreen = false, link = undefined, name, textColor, backgroundColor }) => {
    const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
    const accentColor = '#FEB941'
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [hoverTime, setHoverTime] = useState(0)
    const hoverThresh = 1000
    const hoverTimeout = 150
    const handleHovered = async () => {
        !isMobileScreen && await setTimeout(() => setIsHovered(true), hoverTimeout)
    }

    const descFontMultiplier = isMobileScreen ? .75 : .75;
    const descFontSize = `${descFontMultiplier * (window.innerWidth * 0.01) + descFontMultiplier * (window.innerHeight * 0.01)}px`;


    const handleUnHovered = () => {
        if (!isMobileScreen) {
            setIsHovered(false)
            setHoverTime(0)
        }
    }

    const tagFontSize = 10

    return (
        <>
            <div
                onMouseLeave={handleUnHovered}
                style={{
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: accentColor,
                    overflow: 'hidden',
                    boxShadow,
                }} >

                {/** Link */}
                <ArrowOutward
                    onClick={() => link && window.open(link, '_blank')}
                    style={{
                        width: descFontSize,
                        height: 'auto',
                        cursor: link ? 'pointer' : 'default',
                        position: 'absolute',
                        color: backgroundColor,
                    }}
                />

                {/** Image */}
                <div
                    onMouseEnter={handleHovered}
                    style={{
                        position: 'relative',
                        border: '1px solid black',
                        borderRadius: '100%',
                        height: '50px',
                        width: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor,
                        color: textColor,
                        transform: isHovered ? `translateX(100%)` : 'translateX(0)',
                        transition: 'all .5s',
                    }} >
                    <FaUser />

                    {/** Name Tag */}
                    <div
                        style={{
                            fontSize: tagFontSize,
                            position: 'absolute',
                            bottom: -10,
                            left: 0,
                            textAlign: 'center',
                            minWidth: '75px',
                            opacity: isHovered ? 0 : 0,
                            backgroundColor,
                            color: textColor,
                            transition: 'opacity .5s',
                        }}
                    >
                        {name}
                    </div>
                </div >
            </div>

        </>

    )
}

export default Person