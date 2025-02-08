import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0B0B2B] to-[#1B1B4B] text-white py-8 px-20 text-center">
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-5">
        {/* Left - Navigation Links */}
        <div className="flex gap-6 text-sm">
          {["Products", "Solutions", "About Us", "Resources", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-gray-300">
              {item}
            </a>
          ))}
        </div>

        {/* Center - Copyright */}
        <p className="text-xs mt-3 md:mt-0">© {new Date().getFullYear()} Your Company. All rights reserved.</p>

      </div>
    </footer>
  );
}

export default Footer;
