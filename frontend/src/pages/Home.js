import { motion } from "framer-motion";
import { ShieldCheck, Phone, MapPin, Star } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";




function Home() {
  const { t, i18n } = useTranslation();

useEffect(() => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    i18n.changeLanguage(savedLang);
  }
}, [i18n]);



  
  const [menuOpen, setMenuOpen] = useState(false);
  const [poster, setPoster] = useState(null);
  const [showPoster, setShowPoster] = useState(true);

  // ✅ FETCH POSTER FROM BACKEND
useEffect(() => {

  fetch(`${process.env.REACT_APP_API_URL}/api/poster/latest`)
    .then(res => res.json())
    .then(data => {

      console.log("Poster data:", data);

      if (data && data.image) {

        setPoster(
          `${process.env.REACT_APP_API_URL}/uploads/${data.image}`
        );

      }

    })
    .catch(err => console.error("Poster load error:", err));

}, []);


  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900
dark:bg-neutral-900
">

  {/* POSTER POPUP */}
  {poster && showPoster && (

  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-6 md:pt-12 z-[9999]">

    {/* Animated Poster */}
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -200, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="relative bg-white rounded-xl shadow-2xl p-2 max-w-lg w-[95%] md:w-full"
    >

      {/* Close Button */}
      <button
        onClick={() => setShowPoster(false)}
        className="
        absolute -top-3 -right-3
        bg-red-600 hover:bg-red-700
        text-white text-lg font-bold
        w-8 h-8 rounded-full
        shadow-lg
        flex items-center justify-center
        transition
        "
      >
        ×
      </button>

      {/* Poster Image */}
      <img
        src={poster}
        alt="Poster"
        className="rounded-lg w-full object-cover"
      />


    </motion.div>

  </div>

)}

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-xs md:text-sm py-2 px-4 flex flex-col md:flex-row justify-between gap-1">
        <p>📞 +91 9482272307</p>
        <p>⭐ Rated 4.9/5 by Customers</p>
      </div>

      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur sticky top-0 z-50 shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            

          <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-20 w-30 object-contain"
                />

                <span className="text-2xl font-bold text-blue-600">
                    SVS Computer / Vinayaka Cyber
                </span>
                </div>


          <div className="hidden md:flex gap-8 font-medium">
            <a href="/" className="hover:text-blue-600">{t("home")}</a>
            <a href="/services" className="hover:text-blue-600">{t("services")}</a>
            {/* <a href="/admin/login" className="hover:text-blue-600">Admin</a> */}
            <a href="https://maps.app.goo.gl/mL6JbDRu4eHj8ykf6?g_st=aw" className="hover:text-blue-600">{t("locate")}</a>
            <a href="/gallery" className="hover:text-blue-600">{t("gallery")}</a>
          </div>

          <select
  value={i18n.language}
  onChange={(e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  }}
  className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
>
  <option value="en">English</option>
  <option value="kn">ಕನ್ನಡ</option>
  <option value="hi">हिंदी</option>
</select>
<button
  className="md:hidden text-2xl ml-2"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>


        </div>

