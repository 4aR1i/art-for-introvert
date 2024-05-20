import axios from "axios";
import { IServiceConfig } from "@/shared/types";
import { IPostService } from "@/shared/types";
import { IPost } from "@/shared/types";

export class PostService implements IPostService {
  apiServerRelativeUrl: string;
  apiServicePath: string;

  constructor(config: IServiceConfig) {
    this.apiServerRelativeUrl = config.apiServerRelativeUrl;
    this.apiServicePath = config.apiServicePath;
  }

  async getAll() {
    const apiResponse = await axios.get<IPost[]>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`);
    return apiResponse.data;
  }

  async getById(itemId: number) {
    const apiResponse = await axios.get<IPost>(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`);
    return apiResponse.data;
  }

  async getByUserId(itemId: number) {
    const apiResponse = await axios.get<IPost[]>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`, {
      params: {
        userId: itemId,
      },
    });
    return apiResponse.data;
  }

  async create(item: IPost) {
    const apiResponse = await axios.post<IPost>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`, item);
    return apiResponse.data;
  }

  async update(itemId: number, item: IPost) {
    const apiResponse = await axios.put<IPost>(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`, item);
    return apiResponse.data;
  }

  async delete(itemId: number) {
    await axios.delete(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`);
  }
}
