import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
    const { login } = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false,
    );

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json',
                    },
                );

                login(responseData.user.id);
            } catch (err) {}
        } else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);

                const responseData = await sendRequest('http://localhost:5000/api/users/signup', 'POST', formData);

                login(responseData.user.id);
            } catch (err) {}
        }
    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                { ...formState.inputs, name: undefined, image: undefined },
                formState.inputs.email.isValid && formState.inputs.password.isValid,
            );
        } else {
            setFormData(
                { ...formState.inputs, name: { value: '', isValid: false }, image: { value: null, isValid: false } },
                false,
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element='input'
                            id='name'
                            type='text'
                            label='Your name'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a name.'
                            onInput={inputHandler}
                        />
                    )}
                    {!isLoginMode && <ImageUpload id='image' center onInput={inputHandler} />}
                    <Input
                        element='input'
                        id='email'
                        type='email'
                        label='E-mail'
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText='Please enter a valid email.'
                    />
                    <Input
                        element='input'
                        id='password'
                        type='password'
                        label='Password'
                        onInput={inputHandler}
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText='Please enter a valid description (at least 6 characters).'
                    />
                    <Button type='submit' disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </Fragment>
    );
};

export default Auth;