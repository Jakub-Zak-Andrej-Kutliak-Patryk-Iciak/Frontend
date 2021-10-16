import { createContext, useContext, useEffect, useState } from "react";
import { getStateItem, initState, setStateItem } from "./persistentStore";
import { isString } from "lodash/lang";
import useTokenAuth from "../services/useTokenAuth";
import { useToasts } from "react-toast-notifications";


const StoreContext = createContext({
  store: {},
  user: null,
  getStoreItem: () => {},
  setStoreItem: () => {},
  saveToken: () => {},
})

const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(getStateItem("", initState))
  const [user, setUser] = useState(null)

  const { addToast } = useToasts()
  const { validateAndDecodeToken } = useTokenAuth()

  useEffect(() => {
    const token = getStoreItem("auth.token")
    if (token) {
      validateAndSaveToken(token)
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
      });
    }
    setUser(user)
    return { error }
  }

  const validateAndSaveToken = async (token) => {
    const { error } = await validateToken(token)
    setStoreItem("auth.token", error ? null : token)
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
    }

    const state = setStateItem(path, value);
    setStore(state)
    return state
  }

  return (
    <StoreContext.Provider value={{
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