import React from 'react';
import {
  Switch,
   Route
} from 'react-router-dom';
import PopulationTrend from '../../components-data/population-trend/PopulationTrend';
import CurrencyDistribution from '../../components-data/currency-distribution/CurrencyDistribution';
import CountCities from '../../components-data/count-cities/CountCities';
import { Home } from '../index';
import {
  exactRoutes,
  homeRoutes,
  populationTrend,
  currencyDistribution,
  countCities
} from '../../../static/Routes';
import '../../../assets/styles/main.scss';

export const Content = () => {
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
