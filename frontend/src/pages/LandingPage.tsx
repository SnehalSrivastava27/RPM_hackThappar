import React from "react";
import image1 from "../images/image1.jpg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    
    <div className="bg-gradient-to-br from-[#0B0B2B] to-[#1B1B4B] text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-5 px-20">
        <div className="flex items-center gap-10">
          {[
            "Products",
            "What We Solve",
            "Who We Serve",
            "Our Story",
            "Resources",
          ].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-white text-lg">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-[#8CC63F] px-6 py-3 rounded-full font-bold text-white">
            Contact
          </a>
          <span className="text-white text-xl">🔍</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex px-20 py-16 relative overflow-hidden">
        <div className="max-w-2xl">
          <h1 className="text-5xl mb-4">Revolutionizing Healthcare with Remote Patient Monitoring (RPM)</h1>
          <h2 className="text-2xl font-bold leading-tight mb-6">
          Your health, in your hands—our technology ensures your well-being from anywhere. Experience real-time monitoring, early intervention, and seamless virtual care with our cutting-edge RPM services.
          Stay Connected. Stay Healthy.
          </h2>
          <a href="#seeing-is-believing" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg inline-block">
            Seeing is Believing
          </a>
        </div>
      </section>

      {/* Clinical Insights Section */}
      <section className="flex items-center px-20 py-16 max-w-5xl mx-auto gap-16 relative">
        <div className="relative flex-1 min-w-[500px]">
        <img src={image1} alt="Patient with cardiac monitoring device" className="w-[500px] h-[500px] rounded-full object-cover" />;
          <svg className="absolute bottom-12 right-[-50px] w-36 h-12" viewBox="0 0 100 20">
            <path d="M0,10 L20,10 L25,2 L35,18 L40,10 L100,10" stroke="#7FFF00" fill="none" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl leading-tight mb-4">
          How Does RPM Work? <span className="text-[#27B4E8] font-bold text-2xl">
          Transforming health data into proactive care. <br />
          ✔ Patients use smart medical devices to track vital signs. <br />
          ✔ Data is transmitted instantly to healthcare professionals. <br />
          ✔ Our team analyzes real-time insights to detect abnormalities. <br />
          ✔ Immediate medical action when needed—before complications arise. <br />
          </span>
          </h1>

        </div>
      </section>

      {/* buttons  */}
      <div className="flex justify-between mx-5">
  <button 
    onClick={() => navigate("/login")} 
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
  >
    Login
  </button>
  <button 
    onClick={() => navigate("/signup")} 
    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
  >
    Signup
  </button>
</div>

    </div>
  );
}

export default LandingPage;
