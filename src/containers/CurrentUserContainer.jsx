import { connect } from "react-redux";
import { toast } from "react-toastify";

import CurrentUserPage from "pages/CurrentUserPage";
import { compose, withServer } from "hoc";
import { userGot } from "features/currentUser";

const CurrentUserContainer = ({
  currentUser,
  updateAvatar,
  updateProfileReq,
  userGot,
}) => {
  const updateProfile = async (name, prevPassword, newPassword, avatar) => {
    if (!name) {
      toast.error("Имя должно быть всегда");
      return;
    }

    if ((prevPassword && !newPassword) || (!prevPassword && newPassword)) {
      toast.error(
        "Для обновления пароля необходимо ввести предыдущий и новый пароль"
      );
      return;
    }

    try {
      const profileRes = await toast.promise(
        () => updateProfileReq(name, prevPassword, newPassword),
        {
          pending: "Сохраняем данные...",
        }
      );

      if (!avatar) {
        const { user } = profileRes.data;
        userGot(user);
        return;
      }

      const avatarRes = await toast.promise(() => updateAvatar(avatar), {
        pending: "Сохраняем аватарку...",
      });

      const { user } = avatarRes.data;

      userGot(user);
    } catch (error) {
      toast.error(error?.response?.data || "Что-то пошло не так");
    }
  };

  return (
    <CurrentUserPage user={currentUser.value} updateProfile={updateProfile} />
  );
};

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

const mapDispatchToProps = { userGot };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withServer(({ updateAvatar, updateProfile }) => ({
    updateAvatar,
    updateProfileReq: updateProfile,
  }))
)(CurrentUserContainer);
