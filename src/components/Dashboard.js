import { Button, Checkbox, Container, Flex, Input, Label, NavLink } from '@theme-ui/components';
import { Link } from 'gatsby';
import React, { useContext, useReducer, useRef } from 'react';
import { IdentityContext } from '../../identity-context';


const todosReducer = (state, action) => {
    switch (action.type) {

        case "addTodos":
            return [{ done: false, value: action.payload }, ...state];

        case "toggleTodoDone":
            const newState = [...state];
            newState[action.payload] = {

                done: !state[action.payload].done,
                value: state[action.payload].value
            };

            return newState;

        default:
            return state;
    }
}

const Dashboard = () => {

    const { user, identity: netlifyIdentity } = useContext(IdentityContext);
    const inputRef = useRef();
    const [todos, dispatch] = useReducer(todosReducer, []);


    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}>
                    Home
                </NavLink>
                <NavLink as={Link} to={"/app"} p={2}>
                    Dashboard
                </NavLink>
                {user && (
                    <NavLink href="#!"
                        p={2}
                        onClick={() => {
                            netlifyIdentity.logout()
                        }}
                    >
                        Logout-{user.user_metadata.full_name}
                    </NavLink>)}
            </Flex>

            <br />

            <Flex
                as="form"
                onSubmit={e => {
                    e.preventDefault();
                    dispatch({ type: "addTodos", payload: inputRef.current.value });
                    inputRef.current.value = "";
                }}
            >
                <Label sx={{ display: "flex" }}>
                    <span>Add&nbsp;Todos</span>
                    <Input ref={inputRef} sx={{ marginLeft: 2 }} />
                </Label>
                <Button sx={{ marginLeft: 2 }}>Submit</Button>
            </Flex>

            <Flex sx={{ flexDirection: "column" }}>
                <ul sx={{ listStyleType: "none" }}>
                    {todos.map((todo, i) => (

                        <Flex
                            as="li"
                            onClick={() => {
                                dispatch({
                                    type: "toggleTodoDone",
                                    payload: i
                                });
                            }}
                            key={i}
                        >
                            <Checkbox checked={todo.done} onChange={() => { console.log("Onchanged called"); }} />
                            <span>{todo.value}</span>
                        </Flex>
                    ))}
                </ul>
            </Flex>
        </Container >

    )
};

export default Dashboard;