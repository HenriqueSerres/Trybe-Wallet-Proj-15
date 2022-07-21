const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const fetchURL = await fetch(URL);
  const response = await fetchURL.json();
  return response;
};

export default fetchAPI;
