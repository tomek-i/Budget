import { useFetch } from '../../../hooks/useFetch';
interface WithFetchedDataProps {
  //isLoading: boolean;
  url: string;
}
/**
 * When you are fetching some data with an http request, you could show a spinner for indication.
 * This can be done with the withLoading HOC below.
 * @param Component
 * @returns
 */
export const withFetchedData =
  <P extends object>(
    Component: React.ComponentType<P>,
  ): React.FC<P & WithFetchedDataProps> =>
  (props: WithFetchedDataProps) => {
    const { loading, data, error } = useFetch(props.url);
    //TODO:??? wonder how to combine this HOC with loading HOC and the fetch hook
    return <></>;
  };
