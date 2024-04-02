import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ContentArea from './ContentArea';

const ContentTab = () => {
    return (
        <Tabs variant='enclosed' align="end">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
    );
}


export default ContentTab;