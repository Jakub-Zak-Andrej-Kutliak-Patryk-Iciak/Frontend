import { Switch, Route } from 'react-router-dom'
import LoginPage from "../pages/login/LoginPage";
import LandingPage from "../pages/landing/LandingPage";


const MainRoutes = () => (
  <Switch>
    <Route path="/login" component={ () => <LoginPage/> }/>
    <Route path="/" component={ () => <LandingPage/> }/>
  </Switch>
)

export default MainRoutes