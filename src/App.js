import React, { useState, useEffect } from "react";

// components
import { Button, Box, Flex, Grid, GridItem, Spacer, Stat, StatLabel, StatNumber, StatHelpText, Text } from '@chakra-ui/react'

// images
import meth from "./resources/images/crystal-meth.png"
import cash from "./resources/images/cash.png";

function App() {
  const [batches, setBatches] = useState(0);
  const [balance, setBalance] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [batchValue, setBatchValue] = useState(5);

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
    </Grid >
  );
}

export default App;