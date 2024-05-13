import { AirplanemodeActive, ArrowBackIos, ArrowForwardIos, GitHub, Link, LinkRounded, OpenInBrowser, OpenInNew, OpenInNewRounded, WebStories } from '@mui/icons-material';
import SpotlessImage from '/Users/sidharthsrinath/Documents/portfolio/sansidpoonal/src/assets/spotless.png'
import otherImage from '../../../assets/bg3.png'
import { FaLaravel, FaLink, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import Person from './Person';
import { title } from 'process';

type SingleProjectProps = {
    title: string;
    isMobileScreen: boolean;
    isDesktopScreen: boolean;
    isLaptopScreen: boolean;
    textColor: string;
}

const SingleProject: React.FC<SingleProjectProps> = ({title, isMobileScreen, isDesktopScreen, isLaptopScreen, textColor }) => {
    const [currIndex, setCurrIndex] = useState<number>(0)
    const images = [SpotlessImage, otherImage]
    const descFontMultiplier = isMobileScreen ? .75 : .75;
    const descFontSize = `${descFontMultiplier * (window.innerWidth * 0.01) + descFontMultiplier * (window.innerHeight * 0.01)}px`;

    const iconFontMultiplier = isMobileScreen ? 1.5 : 1.2;
    const iconFontSize = `${iconFontMultiplier * (window.innerWidth * 0.01) + iconFontMultiplier * (window.innerHeight * 0.01)}px`;

    const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
    const accentColor = '#DD5746'


    const iterateImage = (prev: boolean = false) => {
        var nextIndex;
        if (prev) {
            nextIndex = Math.abs((currIndex - 1) % images.length)
        }
        else {
            nextIndex = Math.abs((currIndex + 1) % images.length)
        }
        setCurrIndex(nextIndex)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: '80%',
                backgroundSize: 'cover',
                overflow: 'hidden',
            }}
        >

            {/** Images */}
            <div
                style={{
                    width: '50%',
                    minWidth: '500px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}
            >
                {/** Image Area Provisioning */}
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '75%',
                        width: '100%',
                    }}
                >
                    <img
                        src={images[currIndex]}
                        style={{
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                        }}
                    >
                        {images.map((v, i) => (
                            <div
                                onClick={() => setCurrIndex(i)}
                                key={`pagination-${i}`}
                                style={{
                                    cursor: 'pointer',
                                    width: '10px',
                                    height: '10px',
                                    border: '1px solid black',
                                    borderRadius: '100%',
                                    backgroundColor: currIndex == i ? textColor : 'transparent',
                                }}
                            />
                        ))}
                    </div>




                    < ArrowBackIos
                        onClick={() => iterateImage(true)}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '50%',
                            left: 30,
                            color: textColor,
                            width: descFontSize
                        }}
                    />
                    <ArrowForwardIos
                        onClick={() => iterateImage()}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '50%',
                            right: 30,
                            color: textColor,
                            width: descFontSize
                        }}
                    />

                </div>

                {/** Project Tags (stack, ppl, time) */}
                <div
                    style={{
                        width: '85%',
                        height: '25%',
                        fontSize: descFontSize,
                        fontWeight: 300,
                        color: textColor,
                        fontFamily: 'Ubuntu Sans, sans-serif',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    {/** Stack Info */}
                    <span style={{ display: 'inline-flex', textAlign: 'center' }}>TypeScript, React, Redux, Kubernetes, Terraform, AWS (API Gateway, Lambda, CloudFormation), Web Assembly, Rust</span>
                    {/** Divider */}
                    <div style={{ width: '100%', border: '1px solid black', borderRadius: '50px' }} />

                    {/** People + Time */}
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/** People*/}
                        <div
                            style={{
                                maxWidth: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                gap: '10px',
                            }}
                        >
                            <Person name={"Sidharth Srinath"} textColor={'#FFFFFF'} backgroundColor={textColor} link={'https://ssrinath22.github.io/'} />
                        </div>

                        {/** Time */}
                        <div>
                            Spring 2024
                        </div>
                    </div>

                </div>
            </div>

            {/** Description Area */}
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    alignItems: 'start',
                }}
            >
                {/** Project Title */}
                <div
                    style={{
                        width: '100%',
                        fontSize: descFontSize,
                        fontWeight: 300,
                        color: textColor,
                        fontFamily: 'Ubuntu Sans, sans-serif',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'end',
                        gap: '25px',
                        padding: '10px 20px',
                    }}
                >
                    <AirplanemodeActive style={{ height: '100%' }} />
                    <span style={{ height: '100%', width: '100%' }}>{title}</span>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'end',
                            alignItems:'center',
                            gap: '10px',
                        }}
                    >
                        <GitHub onClick={() => window.open('http://www.github.com/')} style={{cursor:'pointer'}}/>
                        <OpenInNewRounded onClick={() => window.open('http://www.github.com/')} style={{cursor:'pointer'}}/>
                    </div>
                </div>
                <div
                    style={{
                        position:'relative',
                        height: '100%',
                        width: '100%',
                        fontSize: descFontSize,
                        fontWeight: 300,
                        color: textColor,
                        fontFamily: 'Ubuntu Sans, sans-serif',
                        border: '1px solid black',
                        borderRadius: '10px',
                        padding: '20px',
                        // overflowY: 'scroll',
                        scrollbarWidth:'thin',
                    }}
                >
                    Spotless is a machine learning powered music reccomendation engine that connects to your music provider and generates new playlists based on your music taste. It's personalizable with the ability to decide what direction you would like the recommendations to go in Spotless is a machine learning powered music reccomendation engine that connects to your music provider and generates new playlists based on your music taste. It's personalizable with the ability to decide what direction you would like the recommendations to go in
                </div>

            </div>

        </div>
    );
}

export default SingleProject;
