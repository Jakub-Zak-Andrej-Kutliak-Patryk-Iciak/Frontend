import { Switch, Route } from 'react-router-dom'
import Dashboard from "../pages/dashboard/Dashboard";
import CompleteAccountPage from "../pages/account/complete/CompleteAccountPage";


const AccountRoutes = () => (
  <Switch>
    <Route path="/account/complete" component={() => <CompleteAccountPage />} />
    <Route path="/account" component={() => <Dashboard/>} />
  </Switch>
)

export default AccountRoutes