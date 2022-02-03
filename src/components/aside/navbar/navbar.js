
import React from 'react';
import {NavLink} from 'react-router-dom';

import s from './Navbar.module.sass';

const Navbar = ({navbar, onClickMenuItem, userId}) => {
    const navigation = navbar.map(page => (
        <li key={page.id} className={s['nav-list__item']}>
            <NavLink to={`${page.url}`}
                className={s['nav-list__link']}
                onClick={() => onClickMenuItem()} >
                {page.title}
            </NavLink>
        </li>
    ));
    (+userId !== 20088) && navigation.push(
        <li key={'visitMe'} className={s['nav-list__item']}>
            <NavLink to='/profile/20088'
                className={s['nav-list__link']}
                onClick={() => onClickMenuItem()} >
                Visit me
            </NavLink>
        </li>)
    return <ul className={s['nav-list']}>
        {navigation}
    </ul>
}

export default Navbar;