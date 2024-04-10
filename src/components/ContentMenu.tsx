import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel, TabPanels, Box, StyleProps, Button, Flex, MenuList, MenuItem, Menu, Grid, GridItem, Divider } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import '../assets/fonts.css';
import SpinAnimation from '../animations/Components/RotateTransition';

interface ThemeState {
    theme: {
      c0: string;
      c1: string;
      c2: string;
      c3: string;
      c4: string;
      c5: string;
      bg: string;
    };
  }

type InputProps = {
    themeVal: boolean
    themeDispatch: (arg0: boolean) => void  
}


const ContentMenu: React.FC<InputProps> = ({themeVal, themeDispatch}: InputProps) => {
  const menuHeight: number = window.innerHeight / 15;
  const { c0, c1, c2, c3, c4, c5, bg } = useSelector((state: ThemeState) => state.theme);

  const [tabIndex, setTabIndex] = useState<number | undefined>(-1);
  const [activatedOption, setActivatedOption] = useState<number>(-1); //this is for the items inside a tab panel
  const [themeButtonHovered, setThemeButtonHovered] = useState<boolean>(false);
  

  return (
    <Box
        style={{
            position: 'fixed', 
            top: 0,
            left: 0, 
            right: 0, 
            zIndex: 10, 
            backgroundColor: c1,
            margin:'0 5vh',
            borderWidth:'1px',
            borderStyle:'dotted',
            borderColor:c3,
            borderRadius:'5px'
        }}>
        <Tabs 
            variant='soft'
            index={tabIndex} 
            onChange={(index) => {
                setTabIndex(index);
            }}>
            <Flex justifyContent="space-between">
                <TabList>
                    {['One', 'Two', 'Three'].map((tab, index) => (
                    <Tab
                        key={tab}
                        onMouseEnter={() => {
                            setTabIndex(index);
                        }}
                        onMouseLeave={() => {
                            setTabIndex(-1); 
                        }}
                        color={c3}
                        _hover={{ bg: tabIndex === index ? c0 : 'transparent', height:'6vh' }}
                        _selected={{ 
                            bg: tabIndex === index ? c0 : 'transparent', 
                            color: tabIndex === index ? c5:c2 }}
                        style={{
                            borderRadius:'5px',
                            height: '6vh',
                            minHeight:'40px',
                            borderWidth:tabIndex === index ? '1px': '0px',
                            borderColor:c5,
                            borderStyle:'dotted'
                        }}>
                        {tab}
                    </Tab>
                ))}
                </TabList>
                <Flex>
                    <Tab
                        onClick={() => themeDispatch(!themeVal)}
                        onMouseEnter={() => setThemeButtonHovered(true)}
                        onMouseLeave={() => setThemeButtonHovered(false)}
                    >
                        <SpinAnimation isActive={themeButtonHovered}>
                            {themeVal ? <MoonIcon color={c2} _hover={{/*color: c4*/}}/>: <SunIcon color={c2} _hover={{color: c4}}/> }
                        </SpinAnimation>
                    </Tab>
                </Flex>
            </Flex>
            <TabPanels 
                style={{
                    // margin: '.25vh 0'
                    color:c4
                }}>
                <TabPanel 
                    bg={tabIndex === 0 ? c0 : undefined} 
                    // bg='transparent'
                    style ={{
                        borderRadius:'5px',
                        width: '100%',
                        position: 'absolute',
                        zIndex:10,
                        borderWidth:'1px',
                        borderStyle:'dotted',
                        borderColor:c5
                    }}
                    onMouseEnter={() => setTabIndex(0)}
                    onMouseLeave={() => setTabIndex(-1)}>
                    {tabIndex === 0 && <div>{tabIndex}</div>}
                </TabPanel>
                <TabPanel 
                    bg={tabIndex === 1 ? c0 : undefined}
                    onMouseEnter={() => setTabIndex(1)}
                    onMouseLeave={() => setTabIndex(-1)}       
                    style ={{
                        borderRadius:'5px',
                        width: '100%',
                        position: 'absolute',
                        zIndex:10,
                        borderWidth:'1px',
                        borderStyle:'dotted',
                        borderColor:c5
                    }}>
                    {tabIndex === 1 && <div>{tabIndex}</div>}
                </TabPanel>
                <TabPanel 
                    bg={tabIndex === 2 ? c0 : undefined}
                    onMouseEnter={() => setTabIndex(2)}
                    onMouseLeave={() => setTabIndex(-1)}
                    style ={{
                        borderRadius:'5px',
                        width: '100%',
                        position: 'absolute',
                        zIndex:10,
                        borderWidth:'1px',
                        borderStyle:'dotted',
                        borderColor:c5
                    }}>
                    {tabIndex === 2 && <div>{tabIndex}</div>}
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>
  );
};

export default ContentMenu;
