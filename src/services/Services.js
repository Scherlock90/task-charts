import axios from 'axios'
import { COUNT_CITIES_ENDPOINT, POPULATION_TREND_ENDPOINT, CURRENCY_DISTRIBUTION_ENDPOINT } from './utils'

export const Services = {
    getCountCities () {
        const options = {
            method: 'GET',
            url: COUNT_CITIES_ENDPOINT,
        }
        return axios(options)
    },
    getPopulationTrend () {
        const options = {
            method: 'GET',
            url: POPULATION_TREND_ENDPOINT,
        }
        return axios(options)
    },
    getCurrencyDistribution () {
        const options = {
            method: 'GET',
            url: CURRENCY_DISTRIBUTION,
        }
        return axios(options)
    }
}
