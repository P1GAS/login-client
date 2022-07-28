import { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
} from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Option } = Select;

const RegisterCard = ({ register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [avatar, setAvatar] = useState();

  const clickHandler = () => {
    register(email, password, name, birthdate, gender, avatar);
  };

  const onDateChange = (date) => {
    setBirthdate(Date.parse(date._d));
  };

  const onGenderChange = (gender) => setGender(gender);

  const onAvatarUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      toast("Выберите картинку формата jpeg или png");
      return false;
    }

    setAvatar(file);

    return false;
  };

  const disabledDate = (currentDate) => {
    return Date.parse(currentDate._d) > Date.now();
  };

  return (
    <Card className="auth-card">
      <Title level={4}>Зарегистрироваться</Title>
      <Form className="auth-form">
        <Upload
          name="avatar"
          listType="picture-card"
          beforeUpload={onAvatarUpload}
          maxCount={1}
        >
          {avatar ? "Поменять аватарку" : "Загрузить аватарку"}
        </Upload>
        <Input
          required
          autoComplete="email"
          type="text"
          placeholder="Эл. адрес"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          autoComplete="new-password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          required
          autoComplete="username"
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <DatePicker
          onChange={onDateChange}
          disabledDate={disabledDate}
          locale={locale}
          placeholder="Выберите дату рождения"
        />
        <Select defaultValue="male" value={gender} onChange={onGenderChange}>
          <Option value="male">Мужчина</Option>
          <Option value="female">Женщина</Option>
        </Select>
        <Button type="primary" onClick={clickHandler}>
          Зарегистрироваться
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterCard;
