const BASE_URL = 'http://192.168.100.222:3000';

// ── MEMBERS ──
export async function fetchMember(pin: string) {
  const res = await fetch(`${BASE_URL}/members/${pin}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function fetchMemberFull(pin: string) {
  const res = await fetch(`${BASE_URL}/members/${pin}/full`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function fetchAllMembers() {
  const res = await fetch(`${BASE_URL}/members`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function addMember(data: object) {
  const res = await fetch(`${BASE_URL}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

export async function updateMember(pin: string, data: object) {
  const res = await fetch(`${BASE_URL}/members/${pin}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

// ── DEPENDENTS ──
export async function fetchDependents(pin: string) {
  const res = await fetch(`${BASE_URL}/members/${pin}/dependents`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function addDependent(pin: string, data: object) {
  const res = await fetch(`${BASE_URL}/members/${pin}/dependents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

// ── PROFESSIONS ──
export async function fetchProfessions() {
  const res = await fetch(`${BASE_URL}/professions`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}