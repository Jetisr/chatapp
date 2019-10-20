import { useState } from "react";

const useAuth = () => {
  const [authorized, setAuthorized] = useState(!!localStorage.getItem("token"));

  const authorize = (token: string) => {
    localStorage.setItem("token", token);
    setAuthorized(true);
  };

  return { authorized, authorize };
};

export default useAuth;
