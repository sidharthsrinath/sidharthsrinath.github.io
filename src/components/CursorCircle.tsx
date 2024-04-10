// import { max } from "lodash"
// import { useEffect, useState } from "react"
// type CursorCircleProps = {
//     color?: string
// }
// const CursorCircle:React.FC<CursorCircleProps> = ({color='#EE400F'}) => {
//     const [ready, setReady] = useState(false)
//     const size = 200
//     const [circle, setCircle] = useState({ x: size / 2, y: size / 2 })
//     const [otherCircles, setOtherCircles] =  useState({ x: -100, y: -100 })


//     useEffect(() => {
//         window.addEventListener('mousemove', async (e: MouseEvent) => {
//             if(!ready) setReady(true)
//             setCircle({ x: e.pageX, y: e.pageY })
//         })
//         window.addEventListener('mousedown', (e) => {
//             setCircle({ x: e.pageX, y: e.pageY })
//             setOtherCircles({x:e.pageX + size/2, y: e.pageY - size/2})
//             e.preventDefault()
//         })
//     }, [])

//     return (
//         ready &&
//         <>
//             {/** Main Circle */}
//             <div
//                 style={{
//                     borderRadius:'100%',
//                     zIndex: -99,
//                     position: 'absolute',
//                     top: `${circle.y - size / 2}px`,
//                     left: `${circle.x - size / 2}px`,
//                     height: `${size}px`,
//                     width: `${size}px`,
//                     backgroundColor: color,
//                  }}
//             />

//             {/**
//              * Second circle, follows the first one on clicks
//              */}
//             {/* <div
//             style={{
//                 borderRadius:'100%',
//                 zIndex: -99,
//                 position: 'absolute',
//                 top: `${otherCircles.y}px`,
//                 left: `${otherCircles.x}px`,
//                 height: `${size/2}px`,
//                 width: `${size/2}px`,
//                 backgroundColor: 'white',
//                 transition:'all 1s'
//              }}
//             /> */}
//         </>
//     )
// }

// export default CursorCircle


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
            const x = Math.min(window.innerWidth - size, Math.max(0, e.pageX - size / 2));
            const y = Math.min(window.innerHeight - size, Math.max(0, e.pageY - size / 2));
            setCircle({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        // No changes made for 'mousedown' in this solution, assuming it's for additional unrelated functionality
        // Consider applying similar boundary checks if needed for 'mousedown' event

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
