import React from 'react';
import Button from '@material-ui/core/Button';

const footerStyle = {
    textAlign: 'center',
    padding: '2em 0 2em 0',
    width: 'auto'
}

export default function Footer () {
    return (
        <div style={footerStyle}>
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