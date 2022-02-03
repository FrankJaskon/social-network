import React from 'react';
import CustomButton from '../common/buttons/submit/custom-button';
import {useFormik} from 'formik';

import s from './Login.module.sass';

const Login = ({setUserAuth, isCaptcha, captcha}) => {
    const login = useFormik({
        initialValues: {
          email: '',
          password: '',
          captcha: '',
          rememberMe: false
        },
        onSubmit: (values, {setErrors}) => {
          setUserAuth(values, setErrors);
        },
        validate: ({email, password}) => {
            let errors = {};

            if (email === '') {
                errors.email = '* This field cannot be empty. Please, try better.';
            }
            if (password === '') {
                errors.password = '* This field cannot be empty. Please, try better.';
            } else if (password.length > 20) {
                errors.password = `* It's too much symbols. Max length is ${20}`;
            }
            return errors;
        }
    });

    return (
        <div className={s.loginPage}>
            <div className={s.loginFormWrapper}>
                <form className={s.loginForm} onSubmit={login.handleSubmit} >
                    <div className={s.formBasic}>
                        <label htmlFor='name' className={s.label}>Email address
                            {login.errors.email && <div className={s.error}>{login.errors.email}</div>}
                        </label>
                        <input className={s.input}
                            required
                            type='email'
                            placeholder='Enter email'
                            id='email'
                            name='email'
                            onChange={login.handleChange}
                            value={login.values.email} />
                        <p className={s.emailPrompt}>
                            We'll never share your email with anyone else.
                        </p>
                    </div>
                    <div className={s.formBasic}>
                        <label htmlFor='password' className={s.label}>Password&nbsp;
                            {login.errors.password&& <div className={s.error}>{login.errors.password}</div>}
                        </label>
                        <input className={s.input}
                            required
                            type='password'
                            placeholder='Enter password'
                            id='password'
                            name='password'
                            onChange={login.handleChange}
                            value={login.values.password} />
                    </div>
                    {
                        isCaptcha ? <div className={s.formBasic}>
                            <label htmlFor='captcha' className={s.label}>Captcha&nbsp;
                                {login.errors.captcha&& <div  className={s.error}>{login.errors.captcha}</div>}
                            </label>
                            <div className={s.captchaWrapper}>
                                <img src={captcha} alt='' />
                            </div>
                            <input className={s.input}
                                required
                                type='text'
                                placeholder='Please, enter captcha'
                                id='captcha'
                                name='captcha'
                                onChange={login.handleChange}
                                value={login.values.captcha} />
                        </div> : ''
                    }
                    <div className={s.formCheckbox}>
                        <input
                        label='Check me out'
                        type='checkbox'
                        id='rememberMe'
                        name='rememberMe'
                        onChange={login.handleChange}
                        value={login.values.rememberMe} /><span className={s.forgetPassword}>Remember me</span>
                    </div>
                    <CustomButton
                        btnClassName={s.btnStyle}
                        wrapClassName={s.wrapperStyle}
                        text={'Submit'} />
                </form>
                <div className={s.formAdditionalInfo}>
                    If you are here for the first time, use following data:
                         Login: <b>free@samuraijs.com</b>, Password: <b>free</b>
                </div>
            </div>
        </div>
    )
}

export default Login;