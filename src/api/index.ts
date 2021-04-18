interface SendEmail {
  name: string
  email: string
  company: string
  message: string
}

export const sendEmail = (data: SendEmail) =>
  fetch("/.netlify/functions/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
