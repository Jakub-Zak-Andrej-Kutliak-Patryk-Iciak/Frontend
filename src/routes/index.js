import { Switch, Route } from 'react-router-dom'
import LoginPage from "../pages/login/LoginPage";
import LandingPage from "../pages/landing/LandingPage";
import Dashboard from "../pages/dashboard/Dashboard";


const MainRoutes = () => (
  <Switch>
    <Route path="/account" component={ () => <Dashboard/> }/>
    <Route path="/login" component={ () => <LoginPage/> }/>
    <Route path="/" component={ () => <LandingPage/> }/>
  </Switch>
)

export default MainRoutes