import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export async function fetchUserData(username) {
  const name = username.trim();
  if (!name) throw new Error("No username");

  const res = await api.get(`/users/${encodeURIComponent(name)}`);
  return res.data;
}

export async function searchUsers({ username, location, minRepos, page = 1 }) {
  const terms = [];

  const name = (username || "").trim();
  if (name) terms.push(name);

  const loc = (location || "").trim();
  if (loc) terms.push(`location:${loc}`);

  const repos = String(minRepos || "").trim();
  if (repos) terms.push(`repos:>=${repos}`);

  if (terms.length === 0) throw new Error("Empty search");

  const q = terms.join(" ");

  const res = await api.get("/search/users", {
    params: { q, per_page: 10, page },
  });

  return res.data;
}

export async function fetchUserDetails(login) {
  const res = await api.get(`/users/${encodeURIComponent(login)}`);
  return res.data;
}