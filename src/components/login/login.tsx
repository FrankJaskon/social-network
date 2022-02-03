import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box, Button, Checkbox, FormControl, FormControlLabel,
    FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput,
    Stack, TextField, Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setUserAuth } from '../../redux/auth-reducer';
import { redirectToProfile } from '../common/hoc/newHoc';
interface FormState {
    email: string
    password: string
    showPassword: boolean
    rememberMe: boolean
};

const Login = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState<FormState>({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false,
    });

    const handleChange = (prop: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickCheckbox = () => {
        setValues({
            ...values,
            rememberMe: !values.rememberMe,
        });
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            email: event.target.value,
        });
    }

    const onSubmit = () => {
        const { email, password, rememberMe } = values;
        dispatch(setUserAuth({ email, password, rememberMe }));
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 5
    }}>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                border: '2px solid',
                borderColor: '#1976d23a',
                borderRadius: 2,
            }}>
            <FormGroup>
                <Stack
                    sx={{
                        width: '40ch',
                    }}
                    spacing={2}
                >
                    <TextField
                        required
                        type='email'
                        id="outlined-required"
                        value={values.email}
                        onChange={handleChangeEmail}
                        label="Email"
                    />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Stack>
                    <FormControlLabel
                        control={<Checkbox checked={values.rememberMe} onClick={handleClickCheckbox} />}
                        labelPlacement='start'
                        label={<Typography variant='body2'>Remember me</Typography>}
                        sx={{ my: 1.5 }}
                    />
                <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Stack direction="row" sx={{ flexGrow: 1, alignItems: 'flex-start' }}>
                        <Typography variant='body2'>Don't have an account yet?</Typography>
                        <Button
                            variant="text"
                            size='small'
                            sx={{ textTransform: 'capitalize', p: 0 }}
                            href='https://social-network.samuraijs.com'
                            target='_blank'
                        >
                            Sign up
                        </Button>
                    </Stack>
                    <Button variant="contained" size='small' onClick={onSubmit}>
                        Sign in
                    </Button>
                </Stack>
            </FormGroup>
        </Box>
        <Typography variant='body2' align='center' sx={{ mt: 1, color: '#777' }}>
            If you are here for the first time, use following data:<br />
            Login: free@samuraijs.com, Password: free
        </Typography>
    </Box>
}

export default redirectToProfile(Login);