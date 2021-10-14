import RegisterForm from "../../components/form/RegisterForm";


const RegisterPage = ({ registerWithCredentials }) => {

  return (
    <div>
      <RegisterForm onSubmit={registerWithCredentials}/>
    </div>
  )
}

export default RegisterPage