// Use native fetch

async function run() {
  const email = `test-${Date.now()}@example.com`;
  
  console.log("Registering...", email);
  const regRes = await fetch("https://focusly-osxv.onrender.com/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "tester", email, password: "password123!" })
  });
  console.log("Register:", regRes.status, await regRes.text());

  console.log("Logging in...");
  const loginRes = await fetch("https://focusly-osxv.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password123!" })
  });
  
  if (!loginRes.ok) {
    console.log("Login failed:", loginRes.status, await loginRes.text());
    return;
  }
  
  const data = await loginRes.json();
  const token = data.token;
  console.log("Token received:", token);

  console.log("Fetching /api/profile/dna...");
  const dnaRes = await fetch("https://focusly-osxv.onrender.com/api/profile/dna", {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Origin": "https://focusly-ecru.vercel.app"
    }
  });
  console.log("Testing token endpoint...");
  const testRes = await fetch("https://focusly-osxv.onrender.com/api/auth/test-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });
  console.log("Test token status:", testRes.status);
  console.log("Test token body:", await testRes.text());
}
run();
