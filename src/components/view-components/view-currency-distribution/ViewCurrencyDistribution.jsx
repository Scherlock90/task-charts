import React from 'react';
import Button from 'react-bootstrap/Button';

export const ViewCurrencyDistribution = ({
    title,
    dataOne,
    dataTwo,
    countryWithEuro,
    countryInWorld,
    textInfo,
    backToHome,
    handleClickInfo
}) => (
    <div className="container-loader">
        <div className="countryd z-depth-0 project-summary thumb">
            <div className="countryd-content grey-text text-darken-3 container-post">
                <div className="title">{ title }</div>
                <div className="charts-container">{ dataOne }</div>
                <div className="charts-container">{ dataTwo }</div>
                <div className="container-info-main">
                    <div className="container-info">
                        <div> Countries with the euro currency: { countryWithEuro } </div>
                        <div> The number of countries in the world: { countryInWorld } </div>
                        <Button variant="outline-primary" onClick={handleClickInfo}>
                            Info
                        </Button>
                        <div>{ textInfo }</div>
                    </div>
                </div>
                <div className="left-side">{ backToHome }</div>
            </div>
        </div>
    </div>
)