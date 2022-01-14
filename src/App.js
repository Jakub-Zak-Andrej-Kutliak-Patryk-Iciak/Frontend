import './App.css';
import PropTypes from 'prop-types'
import ConnectivityListener from "./services/useConnectionService";
import { Helmet } from "react-helmet";
import { useStore } from "./store/StoreProvider";


const App = ({ accountRoutes, routes }) => {
  const { user } = useStore()

  return (
    <div className="App center-col">
      <ConnectivityListener/>
      <Helmet defaultTitle={ 'Parking app' }
              titleTemplate={
                'Parking app | %s'
              }
      >
        <meta charSet='utf-8'/>
      </Helmet>
      { user ? accountRoutes : routes }
    </div>
  );
}

App.propTypes = {
  routes: PropTypes.object.isRequired,
  accountRoutes: PropTypes.object.isRequired,
}

export default App;
