

function Post({ posts }) {
  return (
    <>
      <h1>
        {posts.id} {posts.title}
      </h1>
    </>
  );
}

export default Post;

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  /* const paths = data.map((post) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  }); */

  return {
    paths: [
      {
        params: {
          postId: "1",
        },
      },
      {
        params: {
          postId: "2",
        },
      },
      {
        params: {
          postId: "3",
        },
      },
    ],
    fallback: 'blocking',
    /*   paths,
    fallback: false, */
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  console.log(`Generated page for /posts/${params.postId}`);

  return {
    props: {
      posts: data,
    },
  };
}
