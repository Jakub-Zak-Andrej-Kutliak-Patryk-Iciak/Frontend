import { Route, Switch } from "react-router-dom";
import CompleteAccountPage from "../account/complete/CompleteAccountPage";


const Dashboard = () => {

  return (
    <div className="px-3 uppercase">
      <Switch>
        <Route path={"/account/complete"} component={() => <CompleteAccountPage />} />
        {/*<Route path={""} component={}/>*/}
      </Switch>
    </div>
  )
}

export default Dashboard