import React from "react"
import * as O from "fp-ts/lib/Option"
import * as E from "fp-ts/lib/Either"
import PageLayout from "../components/layouts/PageLayout"
import CookieBanner from "../components/CookieBanner"
import Header from "../components/Header"
import Section from "../components/layouts/SectionLayout"
import { PageProps } from "gatsby"
import { useForm, Controller } from "react-hook-form"
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Alert from "@material-ui/lab/Alert"
import { sendEmail } from "../api"
import Column from "../components/Column"

type Inputs = {
  name: string
  email: string
  company?: string
  message: string
  privacyCheck: boolean
}

const schema = yup.object().shape({
  name: yup.string().required("Name is requred!"),
  email: yup.string().email().required("E-mail is requred!"),
  company: yup.string(),
  message: yup.string().required("Message is requred!"),
  privacyCheck: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions!"),
})

const useStyles = makeStyles((t) => ({
  field: {
    marginBottom: t.spacing(2),
  },
}))

const Contact: React.FC<PageProps> = () => {
  const classes = useStyles()

  const [loading, setLoading] = React.useState(false)

  const [submitState, setSubmitState] = React.useState<
    O.Option<E.Either<"fail", "success">>
  >(O.none)

  const { register, handleSubmit, errors, reset, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      privacyCheck: false,
    },
  })

  const onSubmit = ({ name, email, company, message }: Inputs) => {
    setLoading(true)

    sendEmail({ name, email, company: company ?? "", message })
      .then(() => {
        setLoading(false)
        setSubmitState(O.some(E.right("success")))
        setTimeout(() => {
          reset()
        }, 4000)
      })
      .catch((e) => {
        setLoading(false)
        setSubmitState(O.some(E.left("fail")))
      })
  }

  const isSuccess = O.isSome(submitState) && E.isRight(submitState.value)

  return (
    <>
      <Header />
      <PageLayout>
        <CookieBanner />

        <Section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Column className={classes.field}>
              <TextField
                disabled={loading || isSuccess}
                variant={"outlined"}
                name="name"
                label="name"
                inputRef={register}
              />
              {errors.name && (
                <Typography variant={"caption"} color={"error"}>
                  {errors.name?.message}
                </Typography>
              )}
            </Column>

            <Column className={classes.field}>
              <TextField
                disabled={loading || isSuccess}
                variant={"outlined"}
                name="email"
                label="email"
                inputRef={register}
              />

              {errors.email && (
                <Typography variant={"caption"} color={"error"}>
                  {errors.email?.message}
                </Typography>
              )}
            </Column>

            <Column className={classes.field}>
              <TextField
                disabled={loading || isSuccess}
                variant={"outlined"}
                name="company"
                label="company"
                inputRef={register}
              />
            </Column>

            <Column className={classes.field}>
              <TextField
                disabled={loading || isSuccess}
                variant={"outlined"}
                name="message"
                label="message"
                inputRef={register}
              />

              {errors.message && (
                <Typography variant={"caption"} color={"error"}>
                  {errors.message?.message}
                </Typography>
              )}
            </Column>

            <Column className={classes.field}>
              <Controller
                name="privacyCheck"
                control={control}
                render={({ onChange, value }) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                          disabled={loading || isSuccess}
                          color="primary"
                        />
                      }
                      label="Accept privacy policy"
                    />
                  )
                }}
              />

              {errors.privacyCheck && (
                <Typography variant={"caption"} color={"error"}>
                  {errors.privacyCheck?.message}
                </Typography>
              )}
            </Column>

            <Button
              type={"submit"}
              disabled={loading || isSuccess}
              variant={"outlined"}
            >
              {loading ? "sending message..." : "send"}
            </Button>
          </form>

          {O.isSome(submitState) && (
            <Snackbar
              open={O.isSome(submitState)}
              autoHideDuration={isSuccess ? 4000 : null}
              onClose={() => setSubmitState(O.none)}
            >
              <Alert
                elevation={6}
                variant="filled"
                onClose={() => setSubmitState(O.none)}
                severity={isSuccess ? "success" : "error"}
              >
                {isSuccess
                  ? "Your message was correctly delivered."
                  : "There was a problem sending your message! Please try again."}
              </Alert>
            </Snackbar>
          )}
        </Section>
      </PageLayout>
    </>
  )
}

export default Contact
