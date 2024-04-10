import { ReactIcon } from "@chakra-ui/icons";
import { Card, Grid, GridItem, Icon } from "@chakra-ui/react";
import { Expand, GitHub, Javascript, Microsoft } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import FocusedText from "../animations/Components/FocusedText";

const grow = ({ value, setDisappearingReactionProperty }) => {
    for (let i = 1; i <= 10; i++) {
        setTimeout(() => {
            setDisappearingReactionProperty(value - i * 0.1); // Decrease by 0.1 each step
        }, i * 100);
    }

};

type InputProps = {
    isFocused: boolean
}
const Slide: React.FC<InputProps> = ({ isFocused }) => {
    const [hovered, setHovered] = useState<boolean>(false)
    const proportion = 1 + .1 * Number(hovered)
    return (
        <>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: `100%`,
                    height: `100%`,
                    transition: 'height .3s, width .3s',
                    position: 'relative',
                    backgroundColor: "#1D1E1E",
                    mixBlendMode: 'difference',
                    // backgroundColor:'#AFC8AD',
                    // fontWeight:'500px',
                    color: '#FFFFFF',
                    border: '1px solid black',
                    padding: '2% 2%',
                }}>
                {/** Company logo (left) + tech stack (right) */}
                <img
                    src={require('../assets/sony.png')}
                    width={'4%'}
                    style={{
                        border:'1px solid white',
                        borderRadius:'100%',
                        mixBlendMode:'difference',
                        // position:'absolute',
                    }}
                />
                {/** Position + Company name */}
                <div
                    style={{
                        width: '25%',
                        paddingTop: '5px',
                        fontSize: '2vh',
                        fontWeight: "800",
                        backgroundBlendMode:'exclusion',
                    }}
                >
                    Data Science Intern
                    <br />
                    @
                    <FocusedText
                        focusColor="#ECF9FF"
                    >
                        Sony Electronics
                    </FocusedText>
                </div>

                <div
                   style={{
                    position:'absolute',
                    left:'27%',
                    top:'0',
                    height:'100%',
                    width:'1px',
                    borderLeft:'1px dashed white',
                   }}
                >
                    
                </div>
            </div>
        </>
    );
}

export default Slide;