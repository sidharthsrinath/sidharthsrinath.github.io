import { Box, Center, VStack, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const spin = keyframes`  
    from {transform: rotate(0deg);}   
    to {transform: rotate(20deg)} 
`;

const spinBack = keyframes`  
    from {transform: rotate(20deg);}   
    to {transform: rotate(0deg)} 
`;

type InputProps = {
    children: React.ReactNode;
    isActive: boolean; 
}
const Transition: React.FC<InputProps> = ({children, isActive}: InputProps) => {   
    const [animation, setAnimation] = useState<string | undefined>(undefined);

    useEffect(() => {
        const spinAnimation = `${spin} .5s linear forwards`;
        const spinBackAnimation = `${spinBack} .5s linear forwards`;

        // A simplified approach to toggle between spinning and spinning back.
        // This doesn't dynamically determine the current rotation but assumes a full spin for reverse.
        setAnimation(isActive ? spinAnimation : spinBackAnimation);
        // if (isActive) {
        //     // When isActive is true, spin to 20 degrees
        //     setAnimation(`${spin} 1s linear forwards`);
        // } else {
        //     // When isActive is false, spin back to 0 degrees
        //     setAnimation(`${spinBack} 1s linear forwards`);
        // }
    }, [isActive]);
    
    return (
        <Center>
            <VStack spacing={20}>
                <Box animation={animation}>
                    {children}
                </Box>
            </VStack>
        </Center>   
    ); 
} 

export default Transition;

