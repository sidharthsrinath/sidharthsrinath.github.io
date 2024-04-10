import { ArrowDownward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import NextPageDownwards from "../animations/Functions/NextPageDownwards";
import NextPageUpwardsAnimation from "../animations/Functions/NextPageUpwards";
import FlipOverAnimation from "../animations/Components/FlipOver";
type InputProps = {
    setTransitionState: (arg0: boolean) => void
}
const Arrow: React.FC<InputProps> = ({setTransitionState}: InputProps) => {
    // const [opacity, setOpacity] = useState<number>(1); 
    const [deactivated, setDeactivated] = useState<boolean>(true);
    const [activated, setActivated] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [direction, setDirection] = useState<'up' | 'down'>('down');


    const handleOnClick = () => {
        // handleArrowTransition();
                
        //if arrow has already been activated -> going up
        if(activated){
            setDirection('up')

            setIsActive(true)

            setActivated(false)

            //page transition
            NextPageUpwardsAnimation()
            setTransitionState(true); 
        }
        //if arrow hasn't been activated -> going down
        else if(!activated){
            setDirection('down')

            setIsActive(true)

            setActivated(true)

            //page transition
            NextPageDownwards();
            setTransitionState(true); 
        }        
        

    }


    window.addEventListener("scroll", () => {

        //going down
        if(window.scrollY == 0){
            activated &&
                setIsActive(true)
                setDirection('up')
                setActivated(false)
       }
        if(window.scrollY === (document.documentElement.scrollHeight - document.documentElement.clientHeight)){
            !activated &&
            setIsActive(true)
            setDirection('down')
            setActivated(true)
        }
    });
    
    return(
        <div style={{
            left: 0,
            right: 0,
            padding: '30px',
            textAlign: 'center',
            position: 'fixed',
            bottom:'0', 
            zIndex: 1000, 
            transition: 'bottom 0.3s',
            opacity: 1,
            mixBlendMode:'difference',
        }}>
            <FlipOverAnimation isActive={isActive} direction={direction} duration={.5}>
                {/* <MoonIcon onMouseEnter={() => setIsActive(true)}/> */}
                    <ArrowDownward 
                        sx={{fontSize:"5vh"}} 
                        onClick={handleOnClick}
                        style={{
                            color:'#0FFF9F',
                            cursor:'pointer',
                         }}
                        /> 
            </FlipOverAnimation>



        </div>

    );
}

export default Arrow;
