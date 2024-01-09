import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';
//import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/user-context.js';


export default function Nav() {
  const { isLoggedIn } = useContext(UserContext);


  useEffect(() => {
    // if ( tokenInfo !== null && tokenInfo.isLoggedIn !== true) {

      // setSignedIn(tokenInfo.isLoggedIn);
      // console.log('tokenInfo', tokenInfo, signedIn);
      // console.log('signedIn', tokenInfo.isLoggedIn);
    // }
  },[]);


console.log('isLoggedIn', isLoggedIn);
  return (
    <nav className='et-nav items-center'>
      <ul className='flex flex-row justify-between items-center'>
        { isLoggedIn ? (
          <>
            <li className='mr-4'>
              <Link to='/'>Exercise Tracker</Link>
            </li>
            <li className='mr-4'>
              <Link to='/'>Track Progress</Link>
            </li>
            <li className='mr-4'>
              <Link to='/'>Set Goals</Link>
            </li>
          </>
        ) : (
          <>
          </>
        )}
      </ul>
    </nav>
  )
}