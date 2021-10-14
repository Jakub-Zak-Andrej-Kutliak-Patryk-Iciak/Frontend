import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div>
      <div className="pt-32 text-3xl text-black uppercase">Landing page here</div>
      <div className="py-4">
        <Link to="/login/chooseMethod" className="text-amber-500">Sign in</Link>
      </div>
    </div>
  )
}

export default LandingPage