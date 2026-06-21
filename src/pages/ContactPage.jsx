import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faPhone, faEnvelope, faClock, faPaperPlane, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';


export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 bg-cream">
      {/* Header */}
      <div className="py-16 bg-cream-dark/40 border-b border-champagne/10 mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-champagne mb-2">
            Get In Touch
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-mocha mb-3">
            Contact <span className="text-champagne-gradient">Crave Corner</span>
          </h1>
          <p className="font-cormorant text-mocha-light text-lg italic max-w-xl mx-auto leading-relaxed">
            Have questions about an order, custom cake options, or allergy specifications? Reach out below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Side (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-mocha mb-2">Connect Directly</h2>
            <p className="font-cormorant text-mocha-light text-base leading-relaxed">
              We look forward to making your days a little sweeter. Feel free to call us or drop a message!
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-xs text-mocha-light uppercase tracking-wider mb-1">
                    Boutique Location
                  </h4>
                  <p className="font-montserrat text-sm text-mocha leading-relaxed">
                    Unit G-22, Ground Floor,Polo Park Mall, Presidential Road, Enugu, Enugu State, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-xs text-mocha-light uppercase tracking-wider mb-1">
                    Phone Inquiries
                  </h4>
                  <p className="font-montserrat text-sm text-mocha">
                    +234 810 412 4930
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-xs text-mocha-light uppercase tracking-wider mb-1">
                    Email Correspondence
                  </h4>
                  <p className="font-montserrat text-sm text-mocha">
                    hello@cravecorner.co.ng
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-xs text-mocha-light uppercase tracking-wider mb-1">
                    Opening Hours
                  </h4>
                  <p className="font-montserrat text-sm text-mocha leading-relaxed">
                    Monday - Friday: 08:00 - 19:00<br />
                    Saturday - Sunday: 09:00 - 17:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (2/3 width) */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 md:p-10">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-mocha">Message Transmitted!</h3>
                  <p className="font-cormorant text-mocha-light text-lg italic max-w-sm mx-auto">
                    Thank you for contacting Crave Corner. A member of our sweet team will reply within 24 hours.
                  </p>
                  <div className="pt-4">
                    <Button variant="champagne" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-playfair text-2xl font-bold text-mocha mb-6">Dispatch a Message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-crave"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-crave"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-crave"
                      placeholder="e.g. Custom cake inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-montserrat font-bold text-mocha-light uppercase tracking-wider mb-1">
                      Message Body
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-crave"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <Button type="submit" variant="rose" className="w-full sm:w-auto">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                    Send Message
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
