export function fetchData(url, options) {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  });
}
