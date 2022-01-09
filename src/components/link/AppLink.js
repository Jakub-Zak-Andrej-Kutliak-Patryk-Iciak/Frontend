import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { NAVBAR_TABS } from "../../pages/dashboard/Dashboard";
import { useStore } from "../../store/StoreProvider";


const AppLink = ({ path, text, prependIcon, appendIcon, onClick }) => {
  const { push, goBack } = useHistory()
  const { setStoreItem } = useStore()

  const onInnerClick = () => {
    if (onClick) {
      onClick()
    } else if (path) {
      const tab = path.replaceAll('/', '')
      if (NAVBAR_TABS.includes(tab)) {
        setStoreItem('navbar.activeTab', tab)
      }
      push(path);
    } else {
      goBack();
    }
  }

  return (
    <span className="m-1">
      <div onClick={onInnerClick} className="text-amber-500 center-row cursor-pointer hover:underline">
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