import React, { useState } from "react";
import useWallpaperStore from "#store/wallpaper";
import { ArrowRight, Loader2 } from "lucide-react";

function Login({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get current wallpaper to show a blurred version behind the login
  const { wallpapers, activeIndex } = useWallpaperStore();
  const bg = wallpapers[activeIndex];

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the password is "adi"
    if (password === "adi") {
      setLoading(true);
      
      // Simulate authentication delay
      setTimeout(() => {
          setLoading(false);
          onUnlock();
      }, 1000);
    } else {
      // Alert if password is wrong
      alert('password is adi');
    }
  };

  return (
    <div
        className="fixed inset-0 z-[100] bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
    >
        {/* Backdrop Blur Layer */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md flex flex-col items-center justify-center text-white">
            
            <div className="flex flex-col items-center gap-6 animate-fade-in-up">
                {/* Avatar */}
                <div className="relative group">
                    <img
                        src="/images/dp.jpg"
                        alt="Aditya"
                        className="w-28 h-28 rounded-full border-2 border-white/20 shadow-2xl object-cover"
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-shadow-sm tracking-wide">Aditya Bhakat</h2>
                    <p className="text-xs text-gray-300 mt-1">Frontend Developer</p>
                </div>

                {/* Password Input Area */}
                <form onSubmit={handleLogin} className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/20 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm placeholder-gray-300 outline-none focus:bg-white/30 transition-all w-48 backdrop-blur-sm shadow-inner"
                            autoFocus
                        />
                        {/* Hint Tooltip - Updated to reflect the real password requirement */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[20px] text-gray-300 opacity-60 whitespace-nowrap">
                            (Hint: Password is 'adi')
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50 cursor-pointer border border-white/10"
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <ArrowRight size={16} />
                        )}
                    </button>
                </form>
            </div>

            {/* Bottom Controls (Visual Only) */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-xs text-gray-300">
                <p>Sleep | Restart | Shut Down</p>
            </div>
        </div>
    </div>
  );
}

export default Login;