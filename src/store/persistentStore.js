const storeName = "parkingAppStore"
const storeVersion = "0.0.1"

const saveState = (state) => {
  localStorage.setItem(storeName, JSON.stringify(state))
  return loadState()
}

export const initState = {
  // don't forget to increment storeVersion everytime you make a change here
  version: storeVersion,
  auth: {
    token: null,
  },
  navbar: {
    activeTab: "map",
  },
  preferences: {
    darkmode: false,
  },
}

const loadState = () => {
  const store = localStorage.getItem(storeName)
  if (store) {
    const parsedStore = JSON.parse(store)
    if (initState.version > parsedStore.version) {
      return saveState(initState);
    }
    return parsedStore;
  }
  return saveState(initState);
}

class ObjectCrawler {
  static getPropOf(path, object) {
    const nextStep = path.shift();

    if (path.length === 0) return object[nextStep]
    if (typeof object === "object" && object[nextStep] != null) return ObjectCrawler.getPropOf([...path], object[nextStep]);

    throw Error(`OPS! Item with key "${nextStep}" is not present in persistent store!`)
  }

  static crawl(path, object) {
    return ObjectCrawler.getPropOf(path.split("."), object)
  }
}


export const getStateItem = (path = "", instead) => {
  const temp = ObjectCrawler.crawl(path, loadState())
  return (!temp && instead) ? instead : temp
}
export const setStateItem = (path, value) => {
  const state = loadState()
  const parsedPath = path.split(".")
  const propName = parsedPath.pop()
  const propRef = ObjectCrawler.crawl(parsedPath.join("."), state)
  propRef[propName] = value
  saveState(state)
  return state
}

