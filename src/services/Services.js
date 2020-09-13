import {
  httpGet,
} from "./ajaxService";

export class Services {
  static async loadConfig() {
    return await httpGet("/master-data");
  }

  static async getCustomers() {
    return await httpGet("/customers");
  }
}