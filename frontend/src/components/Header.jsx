import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import logo from '../images/logo_1280.svg';

function Header({ onSinOut, onShowUser, userEmail, onOpenBurgerMenu, onHideBurgerMenu }) {
  return (
    <header className="header">
      <Routes>
        <Route
          path='/sign-up'
          element={
            <div className='header__menu-link'>
              <img className='header__logo-react'
                src={logo}
                alt='логотип проекта Место' />
              <Link to='/sign-in' className='header__link'>Войти</Link>
            </div>} />

        <Route
          path='/sign-in'
          element={
            <div className='header__menu-link'>
              <img className='header__logo-react'
                src={logo}
                alt='логотип проекта Место' />
              <Link to='/sign-up' className='header__link'>Регистрация</Link>
            </div>} />

        <Route
          path='/'
          element={
            <div className='header__menu'>
              <img className=' header__logo-react header__logo_type_pc'
                src={logo}
                alt='логотип проекта Место' />
              <div
                className={`header__navigete ${onShowUser ? 'header__navigete_open' : ''}`} >
                <p className='header__link'> {userEmail}</p>
                <button
                  className='header__link'
                  onClick={onSinOut} >Выйти</button>
              </div>

              <div className='header__menu-burger'>
                <img className='header__logo-react header__logo_type_mobile'
                  src={logo}
                  alt='логотип проекта Место' />
                {!onShowUser ?
                  <button className='header__menu-burger_type_button'
                    onClick={onOpenBurgerMenu}>
                    <div className='header__menu-burger_type_line' />
                    <div className='header__menu-burger_type_line' />
                    <div className='header__menu-burger_type_line' />
                  </button> :
                  <button className='header__button-close'
                    onClick={onHideBurgerMenu} >&#x2715;</button>}
              </div>
            </div>} />
      </Routes>
    </header>
  )
}

export default Header;




