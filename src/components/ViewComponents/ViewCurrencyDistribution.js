import React from 'react';

export default function ViewPopulationTrend({ ...props }) {
    return (
        <div className="containerLoader" >
            <div className="countryd z-depth-0 project-summary thumb">
                <div className="countryd-content grey-text text-darken-3 containerPost">
                    <div className="inlineClass">
                        <div className="title">
                            {props.title}
                        </div>
                    </div>
                    <div className="chartsContainer">
                        {props.data}
                    </div>
                    <div className="leftSide">
                        {props.backToHome}
                    </div>
                </div>
            </div>
        </div>
    )
}