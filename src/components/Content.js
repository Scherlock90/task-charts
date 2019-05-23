import React from 'react';
import { Switch, Route} from 'react-router-dom';
import PopulationTrend from './PopulationTrend';
import CurrencyDistribution from './CurrencyDistribution';
import CountCities from './CountCities';
import '../Styles/main.css';

const Content = () => {
  return(
      <div className="Content">
        <Switch>
          <Route path="/population-trend" component={PopulationTrend} />
          <Route path="/currency-distribution" component={CurrencyDistribution} />
          <Route path="/count-cities" component={CountCities} />
        </Switch>          
    </div>
  )
}
 
export default Content