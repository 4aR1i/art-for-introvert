import React from "react";
import { Typography, Button, Flex, Input, Divider, Skeleton, Spin, message } from "antd";
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { usePost } from "@/app/hooks/usePost";
import { useComment } from "../hooks/useComment";
import { useAppDispatch } from "@/app/store/hooks";
import { clearPostState } from "@/app/store/slices/post/postSlice";
import { IPost } from "@/shared/types";

const { Title, Paragraph, Text, Link: LinkAntd } = Typography;
const { TextArea } = Input;

const PostView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const { loadingPosts, postById, success, error, handleGetPostById, handleUpdatePost } = usePost();
  const { loadingComments, commentsByPost, handleGetCommentsByPostId } = useComment();

  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [post, setPost] = React.useState<IPost>();

  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    handleGetPostById(Number(postId));

    return () => {
      dispatch(clearPostState());
    };
  }, []);

  React.useEffect(() => {
    if (postById) {
      setPost({ ...postById });
      handleGetCommentsByPostId(postById.id);
    }
  }, [postById]);

  React.useEffect(() => {
    if (success) {
      showMessage(success);
    }
  }, [success]);

  function toggleEdit() {
    setIsEdit((prev) => !prev);
  }

  function showMessage(text: string) {
    messageApi.open({
      type: "success",
      content: text,
    });
  }

  function savePost(postId: number, post: IPost) {
    handleUpdatePost(postId, post);
    toggleEdit();
  }

  if (error) {
    return (
      <>
        <Title level={2}>{error.text}</Title>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <Button style={{ marginBottom: "16px" }}>
        <LeftOutlined />
        <span>
          <Link to={"/"}>Вернуться к списку</Link>
        </span>
      </Button>
      {post && (
        <>
          <Title level={2}>Пост #{post.id}</Title>
          {loadingPosts ? (
            <div className="preloader-container">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#fff566" }} spin />} />
            </div>
          ) : (
            <Paragraph>
              <pre>
                <Flex vertical gap="small">
                  <Flex justify="space-between" align="center" gap="small">
                    {isEdit ? (
                      <Input
                        value={post.title}
                        onChange={(e) => setPost((prev) => prev && { ...prev, title: e.target.value })}
                      />
                    ) : (
                      <>
                        <Text strong>{post.title}</Text>
                        <Button type="text" size="small" onClick={toggleEdit}>
                          <EditOutlined />
                        </Button>
                      </>
                    )}
                  </Flex>
                  {isEdit ? (
                    <TextArea
                      rows={4}
                      value={post.body}
                      onChange={(e) => setPost((prev) => prev && { ...prev, body: e.target.value })}
                    />
                  ) : (
                    <Text>{post.body}</Text>
                  )}
                </Flex>
              </pre>
              {isEdit && (
                <Flex justify="flex-end" gap="small">
                  <Button onClick={toggleEdit}>Отменить</Button>
                  <Button type="primary" onClick={() => savePost(post.id, post)}>
                    Сохранить
                  </Button>
                </Flex>
              )}
            </Paragraph>
          )}
          <Title level={3} style={{ marginTop: "48px" }}>
            Комментарии:
          </Title>
          <Divider style={{ margin: "12px 0" }} />
          {loadingComments ? (
            <Skeleton active />
          ) : (
            commentsByPost[post.id] &&
            commentsByPost[post.id].map((comment) => (
              <Paragraph key={comment.id}>
                <Flex vertical gap="small">
                  <LinkAntd>{comment.email}</LinkAntd>
                  <Text strong>{comment.name}</Text>
                  <Text>{comment.body}</Text>
                </Flex>
                <Divider />
              </Paragraph>
            ))
          )}
        </>
      )}
    </>
  );
};

export default PostView;
