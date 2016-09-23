export const url = (path: string): string => `http://localhost:8080/${path}`;

/**
 * path: relative PATH without host and port (i.e. '/api/123')
 * data: object that will be passed as request body
 * onSuccess: callback handler if request succeeded. Succeeded means it could technically be handled (i.e. valid json is returned)
 * regardless of the HTTP status code.
 */
export const submitForm = (path: string, data: any, onSuccess: (status: number, response: any) => void) => {
  const requestUrl = url(path);
  const fetchParams = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  console.log('Submitting to ' + requestUrl);
  fetch(requestUrl, fetchParams)
    .then(response => response.json().then(result => onSuccess(response.status, result)));
};
