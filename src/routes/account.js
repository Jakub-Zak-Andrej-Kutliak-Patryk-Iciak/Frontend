import { Switch, Route } from 'react-router-dom'
import Dashboard from "../pages/dashboard/Dashboard";


const AccountRoutes = () => (
  <Switch>
    <Route path="/" component={() => <Dashboard/>} />
  </Switch>
)

export default AccountRoutes