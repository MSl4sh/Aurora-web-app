import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-900 via-aurora-start to-aurora-end">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 pb-16"
      >
        <div className="content-wrapper">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-secondary-100 mb-8 font-light">
              Tout ce dont vous avez besoin pour maîtriser Aurora
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* Commandes Principales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Commandes Principales
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-aurora-accent mb-2">
                    /help
                  </h3>
                  <p className="text-secondary-200 mb-3">
                    Affiche la liste complète des commandes disponibles avec leurs descriptions détaillées.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Vue d'ensemble des catégories de commandes
                    </li>
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Exemples d'utilisation pour chaque commande
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-aurora-accent mb-2">
                    /config
                  </h3>
                  <p className="text-secondary-200 mb-3">
                    Personnalisez Aurora selon les besoins de votre serveur.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Configuration des systèmes de modération
                    </li>
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Paramètres des niveaux et récompenses
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/commands" className="btn btn-primary w-full justify-center">
                  Voir toutes les commandes
                </Link>
              </div>
            </motion.div>

            {/* Fonctionnalités Avancées */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Fonctionnalités Avancées
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-aurora-accent mb-2">
                    Système de Logs
                  </h3>
                  <p className="text-secondary-200 mb-3">
                    Suivez toutes les actions importantes sur votre serveur.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Logs de modération détaillés
                    </li>
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Historique des commandes
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-aurora-accent mb-2">
                    Auto-Modération
                  </h3>
                  <p className="text-secondary-200 mb-3">
                    Protection automatique contre le spam et les contenus indésirables.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Filtres de contenu personnalisables
                    </li>
                    <li className="text-secondary-300 text-sm flex items-start">
                      <span className="mr-2 text-aurora-accent mt-1">•</span>
                      Actions automatiques configurables
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/invite" className="btn btn-secondary w-full justify-center">
                  Commencer maintenant
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Documentation; 