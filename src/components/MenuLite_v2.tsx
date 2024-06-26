import { Button } from "@chakra-ui/react"
import { DensityLarge, FirstPage, GitHub, LastPage, NightsStay, Person, WbSunny, Web } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { FaRegPaperPlane } from "react-icons/fa"
import ResumeArrow from "../assets/pointeraArrow.gif";

import { ReactComponent as Resume2 } from "../assets/resume2.svg";
import { SunIcon } from "@chakra-ui/icons";

type MenuProps = {
    isSmall: boolean
    currPage: string
    pageSetter: (arg0: 'portfolio' | 'about') => void
    arrowActive?: boolean
    darkMode: boolean
    setDarkMode: (arg0: boolean) => void
}

const MenuLite: React.FC<MenuProps> = ({ isSmall, currPage, pageSetter, darkMode, setDarkMode }) => {

    const transitionTime = 0.8
    const fontSize = isSmall ? 30 : 15
    const menuY = isSmall ? 20 : 30
    const spacingX = isSmall ? 10 : 7
    const bgColor = darkMode ? '#B70404' : '#FBFBFB'
    const textColor = darkMode ? "#FEF2F4" : '#F31559'

    const [hidden, setHidden] = useState<boolean>(false)
    const [menuActive, setMenuActive] = useState<boolean>(false)
    const [activate, setActivate] = useState<boolean>(false)

    window.addEventListener("wheel", (e: WheelEvent) => {
        //going down
        if (e.deltaY > 0 && !hidden) {
            setMenuActive(false)
            setHidden(true)
        }
        if (e.deltaY < 0 && !hidden) {
            setHidden(false)
            setMenuActive(false)
        }
    });

    useEffect(() => {
        // Initial state for the last known mouse position.
        let lastMouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            // Determine the direction of the mouse movement.
            const isMovingDown = e.clientY > lastMouseY;
            const isMovingUp = e.clientY < lastMouseY;

            // Update the last known position.
            lastMouseY = e.clientY;

            // Conditions for showing the menu (must be moving up, in the top-left corner, hidden, and not active).
            if (e.clientX < 50 && e.clientY < 50 && hidden && !menuActive && isMovingUp) {
                setHidden(false);
                setMenuActive(false);
                if (!activate) setActivate(true);
            }

            // Conditions for hiding the menu (must be moving down, outside the top-left corner, not hidden, and activated).
            if (e.clientX >= 150 && e.clientY >= 150 && !hidden && activate && isMovingDown) {
                setHidden(true);
            }
        };

        // Register the event listener for mouse movement.
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup function to remove the event listener.
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hidden, menuActive, activate]); // Include dependencies here.


    useEffect(() => {
        let lastTouchY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            lastTouchY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!e.touches.length) return;

            const currentTouchY = e.touches[0].clientY;
            const diffY = currentTouchY - lastTouchY;

            if (Math.abs(diffY) > 0 && (!hidden || menuActive)) { // Scrolling down
                setMenuActive(false);
                setHidden(true);
            }

            lastTouchY = currentTouchY;
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [hidden, menuActive]);

    return (
        <div
            style={{
                fontSize: `${fontSize}px`
            }}
        >
            {/** Menu Button */}
            <div
                id="menubtn"
                style={{
                    right: hidden ? -100 : 30,
                    top: hidden ? -100 : menuY - 10,
                    margin: `${spacingX}px`,
                    position: 'fixed',
                    zIndex: 100000,
                    transition: `all ${transitionTime}s`,
                    opacity: 1,
                }}>
                <Button
                    onClick={() => {
                        setMenuActive(true)
                        setHidden(true)
                    }}
                    className="menubtn"
                    style={{
                        borderRadius: '8px',
                        border: `1px solid ${textColor}`,
                        backgroundColor: bgColor,
                        color: textColor,
                    }}
                >
                    <DensityLarge
                        style={{
                            minWidth: `${fontSize}px`,
                            maxWidth: `${fontSize}px`,
                        }}
                    />
                </Button>
            </div>

            <div
                style={{
                    right: menuActive ? 30 : -1000,
                    top: menuY,
                    color: textColor,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    zIndex: 100000,
                    transition: `all ${transitionTime}s`,
                }}
            >
                {/** Menu Close Item */}
                <div
                    id='closebtn'
                    style={{
                        margin: `0 ${spacingX}px`,
                        zIndex: 100000,
                        transition: `all ${transitionTime}s`,
                        opacity: 1,
                    }}
                >
                    <Button
                        onClick={() => {
                            setHidden(false)
                            setMenuActive(false)
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            color: textColor,
                        }}
                    >
                        <LastPage
                            style={{
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                            }}
                        />
                    </Button>
                </div>
                {/** Menu Item 1 */}
                <div
                    style={{
                        position: 'relative',
                        margin: `0 ${spacingX}px`,
                        zIndex: 100000,
                        transition: `all ${transitionTime}s`,
                        opacity: 1,
                        overflowX: 'hidden',
                    }}>
                    <Button
                        onClick={() => { setDarkMode(!darkMode) }}
                        style={{
                            borderRadius: '30px',
                            overflowX: 'hidden',
                            minWidth: `${2 * fontSize}px`,
                            justifyItems: 'center',
                            alignItems: 'center',
                            color: textColor,
                            border: `1px solid ${textColor}`,
                            backgroundColor: bgColor,
                        }}
                    >

                        <NightsStay
                            style={{
                                position: 'absolute',
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                                transform: darkMode ? 'translateX(0px)' : 'translateX(-100px)',
                                transition: 'all .3s'
                            }}
                        />
                        <WbSunny
                            style={{
                                position: 'absolute',
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                                transform: darkMode ? 'translateX(100px)' : 'translateX(0px)',
                                transition: 'all .3s'
                            }}
                        />

                    </Button>
                </div>

                {/** Menu Item 2 */}
                <div
                    style={{
                        margin: `0 ${spacingX}px`,
                        zIndex: 100000,
                        transition: `all ${transitionTime}s`,
                        opacity: 1,

                    }}>
                    <Button
                        onClick={() => {
                            window.open('mailto:ssrinath@ucsd.edu?subject=Hey! This is ____, looking to meet you."')
                        }}
                        style={{
                            borderRadius: '30px',
                            color: textColor,
                            border: `1px solid ${textColor}`,
                            backgroundColor: bgColor,
                        }}
                    >
                        <FaRegPaperPlane
                            style={{
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                            }}
                        />
                    </Button>
                </div>

                {/** Menu Item 3 */}
                <div
                    style={{
                        margin: `0 ${spacingX}px`,
                        zIndex: 100000,
                        transition: `all ${transitionTime}s`,
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => window.open(require('../assets/Sidharth_Srinath_2024.pdf'), '_blank')}
                        style={{
                            borderRadius: '30px',
                            color: textColor,
                            border: `1px solid ${textColor}`,
                            backgroundColor: bgColor,
                        }}
                    >
                        <Resume2
                            style={{
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                            }}
                        />
                    </Button>

                </div>

                {/** Menu Item 4 */}
                <div
                    style={{
                        margin: `0 ${spacingX}px`,
                        zIndex: 100000,
                        transition: `all ${transitionTime}s`,
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => {
                            window.open('https://www.github.com/ssrinath22')
                        }}
                        style={{
                            borderRadius: '30px',
                            color: textColor,
                            border: `1px solid ${textColor}`,
                            backgroundColor: bgColor,
                        }}
                    >
                        <GitHub
                            style={{
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                            }}
                        />
                    </Button>
                </div>

                {/** Menu Item 5 */}
                <div
                    style={{
                        margin: `0 ${spacingX}px`,
                        zIndex: 100000,
                        transition: `all ${transitionTime}s`,
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => {
                            (currPage == 'portfolio') ? pageSetter('about') : pageSetter('portfolio')
                        }}
                        style={{
                            borderRadius: '30px',
                            color: textColor,
                            border: `1px solid ${textColor}`,
                            backgroundColor: bgColor,
                        }}
                    >
                        {
                            (currPage == 'portfolio')
                                ?
                                <Person
                                    style={{
                                        minWidth: `${fontSize}px`,
                                        maxWidth: `${fontSize}px`,
                                    }}
                                />
                                :
                                <Web
                                    style={{
                                        minWidth: `${fontSize}px`,
                                        maxWidth: `${fontSize}px`,
                                    }}
                                />
                        }
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default MenuLite
