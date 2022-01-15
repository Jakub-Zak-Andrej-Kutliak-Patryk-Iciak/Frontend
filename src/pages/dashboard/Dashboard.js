import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import {
  SettingsSingleOutlinedIcon,
  UserOutlinedIcon,
  MapOutlinedIcon,
  ListOutlinedIcon
} from "../../components/icons";
import { Image } from "semantic-ui-react";
import { useStore } from "../../store/StoreProvider";
import { useEffect, useState } from "react";
import { MapPage, ListPage, SettingsPage, AccountPage } from "../account";
import CompleteAccountPage from "../login/CompleteAccountPage";
import PaymentPage from "../account/PaymentPage";
import PaymentSuccessPage from "../account/PaymentSuccessPage";
import useParkingService from "../../services/useParkingService";

export const NAVBAR_TABS = ["map", "list", "settings", "account", "payment/success"]

const Dashboard = () => {

  const { pathname } = useLocation()
  const { push } = useHistory()
  const { user, setStoreItem, getStoreItem } = useStore()
  const [defaultMapCenter, setDefaultCenter] = useState(getStoreItem("preferences.lastCoords", { lat: 57.051580, lng: 9.918679 }))

  const { fetchParkingLots, parkingLots } = useParkingService()

  const [activeTab, setActiveTab] = useState(getStoreItem("navbar.activeTab"))
  const [mapApiKey, setMapApiKey] = useState(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  const [itemToBook, setItemToBook] = useState(null)

  const changeTab = async (tab) => {
    if (NAVBAR_TABS.indexOf(tab) === -1) return
    await setStoreItem("navbar.activeTab", tab);
    setActiveTab(tab)
    push(`/${ tab }`)
  }

  const onRefreshRequested = (newCoords) => {
    setStoreItem("preferences.lastCoords", newCoords)
    fetchParkingLots(newCoords)
    setDefaultCenter(newCoords)
  }

  useEffect(() => {
    if (itemToBook) {
      if (!pathname.includes('/payment/')) {
        changeTab('payment').then(() => push(`/payment/checkout`));
      }
      return
    }

    for (let tab of NAVBAR_TABS) {
      if (pathname.includes(tab)) return
    }
    changeTab(NAVBAR_TABS[0])
  }, [pathname, itemToBook])

  useEffect(() => {
    if (parkingLots.length === 0) {
      onRefreshRequested(defaultMapCenter)
    }
  }, [parkingLots])

  return (
    <div className="uppercase text-black w-full">
      <div className="fixed left-0 right-0 top-0 px-3 justify-between text-black flex h-14 bg-white z-50">
        <div className="flex my-auto">
          { user && user.photoUrl ? (
            <Image src={ user.photoUrl } circular size={ "mini" } className="cursor-pointer"
                   onClick={ () => changeTab("account") }/>
          ) : (
            <UserOutlinedIcon color={ "black" } size={ "25px" } onClick={ () => changeTab("ACCOUNT") }/>
          ) }
        </div>
        <div className="flex my-auto text-2xl">
          <strong>The parking app</strong>
        </div>
      </div>
      <div className="w-full">
        <Switch>
          <Route path={ "/payment/checkout" } exact
                 component={ () => itemToBook && <PaymentPage item={ itemToBook } user={user}/> }/>
          <Route path={ "/payment/success" } component={ () => <PaymentSuccessPage/> }/>
          <Route path={ "/account/complete" } exact component={ () => <CompleteAccountPage/> }/>
          <Route path={ "/account" } component={ () => <AccountPage user={ user }/> }/>
          <Route path={ "/settings" } component={ () => <SettingsPage/> }/>
          <Route path={ "/list" }
                 component={ () => <ListPage items={ parkingLots } setItemToBook={ setItemToBook }/> }/>
          <Route path={ "/map" }
                 component={ () => <MapPage items={ parkingLots }
                                            mapApiKey={ mapApiKey }
                                            setItemToBook={ setItemToBook }
                                            onRefreshRequested={ onRefreshRequested }
                                            defaultCenter={ defaultMapCenter }
                 />
                 }
          />
        </Switch>
      </div>
      <div className="fixed bottom-0 right-0 left-0 justify-around center text-black flex h-14 bg-white rounded-t-4xl">
        <div className="">
          <div className="flex-col my-auto">
            <div className={ `border ${ pathname.includes('/map') ? 'border-amber-500' : 'border-white' }` }/>
            <div className="flex my-auto p-3 cursor-pointer" onClick={ () => changeTab("map") }>
              <MapOutlinedIcon color={ pathname.includes('/map') ? "blue" : "black" } size={ "25px" }/>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex-col my-auto">
            <div className={ `border ${ pathname.includes('/list') ? 'border-amber-500' : 'border-white' }` }/>
            <div className="my-auto p-3 cursor-pointer" onClick={ () => changeTab("list") }>
              <ListOutlinedIcon color={ pathname.includes('/list') ? "blue" : "black" } size={ "25px" }/>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex-col my-auto">
            <div className={ `border ${ pathname.includes('/settings') ? 'border-amber-500' : 'border-white' }` }/>
            <div className="my-auto p-3 cursor-pointer" onClick={ () => changeTab("settings") }>
              <SettingsSingleOutlinedIcon color={ pathname.includes('/settings') ? "blue" : "black" } size={ "25px" }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
