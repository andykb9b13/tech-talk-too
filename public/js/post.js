const postFormHandler = async function (event) {
  event.preventDefault();

  const blogEl = document.querySelector("#blog-text");
  const blogTitleEl = document.querySelector("#blog-title");

  console.log(
    "This is blogTitleEl. value and blogEl.value",
    blogTitleEl.value,
    blogEl.value
  );

  const response = await fetch("/api/user/blog", {
    method: "POST",
    body: JSON.stringify({
      post_title: blogTitleEl.value,
      post_content: blogEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
    alert("Post Created!");
  } else {
    alert("Failed to create post");
  }
};

const homepageRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/");
};

document
  .querySelector("#submit-btn")
  .addEventListener("click", postFormHandler);
