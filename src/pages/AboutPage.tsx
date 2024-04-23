import { GitHub, Instagram, LinkedIn, OpenInBrowser, OpenInNewOff, RunCircle } from "@mui/icons-material"
import { CursorCircle } from "../components"
import FocusedText from "../animations/Components/FocusedText"
import './AboutPage.css'
import { useEffect, useLayoutEffect, useState } from "react"
import sleep from "../animations/Functions/Sleep"
import { Button, CloseButton } from "@chakra-ui/react"




type AboutPageProps = {
    isMediumScreen: boolean
}

const AboutPage: React.FC<AboutPageProps> = ({ isMediumScreen }) => {
    const [resumePrev, setResumePrev] = useState<boolean>(false)
    const [resumePrevPos, setResumePrevPos] = useState<{ x: number, y: number }>({ x: -1, y: -1 })
    const [resumeOffsets, setResumeOffsets] = useState<{ left: number, top: number }>({ top: window.innerHeight / 30, left: window.innerWidth / 20 })
    const [resumeHovered, setResumeHovered] = useState<boolean>(false)



    useLayoutEffect(() => {
        function updatePopup() {
            setResumePrev(false)
            const el = document.getElementById('resumeText').getBoundingClientRect()
            setResumePrevPos({
                x: el.left - window.scrollX,
                y: el.top - window.scrollY
            })
        }
        window.addEventListener('resize', updatePopup);
        return () => window.removeEventListener('resize', updatePopup);

    }, []);


    useEffect(() => {
        const el = document.getElementById('resumeText').getBoundingClientRect()
        setResumePrevPos({
            x: el.left - window.scrollX,
            y: el.top - window.scrollY
        })
    }, [])

    return (
        <div
        style={{
            position: 'relative', // Positioned relatively to restrict cursor circle
            overflow: 'hidden', // Hides any overflow including the cursor circle when it goes out of bounds
            width: '100vw',
            height: '100vh',
        }}
        >
            <div
                className="styled-div"
                style={{
                    maxWidth: '100%',
                    maxHeight: "100%",
                    overflow: 'hidden',
                    "--text-color": 'white',
                    "--selection-color": 'blue',
                } as React.CSSProperties}
            >
                {/** Picture Area */}
                <div
                    style={{
                        mixBlendMode: 'normal',
                    }}
                >
                    <img
                        src={require('../assets/me_jtree.JPG')}
                        style={{
                            pointerEvents: 'none',
                            margin: isMediumScreen ? '7% 5%' : '15% 25%',
                            position: 'absolute',
                            zIndex: 10000,
                            isolation: 'isolate',
                            border: '1px solid black',
                            borderRadius: '8px',
                            width: isMediumScreen ? '30vw' : '50vw',
                        }}
                        alt={"Image of Me"}
                        loading='eager'
                    />
                </div>


                {isMediumScreen && <div
                    style={{
                        zIndex: resumePrev ? 2020202 : -100,
                        position: 'absolute',
                        left: resumePrevPos.x - resumeOffsets.left,
                        top: resumePrevPos.y + resumeOffsets.top,
                        height: '200px',
                        width: '200px',
                        backgroundColor: 'white',
                        transition: 'all .3s',
                        overflow: 'hidden',
                        alignItems: 'center',
                        borderWidth: resumePrev ? '2px' : '0px',
                        borderStyle: 'solid',
                        borderRadius: '8px',
                        borderColor: 'yellow',
                        opacity: resumePrev ? 1 : 0,
                    }}
                >
                    <Button
                        variant=''
                        onClick={() => {
                            window.open(require('../assets/Sidharth_Srinath_2024.pdf'), '_blank')
                            setResumePrev(false)
                        }}
                        style={{
                            height: '20px',
                            width: '20px',
                            position: 'absolute',
                            top: 5,
                            right: 20
                        }}
                    >
                        <OpenInNewOff
                            style={{
                                height: 'inherit',
                                width: 'inherit',
                            }}
                        />
                    </Button>
                    <CloseButton
                        _hover={{}}
                        onClick={() => setResumePrev(false)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}
                    />
                    <img
                        alt={'Sidharth Srinath Resume '}
                        onMouseEnter={() => setResumeHovered(true)}
                        onMouseLeave={() => setResumeHovered(false)}
                        src={require('../assets/resume_screenshot.png')}
                        style={{
                            pointerEvents: 'none',
                            height: 'auto',
                            width: 'inherit',
                        }}
                    />
                </div>}


                {isMediumScreen && <CursorCircle color='blue' />}

                <div
                    style={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        marginTop: isMediumScreen ? '0' : '25vh',
                        left: isMediumScreen ? '30%' : '0%',
                        zIndex: 1,
                        width: isMediumScreen ? '70%' : '100%',
                        height: isMediumScreen ? '100vh' : '75vh',
                        padding: '10vh 2vw',
                        fontFamily: "Nanum Gothic Coding",
                        fontSize: isMediumScreen ? '2.0vh' : '2.3vw',
                        fontWeight: 300,
                        fontStyle: "normal",
                        mixBlendMode: 'difference',
                        overflow: 'none',
                    }}
                >
                    {/** Description Area */}
                    <div
                        style={{
                            marginTop: isMediumScreen ? '5%' : '30%',
                            marginLeft: isMediumScreen ? '7%' : '7%',
                            marginRight: isMediumScreen ? '0' : '7%',
                            transition: 'all .3s ease'
                        }}
                    >
                        <span>Hey! My name is Sid. I'm a graduating senior at the </span>
                        <FocusedText
                            focusColor="blue"
                            textSize={isMediumScreen ? "2.0vh" : "2.3vw"}
                            focusTextSize={isMediumScreen ? "2.8h" : "3.0vw"}
                            underlineColor={"blue"}
                        >
                            <span>University of Califoria, San Diego</span>
                        </FocusedText>
                        <span>, studing Computer Science and Mathematics.</span>

                        <br /><br />

                        <span>My interests lie in Data Engineering, Fullstack Development (MERN), and Deep Generative Computer Vision. Currently, I'm a Data Science intern at Sony Electronics, but in the past I've worked as a Research Assistant at the Salk Institute of Biological Studies, at Werfen North America as a Software Engineering Intern, and as a Software Engineering Intern at MedSmart AI, a San Diego-based startup. For any job-related communications or questions, please contact me at my email: (ssrinath at ucsd dot edu).
                            You can learn more about the work I have done </span>

                        <FocusedText
                            focusColor="blue"
                            focusTextSize={isMediumScreen ? "2.8h" : "3.0vw"}
                            underlineColor={"blue"}
                            hoverActivity={() => {
                                setResumePrev(true)
                            }}
                            clickActivity={() => window.open(require('../assets/Sidharth_Srinath_2024.pdf'), '_blank')}
                        >
                            <span id='resumeText'>here</span>
                        </FocusedText>

                        <br /><br />

                        <span>
                            Outside of school and work, I love music - listening, playing, making. I play the guitar
                        </span>

                        <div
                            style={{
                                margin: '5% 0',
                                display: 'flex',
                                gap: '2%',
                                flexDirection: 'row',
                            }}
                        >
                            <Button
                                variant='outlined-soft'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                onClick={() => window.open('https://www.linkedin.com/in/sidharthsrinath', '_blank')}
                            >
                                <LinkedIn style={{ width: 'inherit', height: 'inherit' }} />
                            </Button>
                            <Button
                                variant='outlined-soft'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                onClick={() => window.open('https://www.github.com/ssrinath22', '_blank')}
                            >
                                <GitHub style={{ width: 'inherit', height: 'inherit' }} />
                            </Button>
                            <Button
                                variant='outlined-soft'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                onClick={() => window.open('https://www.instagram.com/ssrinath22', '_blank')}
                            >
                                <Instagram style={{ width: 'inherit', height: 'inherit' }} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage