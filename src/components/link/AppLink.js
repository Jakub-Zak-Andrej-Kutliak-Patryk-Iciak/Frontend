import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'


const AppLink = ({ path, text, prependIcon, appendIcon }) => {
  const { push, goBack } = useHistory()

  const onClick = () => {
    if (path) {
      push(path)
    } else {
      goBack()
    }
  }

  return (
    <span className="m-1">
      <div onClick={onClick} className="text-amber-500 center-row cursor-pointer hover:underline">
        { prependIcon }
        <span className={ `${prependIcon && 'ml-2'} ${appendIcon && 'mr-2'}` }>{ text }</span>
        { appendIcon }
      </div>
    </span>
  )
}

AppLink.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default AppLink