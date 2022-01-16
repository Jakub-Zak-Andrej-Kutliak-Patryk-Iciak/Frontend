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
    lastCoords: null,
  },
  testItems: [
    {
      id: 0,
      title: 'The MC driver',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: 57.051580,
        lng: 9.918679,
      },
      totalSpots: 150,
      busy: '63%',
      openingHours: '05:30 - 23:30'
    },
    {
      id: 1,
      title: 'The hupla dupla',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: 57.053580,
        lng: 9.918111,
      },
      totalSpots: 4563,
      busy: '34%',
      openingHours: 'nonstop'
    },
    {
      id: 2,
      title: 'The chupa chups',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: 57.011580,
        lng: 9.918179,
      },
      totalSpots: 232,
      busy: '99%',
      openingHours: '09:00 - 16:30'
    },
    {
      id: 3,
      title: 'The pizza hut',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: 56.951580,
        lng: 9.418679,
      },
      totalSpots: 122,
      busy: '67%',
      openingHours: '09:00 - 16:30'
    },
    {
      id: 4,
      title: 'The krowky',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: 57.126580,
        lng: 9.218679,
      },
      totalSpots: 786,
      busy: '12%',
      openingHours: '09:00 - 16:30'
    },
    {
      id: 5,
      tag: 'ad',
      title: 'Netflix',
    },
    {
      id: 6,
      title: 'The ucn school',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: 56.991580,
        lng: 9.118679,
      },
      totalSpots: 664,
      busy: '42%',
      openingHours: 'nonstop'
    }
  ]
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

