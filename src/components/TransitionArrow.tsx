import { ArrowDownward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FlipOverAnimation from "../animations/Components/FlipOver";

type InputProps = {
    arrowColor:string
}

const Arrow: React.FC<InputProps> = ({ arrowColor}) => {
    const [atBottom, setAtBottom] = useState(false)
    const transitionTime = .5 

    const handleOnClick = () => {
        console.log(atBottom)
        if (atBottom) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        } else {
            const newScrollPosition = window.scrollY + window.innerHeight
            // const newScrollPosition = (window.scrollY + window.innerHeight) - ((window.scrollY + window.innerHeight) % window.innerHeight)
            window.scrollTo({
                top: newScrollPosition,
                behavior: "smooth",
            })
        }
     }

    useEffect(() => {
        const handleScroll = () => {  
            const currTopScroll = window.scrollY + window.innerHeight
            const maxScroll = document.documentElement.scrollHeight
            const threshold = 30
            setAtBottom(Math.abs(maxScroll - currTopScroll) <= threshold)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div
            style={{
                left: 0,
                right:0,
                bottom: 0,
                textAlign: "center",
                position: "fixed",
                zIndex: 100000000000,
                transition: `bottom ${transitionTime}s`,
                opacity: 1,
                // mixBlendMode:'difference'
            }}
        >
                <ArrowDownward
                    sx={{ fontSize: "5vh" }}
                    onClick={handleOnClick}
                    style={{
                        color: arrowColor,
                        cursor: "pointer",
                        transform: atBottom ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition:`all ${transitionTime}s`,
                    }}
                    
                />
        </div>
    )
}

export default Arrow
