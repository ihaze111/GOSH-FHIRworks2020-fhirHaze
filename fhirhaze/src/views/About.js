import React from 'react';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

class About extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <Container style={{ marginTop: '50px' }}>
                    <Card style={{width : '1000px'}}>
                        <Card.Header>
                            <Card.Title>
                                <strong>What is fhirHaze?</strong>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <p>fhirHaze is a web-app intended to visualise data from
                            Fast Healthcare Interoperability Resources (FHIR). As of now,
                            the project is at a very rudimentary form and just pull data from 
                            FHIR records and graphed using Chart.js.
                            </p>&nbsp;
                            <p>As of now, the web-app fetches data quite slowly. This sluggish performance
                                can be attribute to the web-app pulling data from multiple-nested JSON
                                as well as the web-app itself being non-optimised. This is a weakness for the web-app
                                and I aim to fix these performance issues in the future.</p>&nbsp;
                            <p> 
                            This project would later be further developed (the further development of the web-app is not intended for FHIRworks
                            Hackathon), which it will visualise data in a much more complex manner.
                            This project is entirely developed by Muhammad Haziq Al Johary (Haze Al Johary).
                            </p>
                        </Card.Body>
                        <Card.Header>
                            <Card.Title>
                                Developer
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Muhammad Haziq Shahrin Al Johary (Haze)</td>
                                        <td><a href={"mailto:" + "haziq.al-johary.18@ucl.ac.uk"}>haziq.al-johary.18@ucl.ac.uk</a></td>
                                        <td><a href={"https://github.com/ihaze111"}>https://github.com/ihaze111</a></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default About;