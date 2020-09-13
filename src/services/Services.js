import {
  httpGet,
} from "./ajaxService";

export class Services {
  static async loadConfig() {
    return await httpGet("/master-data");
  }

  static async getUsers() {
    return await httpGet("/users");
  }
}