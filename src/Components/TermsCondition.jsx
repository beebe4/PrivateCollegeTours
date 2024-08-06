import React from "react";
import Footer from "./Footer";
import { Box, Typography, Container } from "@mui/material";

const TermsCondition= () => {
  return (
    <Box sx={{ bgcolor: "#E6F0FF", minHeight: "100vh" }}>
    <Container maxWidth="md" sx={{ my: 4 }}>

      <Typography variant="h3" sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3, textAlign: 'center' }}>
        Homeowner Terms & Conditions
      </Typography>

      <Box sx={{ typography: 'body1', mb: 4 }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          1. Introduction
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
          Welcome to PrivateCollegeTours! These terms and conditions outline the rules and regulations for the use of the PrivateCollegeTours platform as a homeowner.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        2. Account Registration
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Registration Process: To utilise the services provided by PrivateCollegeTours, homeowners must register by providing personal information, including contact details and location.
          <Typography>
        User Responsibility: Homeowners are responsible for ensuring the accuracy and authenticity of the information provided during the registration process.
          </Typography>
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        3. Service Booking and Expectations
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Service Requests: Homeowners can request services through the PrivateCollegeTours platform by providing accurate details about the required service, including date, time, and location.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Expectations: Homeowners are expected to communicate their service requirements clearly and to provide a safe and suitable working environment for the tour guides.
        </Typography>
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        4. Payment and Service Quality
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Service Payment: Homeowners agree to make timely and accurate payments for the services requested through the PrivateCollegeTours platform.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Quality Standards: Homeowners can expect services provided by fixers to meet the quality standards outlined by PrivateCollegeTours. In case of any concerns about service quality, homeowners are encouraged to reach out to the support team.

        </Typography>
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        5. Privacy and Data Security
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Confidentiality: All personal and servicerelated information provided during the booking process is subject to the privacy policy outlined by PrivateCollegeTours, ensuring the confidentiality and security of all data shared.
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        6. Code of Conduct
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Respectful Behaviour: Homeowners are expected to treat the fixers with respect and provide a safe working environment during service provision.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Timely Communication: Homeowners are encouraged to communicate promptly and efficiently with the tour guides regarding service details, changes, or any other relevant information.
        </Typography>
        </Typography>

        <Typography variant="h6" sx={{ my: 2 }}>
        7. Termination of Services
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Service Disputes: In the case of any service disputes or concerns, PrivateCollegeTours retains the right to mediate and take necessary actions for dispute resolution.
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Account Termination: PrivateCollegeTours reserves the right to terminate a homeowner's account in the event of any misuse or breach of the established terms and conditions.
        </Typography>
        </Typography>
        
        <Typography variant="h6" sx={{ my: 2 }}>
          8. Changes to Terms
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
        Modification of Terms: PrivateCollegeTours retains the right to modify or revise these terms and conditions at any time. Homeowners will be notified of any changes made to the terms through their registered email addresses.
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          9. Contact Information
        </Typography>
        <Typography sx={{ my: 2, lineHeight: 1.6 }}>
          For any inquiries or concerns regarding the terms and conditions, please contact the PrivateCollegeTours support team at PrivateCollegeTours@gmail.com.
        </Typography>
      </Box>
      <Footer/>
    </Container>
    </Box>
  );
};

export default TermsCondition;
