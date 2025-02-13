const API_BASE = "http://localhost:3001/api"; // Change for production

export async function fetchPigs() {
  const res = await fetch(`${API_BASE}/pigs`);
  return res.json();
}

export async function fetchPostureData(batchId) {
  const res = await fetch(`${API_BASE}/pigs/posture?batch=${batchId}`);
  return res.json();
}

export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
}