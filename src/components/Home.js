import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from '../images/single-line-chart.png';
import BarChart from '../images/barChart.png';
import CitiesBarChart from '../images/citiesBarChart.png';

export default function Home() {
    return (
        <div style={containerMain}>
            <Container style={container}>
                <Row style={rowMain}>
                    <Col sm style={colMain}> <Link to="/population-trend" className="linkTo" ><img src={LineChart} width={400} height={300} /> </Link> </Col>
                    <Col sm style={colMain}> <Link to="/currency-distribution" className="linkTo"><img src={BarChart} width={400} height={300} /></Link> </Col>
                    <Col sm style={colMain}> <Link to="/count-cities" className="linkTo"><img src={CitiesBarChart} width={400} height={300} /></Link> </Col>
                </Row>
            </Container>
        </div>
    )
}

const container = {
    width: '100%'
}
const containerMain = {
    width: '1200px',
    display: 'inline-flex',
    justifyContent: 'center',

}
const colMain = {
    width: '30%',
    margin: '2em'
}
const rowMain = {
    display: 'inline-flex',
    justifyContent: 'center',
    width: 'inherit'
}