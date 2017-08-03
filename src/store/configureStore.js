import prod from './configureStore.prod';
import dev from './configureStore.dev';

export default process.env.NODE_ENV === 'production' ? prod : dev;
