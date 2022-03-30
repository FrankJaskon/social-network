import React from 'react';
import DivWrapper from '../../../../common/finished-components/div-wrapper';

import s from '../UserAbout.module.sass';

const ProfileData = ({title, lookingForAJob = null, lookingForAJobDescription,
    aboutMe, contacts, children, wrapperInfoClassName, itemInfoClass, contactsWrapperInfoClass}) => {

    let wrapperClass = `${s.user__about} ${wrapperInfoClassName}`;
    let itemClass = `${s['user__item-about']} ${itemInfoClass}`;
    let contactsWrapperClass = `${s['user__item-contact']} ${contactsWrapperInfoClass}`;

    return <DivWrapper className={wrapperClass}>
        {
            title && <h3 className={s.user__title}><b>{title}</b></h3>
        }
        {
            lookingForAJob !== null && <p className={itemClass}><b>Working status:</b>
                {lookingForAJob ? ' looking for' : ' not looking for'}
            </p>
        }
        {
            lookingForAJobDescription && <p className={itemClass}><b>My skills: </b> {lookingForAJobDescription} </p>
        }
        {
            aboutMe && <p className={itemClass}><b>About me:</b> {aboutMe}</p>
        }
        {
            contacts && <div className={contactsWrapperClass}><div><b>My contacts: </b></div>
                {
                    Object.keys(contacts).map(key => contacts[key]
                    ? <Contact key={key} contactKey={key} contactValue={contacts[key]}/>
                    :null)
                }
            </div>
        }
        {children}
        </DivWrapper>
}

const Contact = ({contactKey, contactValue}) => {
    return (
        <div className={s['user__item-about-link']}>
            <a href={contactValue} target='_blank' rel='noreferrer'>
                {contactKey}
            </a>
        </div>
    )
}

export default ProfileData;