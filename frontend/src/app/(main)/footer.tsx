import AppLogo from "@/components/AppLogo";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <div>
              {/* Placeholder for Logo */}
              <AppLogo />
            </div>
            <p className="text-sm">
              Job Finder is your ultimate destination for finding the perfect
              job. Connecting talents with opportunities across industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                <a
                  href="mailto:juaini742@gmail.com"
                  className="hover:text-white"
                >
                  juaini742@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4" />
                <a href="tel:+123456789" className="hover:text-white">
                  +123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4" />
                <p>123 Job Street, Career City, Jobland</p>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-white hover:text-gray-900"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-white hover:text-gray-900"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-white hover:text-gray-900"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-white hover:text-gray-900"
              >
                <Instagram size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Job Finder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
