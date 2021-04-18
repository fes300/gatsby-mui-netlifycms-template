import {
  Backdrop,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core"
import * as React from "react"
import Row from "../Row"
import UnderlinedText from "../CustomTypography/UnderlinedText"

type Props = {
  open: boolean
  handleClose: () => void
}

const CookieModal: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={"gcs-ui-modal"}
      open={open}
      maxWidth={"lg"}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogTitle>
        <Row hAlign={"between"} vAlign={"center"} style={{ height: "100%" }}>
          <UnderlinedText>Cookie Policy</UnderlinedText>
          <IconButton onClick={handleClose}>
            <Typography variant={"h4"}>closeIcon</Typography>
          </IconButton>
        </Row>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant={"h4"} color={"primary"}>
          1. who collects your personal data
        </Typography>
        <Typography variant={"body1"}>
          Welcome to www.sitename.com (the "Site"). This Privacy Policy refers
          to the processing of data (hereinafter collectively, "Personal Data")
          provided to and/or collected during the visit to the Site by
          unregistered users. For further information and clarification on our
          Privacy Policy you could send us a request writing an email to
          info@email.com ‍1. WHO COLLECT YOUR PERSONAL DATASubject who collect
          and process the Personal Data, as data controllers (hereinafter "Data
          Controller" or "Controller") is:- name last name + address, for
          marketing and profiling purposes, contact: info@email.com. In order to
          fulfill technical issues connected to the Site, we (Data Controller)
          have appointed some data processors (hereinafter collectively
          "Processor") that process data on our behalf. These subjects were
          appointed because of their technical skills related to purposes and
          modalities of the processing, guarantees offered in relation to
          security measures adopted and in compliance to applicable data
          protection laws. These subjects are under our control and you could
          request a full list writing an email to info@email.com. ‍2. WHY WE
          COLLECT YOUR PERSONAL DATAThe information systems and software
          procedures relied upon to operate the Site acquire, as part of their
          standard functioning, personal data as part of the transmission of
          such data is an inherent feature of Internet communication protocols.
          Such information are not collected in order to relate it to identified
          data subjects, however it might allow user identification per se after
          being processed and matched with data held by third parties. The
          Personal Data includes: IP addresses and/or the domain names of the
          computers used by any user connecting with this website, the URI
          (Uniform Resource Identifier) addresses of the requested resources,
          the time of such requests, the method used for submitting a given
          request to the server, returned file size, a numerical code relating
          to server response status (successfully performed, error, etc.), other
          parameters related to the user’s operating system and computer
          environment, data related to browsing behavior of the user on the
          Site, information about pages that have been visited or searched, in
          order to select and return specific advertisements to the user of the
          Site, for example, using cookies, in respect of which you will find
          complete information later on this page.In the processing of Personal
          Data that may directly or indirectly identify your person, we try to
          respect a principle of strict necessity. For this reason, we
          configured the Site in such a way that the use of Personal Data is
          reduce to a minimum and to limit the processing of Personal Data that
          could identify the data subject only when needed or at the request of
          the authorities and the police (as, for example, for traffic data and
          the time you spend on the Site or your IP address) or for the
          assessment of responsibility in case of hypothetical crimes against
          the Site. Some Personal Data are strictly necessary to operate the
          Site, others are used only to obtain anonymous statistical information
          about the Site and to check its correct functioning and are deleted
          immediately after processing. From time to time you will be informed
          about obligation or optional nature of the communication of Personal
          Data and possible consequences. ‍3. HOW WE WILL USE YOUR PERSONAL
          DATAYour Personal Data will be processed using automated tools for the
          time necessary to fulfill the purposes for which such data was
          collected and in compliance with the principle of necessity and
          proportionality, avoiding to process the Personal Data where
          operations could be realized through the use of anonymous data or
          through other means. Specific security measures are applied to prevent
          the loss of the Personal Data, illegal or improper utilization and
          unauthorized access, but please do not forget that it is essential for
          the safety of your data that your device is equipped with tools such
          as constantly antivirus updated and that your internet provider
          provides a connection ensuring a secure data transmission through
          firewalls, spam filters, and similar measures. ‍4. WHO WILL USE YOUR
          PERSONAL DATAControllers will process your personal data for the
          technical administration of the website. Your data will be processed
          by employees and collaborators of Controllers appointed as persons in
          charge of the processing and data processors. Other information
          regarding the sphere of communication and dissemination of your
          personal data shall be provided to you in specific areas of the
          website. 5. YOUR RIGHTSYou may at any time obtain cancellation,
          conversion into anonymous form, copy, update, adjustment or
          integration, block of data processed in infringement of the law and
          oppose the processing as envisaged by Article 7 of Legislative Decree
          n.196/2003, which is shown in full below. You will have the right to
          object in any case to any processing of your Personal Data for
          purposes of commercial information and marketing, and to oppose for
          legitimate reasons of the processing of your data for other purposes.
          In order to exercise your rights, you may contact the address below or
          send an email to info@email.com. ‍Article 7 of Legislative Decree 30
          June 2003 n. 196 (Right to Access Personal Data and Other Rights)1. A
          data subject shall have the right to obtain confirmation as to whether
          or not personal data concerning him exist, regardless of their being
          already recorded, and communication of such data in intelligible form.
          2. A data subject shall have the right to be informed: a) of the
          source of the personal data; b) of the purposes and methods of the
          processing; c) of the logic applied to the processing, if the latter
          is carried out with the help of electronic means; d) of the
          identification data concerning data controller, data processors and
          the representative designated as per Section 5(2); e) of the entities
          or categories of entity to whom or which the personal data may be
          communicated and who or which may get to know said data in their
          capacity as designated representative(s) in the State’s territory,
          data processor(s) or person(s) in charge of the processing. A data
          subject shall have the right to obtaina) updating, rectification or,
          where interested therein, integration of the data; b) erasure,
          anonymization or blocking of data that have been processed unlawfully,
          including data whose retention is unnecessary for the purposes for
          which they have been collected or subsequently processed;c)
          certification to the effect that the operations as per letters a) and
          b) have been notified, as also related to their contents, to the
          entities to whom or which the data were communicated or disseminated,
          unless this requirement proves impossible or involves a manifestly
          disproportionate effort compared with the right that is to be
          protected. 4. A data subject shall have the right to object, in whole
          or in part, a) on legitimate grounds, to the processing of personal
          data concerning him/her, even though they are relevant to the purpose
          of the collection; b) to the processing of personal data concerning
          him/her, where it is carried out for the purpose of sending
          advertising materials or direct selling or else for the performance of
          market or commercial communication surveys.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default CookieModal
