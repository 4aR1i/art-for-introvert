import axios from "axios";
import { IServiceConfig } from "@/shared/types";
import { ICommentService } from "@/shared/types";
import { IComment } from "@/shared/types";

export class CommentService implements ICommentService {
  apiServerRelativeUrl: string;
  apiServicePath: string;

  constructor(config: IServiceConfig) {
    this.apiServerRelativeUrl = config.apiServerRelativeUrl;
    this.apiServicePath = config.apiServicePath;
  }

  async getAll() {
    const apiResponse = await axios.get<IComment[]>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`);
    return apiResponse.data;
  }

  async getById(itemId: number) {
    const apiResponse = await axios.get<IComment>(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`);
    return apiResponse.data;
  }

  async getByPostId(itemId: number) {
    const apiResponse = await axios.get<IComment[]>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`, {
      params: {
        postId: itemId,
      },
    });
    return apiResponse.data;
  }

  async create(item: IComment) {
    const apiResponse = await axios.post<IComment>(`${this.apiServerRelativeUrl}/${this.apiServicePath}`, item);
    return apiResponse.data;
  }

  async update(itemId: number, item: IComment) {
    const apiResponse = await axios.put<IComment>(
      `${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`,
      item,
    );
    return apiResponse.data;
  }

  async delete(itemId: number) {
    await axios.delete(`${this.apiServerRelativeUrl}/${this.apiServicePath}/${itemId}`);
  }
}
