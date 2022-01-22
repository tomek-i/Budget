import Card from "../../src/components/atoms/Card";
import Button from "../../src/components/atoms/Button";

export default {
  title: "Atoms/Card",
  component: Card,
};

export const DefaultCard = () => <Card />;
export const CardWithHeading = () => <Card title="My Card Title" />;
export const CardWithChildren = () => (
  <Card title="My Card Title">
    <Button text="test" />
  </Card>
);
