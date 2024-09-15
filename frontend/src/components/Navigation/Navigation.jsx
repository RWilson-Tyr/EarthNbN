import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
    <li>
      <ProfileButton user={sessionUser} />
    </li></>
  );


  return (
    <div className="nav">
      <ul>
        <div className='logo'>
            <NavLink to="/"><img className="earthLogo" src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/globe-icon.png"></img></NavLink>
        </div>
        <div className='rightSide'>
            <NavLink to="/spots/new">Create a new Spot</NavLink>
            {isLoaded && sessionLinks}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
