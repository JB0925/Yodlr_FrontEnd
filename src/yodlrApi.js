import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3001";

class YodlrApi {
  static async getAllUsers() {
    try {
      const result = await axios.get(`${BASE_URL}/users`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(user) {
    try {
      const result = await axios.post(`${BASE_URL}/users`, user);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneUser(id) {
    try {
      const result = await axios.get(`${BASE_URL}/users/${id}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(id) {
    try {
      const userToUpdate = await YodlrApi.getOneUser(id);
      if (!userToUpdate) throw new Error("User not found.");

      userToUpdate.state = "active";
      const result = await axios.put(`${BASE_URL}/users/${id}`, userToUpdate);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(user) {
    try {
      const result = await axios.post(`${BASE_URL}/users/${user.id}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default YodlrApi;
