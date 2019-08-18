import React from 'react';
import { Switch, Route} from 'react-router-dom';
import PopulationTrend from '../ComponentsData/PopulationTrend';
import CurrencyDistribution from '../ComponentsData/CurrencyDistribution';
import CountCities from '../ComponentsData/CountCities';
import Home from './Home';
import '../../styles/main.css';

const Content = () => {
  return(
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/population-trend" component={PopulationTrend} />
          <Route path="/currency-distribution" component={CurrencyDistribution} />
          <Route path="/count-cities" component={CountCities} />
        </Switch>          
    </div>
  )
}
 
export default Content