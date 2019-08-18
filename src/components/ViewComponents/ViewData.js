import React from 'react';

const containerLoader = {
    display: 'flex',
    justifyContent: 'center',
}

export default function ViewData({ ...props }) {
    return (
        <div
            className="containerLoader"
            style={containerLoader}
        >
            <div className="countryd z-depth-0 project-summary thumb">
                <div className="countryd-content grey-text text-darken-3 containerPost">
                    <div className="containerTitle">
                        <div className="title">
                            {props.title}
                        </div>
                    </div>
                    <div className="chartsContainer mainCont">
                        {props.data}
                    </div>
                    <div className="leftSide">
                        {props.backTohome}
                    </div>
                </div>
            </div>
        </div>
    )
}