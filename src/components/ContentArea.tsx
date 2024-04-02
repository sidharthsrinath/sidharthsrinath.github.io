import { Card, Grid, GridItem, ImageProps, Img } from "@chakra-ui/react";
import { useSelector } from 'react-redux';

type ContentAreaProps = {
    LRBalance: 'right' | 'left'
    cmode: 'darker' | 'medium' | 'lighter'
    text: string
}

const ContentArea = ({ LRBalance, cmode, text }: ContentAreaProps ) => {
    const cardHeight: number = window.innerHeight/4;
    const iconSize: number = window.innerHeight/30;

    const { c0, c1, c2, c3, c4, c5 } = useSelector((state: any) => state.theme);

    var leftBgColor,rightBgColor;

    if (cmode === 'darker'){
        leftBgColor = LRBalance === 'left' ? c2 : c0;
        rightBgColor = LRBalance === 'left' ? c0 : c2; 
    }
    else if (cmode === 'medium'){
        leftBgColor = LRBalance === 'left' ? c2: c3;
        rightBgColor = LRBalance === 'left' ? c3 : c2;
    }
    else{
        leftBgColor = LRBalance === 'left' ? c0 : c1;
        rightBgColor = LRBalance === 'left' ? c1 : c0;
    }

    return (
        <Grid
        h={cardHeight}
        templateColumns='repeat(5, 1fr)'
        style={{
            justifyContent:'center',
            fontSize: iconSize,
        }}
        >
            <GridItem colSpan={LRBalance === 'left'? 2: 3} bg={leftBgColor}>
            </GridItem>
            <GridItem colSpan={LRBalance === 'left'? 3: 2} bg={rightBgColor}>
            </GridItem>

        </Grid>
    );
}

export default ContentArea;