import { Grid, GridItem } from "@chakra-ui/react"
import FocusedText from "../animations/Components/FocusedText"
import CursorCircle from "./CursorCircle"

type InputProps = {
    matches: boolean
}
const IntroArea: React.FC<InputProps> = ({ matches }) => {
    return (


        <div
            style={{
                // backgroundImage:'url(./assets/bg3.png)',
                height: '100%',
                // position:'absolute'
                overflow: 'hidden'
            }}
        >


            <span
                style={{
                    // backgroundColor:'red',
                    color: '#0FFF9F',
                    padding: matches ? '15%' : '30% 10%',
                    left: 0,
                    position: 'absolute',
                    zIndex: 5,
                    mixBlendMode: 'difference',
                    fontFamily: "Nanum Gothic Coding",
                    fontSize: matches ? '2.5vh' : '2.5vw',
                    // fontSize: matches ? '25px' : '15px',
                    fontWeight: 300,
                    fontStyle: "normal",
                }}
            >
                There are many variations of passages of <FocusedText>Lorem Ipsum
                </FocusedText> available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </span>

            <Grid
                templateColumns={'repeat(5,1fr)'}
                templateRows={'repeat(2,1fr)'}
                style={{
                    height: '100%'
                }}
            >
                <GridItem
                    colSpan={matches ? 3 : 5}
                    rowSpan={matches ? 2 : 1}
                    bg={'#86B6F6'}
                    style={{
                        zIndex: -5,
                        padding: '10vh',
                        overflow: 'hidden',
                        textAlign: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {matches && <CursorCircle />}
                </GridItem>
                <GridItem
                    colSpan={matches ? 2 : 5}
                    rowSpan={matches ? 2 : 1}
                    bg={"#EEF5FF"}
                    // bg={'black'}
                    style={{
                        zIndex: -1,
                        padding: '10vh',
                        overflow: 'hidden',
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontFamily: "Nanum Gothic Coding",
                        fontSize: '2vw',
                        fontWeight: 200,
                        fontStyle: "normal",
                    }}
                >

                </GridItem>
            </Grid>

        </div>
    )
}

export default IntroArea