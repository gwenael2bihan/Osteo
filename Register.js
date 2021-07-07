import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../services/auth-service'

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        setUsername(data.username);
        setPassword(data.password);
        setEmail(data.email);
        AuthService.register(data.username, data.email, data.password)
            .then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                
            }).catch((error) => {
                const resMessage = (
                    error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            });
    };

    // useEffect(() => {
    //     const test = AuthService.register(username, email, password)
    //         .then((response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //         }).catch((error) => {
    //             const resMessage = (
    //                 error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    //             setMessage(resMessage);
    //             setSuccessful(false);
    //         });
    //     console.log("test")
    // }, [onSubmit]);

    return (
        <div className="register-form" style={{ position: 'relative', zIndex: '3' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        name="fullname"
                        type="text"
                        {...register('fullname')}
                        className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.fullname?.message}</div>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        {...register('username')}
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        name="email"
                        type="text"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
                            }`}
                    />
                    <div className="invalid-feedback">
                        {errors.confirmPassword?.message}
                    </div>
                </div>

                <div className="form-group form-check">
                    <input
                        name="acceptTerms"
                        type="checkbox"
                        {...register('acceptTerms')}
                        className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''
                            }`}
                    />
                    <label htmlFor="acceptTerms" className="form-check-label">
                        I have read and agree to the Terms
                    </label>
                    <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={reset}
                        className="btn btn-warning float-right"
                    >
                        Reset
                    </button>
                </div>
            </form>
            <div className="already-registered">Already register, <a href="http://localhost:3000/login">Go to login page</a></div>
        </div>
    )
};

export default Register
