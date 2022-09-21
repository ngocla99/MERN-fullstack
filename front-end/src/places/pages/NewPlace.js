import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './PlaceForm.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            },
            image: {
                value: null,
                isValid: false,
            },
        },
        false,
    );

    const placeSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('image', formState.inputs.image.value);

            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 'POST', formData, {
                Authorization: 'Bearer ' + auth.token,
            });
            // Redirect user to different page
            navigate('/');
        } catch (err) {}
    };

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id='title'
                    element='input'
                    type='text'
                    label='Title'
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title.'
                />
                <Input
                    id='description'
                    element='textarea'
                    type='text'
                    label='Description'
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid description (at least 5 characters).'
                />
                <Input
                    id='address'
                    element='input'
                    type='text'
                    label='Address'
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid address.'
                />
                <ImageUpload id='image' onInput={inputHandler} errorText='Please provide an image.' />
                <Button type='submit' disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </Fragment>
    );
};

export default NewPlace;
