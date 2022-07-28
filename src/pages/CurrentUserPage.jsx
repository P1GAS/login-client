import { Card, Typography } from "antd";

import genderObj from "helpers/genderObj";
import getFormatedDate from "helpers/getFormatedDate";
import Header from "components/Header";
import UpdateProfileForm from "components/UpdateProfileForm";

const { Title, Text } = Typography;

const CurrentUserPage = ({ user, updateProfile }) => {
  return (
    <>
      <Header />
      <div className="container current-user-card">
        <Card
          cover={
            user?.avatarUrl ? <img alt="аватарка" src={user.avatarUrl} /> : null
          }
        >
          <div>
            <Title level={5}>{user.email}</Title>
            <div>
              <Text>Имя:</Text> <Text>{user.name}</Text>
            </div>
            <div>
              <Text>Пол:</Text> <Text>{genderObj[user.gender]}</Text>
            </div>
            <div>
              <Text>Дата рождения:</Text>{" "}
              <Text>{getFormatedDate(user.birthdate)}</Text>
            </div>
          </div>
        </Card>
        <UpdateProfileForm oldName={user.name} updateProfile={updateProfile} />
      </div>
    </>
  );
};

export default CurrentUserPage;
