import { Button } from "@chakra-ui/react"
import { DensityLarge, FirstPage, GitHub, NightsStay, Person, WbSunny, Web } from "@mui/icons-material"
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

    //state settings - general
    const [hidden, setHidden] = useState<boolean>(false)
    const [menuActive, setMenuActive] = useState<boolean>(false)
    const [activate, setActivate] = useState<boolean>(false)

    //style settings - animations + positioning
    const transitionTime = 0.8
    const fontSize = isSmall ? 30 : 15
    const menuY = isSmall ? 10 : 20
    const menuTop = hidden ? -100 : menuY - 10

    const spacingX = isSmall ? 10 : 7
    const menuLeft = hidden ? -100 : 20


    // style settings - general
    const opacity = ''
    // const bgColor = darkMode ? `#B70404${opacity}` : `#FBFBFB${opacity}`
    const bgColor = 'transparent'
    const bgBlur = 'blur(10px)'
    const textColor = darkMode ? "#FEF2F4" : '#F31559'


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
                    left: menuLeft,
                    top: menuTop,
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
                        borderRadius: '30px',
                        border: `1px solid ${textColor}`,
                        backgroundColor: bgColor,
                        color: textColor,
                        WebkitBackdropFilter: bgBlur,
                        backdropFilter: bgBlur,
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
                    left: !menuActive ? -1000 : 20,
                    top: menuY,
                    color: textColor,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    zIndex: 100000,
                    transition: `all ${transitionTime}s`,
                    width: menuActive ? '100vw' : 0,
                }}
            >
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
                            WebkitBackdropFilter: bgBlur,
                            backdropFilter: bgBlur,
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
                            WebkitBackdropFilter: bgBlur,
                            backdropFilter: bgBlur,
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
                            WebkitBackdropFilter: bgBlur,
                            backdropFilter: bgBlur,
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
                            WebkitBackdropFilter: bgBlur,
                            backdropFilter: bgBlur,
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
                            WebkitBackdropFilter: bgBlur,
                            backdropFilter: bgBlur,
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
                        <FirstPage
                            style={{
                                minWidth: `${fontSize}px`,
                                maxWidth: `${fontSize}px`,
                            }}
                        />
                    </Button>
                </div>


            </div>
        </div>

    )
}

export default MenuLite
