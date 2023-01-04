import axios from 'axios'

export default {
  fetchUsers() {
    return axios
      .get('https://mocki.io/v1/3990d69e-ea46-4957-aca0-3ece113a8b20')
      .then((response) => response.data)
      .catch((error) => error);
  }
}
