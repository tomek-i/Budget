interface WithLoadingProps {
  isLoading: boolean;
}
/**
 * When you are fetching some data with an http request, you could show a spinner for indication.
 * This can be done with the withLoading HOC below.
 * @param Component
 * @returns
 */
export const withLoading =
  <P extends object>(
    Component: React.ComponentType<P>,
  ): React.FC<P & WithLoadingProps> =>
  (props: WithLoadingProps) => {
    return props.isLoading ? (
      <span>Is loading</span>
    ) : (
      <Component {...(props as P)} />
    );
  };
