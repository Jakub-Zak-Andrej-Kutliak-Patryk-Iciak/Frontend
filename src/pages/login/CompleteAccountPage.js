import CompleteAccountForm from "../../components/form/CompleteAccountForm";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../store/StoreProvider";
import useLoginService from "../../services/useLoginService";
import { useToasts } from "react-toast-notifications";


const CompleteAccountPage = () => {
  const { push } = useHistory()
  const { loading, user, saveToken, setStoreItem } = useStore()
  const { addToast } = useToasts()
  const { completeAccount } = useLoginService({ addToast, saveToken, setStoreItem })

  useEffect(() => {
    if (user && user.isProfileComplete) {
      setStoreItem('navbar.activeTab', 'map')
      push('/map')
    }
  }, [loading, user])

  return (
    <div className="w-10/12 rounded-md pb-8 max-w-5xl my-5 px-1 py-10 m-auto"
         style={ { boxShadow: '0px 0px 30px 15px grey', background: '#394457' } }>
      <div className="text-3xl pb-8 text-white">
        Almost there!
      </div>
      <span className="text-xs text-white">
        In order to customise this app and deliver the best possible experience,
        we need to know a bit more about you.
      </span>
      <CompleteAccountForm onSubmit={ completeAccount }/>
    </div>
  )
}

export default CompleteAccountPage