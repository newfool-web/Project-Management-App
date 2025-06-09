import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Link } from "react-router-dom";
import homeVideo from "@/assets/home_video.mp4";

const Home = () => {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center relative overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={homeVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-blue-50/70 to-cyan-100/80 z-10" />
      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-24 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Logo />
          <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent select-none">Team Verge</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 text-slate-900 tracking-tight">
          <span className="block">Work better, safer,</span>
          <span className="block">together.</span>
        </h1>
        <div className="w-full max-w-xl mx-auto">
          <p className="text-lg md:text-xl text-center text-slate-700 mb-10 font-medium">
            Team Verge simplifies your project management with a central place to collaborate, track tasks, and share files. Empower your team with seamless communication and productivity tools—all in one modern platform.
          </p>
        </div>
        <Link to="/sign-up">
          <Button className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 rounded-2xl shadow-lg transition-all">
            Get Started - Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home; 