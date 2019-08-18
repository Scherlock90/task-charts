import React from 'react';
import Button from '@material-ui/core/Button';

export default function Footer () {
    return (
        <div className="footer-container">
            <Button 
                variant="contained" 
                color="primary" 
                href="http://senjs.eu/" 
            >
                Designed SeN
            </Button>
        </div>
    )
}