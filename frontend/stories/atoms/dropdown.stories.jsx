import Dropdown from '../../src/components/atoms/Dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
};

export const DefaultDropdown = () => <Dropdown />;
export const DropdownWithItems = () => (
  <Dropdown items={['One', 'Two', 'Three']} />
);
