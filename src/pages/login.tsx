import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthError, Session, SignInWithPasswordCredentials } from "@supabase/supabase-js";

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

interface LoginProps {
  session: Session | null;
  setSession: (session: Session) => void;
}

const Login = ({ session, setSession }: LoginProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInWithPasswordCredentials>({ email: '', password: '' });

  useEffect(() => {
    if (session?.access_token) {
      navigate('/backend');
    }
  }, [session, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword(formData);

    if (!error && data?.session) {
      setSession(data.session);
      navigate('/backend');
    }
  };

  return (
    <div className="login-container">
      <LoginForm onSubmit={handleSubmit}>
        <h2>Verifique suas credenciais.</h2>
        <label>Email:</label>
        <input placeholder="login" name="login" onChange={handleChange} />
        <label>Senha:</label>
        <input placeholder="password" name="password" type="password" onChange={handleChange} />
        <button type="submit">submit</button>
      </LoginForm>
    </div>
  );
};

export default Login