{/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">

    <div className="flex flex-col items-center gap-5 py-6 font-medium">

      <a
        href="/"
        onClick={() => setMenuOpen(false)}
        className="hover:text-blue-600"
      >
        {t("home")}
      </a>

      <a
        href="/services"
        onClick={() => setMenuOpen(false)}
        className="hover:text-blue-600"
      >
        {t("services")}
      </a>

      <a
        href="https://maps.app.goo.gl/mL6JbDRu4eHj8ykf6?g_st=aw"
        onClick={() => setMenuOpen(false)}
        className="hover:text-blue-600"
      >
        {t("locate")}
      </a>

      <a
        href="/gallery"
        onClick={() => setMenuOpen(false)}
        className="hover:text-blue-600"
      >
        {t("gallery")}
      </a>

    </div>

  </div>
)}
</nav>


      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center text-white"
        >

          {/* Left */}
          <div>

            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
              ✔ Government Certified Center
            </span>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              {t("welcome")}
            </h2>


            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              PAN, Aadhaar, PF, Insurance, Udyam, Income Certificate,
              Pension & More — Fast, Secure & Reliable.
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href="/services"
                className="bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                {t("explore")}
              </a>

              <a
                href="https://wa.me/919482272307"
                className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                {t("contactNow")}

              </a>
            </div>

          </div>

          {/* Right Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
          >

            <h3 className="text-xl font-semibold mb-6">
              {t("trust")}
            </h3>

            <div className="space-y-5 text-gray-100">

              <div className="flex gap-3 items-center">
                <ShieldCheck size={22} />
                <p>100% Secure Processing</p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={22} />
                <p>Instant Support</p>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin size={22} />
                <p>Local & Verified Center</p>
              </div>

              <div className="flex gap-3 items-center">
                <Star size={22} />
                <p>5000+ Happy Clients</p>
              </div>

            </div>

          </motion.div>

        </motion.div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h3 className="text-3xl font-bold text-center mb-14">
          How We Work
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            ["Submit Documents", "Provide required documents"],
            ["Processing", "We verify & apply online"],
            ["Delivery", "Get updates & receive service"],
          ].map(([title, desc], i) => (

            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="text-blue-600 text-3xl font-bold mb-4">
                0{i + 1}
              </div>

              <h4 className="font-semibold text-lg mb-2">
                {title}
              </h4>

              <p className="text-gray-600">
                {desc}
              </p>

            </div>

          ))}

        </div>
      </section>

{/* Testimonials */}
<section className="bg-gray-100 py-20 overflow-hidden">

  <h3 className="text-3xl font-bold text-center mb-14">
    What Customers Say
  </h3>

  {/* Scrolling Container */}
  <div className="scroll-container">


    <div className="scroll-track">


      {/* Review 1 */}
      <div className="min-w-[260px] sm:min-w-[320px] md:min-w-[400px]
max-w-[260px] sm:max-w-[320px] md:max-w-[400px] bg-white p-5 rounded-xl shadow-md text-sm
           hover:bg-blue-50 dark:hover:bg-slate-700
           hover:shadow-blue-400/50 hover:shadow-2xl
           hover:-translate-y-2 hover:scale-105
           transition-all duration-300 cursor-pointer"
