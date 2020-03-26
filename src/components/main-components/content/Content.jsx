import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../index';
import { PopulationTrend, CurrencyDistribution, CountCities } from '../../components-data/index';

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
