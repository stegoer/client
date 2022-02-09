import { NextPage } from "next";
import LoginForm from "../components/login/LoginForm";
import LoginButton from "../components/login/LoginButton";
import { Title } from "@mantine/core";

const Login: NextPage = () => {
  return (
    <>
      <Title>Login</Title>
      <div>
        <LoginForm />
        <LoginButton />
      </div>
    </>
  );
};

export default Login;
