import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Text } from '@chakra-ui/react'
import BudgetChart from './BudgetChart'
import BudgetTable from './BudgetTable'
import Navbar from './Navbar'

const Budget = ({ setUser, user }) => {
  const [budget, setBudget] = useState();
  const [categories, setCategories] = useState();
  const [transactions, setTransactions] = useState([]);

  const { id } = useParams()

    useEffect(() => {
        fetch(`/budgets/${id}`)
        .then(res => res.json())
        .then(setBudget)
    }, [])

    useEffect(() => {
      if(budget) {
        updateCategories()
        updateTransactions()
      }
    }, [budget]);

    function updateCategories(){
      setCategories(budget.categories)
    }

    function updateTransactions() {
      if (categories) {
        let allTransactions = [];
        allTransactions.push(budget.incomes);
    
        categories.forEach((category) => {
          allTransactions.push(category.expenses);
        });
    
        setTransactions(allTransactions.flat());
      }
    }


  return (
    <>
    <Navbar setUser={setUser} user={user}/>
        <Heading
            as={motion.h1}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            lineHeight={'110%'}>
        <Text as={'span'} 
            bgGradient="linear(to-r, green.400,green.700)"
            bgClip="text">
        <br />
        {budget?.title} Overview
        </Text>
    </Heading>
    <BudgetChart budget={budget} categories={categories}/>
        <br />
        <br />
        <BudgetTable transactions={transactions}/>
    </>
  )
}

export default Budget