import React from 'react';
import preloAder from '../../../assets/images/spinner.svg';

import s from './Preloader.module.sass';

interface PreloaderPropsType {
    preloaderClass?: string
}

const Preloader = ({ preloaderClass }: PreloaderPropsType) => {
    const wrapperClass = `${s.preloader} ${preloaderClass}`;
    return (
        <div className={wrapperClass}>
        <img src={preloAder} alt='' />
    </div>
    )
}

export default Preloader;