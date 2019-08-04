import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ViewCurrencyDistribution({ ...props }) {
    return (
        <div className="containerLoader">
            <div className="countryd z-depth-0 project-summary thumb">
                <div className="countryd-content grey-text text-darken-3 containerPost">
                    <div className="title"> 
                        {props.title}
                    </div>
                    <div className="chartsContainer">
                        {props.dataOne}
                    </div>
                    <div className="chartsContainer">
                        {props.dataTwo}
                    </div>
                    <div className="containerInfoMain">
                        <div className="containerInfo">
                            <div>
                                Countries with the euro currency: {props.countryWithEuro} 
                            </div>
                            <div>
                                The number of countries in the world: {props.countryInWorld} 
                            </div>
                            <Button 
                                variant="outline-primary" 
                                onClick={props.handleClickInfo}
                            >
                                Info
                            </Button>
                            <div> 
                                {props.textInfo} 
                            </div>
                        </div>
                    </div>
                    <div className="leftSide">
                        {props.backTohome}
                    </div>
                </div>
            </div>
        </div>
    )
}