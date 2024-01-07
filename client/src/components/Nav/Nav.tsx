import { Link } from 'react-router-dom';
import './nav.scss';

export default function Nav() {

  return (
    <nav className='et-nav items-center'>
      <ul className='flex flex-row justify-between items-center'>
        <li className='mr-4'>
          <Link to='/'>Exercise Tracker</Link>
        </li>
        <li className='mr-4'>
          <Link to='/'>Track Progress</Link>
        </li>
        <li className='mr-4'>
          <Link to='/'>Set Goals</Link>
        </li>
      </ul>
    </nav>
  )
}