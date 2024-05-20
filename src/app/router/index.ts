import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import UsersView from "@/app/views/UsersView";
import PostView from "@/app/views/PostView";

const base = import.meta.env.BASE_URL;

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        {
          path: "/",
          Component: UsersView,
        },
        {
          path: "message/:postId",
          Component: PostView,
        },
      ],
    },
  ],
  {
    basename: base,
  },
);

export default router;
