import React from "react";
import styled from "styled-components";

const CookiePolicy = () => {
  return (
    <>
      <Container>
        <ContentWrapper>
          <TitleWrapper className="text-center">
            <PolicyWrapper className="privacy">
              <Section className="text-left">
                <h1 style={{ fontSize: "2.5rem" }}>Cookies Policy</h1>
                <Paragraph>Effective Date: January 1, 2026</Paragraph>
                <Paragraph>
                  At Learnity, we use cookies and similar tracking
                  technologies to enhance your browsing experience and improve
                  our services. This Cookies Policy explains what cookies are,
                  how we use them, and how you can control them.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>1. What Are Cookies?</Heading2>
                <Paragraph>
                  Cookies are small text files stored on your device (computer,
                  smartphone, tablet) when you visit a website. They allow the
                  website to recognize your device, remember your preferences,
                  and improve your overall user experience.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>2. Types of Cookies We Use</Heading2>
                <Paragraph>
                  We use the following types of cookies on our website:
                </Paragraph>
                <Paragraph>
                  Essential Cookies: These cookies are necessary for the website
                  to function properly and cannot be switched off. They enable
                  basic functions like page navigation and access to secure
                  areas of the website.
                </Paragraph>
                <Paragraph>
                  Performance Cookies: These cookies collect information about
                  how visitors use our website, such as which pages are most
                  visited. This data helps us improve the site functionality
                  and user experience.
                </Paragraph>
                <Paragraph>
                  Functional Cookies: These cookies allow the website to
                  remember choices you make, such as your language preference or
                  region, to provide enhanced features and personalized content.
                </Paragraph>
                <Paragraph>
                  Targeting/Advertising Cookies: These cookies may be used to
                  display ads relevant to you and your interests. They also
                  limit how many times you see an advertisement and help measure
                  the effectiveness of ad campaigns.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>3. How We Use Cookies</Heading2>
                <Paragraph>
                  We use cookies for the following purposes:
                </Paragraph>
                <Paragraph>
                  To provide essential functions like logging in to your account
                  and accessing secured features. To analyze website traffic and
                  usage, helping us improve the website structure and content.
                  To personalize your experience, such as remembering your
                  preferences and settings. To deliver relevant advertisements
                  and promotions, both on our site and on other platforms.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>4. Third-Party Cookies</Heading2>
                <Paragraph>
                  In addition to our own cookies, we may also use third-party
                  cookies for:
                </Paragraph>
                <Paragraph>
                  Analytics (e.g., Google Analytics) to track and report on
                  website usage and performance. Advertising networks to deliver
                  targeted ads based on your browsing behavior. Social media
                  integration (e.g., Facebook, LinkedIn) to share content and
                  enable social sharing. These third parties may use the
                  information they collect through their cookies for their own
                  purposes.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>5. How to Manage or Disable Cookies</Heading2>
                <Paragraph>
                  You can manage or disable cookies by adjusting your browser
                  settings. Most web browsers allow you to:
                </Paragraph>
                <Paragraph>
                  Block all cookies. Block only third-party cookies. Clear
                  cookies when you close your browser. Please note that if you
                  disable cookies, some parts of the Learnity website may not
                  function properly or may become inaccessible.
                </Paragraph>
                <Paragraph>
                  For more information on how to manage cookies, please refer to
                  your browser's help section.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>6. Changes to This Cookies Policy</Heading2>
                <Paragraph>
                  We may update this Cookies Policy from time to time to reflect
                  changes in the cookies we use or for legal and regulatory
                  reasons. Any updates will be posted on this page, and the
                  effective date will be revised accordingly.
                </Paragraph>
              </Section>
              <Section className="text-left">
                <Heading2>7. Contact Us</Heading2>
                <Paragraph>
                  If you have any questions or concerns about our use of
                  cookies, please contact us at:
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

export default CookiePolicy;