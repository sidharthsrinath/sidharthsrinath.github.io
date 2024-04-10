import { Button } from "@chakra-ui/react"
import { DensityLarge, FirstPage, GitHub, NightsStay, Person, Web } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { FaRegPaperPlane } from "react-icons/fa"
import ResumeArrow from "../assets/pointeraArrow.gif";

import { ReactComponent as Resume2 } from "../assets/resume2.svg";

type MenuProps = {
    currPage: string
    pageSetter: (arg0: 'portfolio' | 'about') => void
    arrowActive?: boolean
}

const MenuLite: React.FC<MenuProps> = ({ currPage, pageSetter, arrowActive=false }) => {
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
        <>
            {/** Menu Button */}
            <div
                id="menubtn"
                style={{
                    left: hidden ? -100 : 0,
                    top: hidden ? -100 : 0,
                    margin: '10px',
                    position: 'fixed',
                    zIndex: 100000,
                    transition: 'all 0.8s',
                    opacity: 1,
                    mixBlendMode: 'difference',
                }}>
                <Button
                    onClick={() => {
                        setMenuActive(true)
                        setHidden(true)
                    }}
                    className="menubtn"
                    style={{
                        borderRadius: '8px',
                    }}
                >
                    <DensityLarge />
                </Button>
            </div>

            <div
                style={{
                    left: !menuActive ? -1000 : 0,
                    // top: !menuActive ? -100 : 0,
                    top: 0,
                    padding: '10px',
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    zIndex: 100000,
                    mixBlendMode: 'difference',
                    transition: 'all .8s',
                    width: menuActive ? '100vw' : 0,
                    fontSize: '2px',
                }}
            >
                {/** Menu Item 1 */}
                <div
                    style={{
                        margin: '0 10px',
                        zIndex: 100000,
                        transition: 'all 0.8s',
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => { }}
                        style={{
                            borderRadius: '30px',
                        }}
                    >
                        <NightsStay />
                    </Button>
                </div>

                {/** Menu Item 2 */}
                <div
                    style={{
                        margin: '0 10px',
                        zIndex: 100000,
                        transition: 'all 0.8s',
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => {
                            window.open('mailto:ssrinath@ucsd.edu?subject=Hey! This is ____, looking to meet you."')
                        }}
                        style={{
                            borderRadius: '30px',
                        }}
                    >
                        <FaRegPaperPlane />
                    </Button>
                </div>

                {/** Menu Item 3 */}
                <div
                    style={{
                        margin: '0 10px',
                        zIndex: 100000,
                        transition: 'all 0.8s',
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => window.open(require('../assets/Sidharth_Srinath_2024.pdf'), '_blank')} 
                        style={{
                            borderRadius: '30px',
                        }}
                    >
                        <Resume2
                            style={{
                                minWidth: '20px',
                                maxWidth: '20px',
                            }}
                        />
                    </Button>
                    {/** from here is new: resume arrow */}
                    {/* {arrowActive &&
                        <img
                            src={ResumeArrow}
                            style={{
                                transform: 'translateX(-125px)',
                                position: 'absolute',
                                minWidth: '300px',
                                maxWidth: '300px',
                            }}
                        />
                    } */}

                </div>

                {/** Menu Item 4 */}
                <div
                    style={{
                        margin: '0 10px',
                        zIndex: 100000,
                        transition: 'all 0.8s',
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => {
                            window.open('https://www.github.com/ssrinath22')
                        }}
                        style={{
                            borderRadius: '30px',
                        }}
                    >
                        <GitHub />
                    </Button>
                </div>

                {/** Menu Item 5 */}
                <div
                    style={{
                        margin: '0 10px',
                        zIndex: 100000,
                        transition: 'all 0.8s',
                        opacity: 1,
                    }}>
                    <Button
                        onClick={() => {
                            (currPage == 'portfolio') ? pageSetter('about') : pageSetter('portfolio')
                        }}
                        style={{
                            borderRadius: '30px',
                        }}
                    >
                        {(currPage == 'portfolio') ? <Person /> : <Web />}
                    </Button>
                </div>

                {/** Menu Close Item */}
                <div
                    id='closebtn'
                    style={{
                        margin: '0 10px',
                        zIndex: 100000,
                        transition: 'all 0.8s',
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
                            color: 'white',
                        }}
                    >
                        <FirstPage />
                    </Button>
                </div>


            </div>
        </>

    )
}

export default MenuLite
