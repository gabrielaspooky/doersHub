import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="/" className="text-white">DoersDF Hub</a>
        </div>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >

<div className="w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center border-solid-white">
  <img 
    src="https://cadenaser.com/resizer/v2/https%3A%2F%2Fsdmedia.playser.cadenaser.com%2Fplayser%2Fimage%2F202410%2F16%2F1729105283726_1729105359_asset_still.png?auth=9c43857a44c6f2eff96f4b5f0a985e1ada05436d7400d118b7caa192ea3fea2b&quality=70&width=736&height=414&smart=true" 
    alt="Paquito Cruz"
    className="h-full w-full object-cover object-center"
  />
</div>

            <ChevronDown className="text-white" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-20"
              >
                <ul className="py-2">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-purple-100 flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </a>
                  </li>
                  <li>
                    <a
                      href="/settings"
                      className="block px-4 py-2 hover:bg-purple-100 flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </a>
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="block px-4 py-2 hover:bg-purple-100 flex items-center text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
