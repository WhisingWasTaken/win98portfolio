export async function handler(event) {
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY; 
  const { token } = JSON.parse(event.body || "{}");

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: "No token provided" })
    };
  }

  const formData = new URLSearchParams();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData
    });
    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: result.success, errors: result["error-codes"] || [] })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
