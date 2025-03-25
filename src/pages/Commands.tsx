import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import documentation from '../documentation.json';

interface Command {
  name: string;
  description: string;
  usage: string;
  permissions?: string;
}

interface Category {
  id: string;
  name: string;
  commands: Command[];
}

const Commands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories: Category[] = Object.entries(documentation.categories).map(([key, value]) => ({
    id: key,
    name: value.name,
    commands: value.commands,
  }));

  const filteredCommands = selectedCategory === 'all'
    ? categories.flatMap(category => category.commands)
    : categories.find(category => category.id === selectedCategory)?.commands || [];

  const searchedCommands = filteredCommands.filter((command: Command) =>
    command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary-900 via-aurora-start to-aurora-end">

      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Commandes d'Aurora
              </h1>
              <p className="text-xl text-secondary-100">
                Découvrez toutes les commandes disponibles pour personnaliser votre expérience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 space-y-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une commande..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`btn ${
                    selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Toutes
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`btn ${
                      selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid gap-4"
            >
              {searchedCommands.map((command: Command, index: number) => (
                <motion.div
                  key={command.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card hover:scale-[1.01] transition-transform duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="text-aurora-hover">/</span>
                        {command.name}
                      </h3>
                      <p className="text-secondary-100 mb-3">
                        {command.description}
                      </p>
                      <div className="font-mono text-sm text-secondary-200 bg-secondary-800/50 p-3 rounded-lg border border-secondary-700/50">
                        {command.usage}
                      </div>
                    </div>
                    {command.permissions && (
                      <div className="flex items-start">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-aurora-hover/20 text-aurora-hover border border-aurora-hover/20">
                          {command.permissions}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {searchedCommands.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-secondary-100">
                  Aucune commande trouvée pour votre recherche.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Commands; 