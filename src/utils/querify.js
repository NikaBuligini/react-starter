// @flow

type QueryParams = {
  [key: string]: string | number,
};

export default function querify(endpoint: string, queryParams: QueryParams) {
  const query = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  return `${endpoint}?${query}`;
}
