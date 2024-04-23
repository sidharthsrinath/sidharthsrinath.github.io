import { useEffect, useState } from "react";

type CursorCircleProps = {
    color?: string;
};

const CursorCircle: React.FC<CursorCircleProps> = ({ color = '#EE400F' }) => {
    const [ready, setReady] = useState(false);
    const size = 200;
    const [circle, setCircle] = useState({ x: size / 2, y: size / 2 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ready) setReady(true);
            const x = e.pageX - size / 2
            const y = e.pageY - size / 2
            setCircle({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [ready]);

    return (
        ready &&
        <>
            <div
                style={{
                    borderRadius: '100%',
                    zIndex: -99,
                    position: 'absolute',
                    top: `${circle.y}px`,
                    left: `${circle.x}px`,
                    height: `${size}px`,
                    width: `${size}px`,
                    backgroundColor: color,
                }}
            />
        </>
    );
};

export default CursorCircle;

