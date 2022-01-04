import { Grid, Image } from "semantic-ui-react";


const AccountPage = ({ user }) => {

  console.log('user', user)

  return (
    <div>
      <Grid.Column align={'center'}>
        <Image src={user.photoUrl} size='small' circular />
      </Grid.Column>
      <div className="my-6">
        <strong>{ `${user.firstName} ${user.lastName}` }</strong>
      </div>
      <div>
        other stuff
      </div>
    </div>
  )
}

export default AccountPage