import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from '../../Assets/single-line-chart.png';
import BarChart from '../../Assets/barChart.png';
import CitiesBarChart from '../../Assets/citiesBarChart.png';

export default function Home() {
    return (
        <div className="container-main-own">
            <Container className="container-home">
                <Row className="row-main-own">
                    <Col 
                        sm 
                        sm={4} 
                        className="col-main col-home"
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
                        sm={4} 
                        className="col-main col-home"
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
                        sm={4} 
                        className="col-main col-home"
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