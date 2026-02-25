import { Aclonica } from "next/font/google";
import LoginForm from "../_components/loginForm";

const aclonica = Aclonica({
  subsets: ["latin"],
  weight: "400",
});

const loginPage = () => {
  return <LoginForm />;
};

export default loginPage;
