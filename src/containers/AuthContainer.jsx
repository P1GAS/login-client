import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { withServer, compose } from "hoc";
import { accessTokenGot } from "features/accessToken";
import LoginCard from "components/LoginCard";
import RegisterCard from "components/RegisterCard";
import isEmail from "helpers/isEmail";
import { userGot } from "features/currentUser";

const AuthContainer = ({
  accessTokenGot,
  loginReq,
  registerReq,
  userGot,
  accessToken,
  updateAvatar,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken.value) {
      return navigate("/people");
    }
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      toast("Введите эл. адрес и пароль");
      return;
    }

    try {
      const res = await toast.promise(() => loginReq(email, password), {
        pending: "Загрузка...",
      });

      const { accessToken, user } = res.data;

      userGot(user);
      accessTokenGot(accessToken);
    } catch (error) {
      toast.error(error?.response?.data || "Что-то пошло не так");
    }
  };

  const register = async (email, password, name, birthdate, gender, avatar) => {
    if (!email || !password || !name) {
      toast.error("Введите эл. адрес, пароль и имя");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Введите корректный эл. адрес");
      return;
    }

    if (password.length < 8) {
      toast.error("Длина пароли от 8 символов");
      return;
    }

    if (name.length < 2) {
      toast.error("Длина имени от 2 символов");
      return;
    }

    try {
      const res = await toast.promise(
        () => registerReq(email, password, name, birthdate, gender),
        {
          pending: "Загрузка...",
        }
      );

      const { accessToken, user } = res.data;
      accessTokenGot(accessToken);

      if (!avatar) {
        userGot(user);
        navigate("/people");
        return;
      }

      const updateAvatarRes = await toast.promise(() => updateAvatar(avatar), {
        pending: "Сохраняем аватарку...",
      });

      const { user: updatedUser } = updateAvatarRes.data;

      userGot(updatedUser);
      navigate("/people");
    } catch (error) {
      toast.error(error?.response?.data || "Что-то пошло не так");
    }
  };

  return (
    <div className="container auth-container">
      <LoginCard login={login} />
      <RegisterCard register={register} />
    </div>
  );
};

const mapStateToProps = ({ accessToken }) => ({
  accessToken,
});

const mapDispatchToProps = {
  accessTokenGot,
  userGot,
};

export default compose(
  withServer(({ login, register, updateAvatar }) => ({
    loginReq: login,
    registerReq: register,
    updateAvatar,
  })),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthContainer);
