import React from 'react';
import { Switch, Route} from 'react-router-dom';
import PopulationTrend from './PopulationTrend';
import CurrencyDistribution from './CurrencyDistribution';
import CountCities from './CountCities';
import Home from './Home';
import '../Styles/main.css';

const Content = () => {
  return(
      <div className="Content">
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