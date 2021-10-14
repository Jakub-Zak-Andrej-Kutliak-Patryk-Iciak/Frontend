import { useEffect, useState } from "react";
import { getAuth, getRedirectResult, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { initializeApp } from "firebase/app";
import useScreenSizeService from "./useScreenSizeService";
import useEnvService from "./useEnvService";
import { useToasts } from "react-toast-notifications";
import { securedAPI } from "./useApiService";
import useTokenAuth from "./useTokenAuth";


const useProviderLogin = () => {
  const [isLoading, setLoading] = useState(false)
  const { isMobile } = useScreenSizeService()
  const { addToast } = useToasts()
  const { setToken } = useTokenAuth({ addToast })
  const { firebaseConfig } = useEnvService()

  useEffect(() => {
    if (firebaseConfig) {
      initializeApp(firebaseConfig);
    }
  }, [firebaseConfig])

  const onSuccessCallback = async (result) => {
    const { user, _tokenResponse: other, providerId, ...rest } = result
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    console.log('user', user)
    console.log('tokenResponse', other)
    console.log('tokenResponse', rest)

    await securedAPI.signIn({
      providerId: other.providerId,
      uid: user.uid,
      firstName: other.firstName,
      lastName: other.lastName,
      email: user.email,
      photoUrl: user.photoURL,
      accessToken: credential.accessToken,
    })
  }
  const onErrorCallback = (error) => {
    const errorMessage = error.message;
    addToast((
      <div>
        <strong>Authorization failed</strong>
        <div>{errorMessage}</div>
      </div>
    ), {
      appearance: 'error',
      autoDismiss: true,
    })
  }

  const signInAccordingToScreenSize = async (provider) => {
    const auth = getAuth()
    if (isMobile) {
      await signInWithRedirect(auth, provider);
      return getRedirectResult(auth)
    }
    return signInWithPopup(auth, provider)
  }

  const signInWithProvider = async (provider) => {
    setLoading(true)
    return signInAccordingToScreenSize(provider)
      .then(onSuccessCallback)
      .catch(onErrorCallback)
      .finally(() => setLoading(false));
  }

  const signInAsGuest = async () => {
    console.log('signing in as a guest')
  }

  const signInWithCredentials = (data) => {
    setLoading(true)
    securedAPI.signIn(data)
      .then(({ token }) => {
        if (token) {
          setToken(token)
        }
      }).finally(() => {
        setLoading(false)
    })
  }

  const registerWithCredentials = (data) => {
    setLoading(true)
    securedAPI.register(data)
      .then(({ token }) => {
        if (token) {
          setToken(token)
        }
      }).finally(() => {
      setLoading(false)
    })
  }

  return {
    isLoading,
    signInWithGoogle: () => signInWithProvider(new GoogleAuthProvider()),
    signInWithFacebook: () => signInWithProvider(new FacebookAuthProvider()), // facebook is no longer testable via localhost
    signInWithApple: () => { throw Error("Implement sing in with apple provider") },
    signInWithCredentials,
    registerWithCredentials,
    signInAsGuest,
  }
}

export default useProviderLogin