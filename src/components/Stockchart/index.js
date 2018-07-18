import Loadable from 'react-loadable';
import LoadingIndicator from '../LoadingIndicator';

const LoadableComponent = Loadable({
  loader: () => import('./Stockchart'),
  loading: LoadingIndicator,
});

export default LoadableComponent;
