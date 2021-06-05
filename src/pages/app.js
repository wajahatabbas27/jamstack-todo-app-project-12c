import { Router } from '@reach/router';
import { Button, Container, Flex, Heading, NavLink } from '@theme-ui/components';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { IdentityContext } from '../../identity-context';

let Dash = () => {

    const { user, identity: netlifyIdentity } = useContext(IdentityContext);

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

            <Flex>
                Dash has user : {user && user.user_metadata.full_name}
            </Flex>
        </Container >

    )
};

let DashLoggedOut = () => {

    const { identity: netlifyIdentity } = useContext(IdentityContext);

    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}>
                    Home
                </NavLink>
                <NavLink as={Link} to={"/app"} p={2}>
                    Dashboard
                </NavLink>
            </Flex>

            <br />

            <Flex sx={{ flexDirection: "column", padding: 3 }}>
                <Heading as='h1'>Jamstack Serverless Todo-App</Heading>
                <Button
                    sx={{ marginTop: 2, color: "black" }}
                    onClick={() => { netlifyIdentity.open() }}
                >Login</Button>

            </Flex>
        </Container>
    )
}

const App = () => {

    const { user } = useContext(IdentityContext);

    if (!user) {
        return (
            <Router>
                <DashLoggedOut path="/app" />
            </Router>
        )
    }

    return (
        <Router>
            <Dash path="/app" />
        </Router>
    )
}

export default App
