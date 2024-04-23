import Typed from 'typed.js'
import { useEffect, useRef, useState } from "react"
import AnimatedBalls from '../animations/Components/AnimatedBalls'

type IntroAreaProps = {
    accentColor?: string
    bgColor: string
    textColor: string
    isBigScreen: boolean
    isMediumScreen: boolean
}

const IntroArea: React.FC<IntroAreaProps> = ({ accentColor = 'blue', bgColor, textColor, isBigScreen, isMediumScreen }) => {
    const el1 = useRef<HTMLSpanElement | null>(null)
    const el2 = useRef<HTMLSpanElement | null>(null)

    const [currentStringIndex, setCurrentStringIndex] = useState(0)
    const [update, setUpdate] = useState(false)
    const [infoIsHovered, setInfoIsHovered] = useState(false)

    const introFontSize = isMediumScreen ? isBigScreen ? '65px' : '50px' : '40px'
    const langFontSize = isMediumScreen ? isBigScreen ? '15px' : '12px' : '12px'

    const leftOffset = '20%'
    const divVertOffset =  isMediumScreen ? isBigScreen ? '50%' : '45%' : '42%'
    const divWidth = isMediumScreen ? isBigScreen ? 350 : 275 : 175
    const langVertOffset =  isMediumScreen ? isBigScreen ? '51%' : '46%' : '43%'

    const introPositioning = 'fixed'

    const strings = [
        `Hey,<br>I\'m <span style="text-decoration:underline; text-decoration-color:${accentColor}">Sid</span>. `, // English
        `வணக்கம்,<br>நான் <span style="text-decoration:underline; text-decoration-color:${accentColor}">சிட்</span>.`, // Tamil
        `Hola,<br>soy <span style="text-decoration:underline; text-decoration-color:${accentColor}">Sid</span>.`, // Spanish
        `नमस्ते,<br>मैं <span style="text-decoration:underline; text-decoration-color:${accentColor}">सिड</span> हूँ।`, // Hindi
        `Hallo,<br>ich bin <span style="text-decoration:underline; text-decoration-color:${accentColor}">Sid</span>.`, // German
        `Salut,<br>je suis <span style="text-decoration:underline; text-decoration-color:${accentColor}">Sid</span>.`, // French
        `Ciao,<br>sono <span style="text-decoration:underline; text-decoration-color:${accentColor}">Sid</span>.`, // Italian
        `Привет,<br>я <span style="text-decoration:underline; text-decoration-color:${accentColor}">Сид</span>.`, // Russian
        `你好,<br>我是 <span style="text-decoration:underline; text-decoration-color:${accentColor}">西德</span>。`, // Chinese (Simplified)
        `مرحبًا،<br>أنا <span style="text-decoration:underline; text-decoration-color:${accentColor}">سيد</span>.`, // Arabic
        `سلام،<br>من <span style="text-decoration:underline; text-decoration-color:${accentColor}">سید</span> هستم。`, // Farsi
    ]

    const languages = [
        'English',
        'Tamil',
        'Spanish',
        'Hindi',
        'German',
        'French',
        'Italian',
        'Russian',
        'Chinese',
        'Arabic',
        'Farsi',
    ]

    useEffect(() => {
        let observer: MutationObserver;

        if (el1.current) {
            const typed1 = new Typed(el1.current, {
                strings,
                typeSpeed: 75,
                backSpeed: 75,
                backDelay: 2000,
                loop: true,
                showCursor: false,
                onBegin: (() => setCurrentStringIndex(0)),
                onReset: (() => setCurrentStringIndex(0)),
                onDestroy: (() => setCurrentStringIndex(0)),
                onComplete:(() => setCurrentStringIndex(0)),
            })

            // Setup a MutationObserver to watch text changes
            observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        if (el1.current?.innerText.trim() === '') {
                            setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
                        }
                    }
                })
            })

            observer.observe(el1.current, {
                childList: true, // Watch for text changes
            })

            return () => {
                typed1.destroy();
                observer.disconnect() // Clean up the observer
            }
        }
    }, []) //

    return (
        <div
            style={{
                height: '100vh',
                position: 'relative',
                overflow: 'auto',
                zIndex: 1,
                backgroundColor: bgColor,
                transition:'all .3s'
            }}
        >
            <div
                onMouseEnter={() => setInfoIsHovered(true)}
                onMouseLeave={() => setInfoIsHovered(false)}
                style={{
                    backgroundColor:'white',
                    transition: 'all .3s',
                }}
            >
                <span
                    onMouseEnter={() => setInfoIsHovered(true)}
                    onMouseLeave={async () => {
                        await setTimeout(() => setInfoIsHovered(false), 200)
                    }}
                    id="langText"
                    ref={el1}
                    style={{
                        position: introPositioning,
                        top: '30%',
                        left: leftOffset,
                        color: textColor,
                        fontSize: introFontSize,
                        fontWeight: 300,
                        fontFamily: "Nanum Gothic Coding",
                    }}
                />
                {/** TODO: make this divider way cooler (wavy maybe?) */}
                <div
                    style={{
                        position: introPositioning,
                        top: divVertOffset,
                        left: leftOffset,
                        width: divWidth,
                        borderTop: infoIsHovered ? `1px dashed ${textColor}` : `1px solid ${textColor}`,
                        opacity: isBigScreen ? infoIsHovered ? 1 : .5 : 1,
                    }}
                />
                <span
                    ref={el2}
                    style={{
                        position: introPositioning,
                        top: langVertOffset,
                        left: leftOffset,
                        color: textColor,
                        fontSize: langFontSize,
                        fontWeight: 350,
                        fontFamily: "Nanum Gothic Coding",
                        opacity: isBigScreen ? infoIsHovered ? 1 : .5 : 1,
                    }}
                >
                    {languages[currentStringIndex]} 
                </span>
            </div>


        </div>
    )
}

export default IntroArea
