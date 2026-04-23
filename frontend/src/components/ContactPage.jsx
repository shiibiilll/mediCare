import React, { useState } from "react";
import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  SendHorizonal,
  Stethoscope,
  User,
} from "lucide-react";
import {
  contactPageStyles,
  contactPageStyles as cps,
} from "../assets/styles/styles.js";

const ContactPage = () => {
  const initial = {
    name: "",
    email: "",
    phone: "",
    department: "",
    service: "",
    message: "",
  };

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const departments = [
    "General Physician",
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Gynecology",
  ];

  const servicesMapping = {
    "General Physician": [
      "General Consultation",
      "Adult Checkup",
      "Vaccination",
      "Health Screening",
    ],
    Cardiology: [
      "ECG",
      "Echocardiography",
      "Stress Test",
      "Heart Consultation",
    ],
    Orthopedics: ["Fracture Care", "Joint Pain Consultation", "Physiotherapy"],
    Dermatology: ["Skin Consultation", "Allergy Test", "Acne Treatment"],
    Pediatrics: ["Child Checkup", "Vaccination (Child)", "Growth Monitoring"],
    Gynecology: ["Antenatal Care", "Pap Smear", "Ultrasound"],
  };

  const genericServices = [
    "General Consultation",
    "ECG",
    "Blood Test",
    "X-Ray",
    "Ultrasound",
    "Physiotherapy",
    "Vaccination",
  ];

  // Validates all fields are filled or not
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      e.phone = "Phone number must be exactly 10 digits";

    if (!form.department && !form.service) {
      e.department = "Please choose a department or service";
      e.service = "Please choose a department or service";
    }

    if (!form.message.trim()) e.message = "Please write a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "department") {
      setForm((prev) => ({ ...prev, department: value, service: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === "department" || name === "service") {
      setErrors((prev) => {
        const copy = { ...prev };
        if (
          (name === "department" && value) ||
          (name === "service" && value) ||
          form.department ||
          form.service
        ) {
          delete copy.department;
          delete copy.service;
        }
        return copy;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const text = `*Contact Request*\nName: ${form.name}\nEmail: ${
      form.email
    }\nPhone: ${form.phone}\nDepartment: ${
      form.department || "N/A"
    }\nService: ${form.service || "N/A"}\nMessage: ${form.message}`;

    const url = `https://wa.me/8078371334?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setForm(initial);
    setErrors({});
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const availableServices = form.department
    ? servicesMapping[form.department] || []
    : genericServices;

  return (
    <div className={cps.pageContainer}>
      <div className={cps.bgAccent1}></div>
      <div className={cps.bgAccent2}></div>

      <div className={cps.gridContainer}>
        <div className={cps.formContainer}>
          <h2 className={cps.formTitle}>Contact Our Clinic</h2>
          <p className={cps.formSubtitle}>Submit & connect on WhatsApp</p>

          <form onSubmit={handleSubmit} className={cps.formSpace}>
            <div className={cps.formGrid}>
              <div>
                <label className={cps.label}>
                  <User size={16} /> Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  className={cps.input}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                {errors.name && <p className={cps.error}>{errors.name}</p>}
              </div>

              <div>
                <label className={cps.label}>
                  <Mail size={16} /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  className={cps.input}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
                {errors.email && <p className={cps.error}>{errors.email}</p>}
              </div>
            </div>

            {/* Phone + Department */}
            <div className={cps.formGrid}>
              <div>
                <label className={cps.label}>
                  <Phone size={16} /> Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  className={cps.input}
                  maxLength="10"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className={cps.error}>{errors.phone}</p>}
              </div>

              <div>
                <label className={cps.label}>
                  <MapPin size={16} /> Department
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={cps.input}
                >
                  <option value="">Select Department</option>

                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className={cps.error}>{errors.department}</p>
                )}
              </div>
            </div>

            <div>
              <label className={cps.label}>
                <Stethoscope size={16} />
                Service
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={cps.input}
              >
                <option value="">
                  Select Service (or choose Department above)
                </option>

                {availableServices.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <p className={cps.error}>{errors.service}</p>}
            </div>

            <div>
              <label className={cps.label}>
                <MessageSquare size={16} />
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                rows={4}
                onChange={handleChange}
                placeholder="Describe your concern briefly..."
                className={cps.textarea}
              />
              {errors.message && <p className={cps.error}>{errors.message}</p>}
            </div>

            <div className={cps.buttonContainer}>
              <button className={cps.button} type="submit">
                <SendHorizonal size={18} /> <span>Send via WhatsApp</span>
              </button>

              {sent && (
                <p className={cps.sentMessage}>
                  Opening WhatsApp and clearing form...
                </p>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className={cps.infoContainer}>
          <div className={cps.infoCard}>
            <h3 className={cps.infoTitle}>Visit Our Clinic</h3>
            <p className={cps.infoText}>Malappuram, Kerala, India</p>
            <p className={cps.infoItem}>
              <Phone size={16} />
              8078371334
            </p>

            <p className={cps.infoItem}>
              <Mail size={16} />
              info@mediClinic.com
            </p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59551.11744127292!2d76.02719185518293!3d11.061858910676051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64a9be29b058f%3A0x23e371e0d4c30d8e!2sMalappuram%2C%20Kerala!5e1!3m2!1sen!2sin!4v1776933369853!5m2!1sen!2sin"
            className={cps.map}
            title="Malappuram map"
            loading="lazy"
            allowFullScreen
          />

          <div className={cps.hoursContainer}>
            <h4 className={cps.hoursTitle}>Clinic Hours</h4>
            <p className={cps.hoursText}>Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      <style>{contactPageStyles.animationKeyframes}</style>
    </div>
  );
};

export default ContactPage;
