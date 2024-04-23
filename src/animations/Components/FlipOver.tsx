import { Box, Center, VStack, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const spin = keyframes`  
    from {transform: rotateX(0deg)}
    to {transform: rotateX(180deg)}
`;

const spinBack = keyframes`  
    from {transform: rotateX(180deg)}
    to {transform: rotateX(0deg)}
`;

type InputProps = {
    children: React.ReactNode
    isActive: boolean
    direction: 'up' | 'down'
    duration?: number
}
const FlipOverAnimation: React.FC<InputProps> = ({children, isActive, direction, duration=1}: InputProps) => {   
    const spinAnimation = direction === 'down' ?  `${spin} ${duration}s linear forwards` : `${spinBack} ${duration}s linear forwards`;

    return (
        <Center>
            <VStack spacing={20}>
                <Box animation={isActive ? spinAnimation: 'undefined'}>
                    {children}
                </Box>
            </VStack>
        </Center>   
    ); 
} 

export default FlipOverAnimation;
