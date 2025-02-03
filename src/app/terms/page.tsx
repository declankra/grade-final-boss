import React from 'react';

const TermsPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service & Privacy Policy</h1>
      
      {/* Terms of Service Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">1. Acceptance of Terms</h3>
            <p className="text-gray-700">
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">2. Use License</h3>
            <p className="text-gray-700">
              Permission is granted to temporarily download one copy of the materials (information
              or software) on this website for personal, non-commercial transitory viewing only.
            </p>
          </div>

          {/* Add more terms sections as needed */}
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">1. Information We Collect</h3>
            <p className="text-gray-700">
              We collect information that you provide directly to us, including but not limited to
              your name, email address, and any other information you choose to provide.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">2. How We Use Your Information</h3>
            <p className="text-gray-700">
              We use the information we collect to provide, maintain, and improve our services,
              to communicate with you, and to protect our legal rights.
            </p>
          </div>

          {/* Add more privacy policy sections as needed */}
        </div>
      </section>

      {/* Last Updated Section */}
      <footer className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </main>
  );
};

export default TermsPage;
