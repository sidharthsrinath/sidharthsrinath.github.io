import { useEffect, useState } from "react";
import SelfImage from "/Users/sidharthsrinath/Documents/portfolio/sansidpoonal/src/assets/me_jtree.jpg";
import { CallMade, South } from "@mui/icons-material";

type CoolButtonProps = {
    isMobileScreen?: boolean
    up?: boolean
    value: string
    textColor: string
    action: () => void
}

const CoolButton: React.FC<CoolButtonProps> = ({ isMobileScreen = false, action, up = true, value, textColor }) => {
    const [button1Hovered, setButton1Hovered] = useState<boolean>(false)
    const descFontMultiplier = isMobileScreen ? .8 : .8;
    const descFontSize = `${descFontMultiplier * (window.innerWidth * 0.01) + descFontMultiplier * (window.innerHeight * 0.01)}px`;
    const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
    return (
        <div
            id={`${value}-btn`}
            onClick={action}
            onMouseEnter={() => { setButton1Hovered(true) }}
            onMouseLeave={() => { setButton1Hovered(false) }}
            style={{
                position: 'relative',
                display: 'flex',
            }}
        >
            {/** background facade */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    padding: isMobileScreen ? 0 : '5px 15px',
                    border: `1px solid ${textColor}`,
                    backgroundColor: `${textColor}EE`,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}
            />
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    fontSize: descFontSize,
                    fontWeight: 300,
                    color: textColor,
                    fontFamily: 'Ubuntu Sans, sans-serif',
                    zIndex: 1,
                    cursor: 'pointer',
                    padding: isMobileScreen ? 0 : '5px 15px',
                    border: `1px solid ${textColor}`,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: button1Hovered ? 'translateX(10px) translateY(-10px)' : '',
                    transition: 'transform 0.2s ease-in-out',
                    gap: 10,
                    boxShadow,
                }}
            >
                <span>
                    {value}
                </span>
                {up && <CallMade
                    style={{
                        width: descFontSize,
                        color: textColor,
                    }}
                />}
                {!up && <South
                    style={{
                        width: descFontSize,
                        color: textColor,
                    }}
                />}

            </div>
        </div>
    );
}

type IntroSectionProps = {
    isFocused?: boolean;
    isMobileScreen: boolean;
    isDesktopScreen: boolean;
    isLaptopScreen: boolean;
    textColor: string;

}
const IntroSection: React.FC<IntroSectionProps> = ({ isFocused = true, isMobileScreen, isDesktopScreen, isLaptopScreen, textColor }) => {
    const spacingShift = isMobileScreen ? 'center' : 'space-evenly';
    const gapShift = isMobileScreen ? 20 : 0;
    const buttonGapShift = isMobileScreen ? '3vw' : '1vw';
    const displayShift = isMobileScreen ? 'column' : 'row';
    const imgWidthShift = isMobileScreen ? '60%' : '35%';
    const descWidthShift = isMobileScreen ? '80%' : '50%';
    const descAlignShift = isMobileScreen ? 'center' : 'right';
    const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'

    const nameFontMultiplier = isMobileScreen ? 3 : 3;
    const nameFontSize = `${nameFontMultiplier * (window.innerWidth * 0.01) + nameFontMultiplier * (window.innerHeight * 0.01)}px`;
    const descFontMultiplier = isMobileScreen ? .8 : .8;
    const descFontSize = `${descFontMultiplier * (window.innerWidth * 0.01) + descFontMultiplier * (window.innerHeight * 0.01)}px`;

    return (
        <div
            id="section-background"
            style={{
                display: isFocused ? 'flex' : 'none',
                position: 'relative',
                flexDirection: displayShift,
                justifyContent: spacingShift,
                alignItems: 'center',
                width: '90%',
                minHeight: '100%',
                gap: gapShift,
                overflow: 'hidden',
                // border: `1px dashed ${textColor}`,
            }}
        >
            <img
                src={SelfImage}
                alt='intro'
                style={{
                    zIndex: 1,
                    width: imgWidthShift,
                    objectFit: 'contain',
                    objectPosition: 'center',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            />
            <div
                style={{
                    zIndex: 1,
                    width: descWidthShift,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    textAlign: descAlignShift,
                    gap: '5vh',
                }}
            >
                <div
                    style={{
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: descAlignShift,
                    }}
                >
                    <span
                        style={{
                            fontSize: nameFontSize,
                            fontWeight: 500,
                            color: textColor,
                            fontFamily: 'Ubuntu Sans, sans-serif',
                            display: 'flex',
                            justifyContent: descAlignShift,
                        }}
                    >
                        Hey, I'm Sid
                    </span>
                    <span
                        style={{
                            fontSize: descFontSize,
                            fontWeight: 300,
                            color: textColor,
                            fontFamily: 'Ubuntu Sans, sans-serif',
                            display: 'flex',
                            justifyContent: descAlignShift,
                        }}
                    >
                        I’m a Software Engineer from San Diego interested in building computer vision and AI-enabled software. Currently, I'm at Sony Electronics building vision AI applications for custom hardware from end to end.
                    </span>
                </div>
                <span
                    style={{
                        display: 'flex',
                        justifyContent: descAlignShift,
                        alignItems: 'center',
                        gap: buttonGapShift,

                    }}
                >
                    <CoolButton
                        textColor={textColor}
                        value={'Resume'}
                        action={() => window.open('https://drive.google.com/file/d/1MmYotBHEKyOypI5Kha48YBoae9oidMtK/view', '_blank')}
                    />
                    <CoolButton
                        textColor={textColor}
                        value={'Learn More'}
                        up={false}
                        action={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    />
                </span>
            </div>

        </div>
    );
}

export default IntroSection;