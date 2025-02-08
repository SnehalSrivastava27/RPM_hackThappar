"use client"

import { motion } from "framer-motion"
import { AnimatedNumber } from "../components/AnimatedNumber"
import {
  Activity,
  Clock,
  BarChart3,
  ClipboardList,
  Bell,
  Users,
  Building2,
  User,
  Home,
  Heart,
  CheckCircle2,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import {} from "lucide-react"

const LandingPage = () => {
  // Add animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  // Update the Impact Section with animated numbers
  const ImpactSection = () => (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Impact in Numbers
        </motion.h2>
        <p className="text-gray-600 text-center mb-16">Transforming healthcare with measurable results</p>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { value: 76, label: "Reduction in Re-hospitalization", suffix: "%" },
            { value: 45, label: "Healthcare Cost Reduction", suffix: "%" },
            { value: 24, label: "AI Monitoring Coverage", suffix: "/7" },
            { value: 98, label: "Patient Satisfaction Rate", suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  // Add Testimonials Section
  const TestimonialsSection = () => (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 className="text-4xl font-bold text-center mb-4" {...fadeInUp}>
          What Our Users Say
        </motion.h2>
        <p className="text-gray-600 text-center mb-16">Real experiences from healthcare providers and patients</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Johnson",
              role: "Cardiologist",
              content:
                "HealthRakshak has revolutionized how I monitor my patients. The real-time data and AI insights have helped prevent several critical situations.",
              rating: 5,
            },
            {
              name: "Michael Chen",
              role: "Patient",
              content:
                "The reward system keeps me motivated to follow my exercise routine. I've seen significant improvements in my health since using this platform.",
              rating: 5,
            },
            {
              name: "Memorial Hospital",
              role: "Healthcare Provider",
              content:
                "We've seen a 76% reduction in readmission rates since implementing HealthRakshak. The ROI has been exceptional.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  // Add Contact Section
  const ContactSection = () => (
    <div className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 className="text-4xl font-bold text-center mb-4" {...fadeInUp}>
          Get in Touch
        </motion.h2>
        <p className="text-gray-600 text-center mb-16">Have questions? We're here to help.</p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-gray-600">contact@healthrakshak.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-gray-600">+91 9999123786</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p className="text-gray-600">Rohini, Delhi - 110089</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )

  // Add Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">HealthRakshak</h3>
            <p className="text-gray-400">
              Revolutionizing healthcare through AI technology and patient-centric solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Stakeholders</h3>
            <ul className="space-y-2">
              {["Hospitals", "Doctors", "Clinics", "Patients"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest features and releases.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HealthRakshak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-gray-800">HealthRakshak</div>
            <div className="hidden md:flex space-x-8">
  {["Home", "Features", "For Stakeholders", "How It Works", "Rewards", "Login", "Signup"].map(
    (item) => (
      <a 
        key={item} 
        href={item === "Login" ? "/login" : item === "Signup" ? "/signup" : `#${item.toLowerCase()}`} 
        className="text-gray-600 hover:text-gray-900"
      >
        {item}
      </a>
    ),
  )}
</div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Revolutionizing Healthcare Through AI Technology</h1>
              <p className="text-gray-300 text-lg mb-8">
                Reduce re-hospitalization by 76% and healthcare costs by 45% with our AI-powered remote monitoring
                solution
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
                  Get Started
                </button>
                <button className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold">
                  Learn More
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl font-bold mb-2">76%</div>
                <div className="text-gray-400">Reduced Re-hospitalization</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-4xl font-bold mb-2">45%</div>
                <div className="text-gray-400">Cost Reduction</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg col-span-2">
                <div className="font-semibold mb-2">AI-Powered Monitoring</div>
                <div className="text-gray-400">24/7 Patient Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Innovative Features</h2>
          <p className="text-gray-600 text-center mb-16">Transforming healthcare with cutting-edge technology</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="w-8 h-8 text-blue-600" />,
                title: "AI Monitoring",
                description:
                  "24/7 intelligent patient monitoring from the comfort of home, with real-time health analytics and alerts.",
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-600" />,
                title: "Exercise Rewards",
                description:
                  "Earn exciting swags and rewards by completing prescribed exercises and maintaining your health routine.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                title: "Cost Reduction",
                description:
                  "Significantly reduce healthcare costs by 42-45% through preventive care and early intervention.",
              },
              {
                icon: <ClipboardList className="w-8 h-8 text-blue-600" />,
                title: "Stakeholder Dashboard",
                description:
                  "Comprehensive dashboard for clinics, doctors, and hospitals to monitor patient progress effectively.",
              },
              {
                icon: <Bell className="w-8 h-8 text-blue-600" />,
                title: "Smart Alerts",
                description:
                  "Instant notifications for critical health changes and medication reminders for better care management.",
              },
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Family Integration",
                description:
                  "Keep family members informed and involved in the care process with shared access and updates.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stakeholders Section */}
      <div className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">For Our Stakeholders</h2>
          <p className="text-gray-400 text-center mb-16">Tailored solutions for everyone in the healthcare ecosystem</p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Hospitals",
                benefits: ["Reduced readmission rates", "Cost optimization", "Better patient outcomes"],
              },
              {
                icon: <User className="w-8 h-8" />,
                title: "Doctors",
                benefits: ["Real-time patient monitoring", "Data-driven decisions", "Efficient patient management"],
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "Clinics",
                benefits: ["Streamlined operations", "Enhanced patient care", "Reduced overhead costs"],
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Patients",
                benefits: ["Home-based monitoring", "Reward system", "Better recovery rates"],
              },
            ].map((stakeholder, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="mb-4">{stakeholder.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{stakeholder.title}</h3>
                <ul className="space-y-2">
                  {stakeholder.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <ImpactSection />

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-16">Simple steps to better healthcare management</p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />
            <div className="space-y-24">
              {[
                {
                  step: 1,
                  title: "Sign Up & Connect",
                  description:
                    "Register on our platform and connect your medical devices for seamless monitoring. Our AI system will begin tracking your health metrics immediately.",
                },
                {
                  step: 2,
                  title: "Follow Your Plan",
                  description:
                    "Complete prescribed exercises and follow your personalized healthcare plan. Our AI monitors your progress and adjusts recommendations in real-time.",
                },
                {
                    step: 3,
                    title:"Earn Rewards",
                    description:"Get rewarded with exclusive swags and benefits as you achieve your health goals and maintain consistent progress."
                },
                {
                    step: 4,
                    title:"Stay Connected",
                    description:"Maintain continuous communication with your healthcare providers through our platform while enjoying the comfort of your home."
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-16" : "pl-16 ml-auto text-right"}`}>
                      <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer />
    </div>
  )
}
export default LandingPage

