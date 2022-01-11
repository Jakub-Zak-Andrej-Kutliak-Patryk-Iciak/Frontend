import { Button, Loader } from "semantic-ui-react";
import s from './Button.module.css'


const AppButton = ({ action,
                     text,
                     color = 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
                     textColor = "#000",
                     disabled = false,
                     className = "",
                     loading = false,
}) => {

  const innerAction = () => {
    if (!disabled && !loading && action) {
      action()
    }
  }

  return (
    <Button onClick={innerAction}
            className={s.btn}
            style={{
              background: color,
              cursor: disabled ? 'not-allowed':'pointer',
              width: '100%',
            }}
            loading={loading}
    >
      <div style={{ width: '100%', color: textColor }}>{ text }</div>
    </Button>
  )
}

export default AppButton