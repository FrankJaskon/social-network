import React from 'react';
import CustomButton from '../../../common/buttons/submit';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {validateTextFieldCreator} from '../../../common/validators';

import s from './AddMessage.module.sass';

const validateTextField = validateTextFieldCreator(50);

const AddMessage = ({placeholder, addMessage}) => {
    return <Formik
        initialValues={{newMessageBody: ''}}
        onSubmit={({newMessageBody}, actions) => {
                addMessage(newMessageBody);
                actions.resetForm();
        }} >
        {
            ({values,
                errors,
                touched,
                handleChange,
                handleSubmit}) => <Form className={s.wrapper} onSubmit={handleSubmit} >
                    <div className={s.input__wrapper}
                        style={errors.newMessageBody && touched.newMessageBody ? {border: '2px solid #ff0000'} : {}} >
                        <Field
                            validate={validateTextField}
                            className={s.input}
                            type='textarea'
                            placeholder={placeholder}
                            id='newMessageBody'
                            name='newMessageBody'
                            onChange={handleChange}
                            value={values.newMessageBody} />
                        <ErrorMessage className={s.error} name='newMessageBody' component='div' />
                    </div>
                    <CustomButton text={'Send'} />
                </Form>
        }
    </Formik>
}

export default AddMessage;