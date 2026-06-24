// import React from 'react';

const MedicalDisclaimer = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-[800px]">
        <h1 className="text-4xl font-bold text-green-900 mb-8">Medical Disclaimer</h1>

        <div className="prose prose-green max-w-none text-gray-600 space-y-6">
          <p>Last updated: June 2026</p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">No Medical Advice</h2>
          <p>
            The content on the Applied Physio website, including text, graphics, images, and other materials, is for informational purposes only. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Consult a Professional</h2>
          <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Emergencies</h2>
          <p>
            If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately. Applied Physio does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Assumption of Risk</h2>
          <p>
            Reliance on any information provided by Applied Physio, our employees, others appearing on the Site at the invitation of Applied Physio, or other visitors to the Site is solely at your own risk.
          </p>
        </div>
      </div>
    </main>
  );
};

export default MedicalDisclaimer;
