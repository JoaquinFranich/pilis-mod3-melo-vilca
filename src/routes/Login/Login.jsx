import { useContext } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"
import './Login.css'

const Login = () => {
    const { setCurrentUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        setCurrentUser(data);
        navigate('/')
    }

    return (
        <div className="sign-in-container">
            <span className="sign-in-title">Ingresa usuario y contraseña</span>
            <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>

                <input 
                className="input-form"
                type="text"
                placeholder="Nombre de Usuario"
                {...register('username',{
                    required: 'debe ingresar el nombre de usuario'
                })} />
                <p>{errors.username?.message}</p>

                <input 
                className="input-form"
                type="password"
                placeholder="Contraseña" 
                {...register('password',{
                    required: 'Debe ingresar su contraseña'
                })}/>
                <p>{errors.password?.message}</p>

                <button className="btn-form">Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default Login;