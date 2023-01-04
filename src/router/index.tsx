import { createBrowserRouter } from "react-router-dom";
import { Draw } from '../pages/draw'
import { PaperTextureBackground } from '../pages/background'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Draw></Draw>
  },
  {
    path: '/PaperTextureBackground',
    element: <PaperTextureBackground></PaperTextureBackground>
  },

])
