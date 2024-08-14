import toast,{Toaster} from 'react-hot-toast';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./contact.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    from_userEmail: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
        'service_jk76a1d',
        'template_4gmxt4j',
        formData,
        'AaBg2X0mra2ZgaKrD'
      )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      // Reset form or show success message
    })
    .catch((err) => {
      console.error('Failed to send email.', err);
      // Show error message
    });
    setFormData({
      from_userEmail: '',
      subject: '',
      message: '',
    })
    toast.success("Email sent successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="from_userEmail">Email:</label>
        <input
          type="email"
          id="from_userEmail"
          name="from_userEmail"
          value={formData.from_userEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <Toaster/>
    </form>
  );
};

export default Contact;