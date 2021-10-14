import LoginForm from "../../components/form/LoginForm";
import AppLink from "../../components/link/AppLink";


const LoginWithCredentials = ({ signInWithCredentials }) => {

  return (
    <div>
      <LoginForm onSubmit={ signInWithCredentials }/>
      <div className="pt-3 center-col">
        <span>
          Don't have an account yet?
        </span>
        <span className="center-row">
          <AppLink text={"Register"} path={"/login/register"} /> now.
        </span>
      </div>
    </div>
  )
}

export default LoginWithCredentials