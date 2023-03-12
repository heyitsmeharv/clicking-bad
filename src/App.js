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
  CloseButton,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text
} from '@chakra-ui/react'

// images
import meth from "./resources/images/crystal-meth.png"
import cash from "./resources/images/cash.png";

// icons
import { CloseIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

function App() {
  const [batches, setBatches] = useState(0);
  const [balance, setBalance] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [batchValue, setBatchValue] = useState(5);
  // error, success, warning, and info 
  const [notifications, setNotifications] = useState([{ index: 0, title: '', message: '', status: 'success' }]);

  // increment the count based on click value
  // every second
  useEffect(() => {
    const timer = setInterval(() => {
      setBatches(batches + clickValue);
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
  // call batch image function
  const handleCookBatch = () => {
    setBatches(batches + clickValue);
    showBatchImage();
  };

  // if we have batches,
  // sell batch for balance based on batch value
  // call cash image function
  const handleSellBatch = () => {
    if (batches > 0) {
      setBatches(batches - clickValue);
      setBalance(balance + batchValue);
      showCashImage();
    }
  };

  // function to modify the image style to show when clicked
  const showBatchImage = () => {
    const meth = document.getElementById('meth');
    meth.style.display = 'block';
    setTimeout(function () {
      meth.style.display = 'none';
    }, 100);
  };

  // function to modify the image style to show when clicked
  const showCashImage = () => {
    const cash = document.getElementById('cash');
    cash.style.display = 'block';
    setTimeout(function () {
      cash.style.display = 'none';
    }, 100);
  };

  return (
    <Grid
      templateAreas={
        `"header header"
          "sidebar main"
          "sidebar main"`
      }
      gridTemplateRows={'5rem 1fr 30px'}
      gridTemplateColumns={'350px 1fr'}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='#F5F5F5' area={'header'}>
        <Button colorScheme='red' onClick={() => setNotifications(add(notifications, 'eeibge', 'wdw', 'success'))}>
          Test Notifications
        </Button>
      </GridItem>
      <GridItem pl='2' bg='#F5F5F5' area={'sidebar'}>
        <Flex direction="column">
          <Box p={4} m={4}>
            <Flex>
              <Stat>
                <StatLabel>Batches Cooked</StatLabel>
                <StatNumber>{batches}</StatNumber>
                <StatHelpText>Multiplier {clickValue}</StatHelpText>
              </Stat>
              <img id='meth' src={meth} style={{ width: '50px', height: '50px', display: 'none' }} alt="meth" />
              <Button w='50%' h='50px' colorScheme='blue' onClick={handleCookBatch}>
                Cook
            </Button>
            </Flex>
          </Box>
          <Spacer />
          <Box p={4} m={4}>
            <Flex>
              <Stat>
                <StatLabel>Cash Stack</StatLabel>
                <StatNumber>${balance}.00</StatNumber>
                <StatHelpText>Batch Value {batchValue}</StatHelpText>
              </Stat>
              <img id='cash' src={cash} style={{ width: '50px', height: '50px', display: 'none' }} alt="cash" />
              <Button w='50%' h='50px' colorScheme='green' onClick={handleSellBatch}>
                Sell
            </Button>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
      <GridItem pl='2' bg='#F5F5F5' area={'main'}>

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
          justifyContent: 'flex-end'
        }}
      >
        <AnimatePresence initial={false}>
          {notifications.map((notification, index) => (
            <motion.li
              key={index}
              positionTransition
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
                  alignSelf='flex-start'
                  position='relative'
                  right={-1}
                  top={-1}
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