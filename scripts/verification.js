async function onVerify(token) {
  const res = await fetch("/.netlify/functions/verify-turnstile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  const data = await res.json();
  if (data.success) {
    window.location.href = "intro.html";
  } else {
    alert("Verification failed: " + (data.errors || "please try again."));
  }
}
