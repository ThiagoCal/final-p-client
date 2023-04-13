import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export const Auth = (props) => {
    const [redirect, setRedirect] = useState(false);
    const { accessToken, setAccessToken } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get('/token');
                setAccessToken(response.data);
                setRedirect(true);
            } catch (err) {
                console.log(err.response.data.msg);
                navigate('/login');
            }
        }
        verify()
    }, [])

    return (
        redirect ? props.children : null
    )

}











