import {
    Stack,
    Flex,
    Box,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import background from '../../assets/images/park-background.jpg'
  import { AuthTabs } from '../Auth';
  import { ColorModeSwitcher } from '../../ColorModeSwitcher';


  const MainPage = () => {
    return (
      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          `url(${background})`
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
              
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>  
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              System zgłoszeń wspólnoty mieszkaniowej
            </Text>
            
          </Stack>
          <Stack align={'flex-end'} spacing={6}>
            <AuthTabs />
          </Stack>
         
         

        </VStack>
        {/* <ColorModeSwitcher m={3} justifySelf="flex-end" /> */}
       
      </Flex>
    );
  }
  export default MainPage;
  