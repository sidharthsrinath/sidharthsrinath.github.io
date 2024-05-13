import Typed from 'typed.js'
import { useEffect, useRef, useState } from "react"
import { CursorCircle } from '../components'
import { ArrowOutward, ArrowUpward } from '@mui/icons-material'

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

    const font = "VT323, monospace, sans serif" //"Nanum Gothic Coding"
    const introFontSize = isMediumScreen ? isBigScreen ? 65 : 50 : 40
    const langFontSize = isMediumScreen ? isBigScreen ? 15 : 12 : 10
    const textOpacity = isBigScreen || isMediumScreen ? infoIsHovered ? 1 : .1 : 1

    const [introTop, setIntroTop] = useState<number>(30)
    const [introLeft, setIntroLeft] = useState<number>(20)
    const minIntroHeight = introFontSize * 3
    const divBorder = infoIsHovered ? `1px dashed ${textColor}` : `1px solid ${textColor}`
    const divWidth = isMediumScreen ? isBigScreen ? 350 : 275 : 200
    const spacingTop = 0
    const spacingIn = 5

    const introPositioning = (isBigScreen || isMediumScreen) ? 'fixed' : 'absolute'

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

        const textEffect = () => {
            // setIntroTop(30 - ((window.scrollY % window.innerHeight) / window.innerHeight) * 30)
            // setIntroLeft(Math.max(0, 20 - ((window.scrollY % window.innerHeight) / window.innerHeight) * 20))
        }


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
                onComplete: (() => setCurrentStringIndex(0)),
            })

            /** Change language annotation when intro text switches languages */
            let observer: MutationObserver;
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


            if (isBigScreen || isMediumScreen) window.addEventListener('scroll', textEffect)


            return () => {
                typed1.destroy();
                observer.disconnect() // Clean up the observer
                if (isBigScreen || isMediumScreen) window.addEventListener('scroll', textEffect)
                window.removeEventListener('scroll', textEffect)
            }
        }
    }, []) //

    return (
        <div
            style={{
                minHeight: '100vh',
                maxHeight: '100vh',
                position: 'relative',
                overflow: 'auto',
                zIndex: 0,
                backgroundColor: bgColor,
                // transition: 'all .3s'
            }}
        >
            <div
                onMouseEnter={() => setInfoIsHovered(true)}
                onMouseLeave={() => setInfoIsHovered(false)}
                style={{
                    position: introPositioning,
                    top: `${introTop}%`,
                    left: `${introLeft}%`,
                    // transition: 'all .3s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacingTop,
                }}
            >
                <span
                    id="langText"
                    ref={el1}
                    style={{
                        minHeight: minIntroHeight,
                        color: textColor,
                        fontSize: `${introFontSize}px`,
                        fontWeight: 300,
                        fontFamily: font,
                    }}
                />
                {/** TODO: make this divider way cooler (wavy maybe?) */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: spacingIn,
                    }}
                >
                    {<div
                        style={{
                            width: divWidth,
                            borderTop: divBorder,
                            opacity: textOpacity,
                        }}
                    />}
                    <span
                        ref={el2}
                        style={{
                            color: textColor,
                            fontSize: `${langFontSize}px`,
                            fontWeight: 350,
                            fontFamily: font,
                            opacity: textOpacity,
                        }}
                    >
                        {languages[currentStringIndex]}
                    </span>
                </div>

            </div>

        </div>
    )
}

export default IntroArea
