import Login from "../pages/Login";
import Trade from "../pages/Trade";

interface IRoute {
  path: string;
  element: () => JSX.Element;
  title: string;
  isPrivate: boolean;
}

const routes: IRoute[] = [
  {
    path: "/",
    element: Login,
    title: "Login - Marketworms trade to fly",
    isPrivate: false,
  },
  {
    path: "/trade",
    element: Trade,
    title: "Binance Bot - Marketworms trade to fly",
    isPrivate: true,
  },
];

export default routes;
