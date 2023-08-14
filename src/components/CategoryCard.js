import React, { useState } from 'react'
import { Card,
         Heading,
         CardBody,
         CardFooter,
         Text,
         Button,
         ButtonGroup,
         Progress,
         IconButton,
         useEditableControls,
         Editable,
         EditableInput,
         EditableTextarea,
         EditablePreview,
         useToast,
        } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom' 
import { GiTakeMyMoney } from 'react-icons/gi'
import { BiSolidEdit, BiCheck } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'

const CategoryCard = ({ category, fromBudget, categories, setCategories }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isEditingAmount, setIsEditingAmount] = useState(false)
    const [newAmount, setNewAmount] = useState(category.amount)
    const [newTitle, setNewTitle] = useState(category.title)
    const [newCategory, setNewCategory] = useState(category)
    const navigate = useNavigate()
    const toast = useToast()

    console.log(categories)
    //initates accumulator for total spent
    let totalSpent = 0
    if(category){
        //adds amount of each expense to total spent accumulator
        category.expenses.forEach((expense) => totalSpent += expense.amount) //adds amount of each expense to total spent acculumater
    }

    function categoryLink(catId){
        navigate(`/categories/${catId}`)
      }

    // Editable functions
    function handleChangeCategoryTitle(e){
        setNewCategory({...newCategory, title: e.target.value})
    }

    function handleChangeCategoryAmount(e){
        setNewCategory({...newCategory, amount: e.target.value})
    }


    //CRUD functions
    function handleDeleteBudget(){
        fetch(`/categories/${category.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then((r) => {
            if(r.ok){
                r.json()
                .then(navigate('/home'))
                setCategories(categories?.filter((cat) => cat.id !== category.id))
                toast({
                    title: 'Deleted Category',
                    status: "success",
                    position: "top",
                    isClosable: true,
                })
            } else {
                r.json().then(e => toast({
                    title: `${r.status} ${e.error}`,
                    status: "error",
                    position: "top",
                    isClosable: true,
                    })
                )
            }
        })
    }

    function patchTitleCategory(){
        fetch(`/categories/${category.id}`, {
            method: "PATCH",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newCategory)
        })
        .then((r) => {
            if(r.ok){
                r.json()
                .then((newCat) => {
                const updatedCategories = categories?.map((cat) => {
                    if(cat.id === category.id){
                        cat.title = newCat.title
                        toast({
                            title: 'Updated Category',
                            status: "success",
                            position: "top",
                            isClosable: true,
                        })
                        setIsEditingTitle(false)
                        return cat
                    } else {
                        return cat
                    }
                })
                setCategories(updatedCategories)
            })
            } else {
                r.json().then(e => toast({
                    title: `${r.status} ${e.error}`,
                    status: "error",
                    position: "top",
                    isClosable: true,
                    })
                    )
            }
        })
    }

    function patchAmountCategory() {
        fetch(`/categories/${category.id}`, {
            method: "PATCH",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(newCategory)
        })
        .then((r) => {
            if(r.ok){
                r.json()
                .then((newCat) => {
                    const updatedCategories = categories?.map((cat) => {
                        if(cat.id === category.id){
                            cat.amount = newCat.amount
                            toast({
                                title: 'Updated Category',
                                status: "success",
                                position: "top",
                                isClosable: true,
                            })
                            setIsEditingAmount(false)
                            return cat
                        } else {
                            return cat
                        }
                    })
                    setCategories(updatedCategories)
                })
            } else {
                r.json().then(e => console.log(e))
            }
        })

    }

  return (
        <>
            <Card className='budget'>
                <div className='progress-text'>
                    
                        {isEditingTitle ? 
                            <Editable defaultValue={category.title} fontSize='md' mt='2'>
                            <div>
                                <EditablePreview />
                                <EditableInput name="title" size='sm'
                                onChange={handleChangeCategoryTitle}/>
                            </div>
                             
                              <ButtonGroup justifyContent='center' size='sm' mt='2'>
                                    <IconButton icon={<BiCheck />} onClick={patchTitleCategory}/>
                                    <IconButton icon={<AiOutlineClose />} onClick={() => setIsEditingTitle(false)} />
                              </ButtonGroup>
                        
                              </Editable> :
                              <Button leftIcon={<BiSolidEdit />} onClick={() => setIsEditingTitle(true)}> 
                                <Heading size='md'>{category.title}</Heading>
                              </Button>
                            }
                            
                        {isEditingAmount ? 
                         <Editable defaultValue={category.amount} fontSize='md'>
                         <div>
                            <EditablePreview />
                            <EditableInput name="amount"
                            onChange={handleChangeCategoryAmount}/>
                         </div>
                            <ButtonGroup justifyContent='center' size='sm' mt='2'>
                                    <IconButton icon={<BiCheck />} onClick={patchAmountCategory}/>
                                    <IconButton icon={<AiOutlineClose />} onClick={() => setIsEditingAmount(false)} />
                            </ButtonGroup>
                         </Editable> : 
                            <Button leftIcon={<BiSolidEdit />} onClick={() => setIsEditingAmount(true)}>
                                <Text>${category.amount} Budgeted</Text>
                            </Button>}
                </div>
                <CardBody>
                    <Progress colorScheme='green' hasStripe max={category.amount} value={totalSpent}></Progress>
                </CardBody>
                <div className="progress-text">
                    <small>${totalSpent} spent</small>
                    <small>${category.amount - totalSpent} remaining</small>
                </div>
                <CardFooter justifyContent={'center'} >
                    {fromBudget ? <ButtonGroup spacing='4'>
                    <Button colorScheme='green' size='sm' leftIcon={<GiTakeMyMoney />}
                        onClick={() => categoryLink(category.id)}>View Details</Button> 
                        <Button size='sm' bgColor='red.400'
                            leftIcon={<BsTrash3Fill/>}
                            onClick={handleDeleteBudget}>Delete</Button>
                        </ButtonGroup> :
                        <Button size='sm' bgColor='red.400'
                        leftIcon={<BsTrash3Fill/>}
                        onClick={handleDeleteBudget}>Delete</Button>}
                </CardFooter>
            </Card>
        </>
  )
}

export default CategoryCard