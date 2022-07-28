import { Button, Card, Form, Input, Typography, Upload } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const { Title } = Typography;

const UpdateProfileForm = ({ updateProfile, oldName }) => {
  const [name, setName] = useState(oldName || "");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const clickHandler = () => {
    updateProfile(name, prevPassword, newPassword, avatar);
  };

  const onAvatarUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      toast("Выберите картинку формата jpeg или png");
      return false;
    }

    setAvatar(file);

    return false;
  };

  return (
    <Card className="current-user-card">
      <Title level={4}>Обновить профиль</Title>
      <Form className="auth-form">
        <Upload
          name="avatar"
          listType="picture-card"
          beforeUpload={onAvatarUpload}
          maxCount={1}
        >
          Загрузить новую аватарку
        </Upload>
        <Input
          required
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Title level={5}>
          Для обновления пароля необходимо ввести предыдущий и новый пароль
        </Title>
        <Input
          required
          type="password"
          placeholder="Предыдущий пароль"
          value={prevPassword}
          onChange={(e) => setPrevPassword(e.target.value)}
        />
        <Input
          required
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button type="primary" onClick={clickHandler}>
          Обновить
        </Button>
      </Form>
    </Card>
  );
};

export default UpdateProfileForm;
