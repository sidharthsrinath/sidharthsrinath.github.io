import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {bg} = useSelector((state: RootState) => state.theme);    
    return (
        <div 
            style={{
                margin: '1vh 5vh',
                height:'full',
                backgroundColor:bg
            }}>
            {children}
            </div>);
  };

export default Background;