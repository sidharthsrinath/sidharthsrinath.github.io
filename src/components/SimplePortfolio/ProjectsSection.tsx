import { useEffect, useState } from "react";
import ProjectEntry from "../ProjectEntry";
import SingleProject from "./Project/SingleProject";

type ProjectsSectionProps = {
    isFocused?: boolean;
    isMobileScreen: boolean;
    isDesktopScreen: boolean;
    isLaptopScreen: boolean;
    textColor: string;
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isFocused = true, isMobileScreen, isDesktopScreen, isLaptopScreen, textColor }) => {
    const border = `1px solid ${textColor}`
    const descFontMultiplier = isMobileScreen ? .75 : .75;
    const descFontSize = `${descFontMultiplier * (window.innerWidth * 0.01) + descFontMultiplier * (window.innerHeight * 0.01)}px`;
    const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'

    const accentColor = '#FEB941'


    const projects = ['Launch Term', 'Spotless', 'Snake AI', 'Word Game']
    const [currProjectIndex, setCurrProjectIndex] = useState<number>(0)

    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const [slideTransform, setSlideTransform] = useState<string>('1')

    async function handleSlideTransform(i: number) {
        setSlideTransform(`0`)
        await setTimeout(() => setSlideTransform('1'), 500)
        await setTimeout(() => setCurrProjectIndex(i), 500)
        setDropdownActive(false)
    }
    return (
        <div /** pseudo-page */
            style={{
                width: '100vw',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'start',
                    // borderBottom: `1px solid ${textColor}`
                }}
            >
                <div
                    id={`currProject`}
                    onClick={() => setDropdownActive(dropdownActive => !dropdownActive)}
                    style={{
                        zIndex: 2,
                        cursor: 'pointer',
                        fontSize: descFontSize,
                        fontWeight: 300,
                        fontFamily: 'Ubuntu Sans, sans-serif',
                        transition: 'all .2s',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        boxShadow
                    }}
                >
                    <span
                        style={{
                            padding: '5px 10px',
                            backgroundColor: accentColor,
                        }}
                    >
                        Project:
                    </span>
                    <span
                        style={{
                            padding: '5px 10px',
                            height: '100%',
                            backgroundColor: textColor,
                            color: '#FFFFFF',
                        }}
                    >
                        {projects[currProjectIndex]}
                    </span>
                </div>

                <div
                    style={{
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        transform: !dropdownActive ? `translateX(-100%)` : ``,
                        transition: 'transform .4s',
                    }}
                >
                    {
                        projects.map((v, i) => {
                            const isActive = (currProjectIndex === i)
                            const bgOpacity = isActive ? 'FF' : '00'
                            return (
                                (!isActive) &&
                                <div
                                    id={`label-${v}`}
                                    onClick={() => {
                                        handleSlideTransform(i)
                                    }}
                                    onMouseEnter={() => {
                                        if (!isActive) {
                                            const currEl = document.getElementById(`label-${v}`)
                                            currEl.style.background = `${textColor}22`
                                            currEl.style.boxShadow = boxShadow
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isActive) {
                                            const currEl = document.getElementById(`label-${v}`)
                                            currEl.style.background = `${textColor}00`
                                            currEl.style.boxShadow = ''
                                        }
                                    }} style={{
                                        cursor: 'pointer',
                                        backgroundColor: `${textColor}${bgOpacity}`,
                                        color: isActive ? '#FFFFFF' : textColor,
                                        fontSize: descFontSize,
                                        fontWeight: 300,
                                        fontFamily: 'Ubuntu Sans, sans-serif',
                                        fontStyle: 'oblique',
                                        padding: '5px 10px',
                                        transition: 'all .2s',
                                    }}
                                >
                                    {v}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div
                style={{
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    opacity: slideTransform,
                    transition: 'opacity .5s ease-in-out'
                }}
            >

                <SingleProject
                    title={projects[currProjectIndex]}
                    isMobileScreen={isMobileScreen} isDesktopScreen={isDesktopScreen} isLaptopScreen={isLaptopScreen} textColor={textColor} />

            </div>
        </div>

    );
}

export default ProjectsSection;