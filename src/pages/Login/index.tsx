import { lazy } from "react";
import LoginContent from "../../content/LoginContent.json";

const Login = lazy(() => import("../../components/Login"));
const Container = lazy(() => import("../../common/Container"));

const HomeLogin = () => {
  return (
    <Container>
      <Login
        title={LoginContent.title}
        content={LoginContent.text}
        id="login"></Login>
    </Container>
  );
};

export default HomeLogin;
