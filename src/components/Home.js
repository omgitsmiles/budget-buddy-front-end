import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useDisclosure,
  Collapse,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from './Navbar'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { motion } from 'framer-motion'

export default function CallToActionWithAnnotation({ setUser, user }) {
    const [budgets, setBudgets] = useState([])
    const [input, setInput] = useState('')
    const toast = useToast()
    const { isOpen, onToggle } = useDisclosure()

    function handleCreateBudget(e){
        e.preventDefault()
        setBudgets([...budgets, input])
        setInput('')
        toast({
          title: `Created ${input} budget`,
          status: "success",
          position: "bottom",
          isClosable: true,
        })
        // fetch(`/users/${user.id}/budgets`, {
        //     method: "POST",
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(user)
        // })
    }

    console.log(budgets)

  return (
    <>
    <Navbar setUser={setUser} />
      <Container maxW={'1xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            as={motion.h1}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            lineHeight={'110%'}>
            Welcome Back <br />
            <Text as={'span'} 
            bgGradient="linear(to-r, green.400,green.700)"
            bgClip="text">
              {user?.name}
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Create a budget to get started
          </Text>
          <Stack
            direction={'column'}
            spacing={2}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button 
                    as={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onToggle}
                    colorScheme={'green'}
                    bg={'green.400'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                      bg: 'green.500',
                    }}>Create Your Budget</Button>
                <Collapse in={isOpen} animateOpacity>
                    <Box
                    p='40px'
                    color='gray.500'
                    mt='4'
                    bg='white.500'
                    rounded='md'
                    shadow='md'
                    >
                      <Card>
                <CardHeader>
                    <Heading size='md'>Create Budget</Heading>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleCreateBudget}>
                    <Stack divider={<StackDivider />} spacing={4}>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        Budget Name
                        </Heading>
                        <br />
                        <Input
                          type='text'
                          value={input}
                          placeholder='name'
                          onChange={(e) => setInput(e.target.value)}
                          isRequired
                          />
                    </Box>
                    <Button
                    type='submit'
                    leftIcon={<BiMoneyWithdraw />}
                    colorScheme={'green'}
                    bg={'green.400'}
                    rounded={'full'}
                    px={6}
                    bgGradient="linear(to-r, green.400,green.700)"
                    color={'white'}
                    _hover={{
                      bgGradient: 'linear(to-r, green.400,green.800)',
                      boxShadow: 'xl'
                    }}>Create Budget</Button>
                    </Stack>
                    </form>
                </CardBody>
                </Card>
                    </Box>
                </Collapse>
          </Stack>
        </Stack>
      </Container>

      {budgets.length > 0 ?
      <Container maxW={'xl'}>
      <Box
          p='40px'
          color='gray.500'
          mt='4'
          bg='white.500'
          rounded='md'
          shadow='md'
          >
            <Heading size='xl'>Your Budgets</Heading>
            <br />
              {budgets.map(bud => (
              //   <Card align='center'>
              //   <CardHeader>
              //     <Heading size='md'>{bud}</Heading>
              //   </CardHeader>
              //   <CardBody>
              //     <Text>Testing</Text>
              //   </CardBody>
              //   <CardFooter>
              //     <Button colorScheme='green'
              //             bg={'green.400'}>View here</Button>
              //   </CardFooter>
              // </Card>
              <Stack spacing='4'>
                  <Card key={bud} variant='outline'>
                    <CardHeader>
                      <Heading size='md'>{bud}</Heading>
                    </CardHeader>
                    <CardBody>
                    <Button colorScheme='green'
                          bg={'green.400'}
                          rounded={'full'}>View here</Button>
                    </CardBody>
                  </Card>
                  <br />
              </Stack>
              ))}
          </Box>
          </Container> 
        : null}       
    </>
  )
}