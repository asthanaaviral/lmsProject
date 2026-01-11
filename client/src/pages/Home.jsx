import { motion, useScroll, useSpring } from "framer-motion";
import {
  GraduationCap,
  PlayCircle,
  Users,
  BookOpen,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

/* ================= SCROLL PROGRESS ================= */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 origin-left z-[60]"
    />
  );
};

/* ================= LOGO CAROUSEL ================= */
const LogoCarousel = () => {
  const logos = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Netflix",
    "Adobe",
    "Spotify",
    "Uber",
  ];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-16 py-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="min-w-[160px] text-center text-xl font-semibold
              text-slate-400 dark:text-slate-600
              hover:text-slate-700 dark:hover:text-slate-300
              transition"
          >
            {logo}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ================= PAGE ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <div className="space-y-32">

        {/* ================= HERO SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pt-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full
              bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Learn smarter. Teach better.
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Build and experience
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                modern learning
              </span>{" "}
              with SkillForge
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              SkillForge is a modern learning management platform designed for
              educators and students who care about clarity, speed, and experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-indigo-600 text-white hover:bg-indigo-700
                dark:bg-indigo-500 dark:hover:bg-indigo-600
                shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                border border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              { icon: Users, label: "Active Learners", value: "10K+" },
              { icon: BookOpen, label: "Courses Created", value: "1,200+" },
              { icon: GraduationCap, label: "Educators", value: "500+" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                shadow-sm hover:shadow-md transition"
              >
                <item.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <p className="text-3xl font-bold mb-1">{item.value}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================= LOGO CAROUSEL ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm uppercase tracking-wider mb-8
            text-slate-500 dark:text-slate-400">
            Trusted by teams at
          </p>
          <LogoCarousel />
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to learn & teach
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              SkillForge focuses on essentials — powerful tools without unnecessary complexity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Course Creation",
                desc: "Create structured courses with videos and lessons in minutes.",
              },
              {
                title: "Smooth Video Learning",
                desc: "Enjoy distraction-free video playback with a clean interface.",
              },
              {
                title: "Role-based Experience",
                desc: "Designed separately for educators and students.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Loved by learners & educators
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Real feedback from people using SkillForge every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((__, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  “SkillForge makes learning feel modern and focused.
                  The interface is clean, fast, and genuinely enjoyable.”
                </p>

                <p className="font-medium">
                  — Alex Morgan, Educator
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-12 bg-indigo-600 dark:bg-indigo-500 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Start your learning journey today
            </h2>
            <p className="mb-8 text-indigo-100">
              Join SkillForge and experience a better way to learn and teach.
            </p>

            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
              bg-white text-indigo-600 font-semibold
              hover:bg-indigo-50 transition">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;
