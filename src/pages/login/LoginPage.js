import { Route, Switch, useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import useLoginService from "../../services/useLoginService";
import LoginWithCredentials from "./LoginWithCredentials";
import ChooseLoginMethod from "./ChooseLoginMethod";
import RegisterPage from "../register/RegisterPage";
import { AppLink } from "../../components";
import { LeftBackArrowIcon } from "../../components/icons";
import { useToasts } from "react-toast-notifications";
import { useStore } from "../../store/StoreProvider";
import CompleteAccountPage from "./CompleteAccountPage";
import { useEffect } from "react";


const LoginPage = () => {
  const { addToast } = useToasts()
  const { user, saveToken, setStoreItem } = useStore()
  const {
    isLoading,
    signInWithGoogle,
    signInWithFacebook,
    signInWithCredentials,
    signInAsGuest,
    registerWithCredentials,
  } = useLoginService({ addToast, saveToken, setStoreItem })
  const { push } = useHistory()

  useEffect(() => {
    if (user) {
      push('/account/complete')
    }
  }, [user])

  return (
    <div className="w-11/12 rounded-md pb-8 max-w-5xl my-5"
         style={ { boxShadow: '10px 10px 10px grey', background: '#394457' } }>
      <div className="absolute px-5">
        <AppLink text={ "Go Back" } prependIcon={ <LeftBackArrowIcon color={ "#f59e0b" }/> }/>
      </div>
      <div className="center-row my-5">
        <img src={ logo } className={ isLoading ? "App-logo" : "App-logo-still" } alt="logo"/>
      </div>
      <Switch>
        <Route path="/login/chooseMethod" component={ () => <ChooseLoginMethod signInWithGoogle={ signInWithGoogle }
                                                                               signInWithFacebook={ signInWithFacebook }
                                                                               signInWithCredentials={ () => push('/login') }
                                                                               signInAsGuest={ signInAsGuest }/> }
        />
        <Route path="/login/register" exact
               component={ () => <RegisterPage registerWithCredentials={ registerWithCredentials }/> }/>
        <Route path="/login"
               component={ () => <LoginWithCredentials signInWithCredentials={ signInWithCredentials }/> }/>
      </Switch>
    </div>
  );
}

export default LoginPage