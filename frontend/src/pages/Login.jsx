import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

function Login({ auth }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate('/dashboard');
        }
    }, [auth]);
    axios.defaults.withCredentials = true;
    let user = useRef()
    let password = useRef()
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    async function handleSubmit(event) {
        event.preventDefault()

        let data = {
            [user.current.name]: user.current.value,
            [password.current.name]: password.current.value
        }
        try {
            await axios.post(`${backendURL}/login`, data)
                .then(res => {
                    console.log(res);
                // Agregar un retraso de 3 segundos antes de la navegación
                setTimeout(() => {
                    navigate('/dashboard');
                    window.location.reload(); 
                }, 1000);
            });

            Swal.fire({
                icon: 'success',
                title: 'GENIAL',
                text: '¡Usuario online!'
            })

        } catch (error) {
            let err = error.response.data.message
            console.log('Ocurrió un error')
            Swal.fire({
                icon: 'error',
                title: '¡Lo sentimos!',
                text: err
            })
        }
    }


    return (

        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <fieldset className="mb-4">
                    <legend className="block text-gray-700 font-bold mb-2">Nombre de Usuario</legend>
                    <input
                        ref={user}
                        type="text"
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="user"
                        required
                    />
                </fieldset>

                <fieldset className="mb-6">
                    <legend className="block text-gray-700 font-bold mb-2">Password</legend>
                    <input
                        ref={password}
                        type="password"
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="password"
                        required
                    />
                </fieldset>

                <input
                    type="submit"
                    value="Sign in"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
            </form>
        </div>
    )
}

Login.propTypes = {
    auth: PropTypes.bool.isRequired,
};
export default Login;