import axios from "axios";

export async function fetchUserData(username) {
  const name = username.trim();
  if (!name) {
    throw new Error("No username");
  }

  const response = await axios.get(
    `https://api.github.com/users/${name}`
  );

  return response.data;
}