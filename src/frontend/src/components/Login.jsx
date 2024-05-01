import '../App.css'
import { Box } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import MyButton from './forms/MyButton'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {handleSubmit, control} = useForm()
    const navigate=useNavigate()

    const submission = (data) => {
        AxiosInstance.post('login/',{
            email: data.email,
            password: data.password
        })
        .then((response)=>{
            console.log(response);
            localStorage.setItem('Token',response.data.token)
            navigate('/home')
        })
        .catch((error)=>{
            console.log("Error during login",error);
        })
    }

    return (
    <div className={'myBackground'}>
        <form onSubmit={handleSubmit(submission)}>
            <Box className={'whiteBox'}>
                <Box className={"itemBox"}>
                    <Box className={"title"}>Login for auth app</Box>
                </Box>

                <Box className={"itemBox"}>
                    <MyTextField label="Email" name="email" control={control} />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField label={"Password"} name={"password"} control={control} />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton type={"submit"} label={"Login"} />
                </Box>

                <Box className={"itemBox"}>
                    <Link to="/register">No account? Register here</Link>
                </Box>
            </Box>
        </form>
    </div>
    )
}   


export default Login


