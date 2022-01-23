import axios from "axios";

// const BASE_URL = process.env.BASE_URL || "api:5000";
const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.BASE_URL
    : process.env.REACT_APP_ENV === "docker"
    ? "/users"
    : "http://127.0.0.1:5000/users";
console.log(process.env.REACT_APP_ENV);
/**
 * YodlrApi
 *
 * A class used to abstract much of the axios logic away from
 * the components. Simply calls the backend api and returns the
 * data from it.
 */
class YodlrApi {
  static async getAllUsers() {
    try {
      const result = await axios.get(BASE_URL);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(user) {
    try {
      const result = await axios.post(BASE_URL, user);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneUser(id) {
    try {
      const result = await axios.get(`${BASE_URL}/${id}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(id, user) {
    try {
      const userToUpdate = await YodlrApi.getOneUser(id);
      if (!userToUpdate) throw new Error("User not found.");

      user.state = "active";
      user.id = id;
      const result = await axios.put(`${BASE_URL}/${id}`, user);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(user) {
    try {
      const result = await axios.delete(`/users/${user.id}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default YodlrApi;
