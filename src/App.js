import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// utils
import { add, remove, removeRange } from "./utils/array-utils";

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
  StatArrow,
  StatGroup,
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
import { CloseIcon, AddIcon, WarningIcon, CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';

function App() {
  // error, success, warning, and info 
  const [notifications, setNotifications] = useState([]);
  const [batches, setBatches] = useState(0);
  const [balance, setBalance] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [batchValue, setBatchValue] = useState(5);
  const [multiplier, setMultiplier] = useState(1); // for upgrades

  const [timeline, setTimeline] = useState([]);

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
    { name: "Air Fresheners", description: "With the sweet sent of pine in the air, you can cook an extra batch at a time.", cost: 10, owned: false },
    { name: "Goatee", description: "Your mighty goatee intimidates buyers into buying more product; you can now sell an extra batch at a time.", cost: 10, owned: false },
    { name: "Cheap Cookware", description: "With the sweet sent of pine in the air, you can cook an extra batch at a time.", cost: 100, owned: false },
    { name: "Electric Hotplate", description: "With the sweet sent of pine in the air, you can cook an extra batch at a time.", cost: 1000, owned: false },
    { name: "Dealer Business Cards", description: "With the sweet sent of pine in the air, you can cook an extra batch at a time.", cost: 1000, owned: false },
    { name: "Exhaust Fan", description: "With the sweet sent of pine in the air, you can cook an extra batch at a time.", cost: 1000, owned: false },
    { name: "Gas Stove", description: "Improves meth purity by 0.5 IPU.", cost: 120, owned: false },
    { name: "Stainless Steel Cookware", description: "Improves meth purity by 0.5 IPU.", cost: 120, owned: false },
    { name: "Portable Power Generator", description: "Improves meth purity by 0.5 IPU.", cost: 120, owned: false },
  ]);

  const [achievements, setAchievements] = useState([
    { name: "This is kinda fun...", description: "You've hand-cooked your first batch of meth", completed: false },
    { name: "I see how this works", description: "You've hand-cooked 100 batches of meth", completed: false },
    { name: "Click apprentice", description: "You've hand-cooked 1,000 batches of meth", completed: false },
    { name: "Click magician", description: "You've hand-cooked 100,000 batches of meth", completed: false },
    { name: "Clickity-splickity", description: "You've hand-cooked 1,000,000 batches of meth", completed: false },
    { name: "I AM THE ONE WHO CLICKS", description: "YOU are to be feared. You've hand-cooked 100,000,000 batches of meth!", completed: false },
    { name: "In the meth business", description: "You've earned your first $1,000 ", completed: false },
    { name: "In the money business", description: "You've earned your first $1,000,000 ", completed: false },
  ]);

  // get cookie
  const getCookie = (name) => {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  // set cookie
  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  // load state from cookie when the component mounts
  useEffect(() => {
    const storedBatches = parseInt(getCookie("batches"), 10);
    if (!isNaN(storedBatches)) {
      setBatches(storedBatches);
    }
    const storedBalance = parseInt(getCookie("balance"), 10);
    if (!isNaN(storedBalance)) {
      setBalance(storedBalance);
    }
    const storedClickValue = parseInt(getCookie("clickValue"), 10);
    if (!isNaN(storedClickValue)) {
      setClickValue(storedClickValue);
    }
    const storedBatchValue = parseInt(getCookie("batchValue"), 10);
    if (!isNaN(storedBatchValue)) {
      setBatchValue(storedBatchValue);
    }
    const storedMultiplier = parseInt(getCookie("multiplier"), 10);
    if (!isNaN(storedMultiplier)) {
      setMultiplier(storedMultiplier);
    }
    const storedManufacturingItems = getCookie('manufacturingItems');
    if (!isNaN(storedManufacturingItems)) {
      setManufacturingItems(JSON.parse(storedManufacturingItems));
    }
    const storedDistributionItems = getCookie('distributionItems');
    if (!isNaN(storedDistributionItems)) {
      setDistributionItems(JSON.parse(storedDistributionItems));
    }
    const storedLaunderingItems = getCookie('launderingItems');
    if (!isNaN(storedLaunderingItems)) {
      setLaunderingItems(JSON.parse(storedLaunderingItems));
    }
    const storedUpgradeItems = getCookie('upgradeItems');
    if (!isNaN(storedUpgradeItems)) {
      setUpgradeItems(JSON.parse(storedUpgradeItems));
    }
    const storedAchievements = getCookie('achievements');
    if (!isNaN(storedAchievements)) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  // call setCookie function every 5 minutes
  useEffect(() => {
    setNotifications(add(notifications, 'Saved', 'Your game has been saved', 'info'));
    const interval = setInterval(() => {
      setCookie('batches', batches, 1);
      setCookie('balance', balance, 1);
      setCookie('clickValue', clickValue, 1);
      setCookie('batchValue', batchValue, 1);
      setCookie('multiplier', multiplier, 1);
      setCookie('manufacturingItems', JSON.stringify(manufacturingItems), 1);
      setCookie('distributionItems', JSON.stringify(distributionItems), 1);
      setCookie('launderingItems', JSON.stringify(launderingItems), 1);
      setCookie('upgradeItems', JSON.stringify(upgradeItems), 1);
      setCookie('achievements', JSON.stringify(achievements), 1);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // set window title
  useEffect(() => {
    document.title = `Batches ${batches} | $${balance} | Clicking Bad`;
  }, [balance, batches]);


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
    addTimeline("Batched Cooked");
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
    addTimeline("Batched Cooked");
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
      addTimeline("Batched Sold");
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
      addTimeline(`${item.name} Purchased for $${item.cost}`);
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
      addTimeline(`${item.name} Sold for $${item.sell}`);
    }
  };

  // push user actions to an array to display on screen
  const addTimeline = action => {
    // clean up the timeline so it doesn't get too big
    if (timeline.length > 50) {
      const newTimeline = removeRange(timeline, 0, 25);
      setTimeline(newTimeline);
      return;
    }

    const newTimeline = [...timeline];
    const timeStamp = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    newTimeline.push(`${timeStamp} ${action}`)
    setTimeline(newTimeline);
  }

  return (
    <Grid
      templateAreas={
        `"sidebar header"
        "sidebar main"`
      }
      gridTemplateColumns={"0.8fr 1.2fr"}
      gridTemplateRows={"0.3fr 1.7fr"}
      h="100vh"
      fontWeight="bold"
    >
      <GridItem area={"header"} height="auto">
        <StatGroup background="#093009" color="#fff">
          <Stat p={6} m={12}>
            <Flex>
              <Box>
                <StatLabel fontSize="4xl">Batches Cooked</StatLabel>
                <StatNumber fontSize="3xl">{batches}</StatNumber>
                <StatHelpText fontSize="xl">Multiplier x{clickValue}</StatHelpText>
              </Box>
              <Box ml="auto">
                <Button h="100px" w="100px" borderRadius="13px" colorScheme="blue" fontSize="3xl" onClick={e => handleCookBatch(e)}>
                  COOK!
                </Button>
              </Box>
            </Flex>
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
          <Stat p={6} m={12}>
            <Flex>
              <Box>
                <StatLabel fontSize="4xl">Cash Stack</StatLabel>
                <StatNumber fontSize="3xl">${balance}.00</StatNumber>
                <StatHelpText fontSize="xl">Batch Value {batchValue}</StatHelpText>
              </Box>
              <Box ml="auto">
                <Button h="100px" w="100px" borderRadius="13px" colorScheme="green" fontSize="3xl" onClick={e => handleSellBatch(e)}>
                  SELL!
                </Button>
              </Box>
            </Flex>
          </Stat>
        </StatGroup>
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
      </GridItem>
      {/* <GridItem pl='2' bg='#1CCAEA' area={'header'}>
        <Button colorScheme='red' onClick={() => setNotifications(add(notifications, 'Test notification', 'hello, i am a notification', 'success'))}>
          Test Notifications
        </Button>
      </GridItem> */}
      <GridItem area={'sidebar'}>
        <Tabs isFitted variant='unstyled' colorScheme='blue'>
          <TabList>
            <Tab background="#1F6032" color="#fff" fontSize="1.2rem" height="50px" _selected={{ background: "#0D3E10" }}>Manufacturing</Tab>
            <Tab background="#1F6032" color="#fff" fontSize="1.2rem" height="50px" _selected={{ background: "#0D3E10" }}>Distribution</Tab>
            <Tab background="#1F6032" color="#fff" fontSize="1.2rem" height="50px" _selected={{ background: "#0D3E10" }}>Laundering</Tab>
            <Tab background="#1F6032" color="#fff" fontSize="1.2rem" height="50px" _selected={{ background: "#0D3E10" }}>Upgrades</Tab>
            <Tab background="#1F6032" color="#fff" fontSize="1.2rem" height="50px" _selected={{ background: "#0D3E10" }}>Achievements</Tab>
          </TabList>
          <GridItem area={'sidebar'}>
            <TabPanels background="#032202">
              <TabPanel padding={0} height="100vh" overflowY="auto">
                {manufacturingItems.map((item, index) => (
                  <Card background="#032202" color="white" key={index}>
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
                      <Button background="#1F6032" marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                      <Button background="#0D3E10" onClick={() => sellItem(item)}>Sell for ${item.sell}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel padding={0} height="100vh" overflowY="auto">
                {distributionItems.map((item, index) => (
                  <Card background="#032202" color="white" key={index}>
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
                      <Button background="#1F6032" marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                      <Button background="#0D3E10" onClick={() => sellItem(item)}>Sell for ${item.sell}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel padding={0} height="100vh" overflowY="auto">
                {launderingItems.map((item, index) => (
                  <Card background="#032202" color="white" key={index}>
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
                      <Button background="#1F6032" marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                      <Button background="#0D3E10" onClick={() => sellItem(item)}>Sell for ${item.sell}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel padding={0} height="100vh" overflowY="auto">
                {upgradeItems.map((item, index) => (
                  <Card background="#032202" color="white" key={index}>
                    <CardHeader>
                      <Flex>
                        <Heading size='md'>{item.name}</Heading>
                        <Heading marginLeft="auto" size='md'>{item.completed ? <CheckIcon /> : <NotAllowedIcon />}</Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>{item.description}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button background="#1F6032" marginRight="10px" onClick={() => buyItem(item)}>Buy for ${item.cost}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel padding={0} height="100vh" overflowY="auto">
                {achievements.map((item, index) => (
                  <Card background="#032202" color="white" key={index}>
                    <CardHeader>
                      <Flex>
                        <Heading size='md'>{item.name}</Heading>
                        <Heading marginLeft="auto" size='md'>{item.completed ? <CheckIcon /> : <NotAllowedIcon />}</Heading>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>{item.description}</Text>
                    </CardBody>
                  </Card>
                ))}
              </TabPanel>
            </TabPanels>
          </GridItem>
        </Tabs>
      </GridItem>
      <GridItem area={'main'}>
        <Box height="100vh" overflowY="auto" background="#29773E" color="#fff" pr={12} pl={12} pt={12}>
          <ul
            style={{
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
              {timeline.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                  <Text key={index} fontSize="2xl">{item}</Text>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Box>
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
    </Grid>
  );
}

export default App;