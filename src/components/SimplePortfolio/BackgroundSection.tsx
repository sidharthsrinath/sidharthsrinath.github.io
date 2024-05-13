import FocusedText from "../../animations/Components/FocusedText";
import SelfImage from "/Users/sidharthsrinath/Documents/portfolio/sansidpoonal/src/assets/me_jtree.jpg";

type BackgroundSectionProps = {
    isFocused?: boolean;
    isMobileScreen: boolean;
    isDesktopScreen: boolean;
    isLaptopScreen: boolean;
    textColor: string;
}
const BackgroundSection: React.FC<BackgroundSectionProps> = ({ isFocused = true, isMobileScreen, isDesktopScreen, isLaptopScreen, textColor }) => {
    const spacingShift = isMobileScreen ? 'start' : 'start';
    const gapShift = isMobileScreen ? 0 : 0;
    const displayShift = isMobileScreen ? 'column' : 'column';
    const descAlignShift = isMobileScreen ? 'right' : 'right';
    const border = `1px dashed ${textColor}`


    const containerAlignShift = isMobileScreen ? 'start' : 'start';

    const descFontMultiplier = isMobileScreen ? .75 : .75;
    const descFontSize = `${descFontMultiplier * (window.innerWidth * 0.01) + descFontMultiplier * (window.innerHeight * 0.01)}px`;


    return (
        <div /** pseudo-page */
            style={{
                width: '100%',
                minHeight: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    display: isFocused ? 'flex' : 'none',
                    position: 'relative',
                    flexDirection: displayShift,
                    justifyContent: spacingShift,
                    alignItems: containerAlignShift,
                    width: '90%',
                    height: '80%',
                    gap: gapShift,
                    overflow: 'hidden',
                }}
            >
                {/** Row 1 */}
                <div
                    style={{
                        zIndex: 1,
                        width: '100%',
                        minHeight: '30%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: descAlignShift,
                        border,
                    }}
                >
                    <div
                        style={{
                            fontSize: descFontSize,
                            fontWeight: 300,
                            color: textColor,
                            fontFamily: 'Ubuntu Sans, sans-serif',
                            width: '40%',
                            padding: '20px',
                            borderRadius: '10px',
                        }}
                    >
                        I'm also a guitarist and an amateur music producer. I love to play and record music in my free time. A huge fan of outdoor activites, I'm also frequently hiking or camping somewhere in California or spending summer weekends at the beach.
                    </div>
                </div>

                {/** Row 2 */}
                <div
                    style={{
                        zIndex: 1,
                        width: '100%',
                        height: '40%',
                        maxHeight: '40%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: spacingShift,
                        textAlign: descAlignShift,
                        overflow: 'hidden',
                        border,
                    }}
                >

                    <div
                        style={{
                            fontSize: descFontSize,
                            fontWeight: 300,
                            color: textColor,
                            fontFamily: 'Ubuntu Sans, sans-serif',
                            justifyContent: descAlignShift,
                            width: '60%',
                            padding: '20px',
                            borderRadius: '10px',
                        }}
                    >
                        <span>My name is</span> <FocusedText underlineColor="grey" focusColor='orange'>Sidharth Srinath</FocusedText>, I'm a graduating senior at UC San Diego studying Computer Science and Mathematics.
                        <br />
                        I'm a <span style={{ fontWeight: 'bold' }}>full stack engineer</span> and a <span style={{ fontWeight: 'bold' }}>data scientist</span> passionate about building software that accelerates the human experience in an intuitive and positive way.
                        <br />
                        I love to learn and build out new ideas - no matter how stupid they are. When resources and time are not a concern, you'll usually catch me trying new ways to do the same old things.
                    </div>
                </div>

                {/** Row 3 */}

                <div
                    style={{
                        zIndex: 1,
                        width: '100%',
                        minHeight: '30%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'end',
                        alignItems: 'center',
                        textAlign: descAlignShift,
                        border,
                    }}
                >
                    <div
                        style={{
                            fontSize: descFontSize,
                            fontWeight: 300,
                            color: textColor,
                            fontFamily: 'Ubuntu Sans, sans-serif',
                            width: '50%',
                            padding: '20px',
                            borderRadius: '10px',
                        }}
                    >
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BackgroundSection;