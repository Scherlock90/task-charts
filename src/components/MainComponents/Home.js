import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from '../../assets/single-line-chart.png';
import BarChart from '../../assets/barChart.png';
import CitiesBarChart from '../../assets/citiesBarChart.png';

export default function Home() {
    return (
        <div className="container-main-own">
            <Container style={container}>
                <Row className="row-main-own">
                    <Col 
                        sm 
                        style={colMain} 
                        sm={4} 
                        className="col-main"
                    > 
                        <Link 
                            to="/population-trend" 
                            className="linkTo" 
                        >
                            <img 
                                src={LineChart} 
                                width={400} 
                                height={300} 
                            /> 
                        </Link> 
                        <span className="span-name-main">
                            Population Trend 
                        </span>
                    </Col>
                    <Col 
                        sm 
                        style={colMain} 
                        sm={4} 
                        className="col-main"
                    > 
                        <Link 
                            to="/currency-distribution" 
                            className="linkTo"
                        >
                            <img 
                                src={BarChart} 
                                width={400} 
                                height={300} 
                            />
                        </Link> 
                        <span className="span-name-main">
                            Currency count 
                        </span> 
                    </Col>
                    <Col 
                        sm 
                        style={colMain}
                        sm={4} 
                        className="col-main"
                    > 
                        <Link 
                            to="/count-cities" 
                            className="linkTo"
                        >
                            <img 
                                src={CitiesBarChart} 
                                width={400} 
                                height={300} 
                            />
                        </Link> 
                        <span className="span-name-main"> 
                            Cities count 
                        </span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const container = {
    width: '100%'
}

const colMain = {
    width: '30%',
    margin: '2em'
}