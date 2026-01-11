import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="pt-20"
      >
        <AppRoutes />
      </motion.main>
    </div>
  );
};

export default App;
