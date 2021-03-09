const getRestaurants = <T>(url: string, fetch: (url: RequestInfo) => Promise<T>): Promise<T> => fetch(url);

export default getRestaurants;
