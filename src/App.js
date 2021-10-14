import './App.css';
import PropTypes from 'prop-types'
import ConnectivityListener from "./services/useConnectionService";
import { Helmet } from "react-helmet";
import useTokenAuth from "./services/useTokenAuth";
import { useToasts } from 'react-toast-notifications';

const App = ({ accountRoutes, routes }) => {
  const { addToast } = useToasts()
  const { token } = useTokenAuth({ addToast })

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
      { token ? accountRoutes : routes }
    </div>
  );
}

App.propTypes = {
  routes: PropTypes.object.isRequired,
}

export default App;
