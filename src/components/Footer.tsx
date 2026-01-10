import { Facebook, Twitter, Instagram } from 'lucide-react';
// Removed useState, supabase, and unused icons

export function Footer() {
  // Removed useState hooks and handleNewsletterSubmit function

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  // Calculated target height: 1.5 * headerHeight (99px) = 148.5px
  const footerHeight = 148.5;

  return (
    <footer
      className="bg-gradient-to-br from-gray-900 to-blue-950 text-white"
      // Set the fixed height for the footer element
      style={{ height: `${footerHeight}px` }}
    >
      {/* Added flex container to center content vertically */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        {/* The grid with Logo, Quick Links, Contact, and Newsletter has been removed */}

        {/* Adjusted padding (py-8) and removed border-t */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Jane Doe for Senate. All rights reserved.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              Paid for by Jane Doe for Senate Committee.
            </div>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}