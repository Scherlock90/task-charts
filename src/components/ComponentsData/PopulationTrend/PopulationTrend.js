import React from 'react';
import axios from 'axios';
import ViewData from '../../ViewComponents/ViewData';
import { 
  backToHome, 
  loader 
} from '../Elements';
import { LineCharts } from './CustomBarCharts';

export default class PopulationTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: []
    }
  }

  componentDidMount() {
    axios
      .get('https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json')
      .then(res => {
        this.setState({
          population: res.data,
        })
      })
  }

  render() {
    const { population } = this.state;

    const dataList = population
      .slice(11449, 11506)
      .filter((populationData, i) => {
        return (
          <ul key={i}>
            {populationData.Year}
            {populationData.Value}
          </ul>
        );
      })

    return (
      <>
        {
          dataList.length > 0
            ?
              <ViewData
                backTohome={backToHome}
                title={"Population Trend"}
                data={<LineCharts data={dataList} />}
              />
            :
              loader
        }
      </>
    )
  }
}