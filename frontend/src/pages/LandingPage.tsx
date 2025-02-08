import React from "react";

function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-[#0B0B2B] to-[#1B1B4B] text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-5 px-20">
        <div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CufAsqpFbVEYlPxb8Fnk9zfq0jpG6D.png"
            alt="INFOBIONIC.Ai Logo"
            className="h-10"
          />
        </div>
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
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4WH8ItVDqB203TOl2LDxi5FIqBp5G1.png"
            alt="Patient with cardiac monitoring device"
            className="w-[500px] h-[500px] rounded-full object-cover"
          />
          <svg className="absolute bottom-12 right-[-50px] w-36 h-12" viewBox="0 0 100 20">
            <path d="M0,10 L20,10 L25,2 L35,18 L40,10 L100,10" stroke="#7FFF00" fill="none" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl leading-tight mb-4">
          How Does RPM Work? <span className="text-[#27B4E8] font-bold text-5xl">
          Transforming health data into proactive care.
          ✔ Patients use smart medical devices to track vital signs.
          ✔ Data is transmitted instantly to healthcare professionals.
          ✔ Our team analyzes real-time insights to detect abnormalities.
          ✔ Immediate medical action when needed—before complications arise.
          </span>
          </h1>
          <p className="text-lg text-white opacity-90 mb-6">
            InfoBionic.Ai's MoMe ARC® is recognized as the leader in remote cardiac ECG quality, evidenced by our
            collaboration with today's leading institutions. Our renowned virtual telemetry solutions set the highest
            standard in continuous monitoring capability to enable more proactive and timely cardiac interventions.
          </p>
          <a href="#proof" className="bg-[#27B4E8] text-white px-8 py-4 rounded-full font-bold text-lg inline-block hover:bg-[#1a9ed2]">
            ShowMe the Proof
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
