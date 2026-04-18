import React from "react";
import { footerStyles } from "../assets/styles/styles.js";
import {
  ActivityIcon,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Stethoscope,
  Twitter,
  Youtube,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointments", href: "/appointments" },
  ];

  const services = [
    { name: "Blood Pressure Check", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
    { name: "Full Blood Count", href: "/services" },
    { name: "X-Ray Scan", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
  ];

  const socialLinks = [
    {
      Icon: Facebook,
      color: footerStyles.facebookColor,
      name: "Facebook",
    },
    {
      Icon: Twitter,
      color: footerStyles.twitterColor,
      name: "Twitter",
    },
    {
      Icon: Instagram,
      color: footerStyles.instagramColor,
      name: "Instagram",
    },
    {
      Icon: Linkedin,
      color: footerStyles.linkedinColor,
      name: "LinkedIn",
    },
    {
      Icon: Youtube,
      color: footerStyles.youtubeColor,
      name: "YouTube",
    },
  ];
  return (
    <footer className={footerStyles.footerContainer}>
      <div className={footerStyles.floatingIcon1}>
        <Stethoscope className={footerStyles.stethoscopeIcon} />
      </div>

      <div
        className={footerStyles.floatingIcon2}
        style={{
          animationDelay: "3s",
        }}
      >
        <ActivityIcon className={footerStyles.activityIcon} />
      </div>

      <div className={footerStyles.mainContent}>
        <div className={footerStyles.gridContainer}>
          <div className={footerStyles.companySection}>
            <div className={footerStyles.logoContainer}>
              <div className={footerStyles.logoWrapper}>
                <div className={footerStyles.logoImageContainer}>
                  <img
                    src={logo}
                    alt="logo"
                    className={footerStyles.logoImage}
                  />
                </div>
              </div>
              <div>
                <h2 className={footerStyles.companyName}>MediCare</h2>
                <p className={footerStyles.companyTagline}>
                  Healthcare Solutions
                </p>
              </div>
            </div>

            <p className={footerStyles.companyDescription}>
              Your reliable partner in advancing healthcare. We are dedicated to
              delivering outstanding medical care through innovative technology
              and a compassionate approach.
            </p>

            <div className={footerStyles.contactContainer}>
              <div className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconWrapper}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>+91 8078371334</span>
              </div>

              <div className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconWrapper}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  MediCareSolutions.com
                </span>
              </div>

              <div className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconWrapper}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>Kerala, India</span>
              </div>
            </div>
          </div>
          {/* QUICK LINKS */}
          <div className={footerStyles.linksSection}>
            <h3 className={footerStyles.sectionTitle}>Quick Links</h3>
            <ul className={footerStyles.linksList}>
              {quickLinks.map((link, i) => (
                <li key={i} className={footerStyles.linkItem}>
                  <a
                    href={link.href}
                    className={footerStyles.quickLink}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className={footerStyles.quickLinkIconWrapper}>
                      <ArrowRight className={footerStyles.quickLinkIcon} />
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={footerStyles.linksSection}>
            <h3 className={footerStyles.sectionTitle}>Our Services</h3>
            <ul className={footerStyles.linksList}>
              {services.map((service, i) => (
                <li key={i}>
                  <a href={service.href} className={footerStyles.serviceLink}>
                    <div className={footerStyles.serviceIcon}></div>
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER & SOCIAL  */}
          <div className={footerStyles.newsletterSection}>
            <h3 className={footerStyles.newsletterTitle}>Stay Connected</h3>
            <p className={footerStyles.newsletterDescription}>
              Subscribe for health tips, medical updates, and wellness insights
              delivered to your inbox.
            </p>

            {/* Newsletter form */}
            <div className={footerStyles.newsletterForm}>
              <div className={footerStyles.mobileNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={footerStyles.emailInput}
                />
                <button className={footerStyles.mobileSubscribeButton}>
                  <Send className={footerStyles.mobileButtonIcon} />
                  Subscribe
                </button>
              </div>

              {/* Desktop newsletter */}
              <div className={footerStyles.desktopNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={footerStyles.desktopEmailInput}
                />
                <button className={footerStyles.desktopSubscribeButton}>
                  <Send className={footerStyles.desktopButtonIcon} />
                  <span className={footerStyles.desktopButtonText}>
                    Subscribe
                  </span>
                </button>
              </div>

              {/* Social icons */}
              <div className={footerStyles.socialContainer}>
                {socialLinks.map(({ Icon, color, name }, i) => (
                  <a
                    key={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerStyles.socialLink}
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className={footerStyles.socialIconBackground} />
                    <Icon className={`${footerStyles.socialIcon} ${color}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={footerStyles.bottomSection}>
          <div className={footerStyles.copyright}>
            <span>&copy;{currentYear} MediCare Healthcare</span>
          </div>

          <div className={footerStyles.designerText}>
            <span>Designed by</span>
            <a
              href="https://shiibiilll.github.io/portfolio/"
              target="_blank"
              className={footerStyles.designerLink}
            >
              Shibil
            </a>
          </div>
        </div>
      </div>

      <style>{footerStyles.animationStyles}</style>
    </footer>
  );
};

export default Footer;
