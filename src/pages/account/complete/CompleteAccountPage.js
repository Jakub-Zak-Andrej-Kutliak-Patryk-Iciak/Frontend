import CompleteAccountForm from "../../../components/form/CompleteAccountForm";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../../store/StoreProvider";


const CompleteAccountPage = ({ completeAccount }) => {
  const { push } = useHistory()
  const { user } = useStore()

  useEffect(() => {
    console.log("user", user)
    if (!user || user.isProfileComplete) {
      push("/")
    }
  }, [user])

  return (
    <div className="w-10/12 rounded-md pb-8 max-w-5xl my-5 px-5 py-10"
         style={ { boxShadow: '10px 10px 10px grey', background: '#394457' } }>
      <div className="text-3xl pb-10">
        Almost there!
      </div>
      <span className="text-xl">
        In order to customise this app and to deliver the best possible experience,
        we need to know a bit more about you.
      </span>
      <CompleteAccountForm onSubmit={ completeAccount }/>
    </div>
  )
}

export default CompleteAccountPage