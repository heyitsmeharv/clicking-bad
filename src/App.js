import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// utils
import { add, remove } from "./utils/array-utils";

// components
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text
} from '@chakra-ui/react'

// images
import meth from "./resources/images/crystal-meth.png"
import cash from "./resources/images/cash.png";

// animations
import "./resources/styles/animations.css";

// icons
import { CloseIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

function App() {
  // error, success, warning, and info 
  const [notifications, setNotifications] = useState([]);
  const [batches, setBatches] = useState(0);
  const [balance, setBalance] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [batchValue, setBatchValue] = useState(5);
  const [multiplier, setMultiplier] = useState(1); // for upgrades

  const [isClicking, setIsClicking] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [manufacturingItems, setManufacturingItems] = useState([
    { name: "Storage Shed", cost: 10, sell: 5, cps: 1, count: 0 },
    { name: "Used RV", cost: 100, sell: 5, cps: 10, count: 0 },
    { name: "Abandoned Trailer", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Small House", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Abandoned Warehouse", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Laboratory", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Underground Laboratory", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Subterranean Complex", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Small Island", cost: 1000, sell: 5, cps: 100, count: 0 },
  ]);

  const [distributionItems, setDistributionItems] = useState([
    { name: "Dealer", cost: 10, sell: 5, cps: 1, count: 0 },
    { name: "Drug Mule", cost: 100, sell: 5, cps: 10, count: 0 },
    { name: "Drug Van", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Sleazy Lawyer", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Night Club", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Drug Cartel", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "DEA Mole", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Foreign Diplomat", cost: 1000, sell: 5, cps: 100, count: 0 },
  ]);

  const [launderingItems, setLaunderingItems] = useState([
    { name: "Lemonade Stand", cost: 10, sell: 5, cps: 1, count: 0 },
    { name: "Nail Salon", cost: 100, sell: 5, cps: 10, count: 0 },
    { name: "Banana Stand", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Laser Tag Theme Park", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Car Wash", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Online Donations", cost: 1000, sell: 5, cps: 100, count: 0 },
    { name: "Chicken Restaurant", cost: 1000, sell: 5, cps: 100, count: 0 },
  ]);

  const [upgradeItems, setUpgradeItems] = useState([
    { name: "Air Fresheners", cost: 10, owned: false },
    { name: "Cheap Cookware", cost: 100, owned: false },
    { name: "Electric Hotplate", cost: 1000, owned: false },
    { name: "Dealer Business Cards", cost: 1000, owned: false },
    { name: "Exhaust Fan", cost: 1000, owned: false },
    { name: "Gas Stove", cost: 1000, owned: false },
    { name: "Stainless Steel Cookware", cost: 1000, owned: false },
    { name: "Portable Power Generator", cost: 1000, owned: false },
  ]);

  // increment the batch count based on click value
  // and purchased items every second
  useEffect(() => {
    const timer = setInterval(() => {
      const itemCount = manufacturingItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0);
      const cpsCount = manufacturingItems.reduce((accumulator, currentValue) => {
        if (currentValue.count > 0) {
          return accumulator + (currentValue.cps * currentValue.count);
        } else {
          return 0;
        }
      }, 0);
      console.log('itemCount', itemCount);
      console.log('cpsCount', cpsCount);
      const totalCPS = (itemCount * multiplier) + cpsCount;
      console.log('totalCPS', totalCPS);
      setBatches(batches + totalCPS);
    }, 1000);
    return () => clearInterval(timer);
  }, [batches]);

  // increment balance count based on the batch value
  // every second and decrease the batch count
  useEffect(() => {
    if (batches > 0) {
      const timer = setInterval(() => {
        setBatches(batches - clickValue);
        setBalance(balance + batchValue);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [batches]);

  // increase the batch count based on click value
  // set is clicking to true to show image
  const handleCookBatch = (e) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
    setBatches(batches + clickValue);
    setIsClicking('meth');
    setTimeout(() => setIsClicking(null), 500);
  };

  // if we have batches,
  // sell batch for balance based on batch value
  // set is clicking to true to show image
  const handleSellBatch = (e) => {
    if (batches > 0) {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
      setBatches(batches - clickValue);
      setBalance(balance + batchValue);
      setIsClicking('cash');
      setTimeout(() => setIsClicking(null), 500);
    }
  };

  // purchase item
  const buyItem = (item) => {
    if (balance >= item.cost) {
      setBalance(balance - item.cost);
      const index = manufacturingItems.findIndex((i) => i.name === item.name);
      const newItems = [...manufacturingItems];
      newItems[index].cost = Math.round(item.cost * 1.1);
      newItems[index].sell = Math.round(item.sell * 1.1);
      newItems[index].count++;
      setManufacturingItems(newItems);
    }
  };

  // sell item
  const sellItem = (item) => {
    if (item.count > 0) {
      setBalance(balance + item.sell);
      const index = manufacturingItems.findIndex((i) => i.name === item.name);
      const newItems = [...manufacturingItems];
      newItems[index].count--;
      setManufacturingItems(newItems);
    }
  };

  return (
    <Grid
      templateAreas={
        `"sidebar header"
          "sidebar main"
          "sidebar main"`
      }
      gridTemplateRows={'5rem 1fr 30px'}
      gridTemplateColumns={'350px 1fr'}
      h='100vh'
      fontWeight='bold'
    >
      <GridItem area={'sidebar'}>
        <Flex direction="row" justifyContent="space-evenly">
          <Box p={4} m={4} flex={1}>
            <Flex direction="column">
              <Stat>
                <StatLabel>Batches Cooked</StatLabel>
                <StatNumber>{batches}</StatNumber>
                <StatHelpText>Multiplier {clickValue}</StatHelpText>
              </Stat>
              {isClicking === 'meth' && (
                <img
                  id='meth'
                  style={{
                    width: '50px',
                    height: '50px',
                    position: 'absolute',
                    top: mouseY,
                    left: mouseX,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    animation: 'clickAnimation 0.5s ease-out forwards',
                    zIndex: 9999
                  }}
                  src={meth}
                  alt="meth"
                />
              )}
              <Button borderRadius='23px' colorScheme='blue' onClick={e => handleCookBatch(e)}>
                <Text>
                  COOK!
                </Text>
              </Button>
            </Flex>
          </Box>
          <Box p={4} m={4} flex={1}>
            <Flex direction="column">
              <Stat>
                <StatLabel>Cash Stack</StatLabel>
                <StatNumber>${balance}.00</StatNumber>
                <StatHelpText>Batch Value {batchValue}</StatHelpText>
              </Stat>
              {isClicking === 'cash' && (
                <img
                  id='cash'
                  style={{
                    width: '50px',
                    height: '50px',
                    position: 'absolute',
                    top: mouseY,
                    left: mouseX,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    animation: 'clickAnimation 0.5s ease-out forwards',
                    zIndex: 9999
                  }}
                  src={cash}
                  alt="cash"
                />
              )}
              <Button borderRadius='23px' colorScheme='green' onClick={e => handleSellBatch(e)}>
                <Text>
                  SELL!
                </Text>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
      {/* <GridItem pl='2' bg='#1CCAEA' area={'header'}>
        <Button colorScheme='red' onClick={() => setNotifications(add(notifications, 'Test notification', 'hello, i am a notification', 'success'))}>
          Test Notifications
        </Button>
      </GridItem> */}
      <GridItem area={'header'}>
        <Tabs isFitted variant='unstyled' colorScheme='blue'>
          <TabList>
            <Tab height="50px" _selected={{ background: "#1CCAEA" }}>Manufacturing</Tab>
            <Tab>Distribution</Tab>
            <Tab>Laundering</Tab>
            <Tab>Upgrades</Tab>
            <Tab>Achievements</Tab>
          </TabList>
          <GridItem area={'main'}>
            <TabPanels>
              <TabPanel padding={0} height="95vh" overflowY="auto">
                {manufacturingItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Flex>
                        <Heading size='md'>{item.name}</Heading>
                        <Heading marginLeft="auto" size='md'>x{item.count}</Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>Produces {item.cps} batches per second</Text>
                    </CardBody>
                    <CardFooter>
                      <Button marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                      <Button onClick={() => sellItem(item)}>Sell for ${item.sell}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel>
                {distributionItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Flex>
                        <Heading size='md'>{item.name}</Heading>
                        <Heading marginLeft="auto" size='md'>x{item.count}</Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>Sells {item.cps} batches per second</Text>
                    </CardBody>
                    <CardFooter>
                      <Button marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                      <Button onClick={() => sellItem(item)}>Sell for ${item.sell}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel>
                {launderingItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Flex>
                        <Heading size='md'>{item.name}</Heading>
                        <Heading marginLeft="auto" size='md'>x{item.count}</Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>Launders {item.cps} batches per second</Text>
                    </CardBody>
                    <CardFooter>
                      <Button marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                      <Button onClick={() => sellItem(item)}>Sell for ${item.sell}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel>
                {upgradeItems.map((item, index) => (
                  <Card key={index} background="#1CCAEA">
                    <CardHeader>
                      <Heading size='md'>{item.name}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>Produces {item.cps} batches per second</Text>
                    </CardBody>
                    <CardFooter>
                      <Button marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel>
                <p>five!</p>
              </TabPanel>
            </TabPanels>
          </GridItem>
        </Tabs>
      </GridItem>
      <ul
        style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          listStyle: 'none',
          justifyContent: 'flex-start'
        }}
      >
        <AnimatePresence initial={false}>
          {notifications.map((notification, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              style={{
                width: '300px',
                background: 'white',
                margin: '10px',
                flex: '0 0 65px',
                position: 'relative',
                borderRadius: '10px'
              }}
            >
              <Alert h="100%" status={notification.status}>
                <AlertIcon />
                <Box>
                  <AlertTitle>{notification.title}</AlertTitle>
                  <AlertDescription>
                    {notification.message}
                  </AlertDescription>
                </Box>
                <CloseButton
                  marginLeft='auto'
                  alignSelf='flex-start'
                  position='relative'
                  right={-1}
                  bottom={-1}
                  onClick={() => setNotifications(remove(notifications, index))}
                />
              </Alert>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Grid >
  );
}

export default App;