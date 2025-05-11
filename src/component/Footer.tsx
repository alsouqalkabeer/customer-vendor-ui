import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-50 py-8 px-8 mt-auto">
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Terms of Use</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Merchant Rights</li>
            <li>Consumer Rights</li>
            <li>Updates</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
          <ul className="space-y-2">
            <li>The Smart Assistant Helper</li>
            <li>Smart Assistant Support</li>
            <li>Complaints and Suggestions</li>
            <li>info@noshamarket.com</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-blue-100 p-2 rounded-full">
              <span className="text-blue-600">Insta</span>
            </a>
            <a href="#" className="bg-blue-100 p-2 rounded-full">
              <span className="text-blue-600">FB</span>
            </a>
            <a href="#" className="bg-blue-100 p-2 rounded-full">
              <span className="text-blue-600">TikTok</span>
            </a>
            <a href="#" className="bg-blue-100 p-2 rounded-full">
              <span className="text-blue-600">Snap</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;