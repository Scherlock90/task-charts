import React from 'react';
import { 
  Switch,
   Route
} from 'react-router-dom';
import PopulationTrend from '../ComponentsData/PopulationTrend/PopulationTrend';
import CurrencyDistribution from '../ComponentsData//CurrencyDistribution/CurrencyDistribution';
import CountCities from '../ComponentsData/CountCities/CountCities';
import Home from './Home';
import { 
  exactRoutes, 
  homeRoutes, 
  populationTrend, 
  currencyDistribution, 
  countCities
} from './Routes';
import '../../Styles/main.scss';

const Content = () => {
  return(
      <div>
        <Switch>
          <Route exact path={exactRoutes} component={Home} />
          <Route path={homeRoutes} component={Home} />
          <Route path={populationTrend} component={PopulationTrend} />
          <Route path={currencyDistribution} component={CurrencyDistribution} />
          <Route path={countCities} component={CountCities} />
        </Switch>          
    </div>
  )
}
 
export default Content