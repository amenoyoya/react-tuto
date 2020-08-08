import App from './components/App';
import {Helmet} from 'react-helmet-async';

export default () => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Movie Search by hooked</title>
      </Helmet>
      <App />
    </>
  );
}