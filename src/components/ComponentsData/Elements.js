import React from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../../Assets/back_arrow.jpg';

export const backToHome = (
  <Link
    to='/'
    className="linkTo"
  >
    <img
      src={BackArrow}
      width={50}
    />
    Back
    </Link>
)

export const loader = <div className="loader">Data is loading...</div>;

//CurrencyDistribution
export const currencyName = "ISO4217-currency_name";
export const currencyMinor = "ISO4217-currency_minor_unit";
export const continent = "Continent";
export const textInfo = 'Because it was not entirely clear what data should apply to the "quantitative distribution of currencies in use in the world" or the number of countries using the currency or currency multiplied by its value -> ISO4217-currency_minor_unit, therefore there are two versions of the data.'