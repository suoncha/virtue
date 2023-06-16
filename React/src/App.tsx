import { Unity, useUnityContext} from "react-unity-webgl";
import type { RootState } from "./store";
import { useSelector } from 'react-redux'
import { LoginPage } from "./screens/loginPage";
import { MobilePage } from "./screens/mobilePage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoadingScreen } from "./screens/loading";
import { useEffect } from "react";

function App() {
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: "/game.loader.js",
    dataUrl: "/game.data.gz",
    frameworkUrl: "/game.framework.js.gz",
    codeUrl: "/game.wasm.gz",
  })
  const gameState = useSelector((state: RootState) => state.game.status)
  const saveInfo = useSelector((state: RootState) => state.game.saveInfo)
  const saveNo = useSelector((state: RootState) => state.game.saveNo)
  const loadingPercentage = Math.round(loadingProgression * 100)
  const isDesktop = useMediaQuery('(min-width: 900px)')

  function handleInitGenerator() {
    sendMessage("SeedGenerator", "InitStats", '0.9|10|90|100');
  }

  useEffect(() => {
    if (gameState) handleInitGenerator()
  }, [gameState])

  if (!gameState) return (
    <>
      {isDesktop ? 
      <LoginPage></LoginPage> : 
      <MobilePage></MobilePage>}
    </>
  )

  else return (
    <>
      {isLoaded === false && (
        LoadingScreen(loadingPercentage)
      )}
      <Unity
      unityProvider={unityProvider}
      style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
}

export default App
