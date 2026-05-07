const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API}/api${endpoint}`, { ...options, headers });
    
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    
    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(`API error: ${response.status} ${response.statusText} at ${endpoint}. ${errorBody}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network error: Backend server is unreachable. Please ensure the backend is running.");
    }
    throw error;
  }
}

export async function getTodayRevisions() {
  return fetchWithAuth("/review/today");
}

export async function updateRevision(conceptId: string, answerQuality: string) {
  return fetchWithAuth("/review/update", {
    method: "POST",
    body: JSON.stringify({ conceptId, answerQuality }),
  });
}

export async function getLearningDna() {
  return fetchWithAuth("/profile/dna");
}

export async function getAdaptivePlan(mood: string) {
  return fetchWithAuth("/session/mood", {
    method: "POST",
    body: JSON.stringify({ mood }),
  });
}

export async function getMoodHistory() {
  return fetchWithAuth("/session/history");
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Login failed");
  }
  return response.json();
}

export async function register(username: string, email: string, password: string) {
  const response = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Registration failed");
  }
  return response.json();
}

export async function getPaths() {
  return fetchWithAuth("/paths");
}

export async function getQuiz(conceptId: string) {
  return fetchWithAuth(`/quiz/concept/${conceptId}`);
}

export async function submitQuiz(questionId: string, answer: string, timeSpent: number) {
  return fetchWithAuth("/quiz/submit", {
    method: "POST",
    body: JSON.stringify({ questionId, answer, timeSpent }),
  });
}

// --- Smart Notes APIs ---

export async function getNotes() {
  return fetchWithAuth("/notes");
}

export async function getNote(id: string) {
  return fetchWithAuth(`/notes/${id}`);
}

export async function searchNotes(query: string) {
  return fetchWithAuth(`/notes/search?q=${encodeURIComponent(query)}`);
}

export async function createNote(title: string, content: string) {
  return fetchWithAuth("/notes", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
}

export async function updateNote(id: string, title: string, content: string) {
  return fetchWithAuth(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
}

export async function deleteNote(id: string) {
  return fetchWithAuth(`/notes/${id}`, {
    method: "DELETE",
  });
}

export async function summarizeNote(id: string) {
  return fetchWithAuth(`/notes/${id}/summarize`, {
    method: "POST",
  });
}

export async function uploadNote(file: File) {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API}/api/notes/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
  
  if (!response.ok) {
    throw new Error("Failed to upload note");
  }
  return response.json();
}
