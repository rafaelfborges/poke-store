import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

export default function Home() {
  useState(() => {});

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">PokeStore</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Pesquisar"
            className="mr-sm-2"
          />
          <Button variant="outline-info">Pesquisar</Button>
        </Form>
      </Navbar>
    </>
  );
}
