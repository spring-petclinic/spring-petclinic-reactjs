import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Error page
 *
 * @constructor
 */
export default function ErrorPage() {
  const error = useRouteError();

  // log effect
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
