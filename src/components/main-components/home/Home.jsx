import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ContainerCard } from './container-card/ContainerCard'
import LineChart from '../../../assets/images/single-line-chart.png';
import BarChart from '../../../assets/images/barChart.png';
import CitiesBarChart from '../../../assets/images/citiesBarChart.png';

export const Home = () => {
    return (
        <div className="container-main-own">
            <Container className="container-home">
                <Row className="row-main-own">
                    <ContainerCard src={LineChart} chartName={"Population Trend"} to={"/population-trend"} />
                    <ContainerCard src={BarChart} chartName={"Currency count"} to={"/currency-distribution"} />
                    <ContainerCard src={CitiesBarChart} chartName={"Cities count"} to={"/count-cities"} />
                </Row>
            </Container>
        </div>
    )
}