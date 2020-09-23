import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {Machine} from "./components/machine";

export const App = () =>
    <Container>
        <Row>
            <Col sm={12}>
                <h1>Welcome to my slots machine</h1>
                <Machine />
            </Col>
        </Row>
    </Container>
