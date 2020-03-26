import React from 'react'
import { Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ContainerCard = ({ src, chartName, to  }) => (
    <Col sm sm={4} className="col-main col-home">
        <Link {...{ to }} className="link-to">
            <img {...{ src }} width={400} height={300}/>
        </Link>
        <span className="span-name-main">{ chartName }</span>
    </Col>
)