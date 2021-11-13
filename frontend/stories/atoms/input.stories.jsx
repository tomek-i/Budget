import Input from "../../src/components/atoms/Input";

export default {
  title: "Atoms/Input",
  component: Input,
};

export const DefaultInput = () => <Input />;
export const TextInput = () => <Input type="text" value="123 abcd" />;
export const PasswordInput = () => <Input type="password" value="123 abcd" />;
export const NumberInput = () => <Input type="number" value="123" />;
export const InputWithLabel = () => <Input label="My Textbox Label" />;
