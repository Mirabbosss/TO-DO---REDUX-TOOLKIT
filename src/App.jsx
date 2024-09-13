import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Container, Switch, FormControl, FormLabel, Input, Textarea, Button, Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, updateTodo } from "./redux/todo";
import { DeleteIcon } from "@chakra-ui/icons";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todo.todos);

    const newTodo = () => {
        if (title.trim().length === 0 || body.trim().length === 0) {
            toast.warn('Title and body cannot be empty', {autoClose: 2000});
            return;
        } else {
            dispatch(addTodo({
                id: Date.now(),
                title,
                body,
                completed: isCompleted,
            }));
            setTitle('');
            setBody('');
            setIsCompleted(false);
            toast.success('Added successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    return (
        <Container maxW='1250px'>
            <Card>
                <CardHeader my="4">
                    <Heading size='md' textAlign="center">Add new task</Heading>
                </CardHeader>

                <CardBody>
                    <FormControl>
                        <Stack spacing="4">
                            <Box>
                                <FormLabel htmlFor="title">Enter task title</FormLabel>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text" placeholder="Task title..." />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="body">Enter task body</FormLabel>
                                <Textarea value={body} onChange={(e) => setBody(e.target.value)} id="body" type="text" placeholder="Task body..." />
                            </Box>

                            <Button onClick={newTodo} colorScheme="teal" type="submit">
                                Add new task
                            </Button>
                        </Stack>
                    </FormControl>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <Heading size='md'>Tasks</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {
                            todos.length && todos.map((item) => (
                                <Box key={item.id}>
                                    <Flex justify="space-between">
                                        <Box>
                                            <Heading size='xs' textDecoration={item.completed ? "line-through" : "none"} textTransform='uppercase'>
                                                {item?.title}
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {item?.body}
                                            </Text>
                                        </Box>
                                        <Flex gap="4" align="center">
                                            <Switch onChange={() => dispatch(updateTodo(item.id))} isChecked={item.completed} />
                                            <Button leftIcon={<DeleteIcon />} onClick={() => dispatch(deleteTodo(item.id), toast.success('Deleted successfully', {autoClose: 2000}))} colorScheme="red">Delete task</Button>
                                        </Flex>
                                    </Flex>
                                </Box>
                            ))
                        }
                    </Stack>
                </CardBody>
            </Card>
            <ToastContainer/>
        </Container>
    );
};