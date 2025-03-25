import { motion } from 'framer-motion';

const Home = () => {
  const stats = [
    { label: 'Serveurs', value: '0' },
    { label: 'Utilisateurs', value: '0' },
    { label: 'Commandes', value: '0' },
    { label: 'Uptime', value: '0%' },
  ];

  const features = [
    {
      title: 'Modération Avancée',
      description: "Un système complet de modération pour maintenir votre serveur sécurisé.",
      icon: '🛡️',
      details: [
        'Commandes de modération essentielles (ban, kick, mute)',
        "Système d'avertissements avec niveaux",
        'Protection anti-raid et mode lent',
        'Auto-modération configurable'
      ],
      commands: [
        '/ban',
        '/kick',
        '/mute',
        '/warn',
        '/raidmode'
      ]
    },
    {
      title: 'Système de Niveaux',
      description: "Un système d'XP complet pour récompenser l'engagement de vos membres.",
      icon: '⭐',
      details: [
        "Gain d'XP automatique personnalisable",
        'Récompenses par niveau configurables',
        'Classement des membres actifs',
        "Commandes de gestion d'XP"
      ],
      commands: [
        '/level',
        '/leaderboard',
        '/setup',
        '/resetxp'
      ]
    },
    {
      title: 'Gestion des Rôles',
      description: "Gérez facilement les rôles et les permissions sur votre serveur.",
      icon: '👑',
      details: [
        'Attribution automatique de rôles',
        'Rôles par réaction',
        'Création et gestion des rôles',
        'Hiérarchie des permissions'
      ],
      commands: [
        '/addrole',
        '/removerole',
        '/createrole',
        '/reactionrole'
      ]
    },
    {
      title: 'Logs et Surveillance',
      description: "Gardez une trace de toutes les activités importantes.",
      icon: '📝',
      details: [
        'Logs de modération',
        'Suivi des messages',
        'Logs des membres',
        'Historique des rôles'
      ],
      commands: [
        '/logs',
        '/setlogs',
        '/viewlogs',
        '/history'
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-900 via-aurora-start to-aurora-end">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-secondary-900 mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.img
              src="/aurora logo.png"
              alt="Aurora Logo"
              className="w-32 h-32 mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Bienvenue sur Aurora
            </motion.h1>
            <motion.p
              className="text-xl text-white mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Votre assistant Discord intelligent, conçu pour améliorer votre
              expérience de modération et d'administration.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Inviter Aurora
              </a>
              <a href="/documentation" className="btn btn-secondary">
                Documentation
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez comment Aurora peut améliorer votre serveur Discord avec
              ses fonctionnalités avancées.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="bg-secondary-800/30 rounded-xl p-8 backdrop-blur-sm hover:bg-secondary-800/50 transition-all duration-300 border border-white/5"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{feature.icon}</span>
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/80 mb-6 text-base leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {feature.details.map((detail) => (
                    <li key={detail} className="text-white/70 flex items-center text-sm">
                      <svg
                        className="w-4 h-4 mr-2 text-aurora-accent flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-medium text-white mb-3">
                    Commandes principales :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.commands.map((command) => (
                      <span
                        key={command}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-aurora-accent/10 text-aurora-accent"
                      >
                        {command}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center p-8 bg-secondary-800/30 rounded-xl backdrop-blur-sm hover:bg-secondary-800/50 transition-all duration-300 border border-white/5"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-5xl font-bold text-white mb-4">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 