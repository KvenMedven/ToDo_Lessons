import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import s from './style123.module.css'
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../app/store";
import {InitialStateType, loginTC, meTC} from "./auth-reducer";
import {setAppStatusAC} from "../../app/app-reducer";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


type FormikErrorType = {
    email?: string,
    password?: string
}

export  type LogingDataType = {
    email:string
    password:string
    rememberMe?:boolean
    captcha?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            console.log(values)
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Password is  too short'
            }
            return errors
        },
        onSubmit: values => {
            console.log(values)
            dispatch(loginTC(values))
            dispatch(setAppStatusAC("loading"))
            formik.resetForm();

        },
    });



    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.touched.email &&  formik.errors.email && <div className={s.error123}>{formik.errors.email}</div>}

                        <TextField type="password" label="Password" margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div className={s.error123}>{formik.errors.password}</div>}

                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox  checked={formik.values.rememberMe}  {...formik.getFieldProps('rememberMe')}/>
                        }

                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}