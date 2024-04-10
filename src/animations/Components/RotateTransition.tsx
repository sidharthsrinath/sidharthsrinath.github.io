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
const SpinAnimation: React.FC<InputProps> = ({children, isActive}: InputProps) => {   
    const [animation, setAnimation] = useState<string | undefined>(undefined);

    useEffect(() => {
        const spinAnimation = `${spin} .5s linear forwards`;
        const spinBackAnimation = `${spinBack} .5s linear forwards`;
        setAnimation(isActive ? spinAnimation : spinBackAnimation);
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

export default SpinAnimation;

