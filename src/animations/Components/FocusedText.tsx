import { keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const moveUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-5px); } // Adjust this value as needed
`

type InputProps = {
    content?: string
    children?: React.ReactNode
    focusColor?: string
    textSize?:string
    focusTextSize?: string
    underlineColor?:string
    isSmallScreen?:boolean
    hoverActivity?: () => any | undefined
    unhoverActivity?: () => any | undefined
    clickActivity?: () => any | undefined
}

const FocusedText: React.FC<InputProps> = ({ content, children, focusColor="white", textSize="inherit", focusTextSize="inherit", underlineColor="inherit", isSmallScreen=false, hoverActivity=undefined, unhoverActivity=undefined, clickActivity=undefined }: InputProps) => {
    const [active, setActive] = useState<boolean>(false)

    const animation = `translateY(-3px)`
    // const animation = isSmallScreen ? `translateY(-3px)` : 'undefined'

    useEffect(() => {
        if(active && hoverActivity !== undefined) hoverActivity()
        else if(!active && unhoverActivity !== undefined) unhoverActivity()   
    },[active])

    return (
        <span
            onClick={clickActivity}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            style={{
                fontSize: active ? focusTextSize: textSize,
                cursor:'pointer',
                position: 'relative',
                transform: active ? `${animation}` : 'none',
                display: 'inline-block',
                textDecoration: 'underline',
                textDecorationStyle: 'dashed',
                textDecorationColor:underlineColor,
                color:active ? focusColor: 'inherit',
                transition: 'all 0.3s ease',
            }}
        >
            {content || children}
        </span>
    )
}

export default FocusedText