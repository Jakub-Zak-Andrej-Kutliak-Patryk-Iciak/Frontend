import jwt from 'jsonwebtoken';
import { useCallback, useEffect, useState } from "react";
import publicKeySource from './jwtRS256.key.pub'


const useTokenAuth = () => {
  // const [publicKey, setPublicKey] = useState("")

  // const readPublicKey = useCallback(() => {
  //   fetch(publicKeySource)
  //     .then(result => result.text())
  //     .then(result => setPublicKey(result))
  // }, [])

  const validateAndDecodeToken = async (token) => {
    // console.log("validation token", token)
    const publicKey = await (await fetch(publicKeySource)).text()
    // const publicKey = await pubPromise.text()
    // console.log("pub is", await publicKey)
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
      if (error) {
        return { error, user: {} }
      }
      const { exp, iat, ...user } = decoded
      return { error, user }
    })
  }

  // useEffect(() => {
  //   if (!publicKey) {
  //     console.log("fetching presh public key, coz it was null")
  //     fetch(publicKeySource)
  //       .then(result => result.text())
  //       .then(result => setPublicKey(result));
  //   }
  // }, [publicKey])

  return {
    validateAndDecodeToken,
  }
}

export default useTokenAuth