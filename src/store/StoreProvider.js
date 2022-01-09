import { createContext, useContext, useEffect, useState } from "react";
import { getStateItem, initState, setStateItem } from "./persistentStore";
import { isString } from "lodash/lang";
import useTokenAuth from "../services/useTokenAuth";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";


const StoreContext = createContext({
  loading: true,
  store: {},
  user: null,
  getStoreItem: () => {},
  setStoreItem: () => {},
  saveToken: () => {},
})

const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [store, setStore] = useState(getStateItem("", initState))
  const [user, setUser] = useState(null)

  const { addToast } = useToasts()
  const { validateAndDecodeToken } = useTokenAuth()
  const { push } = useHistory()

  useEffect(() => {
    const token = getStoreItem("auth.token")
    if (token) {
      validateAndSaveToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async (token) => {
    const { error, user } = await validateAndDecodeToken(token)
    // console.log("validation error|user", error, user)
    if (error) {
      addToast((
        <div>
          <strong>Authorization failed</strong>
          <div>Token validation failed: {error.message}</div>
        </div>
      ), {
        appearance: 'error',
        autoDismiss: true,
        onDismiss: () => push('/')
      });
    }
    setUser(user)
    return { error, user }
  }

  const validateAndSaveToken = async (token) => {
    const { error, user } = await validateToken(token)
    setLoading(false)
    setStoreItem("auth.token", error ? null : token)
    return user
  }

  const getStoreItem = (path = "", instead) => {
    return getStateItem(path ?? "", instead)
  }

  const setStoreItem = (path, value) => {
    if (!isString(path) || path.length === 0) {
      throw Error("Path is required to access store")
    }
    if (path === "auth.token" && value) {
      validateToken(value).then(({ error }) => {
        if (error) {
          setStore(setStateItem("auth.token", value))
        }
      })
    } else if (path === 'auth.token') {
      setUser(null)
    }

    const state = setStateItem(path, value);
    setStore(state)
    return state
  }

  return (
    <StoreContext.Provider value={{
      loading,
      store,
      user,
      saveToken: validateAndSaveToken,
      getStoreItem,
      setStoreItem,
    }}>
      { children }
    </StoreContext.Provider>
  )
}

export default StoreProvider
export const useStore = () => useContext(StoreContext)