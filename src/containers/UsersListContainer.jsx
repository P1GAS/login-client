import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { compose, withServer } from "hoc";
import UsersListPage from "pages/UsersListPage";

const UsersListContainer = ({ getUsersReq }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await toast.promise(getUsersReq, {
          pending: "Загружаем пользователей...",
        });
        const { users } = res.data;

        setUsers(users);
      } catch (error) {}
    })();
  }, []);

  return <UsersListPage users={users} />;
};

export default compose(
  withServer(({ getUsers }) => ({
    getUsersReq: getUsers,
  }))
)(UsersListContainer);
