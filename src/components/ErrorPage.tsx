import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer, Menu } from '../navigation';

/**
 * Error page
 *
 * @constructor
 */
export const ErrorPage = () => {
  const error = useRouteError();

  // log effect
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Menu name={'Pets'} />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>An unexpected error has occurred.</p>
      </div>
      <Footer />
    </>
  );
};
