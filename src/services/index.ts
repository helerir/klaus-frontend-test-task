import axios from "axios";

export default {
  async fetchUsers() {
    return await axios
      .get("https://mocki.io/v1/a1968883-6699-4242-be04-9d62d4accf60")
      .then((response) => response.data)
      .catch((error) => error);
  },
};
