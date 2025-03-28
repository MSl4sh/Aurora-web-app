import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Command, getAllCommands } from '../services/api';
import documentation from '../documentation.json';

interface LocalCommand {
  name: string;
  description: string;
  usage: string;
  permissions?: string;
}

interface Category {
  id: string;
  name: string;
  commands: LocalCommand[];
}

export default function Commands() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Command['category'] | 'all'>('all');
  const [usingFallback, setUsingFallback] = useState(false);

  const categories: { [key: string]: string } = {
    all: 'Toutes les commandes',
    moderation: 'Modération',
    config: 'Configuration',
    roles: 'Rôles',
    tickets: 'Tickets',
    youtube: 'YouTube',
    xp: 'Système XP',
    info: 'Information',
    utils: 'Utilitaires'
  };

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const data = await getAllCommands();
        setCommands(data);
        setLoading(false);
      } catch (err) {
        // Conversion du format local vers le format API
        const localCategories: Category[] = Object.entries(documentation.categories).map(([key, value]) => ({
          id: key,
          name: value.name,
          commands: value.commands,
        }));

        const convertedCommands: Command[] = localCategories.flatMap((category, index) => 
          category.commands.map((cmd, cmdIndex) => ({
            id: index * 1000 + cmdIndex,
            name: cmd.name,
            category: category.id as Command['category'],
            description: cmd.description,
            usage_example: cmd.usage,
            required_permissions: cmd.permissions || '',
            parent_command: null,
            base_usage: cmd.usage
          }))
        );

        setCommands(convertedCommands);
        setUsingFallback(true);
        setLoading(false);
      }
    };

    fetchCommands();
  }, []);

  const filteredCommands = commands
    .filter(cmd => selectedCategory === 'all' || cmd.category === selectedCategory)
    .filter(cmd =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
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
              {usingFallback && (
                <p className="text-sm text-yellow-400 mt-2">
                  Mode hors-ligne : utilisation de la documentation locale
                </p>
              )}
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
                {Object.entries(categories).map(([key, label]) => {
                  if (key === 'all') return null;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key as Command['category'])}
                      className={`btn ${
                        selectedCategory === key ? 'btn-primary' : 'btn-secondary'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid gap-4"
            >
              {filteredCommands.map((command, index) => (
                <motion.div
                  key={command.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card hover:scale-[1.01] transition-transform duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="text-aurora-hover">/</span>
                        {command.parent_command 
                          ? `${command.parent_command} ${command.name}`
                          : command.name
                        }
                      </h3>
                      <p className="text-secondary-100 mb-3">
                        {command.description}
                      </p>
                      <div className="font-mono text-sm text-secondary-200 bg-secondary-800/50 p-3 rounded-lg border border-secondary-700/50">
                        {command.usage_example}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        !command.required_permissions
                          ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                          : 'bg-aurora-hover/20 text-aurora-hover border border-aurora-hover/20'
                      }`}>
                        {!command.required_permissions
                          ? 'Accessible à tous'
                          : command.required_permissions}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredCommands.length === 0 && (
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
} 