import React from 'react';
import {NavLink} from 'react-router-dom';

import s from './DialogItem.module.sass';

const DialogItem = (props) => {
    const {id, name} = props;
    return (
        <li className={s['dialogs-item']}>
            <NavLink to={`/dialogs/dialog/${id}`} className={s['nav-link']}>
                {name}
            </NavLink>
        </li>
    )
}

export default DialogItem;