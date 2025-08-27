import offer from "../assets/offer.avif"
export default function Offers() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Get the Best Offers on Food from Top Restaurants Near You
        </h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          Get ready for a delicious adventure packed with unbeatable dining
          offers at your favorite restaurants. Whether you're craving a cheesy
          pizza, a juicy burger, or a delightful bowl of pasta, now is the
          perfect time to head out and indulge in your favorite meals—while
          saving big!
        </p>
        <p className="text-gray-600 leading-relaxed mb-3">
          All the top-rated restaurants and popular eateries are offering
          enticing deals that are too good to pass up. From buy-one-get-one-free
          offers to irresistible combo meals, there’s something for everyone.
        </p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Picture yourself dining out and savoring a juicy burger with crispy
          fries, or sharing an oven-fresh pizza topped with all your
          favorites—all at a fraction of the price. These incredible restaurant
          offers ensure that you can enjoy delicious meals without worrying
          about the cost. Whether you’re looking for a casual bite or a special
          night out, these dining deals make it easy to experience the best
          without breaking the bank.
        </p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Planning a night out with friends, a family dinner, or a date night?
          Take advantage of these fantastic restaurant offers and make every
          dining experience unforgettable. With top-notch food at unbeatable
          prices, you can treat yourself and your loved ones to a feast without
          stretching your budget. Plus, you’ll be supporting local restaurants
          while enjoying a cost-effective meal out.
        </p>
        <p className="text-gray-600 leading-relaxed mb-3">
          Don’t miss the chance to explore new dining spots and revisit old
          favorites—all while enjoying amazing discounts. Let your taste buds
          rejoice as you discover incredible dishes at unbeatable prices. With
          Swiggy’s restaurant deals, dining out is more affordable than ever,
          turning every meal into a celebration. So why wait? Embrace the joy of
          dining well and saving more today!
        </p>
      </div>

      <div className="flex items-center justify-center md:justify-start space-x-2">
        <img src={offer} alt="offer" className="h-100 rounded " />
      </div>
    </div>
  );
}
