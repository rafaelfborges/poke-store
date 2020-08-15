import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Card,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { FaCartPlus, FaShoppingCart, FaCartArrowDown } from "react-icons/fa";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=9")
      .then(({ data }) => {
        const response = data;
        let pokes = [];

        Promise.all(
          response.results.map((pokemon) => axios.get(pokemon.url))
        ).then((res) => {
          res.map((items) => pokes.push(items.data));
          setPokemons(pokes);
        });
      });
  });

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">PokeStore</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
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

      <Container className="mt-4">
        <Row>
          <Col sm={8}>
            <Row>
              {pokemons.map((pokemon) => (
                <Col key={pokemon.id} md={4}>
                  <Card className="mb-3">
                    <Card.Img
                      className="p-2"
                      variant="top"
                      src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                    />
                    <Card.Bo dy className="p-2">
                      <Card.Title className="text-capitalize">
                        {pokemon.name}
                      </Card.Title>
                      <Card.Text>Some description</Card.Text>
                      <Button
                        variant="outline-info"
                        className="float-right"
                        size="sm"
                      >
                        Comprar <FaCartPlus className="mb-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm={4}>
            <Card className="mb-3 p-2">
              <Card.Title className="mb-2 text-center">
                <FaShoppingCart className="mb-1" />
                &nbsp;Carrinho
              </Card.Title>
              <ListGroup variant="flush" className="mb-1">
                <ListGroup.Item className="p-1">Item 01</ListGroup.Item>
                <ListGroup.Item className="p-1">Item 02</ListGroup.Item>
                <ListGroup.Item className="p-1">Item 03</ListGroup.Item>
              </ListGroup>
              <Card.Subtitle className="p-2 text-muted text-right">
                Total: R$100,00
              </Card.Subtitle>
              <Card.Body className="p-0">
                <Button variant="success" className="float-right">
                  Finalizar <FaCartArrowDown className="mb-1" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
