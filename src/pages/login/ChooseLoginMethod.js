import ProviderButton from "../../components/button/ProviderButton";
import GoogleProviderButton from '../../assets/providers/google/btn_google_signin_logo.png'
import FacebookProviderButton from '../../assets/providers/facebook/facebook_sign_in_button_logo.png'
import GmailProviderButton from '../../assets/providers/gmail/btn_gmail_signin_logo.png'


const ChooseLoginMethod = ({ signInWithGoogle, signInWithFacebook, signInWithCredentials, signInAsGuest }) => {

  return (
    <div>
      <p>
        How would you like to continue?
      </p>
      <ProviderButton providerName={"Google"}
                      providerLogo={GoogleProviderButton}
                      color={"#fff"}
                      action={signInWithGoogle}
      />
      <ProviderButton providerName={"Facebook"}
                      providerLogo={FacebookProviderButton}
                      action={signInWithFacebook}
                      color={"#1b74e9"}
                      textColor={"#fff"}
      />
      <ProviderButton providerName={"Email"}
                      providerLogo={GmailProviderButton}
                      action={signInWithCredentials}
                      color={"#fff"}
      />
      <ProviderButton action={signInAsGuest}
                      disabled
      />
    </div>
  )
}

export default ChooseLoginMethod