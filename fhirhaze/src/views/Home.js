import React from 'react';
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { PatientsGender, PatientsStatus, PatientsAge } from './Components';

class Home extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <Container style={{ marginTop: '50px' }}>
                    <Card >
                        <Card.Header>
                            <Card.Title>
                                Graphs
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="age">
                                <Nav variant="tabs" style={{ marginBottom: '40px'}}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="age">Age Distribution</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="maritalStatus">Marital Status</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="gender">Gender Composition</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="age">
                                        <PatientsAge/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="maritalStatus">
                                        <PatientsStatus/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="gender">
                                        <PatientsGender/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Home;