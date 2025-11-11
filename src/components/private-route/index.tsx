import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>();

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized", { replace: true });
      toast.error("Ocorreu um erro com seu link, tente novamente mais tarde.");
      return;
    }
  }, [token, navigate, useParams]);

  return <Outlet />;
};
