import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Configure Transporter (Use environment variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `EstateHub Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // If EMAIL_USER and EMAIL_PASS are not set, just simulate success for now
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('ℹ️ Email credentials not set. Simulating email success.');
      console.log('Inquiry details:', { name, email, subject, message });
      return res.status(200).json({ message: 'Message sent successfully (Simulation)' });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};
