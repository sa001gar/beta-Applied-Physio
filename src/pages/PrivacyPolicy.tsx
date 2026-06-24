// import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-[800px]">
        <h1 className="text-4xl font-bold text-green-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-green max-w-none text-gray-600 space-y-6">
          <p>Last updated: June 2026</p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            At Applied Physio, we collect personal information that you provide directly to us, including but not limited to your name, contact information, medical history, and payment details when you book an appointment or register as a patient.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our clinical services, to process transactions, to send you related information including confirmations and invoices, and to communicate with you about your appointments and care plan.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement reasonable security measures to maintain the safety of your personal and medical information. However, no data transmission over the internet or any wireless network can be guaranteed to be 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">4. Sharing of Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@appliedphysio.com or call our clinic directly.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
