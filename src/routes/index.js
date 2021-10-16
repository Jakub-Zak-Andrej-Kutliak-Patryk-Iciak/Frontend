import { Switch, Route } from 'react-router-dom'
import LoginPage from "../pages/login/LoginPage";
import LandingPage from "../pages/landing/LandingPage";
import CompleteAccountPage from "../pages/account/complete/CompleteAccountPage";


const MainRoutes = () => (
  <Switch>
    <Route path="/account/complete" component={ () => <CompleteAccountPage /> }/>
    <Route path="/login" component={ () => <LoginPage/> }/>
    <Route path="/" component={ () => <LandingPage/> }/>
  </Switch>
)

export default MainRoutes