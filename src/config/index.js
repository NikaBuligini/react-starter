import prod from './config.prod';
import dev from './config.dev';

export default process.env.NODE_ENV === 'production' ? prod : dev;
