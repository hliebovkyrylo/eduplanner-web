import { useAuth0 } from "@auth0/auth0-react";

export const MainPage = () => {
  const { loginWithRedirect } = useAuth0();

  return loginWithRedirect();
}