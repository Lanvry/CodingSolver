@extends("components.layout")
@section('title', 'Contact Us')
@section('description', 'Get in touch with Coding Solver for professional web development and design services. Fill out our contact form or reach us via email or phone. We\'re here to help you enhance your online presence.')
@section('robots', 'follow')



@section('content')
    <section class="contact-form-section" id="contact-form">
        <div class="section-header">
            <h2>Get In Touch</h2>
            <p>Have a project in mind or questions about our services? Fill out the form below and we'll get back to you
                within 24 hours.</p>
        </div>
        <div class="contact-container">
            <form id="contactForm" class="contact-form">
                <div class="form-group">
                    <label for="name">Full Name <span class="required">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Enter your full name">
                    <span class="error-message" id="name-error"></span>
                </div>

                <div class="form-group">
                    <label for="email">Email Address <span class="required">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email address">
                    <span class="error-message" id="email-error"></span>
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number (Optional)</label>
                    <input type="tel" id="phone" name="phone" placeholder="Enter your phone number">
                    <span class="error-message" id="phone-error"></span>
                </div>

                <div class="form-group">
                    <label for="subject">Subject <span class="required">*</span></label>
                    <select id="subject" name="subject" required>
                        <option value="" disabled selected>Select a subject</option>
                        <option value="web-development">Web Development</option>
                        <option value="web-design">Web Design</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="seo">SEO Services</option>
                        <option value="other">Other Inquiry</option>
                    </select>
                    <span class="error-message" id="subject-error"></span>
                </div>

                <div class="form-group">
                    <label for="message">Your Message <span class="required">*</span></label>
                    <textarea id="message" name="message" rows="5" required
                        placeholder="Tell us about your project or inquiry"></textarea>
                    <span class="error-message" id="message-error"></span>
                </div>

                <div class="form-submit">
                    <button type="submit" class="cta-button">Send Message</button>
                    <div class="form-status" id="formStatus"></div>
                </div>
            </form>

            <div class="contact-info">
                <h3>Other Ways to Reach Us</h3>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <h4>Email</h4>
                        <p>hello@codingsolver.com</p>
                        <p>support@codingsolver.com</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <h4>Phone</h4>
                        <p>+1 (555) 123-4567 (Office)</p>
                        <p>+1 (555) 765-4321 (Support)</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>Office</h4>
                        <p>123 Web Street, Digital City</p>
                        <p>10001, United States</p>
                    </div>
                </div>

                <div class="business-hours">
                    <h4>Business Hours</h4>
                    <p><span>Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                    <p><span>Saturday:</span> 10:00 AM - 4:00 PM</p>
                    <p><span>Sunday:</span> Closed</p>
                </div>
            </div>
        </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Ambil nilai input
            const namaLengkap = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const nomorTelepon = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const pesan = document.getElementById('message').value.trim();

            // Validasi sederhana
            if (!namaLengkap || !email || !subject || !pesan) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Harap isi semua field yang wajib diisi!',
                });
                return;
            }

            // Format pesan yang dikirim ke WhatsApp
            const fullMessage = `📩 *Form Kontak Baru dari Website CodingSolver*\n\n` +
                `👤 *Nama:* ${namaLengkap}\n` +
                `📧 *Email:* ${email}\n` +
                `📞 *Nomor:* ${nomorTelepon || '-'}\n` +
                `📌 *Subjek:* ${subject}\n` +
                `💬 *Pesan:* ${pesan}`;

            const token = "eNF5Ugn2HWGBcrbDUyx2"; // ganti token jika perlu
            const target = "6285648077829"; // nomor tujuan WhatsApp (dalam format internasional)

            const formData = new FormData();
            formData.append('target', target);
            formData.append('message', fullMessage);
            formData.append('countryCode', '62');

            fetch('https://api.fonnte.com/send', {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true || data.status === "true") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Pesan berhasil dikirim!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        document.getElementById('contactForm').reset();
                    } else {
                        throw new Error(data.message || 'Terjadi kesalahan saat mengirim pesan.');
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal mengirim pesan',
                        text: error.message,
                    });
                });
        });
    </script>

@endsection