import { compose } from "@reduxjs/toolkit";
import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { withServer } from "hoc";
import { userLoggedOut } from "features/currentUser";
import { accessTokenRemoved } from "features/accessToken";

const { Title } = Typography;

const Header = ({ logout, userLoggedOut, accessTokenRemoved }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await toast.promise(logout, { pending: "Выходим..." });

      accessTokenRemoved();
      userLoggedOut();

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data || "Что-то пошло не так");
    }
  };

  return (
    <div className="header">
      <div className="container header-container">
        <Title level={3}>Login</Title>
        <div className="header-buttons">
          <Button onClick={() => navigate("/people")}>Пользователи</Button>
          <Button onClick={() => navigate("/account")}>Мой профиль</Button>
          <Button onClick={handleLogout}>Выйти</Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  userLoggedOut,
  accessTokenRemoved,
};

export default compose(
  withServer(({ logout }) => ({
    logout,
  })),
  connect(null, mapDispatchToProps)
)(Header);
