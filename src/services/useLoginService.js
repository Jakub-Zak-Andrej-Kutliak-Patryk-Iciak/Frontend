import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { getAuth, getRedirectResult, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { initializeApp } from "firebase/app";
import useScreenSizeService from "./useScreenSizeService";
import useEnvService from "./useEnvService";
import { securedAPI } from "./useApiService";
import { useHistory } from "react-router-dom";


const useLoginService = ({ addToast, saveToken, setStoreItem }) => {
  const [isLoading, setLoading] = useState(false)
  const { isMobile } = useScreenSizeService()
  const { firebaseConfig } = useEnvService()
  const { push } = useHistory()

  useEffect(() => {
    if (firebaseConfig) {
      initializeApp(firebaseConfig);
    }
  }, [firebaseConfig])

  const onSuccessCallback = async (result) => {
    const { user, _tokenResponse: other, providerId, ...rest } = result

    let credential;
    if (providerId.indexOf("google") !== -1) {
      credential = await GoogleAuthProvider.credentialFromResult(result);
    } else {
      credential = await FacebookAuthProvider.credentialFromResult(result);
    }
    // console.log('user', user)
    // console.log('tokenResponse', other)
    // console.log('tokenResponse', rest)

    await securedAPI.signIn({
      providerId: other.providerId,
      uid: user.uid,
      firstName: other.firstName,
      lastName: other.lastName,
      email: user.email,
      photoUrl: user.photoURL,
      accessToken: credential.accessToken,
    }).then(({ ok, data: { token } }) => {
      if (ok && token) {
        saveToken(token)
          .then((decoded) => {
            if (decoded && decoded.isProfileComplete) {
              setStoreItem('navbar.activeTab', 'map')
              push('/map');
            } else {
              push('/account/complete')
            }
          })
      } else {
        onErrorCallback({ message: "Sign in failed" })
      }
    }).catch(error => {
        onErrorCallback(error)
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
      .then((result) => onSuccessCallback(result, provider))
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
          saveToken(token)
            .then(decoded => {
              console.log('credential login got decoded', decoded)
            })
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
          saveToken(token)
        }
      }).finally(() => {
      setLoading(false)
    })
  }

  const completeAccount = (payload) => {
    const { ok, data } = securedAPI.completeRegistration(payload)
    if (ok) {
      saveToken(data.token)
    } else {
      addToast((
        <div>
          <strong>Registration failed</strong>
          <div>{ (data && data.error) || 'Something went wrong. Please, refresh the page.' }</div>
        </div>
      ), {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const logOut = () => {
    securedAPI.signOut()
      .then(({ ok, data }) => {
        if (ok) {
          setStoreItem('auth.token', null)
          setStoreItem('navbar.activeTab', 'map')
          push('/')
        }
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
    completeAccount,
    logOut,
  }
}

useLoginService.propTypes = {
  addToast: PropTypes.func.isRequired,
  saveToken: PropTypes.func.isRequired,
  setStoreItem: PropTypes.func.isRequired,
}

export default useLoginService