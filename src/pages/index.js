import { Button, Container, Flex, Heading, NavLink } from '@theme-ui/components'
import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { IdentityContext } from '../../identity-context';


const Index = () => {

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
        {user && (<NavLink href="#!" p={2}>
          {user.user_metadata.full_name}
        </NavLink>)}
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

export default Index;
