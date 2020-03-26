import React from 'react';

export const ViewData = ({ title, data, backTohome }) => {
    return (
        <div className="container-loader loading">
            <div className="countryd z-depth-0 project-summary thumb">
                <div className="countryd-content grey-text text-darken-3 container-post">
                    <div className="container-title">
                        <div className="title">{ title }</div>
                    </div>
                    <div className="charts-container main-cont">{ data }</div>
                    <div className="left-side">{ backTohome }</div>
                </div>
            </div>
        </div>
    )
}