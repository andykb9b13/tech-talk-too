console.log("In the blogs.js file");

const getComments = async () => {
  await fetch("/api/user/comment", {
    method: "GET",
  });
};
