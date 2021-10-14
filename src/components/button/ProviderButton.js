import { Button, Image } from "semantic-ui-react";
import s from './Button.module.css'


const ProviderButton = ({ providerName,
                          providerLogo,
                          action,
                          color = 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
                          textColor = "#000",
                          disabled = false,
}) => {

  const innerAction = () => {
    if (!disabled && action) {
      action()
    }
  }

  return (
    <Button onClick={innerAction}
            className={disabled ? s.disabledBtn:s.btn}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '3px',
              background: color,
              cursor: disabled ? 'not-allowed':'pointer',
              width: '90%',
              maxWidth: '300px',
              height: '50px',
              marginInline: 'auto',
            }}
    >
      {providerLogo && <Image src={providerLogo} />}
      <div className="ml-2"
           style={{
             width: '100%',
             display: 'flex',
             justifyContent: 'center',
             color: textColor,
           }}
      >
        { providerName ? `Continue with ${providerName}`:'Continue as a guest' }
      </div>
    </Button>
  )
}

export default ProviderButton