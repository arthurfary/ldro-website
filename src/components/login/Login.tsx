import { useState, ChangeEvent, FormEvent } from "react"
import supabase from "../../config/supabaseClient"

interface FormData {
  login: string;
  password: string;
}

const Login = ({ setToken }: any) => {

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

    setToken(data)
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="login" name="login" onChange={handleChange} />
        <input placeholder="password" name="password" type="password" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login
