import axios from "axios";
import { IServiceConfig } from "@/shared/types";
import { IUserService } from "@/shared/types";
import { IUser } from "@/shared/types";

export class UserService implements IUserService {
  apiServerRelativeUrl: string;
  apiServicePath: string;

  constructor(config: IServiceConfig) {
    this.apiServerRelativeUrl = config.apiServerRelativeUrl;
    this.apiServicePath = config.apiServicePath;
  }

  async getAll() {
    const apiResponse = await axios.get<IUser[]>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`);
    return apiResponse.data;
  }

  async getById(itemId: number) {
    const apiResponse = await axios.get<IUser>(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`);
    return apiResponse.data;
  }

  async create(item: IUser) {
    const apiResponse = await axios.post<IUser>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`, item);
    return apiResponse.data;
  }

  async update(itemId: number, item: IUser) {
    const apiResponse = await axios.put<IUser>(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`, item);
    return apiResponse.data;
  }

  async delete(itemId: number) {
    await axios.delete(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`);
  }
}
