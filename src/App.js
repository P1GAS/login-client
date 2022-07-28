import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { compose, withServer } from "hoc";
import { accessTokenGot } from "features/accessToken";
import { userGot } from "features/currentUser";

import "react-toastify/dist/ReactToastify.css";

import {
  AuthContainer,
  UsersListContainer,
  CurrentUserContainer,
} from "./containers";

import NotFoundPage from "./pages/NotFoundPage";
import AppLoader from "components/AppLoader";

const App = ({ getNewTokens, accessTokenGot, getCurrentUser, userGot }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const update = async () => {
      try {
        const tokenRes = await getNewTokens();

        const { accessToken } = tokenRes.data;
        accessTokenGot(accessToken);

        const currentUserRes = await getCurrentUser();

        const { user } = currentUserRes.data;

        userGot(user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/");
      }
    };
    update();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/people" element={<UsersListContainer />} />
        <Route path="/account" element={<CurrentUserContainer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} />
    </>
  );
};

const mapDispatchToProps = { accessTokenGot, userGot };

export default compose(
  connect(null, mapDispatchToProps),
  withServer(({ getNewTokens, getCurrentUser }) => ({
    getNewTokens,
    getCurrentUser,
  }))
)(App);
