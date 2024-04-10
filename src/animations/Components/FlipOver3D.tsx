import { Box, Center, VStack, keyframes } from "@chakra-ui/react";

// 3D spin keyframes for a creative flip-over effect
const spin3D = keyframes`
    0% { transform: rotateY(0deg) translateZ(0); }
    50% { transform: rotateY(180deg) translateZ(100px); } // Moves out towards the viewer in the middle of the spin
    100% { transform: rotateY(360deg) translateZ(0); } // Completes the spin back to the original position
`;

type InputProps = {
    children: React.ReactNode;
    isActive: boolean;
    duration?: number;
};

const FlipOverAnimation3D: React.FC<InputProps> = ({ children, isActive, duration = 1 }: InputProps) => {
    const animation = `${spin3D} ${duration}s ease-in-out forwards`;
    
    return (
        <Center>
            <VStack spacing={20}>
                <Box animation={isActive ? animation : undefined} style={{ transformStyle: 'preserve-3d' }}>
                    {children}
                </Box>
            </VStack>
        </Center>
    );
};

export default FlipOverAnimation3D;
