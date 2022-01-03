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


const Dashboard = () => {
  const tabs = ["map", "list", "settings", "account"]
  const { pathname } = useLocation()
  const { push } = useHistory()
  const { user, setStoreItem, getStoreItem } = useStore()
  const [activeTab, setActiveTab] = useState(getStoreItem("navbar.activeTab"))

  const changeTab = async (tab) => {
    if (tabs.indexOf(tab) === -1) return
    await setStoreItem("navbar.activeTab", tab);
    setActiveTab(tab)
    push(`/${tab}`)
  }

  useEffect(() => {
    setActiveTab(getStoreItem("navbar.activeTab"), tabs[0])
    if (tabs.join("|").indexOf(pathname.substr(1)) === -1) {
      push(`/${ activeTab }`)
    }
  }, [])

  return (
    <div className="uppercase text-black w-full">
      <div className="fixed left-0 right-0 top-0 px-3 justify-between text-black flex h-14 bg-white">
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
          <Route path={ "/map" } component={ () => <MapPage/> }/>
          <Route path={ "/list" } component={ () => <ListPage/> }/>
          <Route path={ "/settings" } component={ () => <SettingsPage/> }/>
          <Route path={ "/account" } component={ () => <AccountPage/> }/>
        </Switch>
      </div>
      <div className="fixed bottom-0 right-0 left-0 justify-around center text-black flex h-14 bg-white rounded-t-4xl">
        <div className="">
          <div className="flex-col my-auto">
            <div className={ `border ${ activeTab === "map" ? 'border-amber-500' : 'border-white' }` }/>
            <div className="flex my-auto p-3" onClick={ () => changeTab("map") }>
              <MapOutlinedIcon color={ activeTab === "map" ? "blue" : "black" } size={ "25px" }/>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex-col my-auto">
            <div className={ `border ${ activeTab === "list" ? 'border-amber-500' : 'border-white' }` }/>
            <div className="my-auto p-3" onClick={ () => changeTab("list") }>
              <ListOutlinedIcon color={ activeTab === "list" ? "blue" : "black" } size={ "25px" }/>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex-col my-auto">
            <div className={ `border ${ activeTab === "settings" ? 'border-amber-500' : 'border-white' }` }/>
            <div className="my-auto p-3" onClick={ () => changeTab("settings") }>
              <SettingsSingleOutlinedIcon color={ activeTab === "settings" ? "blue" : "black" } size={ "25px" }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard