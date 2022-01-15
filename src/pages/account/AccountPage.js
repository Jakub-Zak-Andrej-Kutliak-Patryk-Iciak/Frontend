import { Grid, Image } from "semantic-ui-react";
import { AppButton } from "../../components";
import { useStore } from "../../store/StoreProvider";
import useLoginService from "../../services/useLoginService";
import { useToasts } from "react-toast-notifications";


const AccountPage = ({ user }) => {

  const { addToast } = useToasts()
  const { saveToken, setStoreItem } = useStore()
  const { logOut } = useLoginService({ addToast, saveToken, setStoreItem })

  return (
    <div className="mt-20">
      <Grid.Column align={ 'center' }>
        <Image src={ user.photoUrl } size='small' circular/>
      </Grid.Column>
      <div className="my-6">
        <strong>{ `${ user.firstName } ${ user.lastName }` }</strong>
      </div>
      {/*<div className="my-20">*/}
      {/*  Bookings: { user.bookings || 0 }*/}
      {/*</div>*/}
      <div className={ 'm-auto my-20 max-w-xs' }>
        <AppButton text={ 'Log out' } action={ logOut }/>
      </div>
    </div>
  )
}

export default AccountPage