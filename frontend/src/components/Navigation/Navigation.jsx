import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal'
import './Navigation.css'
import SignupFormModal from '../SignupFormModal/SignUpFormModal';


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
    // <>
    //   <li className = "login">
    //     <OpenModalButton
    //       buttonText="Log In"
    //       modalComponent={<LoginFormModal />}
    //     />
    //   </li>
      // <li className = "signup">
      //   <OpenModalButton
      //     buttonText="Sign Up"
      //     modalComponent={<SignupFormModal />}
      //   />
      // </li>
    // </>
  );


  return (
    <div className="nav">
    <ul>
      <li>
        <NavLink to="/"><img className="earthLogo" src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/globe-icon.png"></img></NavLink>
      </li>
      <li>
        <NavLink to="/spots/new">Create a new Spot</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul></div>
  );
}

export default Navigation;
