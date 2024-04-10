import { Box, Center, VStack, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Define the keyframes for moving up and down
const moveUpDown = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); } 
`;

type InputProps = {
    children: React.ReactNode;
};

const JumpAnimation: React.FC<InputProps> = ({children}: InputProps) => {
    // Initialize the animation state
    const [animation, setAnimation] = useState<string>("");

    useEffect(() => {
        // Define the animation with the "moveUpDown" keyframes
        const animationName = `${moveUpDown} 2s ease-in-out infinite`; // Customize timing and easing as needed
        // Set the animation state
        setAnimation(animationName);
    }, []);

    return (
        <Box 
            animation={animation}>
            {children}
        </Box>
    );
};

export default JumpAnimation;
