console.log("In the blogs.js file");

// get the comment text
const getText = () => {
  const comment_text = document.querySelector("#comment-text").value;
  return comment_text;
};

// getting the id from the hidden post_id element
const getId = () => {
  const post_id = document.querySelector("#post-id").innerText;
  return post_id;
};

// function for creating a comment
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

// function for deleting a post
const deletePost = async () => {
  try {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const post_id = await getId();
      console.log("This is post_id", post_id);
      const response = await fetch(`/api/user/blog/${post_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        document.location.replace("/dashboard");
        alert("Post Deleted!");
      } else {
        alert("Failed to delete post.");
      }
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

// gets the information for specific blog to be edited
const getBlog = async () => {
  try {
    const post_id = document.querySelector("#post-id").innerText;
    const blogData = await fetch(`/api/user/blog/${post_id}`, {
      method: "GET",
    });
    const blog = await blogData.json();
    console.log("This is blog", blog);
    return blog;
  } catch (err) {
    console.log(err);
  }
};

// puts the information from getBlog into the elements on the page to be edited
const populateEditFields = async () => {
  try {
    const blog = await getBlog();
    const blogTitle = document.querySelector("#blog-title");
    const blogTopic = document.querySelector("#blog-topic");
    const blogText = document.querySelector("#blog-text");
    console.log("This is the blog", blog);

    blogTitle.value = blog.post_title;
    blogTopic.value = blog.post_topic;
    blogText.innerText = blog.post_content;
  } catch (err) {
    console.log(err);
  }
};

// saves the edited blog
const saveBlogEdit = async () => {
  const post_id = document.querySelector("#post-id").innerText;
  const blogTitle = document.querySelector("#blog-title");
  const blogTopic = document.querySelector("#blog-topic");
  const blogText = document.querySelector("#blog-text");

  const response = await fetch(`/api/user/blog/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_title: blogTitle.value,
      post_topic: blogTopic.value,
      post_content: blogText.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);
  if (response.ok) {
    document.location.replace("/dashboard");
    alert("Post Updated!");
  } else {
    alert("Failed to update post.");
  }
};

document.querySelector("#comment-btn").addEventListener("click", createComment);
document
  .querySelector("#edit-btn")
  .addEventListener("click", populateEditFields);
document.querySelector("#delete-btn").addEventListener("click", deletePost);
document.querySelector("#submit-btn").addEventListener("click", saveBlogEdit);
