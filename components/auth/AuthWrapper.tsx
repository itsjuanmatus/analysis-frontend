import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const AuthWrapper = ({ children }: any) => {
  useEffect(() => {
    setCurrentOrganization(window.localStorage.getItem("organization_id"));
  }, []);

  useEffect(() => {
    setOptions({
      domain: "dev-b9r46gdf.us.auth0.com",
      clientId: "vSlqsUeUt4MX4kxtZoMKlxRQvRLSU40D",
      redirectUri: window.location.origin,
      ...(currentOrganization ? { organization: currentOrganization } : null),
    });
  }, []);

  const [currentOrganization, setCurrentOrganization] = useState<any>(globalThis?.window?.localStorage.getItem("organization_id"));

  const [options, setOptions] = useState({
    domain: "dev-b9r46gdf.us.auth0.com",
    clientId: "vSlqsUeUt4MX4kxtZoMKlxRQvRLSU40D",
    redirectUri: globalThis?.window?.location.origin,
    ...(currentOrganization ? { organization: currentOrganization } : null),
  });

  return <Auth0Provider {...options}>{children}</Auth0Provider>;
};
