import { Switch, Route } from 'react-router-dom'
import ChooseLoginMethod from "../pages/login/ChooseLoginMethod";
import Dashboard from "../pages/dashboard/Dashboard";


const AccountRoutes = () => (
  <Switch>
    <Route path="/account/" component={() => <ChooseLoginMethod/>} />
    <Route path="/" component={() => <Dashboard/>} />
  </Switch>
)

export default AccountRoutes