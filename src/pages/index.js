import { Button, Container, Flex, Heading } from '@theme-ui/components'
import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';


const Index = () => {

  useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as='h1'>Jamstack Serverless Todo-App</Heading>
        <Button
          sx={{ marginTop: 2, color: "black" }}
          onClick={() => { netlifyIdentity.open() }}
        >Login</Button>
        <Button
          sx={{ marginTop: 2, color: "black" }}
          onClick={() => { netlifyIdentity.currentUser() }}
        >Logout</Button>
      </Flex>
    </Container>
  )
}

export default Index;
