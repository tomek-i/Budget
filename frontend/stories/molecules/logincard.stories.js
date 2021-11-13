import LoginCard from "../../src/components/molecules/LoginCard";

export default {
  title: "Molecules/LoginCard",
  component: LoginCard,
};

export const DefaultLoginCard = () => (
  <LoginCard signUpLink="" forgotPasswordLink="" />
);
export const LoginCardWithTitle = () => (
  <LoginCard title="Login" signUpLink="" forgotPasswordLink="" />
);
