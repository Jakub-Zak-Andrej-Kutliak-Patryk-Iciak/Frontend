import jwt from 'jsonwebtoken';
import { useCallback, useEffect, useState } from "react";
import publicKeySource from './jwtRS256.key.pub'


const useTokenAuth = () => {
  const [publicKey, setPublicKey] = useState("")

  const readPublicKey = useCallback(() => {
    fetch(publicKeySource)
      .then(result => result.text())
      .then(result => setPublicKey(result))
  }, [])

  const validateAndDecodeToken = async (token) => {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
      if (error) {
        return { error, user: {} }
      }
      const { exp, iat, ...user } = decoded
      return { error, user }
    })
  }

  useEffect(() => {
    readPublicKey()
  }, [readPublicKey])

  return {
    validateAndDecodeToken,
  }
}

export default useTokenAuth