import { useContext } from 'react';

interface WithRoleProps {
  role: string;
}
/**
 * When you’ve an application with authentication, only the content must be shown were you are authorized for.
 * This could be a button or menu item, but also a page.
 * For this Higher-Order Component I’ve used the React Context API to get the current user.
 * @param Component
 * @returns
 */
export const withRole =
  <P extends object>(
    Component: React.ComponentType<P>,
  ): React.FC<P & WithRoleProps> =>
  (props: WithRoleProps) => {
    const user = useContext(UserContext);
    if (user.hasRole(props.role)) {
      <Component {...(props as P)} />;
    }
    return <></>;
  };
