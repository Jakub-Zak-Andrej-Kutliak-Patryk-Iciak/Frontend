import { useEffect, useState } from "react";


const useScreenSizeService = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [isLandscape, setLandscape] = useState(false)
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const resizeListener = async () => {
      await setScreenWidth(window.innerWidth)
      await setScreenHeight(window.innerHeight)
      setLandscape(screenWidth < screenHeight)
      setMobile(screenWidth < 500)
    }

    window.addEventListener('resize', resizeListener)
    return window.removeEventListener('resize', resizeListener)
  }, []);

  return {
    screenWidth,
    screenHeight,
    isLandscape,
    isMobile,
  }
}

export default useScreenSizeService