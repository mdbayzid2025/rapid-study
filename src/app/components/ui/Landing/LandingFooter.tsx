import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";

const LandingFooter: React.FC = () => {
  const quickLinks = [
    { label: "Student Portal", href: "/auth" },
    { label: "Faculty Login", href: "/auth" },
    { label: "Support Center", href: "/support" },
    { label: "Privacy Policy", href: "/privacy" },
  ];



  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/Prime_University.png" alt="logo" className="w-12 h-16 object-cover overflow-visible" />
              <span className="text-xl font-bold">Prime University</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering education through innovative technology solutions.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Prime University Campus</p>
                  <p className="text-gray-400 text-sm">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">
                  support@primeuniversity.edu.bd
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">+880-2-123456789</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Credits */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Credits</h3>
            <p className="text-gray-400 leading-relaxed">
              Built by Prime University Students
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Prime University. All rights reserved. Developed with{" "}
              <Heart className="w-4 h-4 inline text-red-500" /> by Prime
              University Students.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Version 2.1.0</span>
              <span>Last updated: Jan 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
