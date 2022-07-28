import Header from "components/Header";
import UserListItem from "components/UsersListItem";

const UsersListPage = ({ users }) => {
  return (
    <>
      <Header />
      <div className="container user-list-page-container">
        {users.map((user) => {
          return (
            <div key={user._id} className="user-list-item-container">
              <UserListItem user={user} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersListPage;
