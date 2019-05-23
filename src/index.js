import React from 'react';
import ReactDOM from 'react-dom';
import DataCharst from './DataCharst';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<DataCharst />, document.getElementById('root'));
serviceWorker.unregister();
