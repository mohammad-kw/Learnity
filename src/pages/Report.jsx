import React from "react";
import styled from "styled-components";

const Report = () => {
  return (
    <>
      <Container>
        <ContentWrapper>
          <TitleWrapper className="text-center">
            <PolicyWrapper className="privacy">
              <Section className="text-left">
                <h1 style={{ fontSize: "2.5rem" }}>Report a Vulnerability</h1>
                <Paragraph>
                  At Learnity, we take security seriously and are committed to
                  ensuring the safety and privacy of our users and systems. If
                  you have identified a security vulnerability in any of our
                  services, we encourage you to report it to us so we can
                  address it as quickly as possible.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>1. How to Report a Vulnerability</Heading2>
                <Paragraph>
                  If you believe you've found a security vulnerability in any
                  Learnity service, please follow these steps:
                </Paragraph>
                <Paragraph>
                  Email Us: Send a detailed description of the vulnerability to
                  security@learnity.com. Include the Following Information: A
                  detailed summary of the vulnerability. Steps to reproduce the
                  issue. Potential impact and the services affected. Any
                  screenshots or video evidence, if applicable. Your contact
                  details for follow-up.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>2. What Happens Next?</Heading2>
                <Paragraph>Once we receive your report:</Paragraph>
                <Paragraph>
                  We will acknowledge receipt of your report and begin
                  investigating the issue. Our team will assess the impact of
                  the vulnerability and develop a solution. We may contact you
                  for further details if necessary. Once the issue is resolved,
                  we will notify you and, where applicable, provide updates on
                  how the vulnerability was addressed.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>3. Responsible Disclosure</Heading2>
                <Paragraph>We ask that you:</Paragraph>
                <Paragraph>
                  Do not exploit any identified vulnerabilities for any reason.
                  Do not share details of the vulnerability with anyone else
                  until we have had the opportunity to address it. Act in good
                  faith by respecting user privacy and data protection.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>4. Recognition</Heading2>
                <Paragraph>
                  While we currently do not offer a bug bounty program, we will
                  acknowledge your efforts in keeping our systems secure and may
                  offer recognition for responsible disclosure, if applicable.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Paragraph>
                  Thank you for helping us maintain a secure environment at
                  Learnity.
                </Paragraph>
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

export default Report;