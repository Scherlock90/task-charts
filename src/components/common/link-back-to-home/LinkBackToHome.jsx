import React from 'react';
import { Link } from 'react-router-dom';

import BackArrow from '../../../assets/images/back_arrow.jpg';

export const LinkBackToHome = <Link to='/' className="linkTo"> <img src={BackArrow} width={50} /> Back </Link>
