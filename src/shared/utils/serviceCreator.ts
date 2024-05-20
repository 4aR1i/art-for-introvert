import { CommentService, PostService, UserService } from "@/shared/services";
import { ICommentService, IPostService, IUserService } from "@/shared/types";


export class ServiceCreator {
  userServiceFactory(): IUserService {
    return new UserService({
      apiServerRelativeUrl: "https://jsonplaceholder.typicode.com",
      apiServicePath: "users",
    });
  }
  postServiceFactory(): IPostService {
    return new PostService({
      apiServerRelativeUrl: "https://jsonplaceholder.typicode.com",
      apiServicePath: "posts",
    });
  }
  commentServiceFactory(): ICommentService {
    return new CommentService({
      apiServerRelativeUrl: "https://jsonplaceholder.typicode.com",
      apiServicePath: "comments",
    });
  }
}
