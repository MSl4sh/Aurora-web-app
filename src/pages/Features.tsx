import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: 'AutoMod',
      description: 'Système de modération automatique complet pour protéger votre serveur.',
      details: [
        'Limites de messages, mentions et émojis',
        'Protection contre le spam et les liens',
        'Filtres de mots interdits personnalisables',
        'Actions automatiques configurables',
      ],
      icon: '🛡️',
      commands: ['/config automod']
    },
    {
      title: 'Système de Tickets',
      description: 'Gestion intégrée des tickets de support pour votre communauté.',
      details: [
        'Création de tickets personnalisés',
        'Gestion des tickets par le support',
        'Système de logs détaillé',
        'Gestion des membres du ticket',
      ],
      icon: '🎫',
      commands: ['/ticket']
    },
    {
      title: 'XP et Niveaux',
      description: 'Système d\'XP complet pour récompenser l\'engagement.',
      details: [
        'Gain d\'XP par message et vocal',
        'Récompenses de niveau personnalisables',
        'Classement des membres actifs',
        'Configuration flexible des gains',
      ],
      icon: '⭐',
      commands: ['/xp', '/rewards']
    },
    {
      title: 'Anti-Raid',
      description: 'Protection avancée contre les raids et les comptes malveillants.',
      details: [
        'Détection des raids automatique',
        'Vérification de l\'âge des comptes',
        'Actions automatiques configurables',
        'Mode raid activable',
      ],
      icon: '🛡️',
      commands: ['/config anti-raid']
    },
    {
      title: 'Système de Logs',
      description: 'Journalisation complète des actions sur votre serveur.',
      details: [
        'Logs de modération',
        'Logs de messages',
        'Logs de membres',
        'Logs de rôles',
      ],
      icon: '📝',
      commands: ['/config logs']
    },
    {
      title: 'Configuration',
      description: 'Personnalisation complète de votre serveur.',
      details: [
        'Configuration des systèmes',
        'Messages personnalisables',
        'Rôles et permissions',
        'Paramètres avancés',
      ],
      icon: '⚙️',
      commands: ['/config']
    }
  ];

  return (
    <div className="min-h-screen  via-aurora-start to-aurora-end">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Fonctionnalités d'Aurora
            </h1>
            <p className="text-xl md:text-2xl text-secondary-100 mb-8 max-w-3xl mx-auto">
              Découvrez toutes les fonctionnalités qui font d'Aurora le bot parfait pour votre serveur Discord
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary-800/30 rounded-lg p-6 border border-secondary-700/50 hover:border-aurora-hover transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4 animate-float">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-secondary-100 mb-6">{feature.description}</p>
                <ul className="space-y-2 mb-6">
                  {feature.details.map((detail) => (
                    <li key={detail} className="text-secondary-200 text-sm flex items-start">
                      <span className="mr-2 text-aurora-hover">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                {feature.commands && (
                  <div className="pt-4 border-t border-secondary-700/50">
                    <p className="text-sm text-secondary-200 mb-2">Commandes principales :</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.commands.map((cmd) => (
                        <span key={cmd} className="px-2 py-1 text-xs rounded-full bg-aurora-hover/20 text-aurora-hover border border-aurora-hover/20">
                          {cmd}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Prêt à améliorer votre serveur ?
          </h2>
          <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de serveurs qui utilisent déjà Aurora pour une meilleure expérience Discord.
          </p>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1304850168981749780&permissions=8&scope=bot%20applications.commands"
            className="btn btn-primary flex items-center gap-2 justify-center mx-auto w-fit"
            target="_blank"
            rel="noopener noreferrer"
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
        </div>
      </section>
    </div>
  );
};

export default Features; 