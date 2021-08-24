import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link href='/p/[id]' as={`/p/${post.id}`}>
      <div className="p-8">
        <h2 className="text-2xl mb-6 font-bold mt-6">{post.title}</h2>
        <small className="mb-4 block text-sm">By {authorName}</small>
        <ReactMarkdown source={post.content} />
      </div>
    </Link>
  );
};

export default Post;
