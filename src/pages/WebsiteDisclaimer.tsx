// import React from 'react';

const WebsiteDisclaimer = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-[800px]">
        <h1 className="text-4xl font-bold text-green-900 mb-8">Website Disclaimer</h1>

        <div className="prose prose-green max-w-none text-gray-600 space-y-6">
          <p>Last updated: June 2026</p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">General Information</h2>
          <p>
            The information provided by Applied Physio ("we," "us," or "our") on appliedphysio.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">External Links Disclaimer</h2>
          <p>
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Testimonials Disclaimer</h2>
          <p>
            The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.
          </p>
        </div>
      </div>
    </main>
  );
};

export default WebsiteDisclaimer;
