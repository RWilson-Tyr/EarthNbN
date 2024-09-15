import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignUpFormModal';

function ProfileButton( user ) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()
  const navigate = useNavigate()


  const toggleMenu = (e) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    if (!showMenu) return

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  const handleLogout = () => {
    dispatch(sessionActions.logout(),
    navigate('/')
    )
  };

  const manageSpot = () => {
    navigate(`/current`)
    setShowMenu(false)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")

  if(user.user === null){
    return (
      <>{}
        <button onClick={toggleMenu}>
          <FaUserCircle />
        </button>
        <ul className={ulClassName} ref={ulRef}>
           <li className = "login">
             <OpenModalButton
               buttonText="Log In"
              modalComponent={<LoginFormModal />}
             />
           </li>
           <li className = "signup">
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
        </ul>
      </>
    )
  } else {
    return (
      <>{}
        <button onClick={toggleMenu}>
          <FaUserCircle />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <li>Hello, {user.user.firstName}</li>
          <li>{user.user.email}</li>
          <li>
          <button onClick={manageSpot}>Manage Spots</button>
          </li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      </>
    )
  }

}

export default ProfileButton;
