import { Card, Typography } from "antd";

import genderObj from "helpers/genderObj";
import getFormatedDate from "helpers/getFormatedDate";

const { Title, Text } = Typography;

const UsersListItem = ({ user }) => {
  return (
    <Card
      hoverable
      className="users-list-item-card"
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
  );
};

export default UsersListItem;
