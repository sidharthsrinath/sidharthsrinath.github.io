import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, Divider, theme } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from './slices/theme-slice';
import { lightState, darkState } from './states/theme-states'; // Assume you export these
import { ContentArea, ContentMenu } from './components';
import Background from './components/Background';



export const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeState = darkMode ? darkState : lightState;
    dispatch(updateTheme(themeState));
    console.log(themeState);
  }, [darkMode, dispatch]);


  return (
    <ChakraProvider>
        <Background>
            <ContentMenu themeVal={darkMode} themeDispatch={setDarkMode} />
            <ContentArea LRBalance='right' cmode='medium' text=''/>
                        
        </Background>
    </ChakraProvider>
  );
};
