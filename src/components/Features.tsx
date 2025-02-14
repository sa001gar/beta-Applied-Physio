const Features = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
          Why Choose The Applied Physio?
        </h3>
        <p className="text-gray-600 mb-6">
          We combine modern techniques with compassionate care to offer exceptional
          physiotherapy services that enhance your well-being and improve your quality of life.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-lg text-left">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Expert Therapists</h4>
            <p className="text-gray-700">
              Our experienced and certified physiotherapists are dedicated to providing
              personalized care tailored to your unique needs.
            </p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg text-left">
            <h4 className="text-lg font-semibold text-yellow-700 mb-3">Cutting-Edge Techniques</h4>
            <p className="text-gray-700">
              We utilize the latest physiotherapy techniques and equipment to deliver effective
              treatments with long-lasting results.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-lg text-left">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Patient-Centered Approach</h4>
            <p className="text-gray-700">
              Your well-being is our priority. We take the time to understand your goals and
              develop a plan that works best for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;