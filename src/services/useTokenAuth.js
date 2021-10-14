import jwt from 'jsonwebtoken';
import { getStateItem, setStateItem } from "../store/persistentStore";
import { useCallback, useEffect, useState } from "react";
import publicKeySource from './jwtRS256.key.pub'


const useTokenAuth = ({ addToast }) => {
  const [token, setToken] = useState(getStateItem("auth.token"))
  const [publicKey, setPublicKey] = useState(getStateItem("auth.token"))

  const readPublicKey = useCallback(() => {
    fetch(publicKeySource)
      .then(result => setPublicKey(result.text()))
  }, [])

  useEffect(() => {
    readPublicKey()
    if (token) {
      verifyToken(token)
    }
  }, [token])

  const verifyToken = async (token) => {
    console.log('public key in verift:', publicKey)
    await jwt.verify(token, publicKey, (error, decoded) => {
      if (error) {
        addToast((
          <div>
            <strong>Authorization failed</strong>
            <div>{error}</div>
          </div>
        ), {
          appearance: 'error',
          autoDismiss: true,
        })
        return {}
      }
      console.log('token decoded here:', decoded)
      return decoded
    });
  }

  const saveToken = (token) => {
      setToken(token)
      setStateItem("auth.token", token)
  }

  const isTokenValid = () => {
    let isValid = false
    verifyToken(token)
      .then(user => {
        isValid = !!user.uid
      })
    console.log('token valid:', isValid)
    return isValid
  }

  return {
    token,
    setToken: verifyToken,
    isTokenValid,
  }
}

export default useTokenAuth