export default class FetchData {
  async getData(url) {
    let response = await fetch(`${url}`);
    response = await response.json();
    return response;
  }
}
