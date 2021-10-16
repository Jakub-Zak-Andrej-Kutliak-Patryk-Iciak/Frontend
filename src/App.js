import './App.css';
import PropTypes from 'prop-types'
import ConnectivityListener from "./services/useConnectionService";
import { Helmet } from "react-helmet";
import { useStore } from "./store/StoreProvider";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";


const App = ({ accountRoutes, routes }) => {
  const { push } = useHistory()
  const { pathname } = useLocation()
  const { user, store } = useStore()

  useEffect(() => {
    if (pathname.startsWith("/login") && store?.auth?.token) {
      if (user) {
        push(user.isProfileComplete ? "/":"/account/complete")
      }
    }
  }, [user, store, push, pathname])

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
}

export default App;