>

        <p className="text-gray-600 mb-4">
          ⭐ “Very professional service. My work was completed quickly without any hassle.
          Staff is very supportive and friendly.”
        </p>

        <h4 className="font-semibold text-blue-600">
          — Mahesh
        </h4>

      </div>


      {/* Review 2 */}
      <div className="min-w-[400px] max-w-[400px] bg-white p-5 rounded-xl shadow-md text-sm
           hover:bg-blue-50 dark:hover:bg-slate-700
           hover:shadow-blue-400/50 hover:shadow-2xl
           hover:-translate-y-2 hover:scale-105
           transition-all duration-300 cursor-pointer">

        <p className="text-gray-600 mb-4">
          ⭐ “Best Digital Seva center in our area. All government services are done
          smoothly and at reasonable charges.”
        </p>

        <h4 className="font-semibold text-blue-600">
          — Lakshmi
        </h4>

      </div>


      {/* Review 3 */}
      <div className="min-w-[400px] max-w-[400px] bg-white p-5 rounded-xl shadow-md text-sm
           hover:bg-blue-50 dark:hover:bg-slate-700
           hover:shadow-blue-400/50 hover:shadow-2xl
           hover:-translate-y-2 hover:scale-105
           transition-all duration-300 cursor-pointer">

        <p className="text-gray-600 mb-4">
          ⭐ “They guided me clearly and finished my application on time.
          Highly satisfied.”
        </p>

        <h4 className="font-semibold text-blue-600">
          — Prakash
        </h4>

      </div>


      {/* Review 4 */}
      <div className="min-w-[400px] max-w-[400px] bg-white p-5 rounded-xl shadow-md text-sm
           hover:bg-blue-50 dark:hover:bg-slate-700
           hover:shadow-blue-400/50 hover:shadow-2xl
           hover:-translate-y-2 hover:scale-105
           transition-all duration-300 cursor-pointer">

        <p className="text-gray-600 mb-4">
          ⭐ “Fast service and very polite staff.
          I recommend everyone to visit here.”
        </p>

        <h4 className="font-semibold text-blue-600">
          — Sunitha
        </h4>

      </div>


      {/* Review 5 */}
      <div className="min-w-[400px] max-w-[400px] bg-white p-5 rounded-xl shadow-md text-sm
           hover:bg-blue-50 dark:hover:bg-slate-700
           hover:shadow-blue-400/50 hover:shadow-2xl
           hover:-translate-y-2 hover:scale-105
           transition-all duration-300 cursor-pointer">

        <p className="text-gray-600 mb-4">
          ⭐ “All my government work was done without tension.
          Very reliable center.”
        </p>

        <h4 className="font-semibold text-blue-600">
          — Ramesh
        </h4>

      </div>


      {/* Duplicate for Smooth Loop */}
      <div className="min-w-[400px] max-w-[400px] bg-white p-5 rounded-xl shadow-md text-sm
           hover:bg-blue-50 dark:hover:bg-slate-700
           hover:shadow-blue-400/50 hover:shadow-2xl
           hover:-translate-y-2 hover:scale-105
           transition-all duration-300 cursor-pointer">

        <p className="text-gray-600 mb-4">
          ⭐ “Very professional service. My work was completed quickly without any hassle.”
        </p>

        <h4 className="font-semibold text-blue-600">
          — Mahesh
        </h4>

      </div>

    </div>

  </div>

</section>



      {/* Footer */}
<footer className="bg-gradient-to-br from-gray-900 to-slate-900 text-gray-300 pt-16 pb-6">

  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* About */}
    <div>

      <h4 className="text-white text-xl font-bold mb-4">
        Digital Seva Kendra
      </h4>

      <p className="leading-relaxed text-gray-400">
        Since 2009, Sri Veerabhadreshwara Swamy Computer & Vinayaka Cyber
        has been a trusted service center helping people with
        Government Services, PF, Insurance, Passport, Aadhaar, PAN,
        and Travel Bookings. We serve with honesty, care, and commitment.
      </p>

    </div>


    {/* Quick Links */}
    <div>

      <h4 className="text-white text-xl font-bold mb-4">
        Quick Links
      </h4>

      <ul className="space-y-3 text-gray-400">

        <li>
          <Link to="/" className="hover:text-blue-400 transition">
            {t("home")}
          </Link>
        </li>

        <li>
          <Link to="/services" className="hover:text-blue-400 transition">
            {t("services")}
          </Link>
        </li>

        <li>
          <a
            href="https://wa.me/919482272307"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            {t("contact")}
          </a>
        </li>

        <li>
          <Link
            to="/admin/login"
            className="hover:text-red-400 transition"
          >
            {t("admin")}
          </Link>
        </li>

        <li>
          <Link
            to="/gallery"
            className="hover:text-purple-400 transition"
          >
            {t("gallery")}
          </Link>
        </li>

      </ul>

    </div>


    {/* Contact */}
    <div>

      <h4 className="text-white text-xl font-bold mb-4">
        Contact Us
      </h4>

      <div className="space-y-4 text-gray-400">

        <p>📞 +91 1234567891</p>

        <p>
          📍 1st Floor, Rudraswamy Complex,<br />
          Opp Hotel V INN, APC Circle,<br />
          Jigani, Anekal Taluk,<br />
          Bangalore – 560105
        </p>

      </div>

    </div>

  </div>


  {/* Divider */}
  <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">

    © {new Date().getFullYear()} SVS Computer & Vinayaka Cyber. All Rights Reserved.

  </div>

</footer>

    </div>
  );
}

export default Home;
