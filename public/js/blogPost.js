console.log("In the blogs.js file");

const getText = () => {
  const comment_text = document.querySelector("#comment-text").value;
  return comment_text;
};

const getId = () => {
  const post_id = document.querySelector("#post-id").innerText;
  return post_id;
};

const createComment = async () => {
  try {
    const comment_text = await getText();
    const post_id = await getId();
    const response = await fetch("/api/user/comment", {
      method: "POST",
      body: JSON.stringify({ post_id, comment_text }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("this is the response", response);
    if (response.ok) {
      alert("Comment Added!");
      document.location.replace(`/blog/${post_id}`);
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("#comment-btn").addEventListener("click", createComment);
