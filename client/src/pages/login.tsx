import { NextPage } from "next";
import LoginForm from "../components/login/LoginForm";
import LoginButton from "../components/login/LoginButton";

const Login: NextPage = () => {
  return (
    <div>
      <LoginForm />
      <LoginButton />
    </div>
  );
};

export default Login;
