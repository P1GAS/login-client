import { useState } from "react";
import { Card, Typography, Form, Input, Button } from "antd";

const { Title } = Typography;

const LoginCard = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    login(email, password);
  };

  return (
    <Card className="auth-card auth-login-card">
      <Title level={4}>Войти</Title>
      <Form className="auth-form">
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
          autoComplete="current-password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" onClick={submit}>
          Войти
        </Button>
      </Form>
    </Card>
  );
};

export default LoginCard;
