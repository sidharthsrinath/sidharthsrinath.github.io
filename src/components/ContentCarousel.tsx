import React, { useState, useEffect } from 'react';

/**
 * Swiper Dependancies
 */
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

/**
 * Custom Slide for Swiper
 */
import Slide from './Slide';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function CustomCarousel() {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeSlide, setActiveSlide] = useState(1)
    const [hovered, setHovered] = useState<number>(-1)
    const [expanded,setExpanded] = useState<number>(-1)

    return (
        <div style={{
            backgroundColor: '#304D30',
            width: '100%',
            height: "100%",
            fontFamily: "Nanum Gothic Coding",
            fontStyle: "normal",
            padding: '15vh 15vw',
            position: 'absolute',
        }}>

            <Swiper
                onSwiper={() => setSwiperInstance(swiperInstance)}
                onSlideChange={(swiper) => {
                    setActiveSlide(swiper.activeIndex - 1)
                    setExpanded(-1)
                }}
                direction='horizontal'
                speed={200}
                slidesPerView={1}
                spaceBetween={30}
                grabCursor={true}
                className="mySwiper"
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollbarWidth: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {Array.from({ length: 8 }).map((_, index) => (
                    <SwiperSlide key={index}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(-1)}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: (expanded == index) ? `${60}vh` : `${25}vh`,
                            transition: 'height .3s, width .3s',
                        }}
                    >
                        <Slide isFocused={false} />
                        <div
                            onClick={() => (expanded == index) ? setExpanded(-1) : setExpanded(index)}
                            style={{
                                cursor:'pointer',
                                position: 'absolute',
                                color:'white',
                                bottom: 0,
                                transition: 'all .3s',
                            }}
                        >
                            {(expanded == index) ? <ExpandLess /> : <ExpandMore />}
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>

    );
}
