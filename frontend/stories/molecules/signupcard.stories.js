import SignupCard from '../../src/components/molecules/SignupCard';

export default {
  title: 'Molecules/SignupCard',
  component: SignupCard,
};

export const DefaultLoginCard = () => <SignupCard loginLink="" />;
export const LoginCardWithTitle = () => (
  <SignupCard title="Signup" loginLink="" />
);
