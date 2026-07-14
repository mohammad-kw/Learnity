import React from "react";
import styled from "styled-components";

const PrivacyPolicy = () => {
  return (
    <>
      <Container>
        <ContentWrapper>
          <TitleWrapper className="text-center">
            <PolicyWrapper className="privacy">
              <Section className="text-left">
                <h1 style={{ fontSize: "2.5rem" }}>Privacy Policy</h1>
                <Paragraph>Effective Date: January 1, 2026</Paragraph>
                <Paragraph>
                  At Learnity, your privacy is of paramount importance to us.
                  This Privacy Policy outlines how we collect, use, disclose,
                  and protect your personal information in relation to our
                  courses, learning services, and platform.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>1. Information We Collect</Heading2>
                <Paragraph>
                  We may collect the following types of information from you:
                </Paragraph>
                <Paragraph>
                  Personal Identification Information: Name, contact details
                  (email, phone number), address, and educational
                  qualifications. Professional Information: Skills,
                  certifications, work experience, and other details relevant to
                  your learning. Payment Information: Billing details processed
                  securely through our payment partners. Technical Information:
                  IP address, browser type, device information, and website
                  usage data.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>2. How We Use Your Information</Heading2>
                <Paragraph>
                  We collect and use your personal information for the following
                  purposes:
                </Paragraph>
                <Paragraph>
                  Courses: To enroll you in courses and track your learning
                  progress. Customer Support: To respond to inquiries, provide
                  assistance, and improve our services. Marketing and
                  Communication: To send you updates, newsletters, and
                  information about new courses and offers (you can opt out at
                  any time). Payment Processing: To facilitate secure payment
                  for our services.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>3. How We Share Your Information</Heading2>
                <Paragraph>
                  We do not sell, rent, or trade your personal information to
                  third parties. However, we may share your information in the
                  following cases:
                </Paragraph>
                <Paragraph>
                  Service Providers: We may share information with trusted
                  third-party service providers (e.g., payment processors, cloud
                  hosting) to help us operate our platform. Legal Compliance: If
                  required by law, we may disclose your information to comply
                  with legal obligations or respond to lawful requests from
                  government authorities.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>4. Data Security</Heading2>
                <Paragraph>
                  We take appropriate measures to safeguard your personal
                  information from unauthorized access, alteration, disclosure,
                  or destruction. This includes using encryption, secure
                  servers, and regular security audits. However, no data
                  transmission over the internet is 100% secure, so we cannot
                  guarantee absolute security.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>5. Your Rights</Heading2>
                <Paragraph>You have the right to:</Paragraph>
                <Paragraph>
                  Access, correct, or delete your personal information. Withdraw
                  your consent for us to process your data (note: this may
                  affect our ability to provide services to you). Opt-out of
                  receiving marketing communications. To exercise these rights,
                  please contact us at info@learnity.com.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>6. Data Retention</Heading2>
                <Paragraph>
                  We will retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this policy, or
                  as required by law.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>7. Cookies and Tracking</Heading2>
                <Paragraph>
                  Our website uses cookies to enhance your browsing experience,
                  gather usage data, and improve our services. You can manage or
                  disable cookies in your browser settings, but this may affect
                  certain functionalities of our website.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>8. Changes to This Privacy Policy</Heading2>
                <Paragraph>
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page, and the effective date
                  will be updated accordingly.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>9. Contact Us</Heading2>
                <Paragraph>
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </Paragraph>
                <Paragraph>Learnity</Paragraph>
                <Paragraph>Email: info@learnity.com</Paragraph>
              </Section>
            </PolicyWrapper>
          </TitleWrapper>
        </ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0;
  margin: 0 auto;
  max-width: 90vw;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin: 2.5rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const PolicyWrapper = styled.div`
  padding: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  color: white;
  line-height: 1.6;
`;

const Section = styled.section`
  margin: 1.25rem 0;
`;

const Heading2 = styled.h2`
  font-size: 1.5rem;
  margin-top: 1.25rem;
`;

const Paragraph = styled.p`
  margin: 0.625rem 0;
`;

export default PrivacyPolicy;