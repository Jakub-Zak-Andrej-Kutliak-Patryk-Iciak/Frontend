import jwt from 'jsonwebtoken';
import publicKeySource from './jwtRS256.key.pub'


const useTokenAuth = () => {

  const validateAndDecodeToken = async (token) => {
    const publicKey = await (await fetch(publicKeySource)).text()
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
      if (error) {
        return { error, user: {} }
      }
      const { exp, iat, ...user } = decoded
      return { error, user }
    })
  }

  return {
    validateAndDecodeToken,
  }
}

export default useTokenAuth
