const signupFormHandler = async function (event) {
  event.preventDefault();

  const passwordEl = document.querySelector("#password");
  const emailEl = document.querySelector("#email");
  const usernameEl = document.querySelector("#username");

  console.log(passwordEl.value, emailEl.value);

  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value,
      email: emailEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
    alert("New User Added!");
  } else {
    alert("Failed to sign up");
  }
};

const loginRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/login");
};

document
  .querySelector("#signup-btn")
  .addEventListener("click", signupFormHandler);
