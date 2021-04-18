import { fold } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/pipeable"
import * as D from "io-ts/lib/Decoder"
import * as nodemailer from "nodemailer"
import * as nodemailerSendgrid from "nodemailer-sendgrid"

const Payload = D.struct({
  name: D.string,
  email: D.string,
  company: D.string,
  message: D.string,
})

export const handler = async function (event) {
  return pipe(
    Payload.decode(JSON.parse(event.body)),
    fold(
      (e) =>
        Promise.resolve({
          statusCode: 500,
          body: JSON.stringify({
            event,
            msg: JSON.stringify({
              msg: D.draw(e),
            }),
          }),
        }),
      (data) => {
        let transporter = nodemailer.createTransport(
          nodemailerSendgrid({
            apiKey: process.env.SENGRID_KEY, // this must be set in netlify backoffice -> site settings -> build & deploy -> environment
          })
        )

        return transporter
          .sendMail({
            from: "website@__template__website__name.com",
            to: "__template__website__name@gmail.com",
            subject: "new message from contact form!",
            html: `<div>
              <h2>New contact from website!</h2>
              <div>
                <strong>${data.name}</strong>${
              data.company ? ` from <strong>${data.company}</strong>` : ""
            } said this: <br><br>
                <div style="font-style: italic;">"${data.message}"</div>
                <br><br>
                <div>you can contat him back at ${data.email}</div>.
              </div>
            <div>`,
          })
          .then(() => {
            return transporter.sendMail({
              from: "website@__template__website__name.com",
              to: data.email,
              subject: "message deliverd to Federico Sordillo",
              html: `<div>
                <h2>Thank you for contacting me!</h2>
                <div>
                  Hi <strong>${data.name}</strong>,
                  <br><br>
                  Thank you for contacting me, I'll asnwer you back as soon as possible :)
                  <br><br>
                  <h3>Your message:</h3>
                  <div style="font-style: italic;">"${data.message}"</div>
                </div>
              <div>`,
            })
          })
          .then((r) => {
            console.log("message sent: ", r.toJSON())

            return {
              statusCode: 200,
              event: null,
              body: JSON.stringify({
                msg: "email sent.",
              }),
            }
          })
          .catch((e) => {
            console.log(
              "error sending the message: ",
              e?.response?.body?.errors
            )

            return {
              statusCode: 500,
              event: null,
              body: JSON.stringify({
                msg: "error sending the message: " + e?.response?.body?.errors,
              }),
            }
          })
      }
    )
  )
}
