import React from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../../../Assets/back_arrow.jpg';

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