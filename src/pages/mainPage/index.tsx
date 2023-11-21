import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export const MainPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    // Redirect to login page if the user is not authenticated
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  // You can render some loading state while the redirection is in progress
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}