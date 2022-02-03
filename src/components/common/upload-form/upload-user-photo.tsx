import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { saveNewUserPhoto } from '../../../redux/profile-reducer';
import TwoButtons from '../buttons/two-buttons';

import s from './UploadUserPhoto.module.sass';

const UploadPhotoForm = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState<FormData | null>(null);

    const clearInput = ({ target }: any) => {
        target.value = '';
    }

    const getFile = ({target : { files }}: any): void => {
        const formData = new FormData();
        formData.append('image', files[0]);
        setFile(formData);
    }

    const onSubmit = () => {
        dispatch(saveNewUserPhoto(file));
        setFile(null);
    }

    const onCancel = () => {
        setFile(null);
    }

    return <form className={s.wrapper}>
            {!file
                ? <label htmlFor='userPhotoFile' className={s.fakeButton}>Change photo</label>
                : <TwoButtons wrapClassName={s.wrapperStyle} onSave={onSubmit} onCancel={onCancel} />}
                <input id='userPhotoFile' type='file' onClick={clearInput} onChange={getFile} className={s.fileInput} />
        </form>

}

export default UploadPhotoForm;