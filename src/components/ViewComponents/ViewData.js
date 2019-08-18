import React from 'react';

export default function ViewData({ ...props }) {
    return (
        <div className="containerLoader loading">
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