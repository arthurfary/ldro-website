import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginForm = styled.form`
display: flex;
flex-direction: column;


width: fit-content;
height: fit-content;

background: #fff;
padding: 2em;


border-radius: 20px;

gap: 1em;
`

interface FormData {
  login: string;
  password: string;
}

const Login = ({ token, setToken }: any) => {
  const navigate = useNavigate()

  // redirect straight away of tokin is found
  useEffect(() => {
    if (sessionStorage.getItem('token')) navigate('/backend')
  }, [])

  const [formData, setFormData] = useState<FormData>({ login: '', password: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // calls supabase login with the form data
    const { data, error } = await supabase.auth.signInWithPassword({ // add error handling
      email: formData.login,
      password: formData.password
    })
    if (!error) {
      setToken(data)
      navigate('/backend')
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee' }}>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Verifique suas credenciais.</h2>

        <label>Email:</label>
        <input placeholder="login" name="login" onChange={handleChange} />

        <label>Senha:</label>
        <input placeholder="password" name="password" type="password" onChange={handleChange} />

        <button type="submit">submit</button>
      </LoginForm>
    </div>

  )
}

export default Login
