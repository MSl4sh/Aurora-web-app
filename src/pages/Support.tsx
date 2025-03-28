import { motion } from 'framer-motion';

const Support = () => {
  return (
    <div className="min-h-screen  via-aurora-start to-aurora-end">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">Support Aurora</h1>
          <p className="text-lg text-secondary-300 text-center mb-12">
            Besoin d'aide avec Aurora ? Notre système de tickets est là pour vous aider.
          </p>

          {/* Système de Tickets */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-800/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Comment créer un ticket ?</h2>
              <div className="space-y-4">
                <p className="text-secondary-300">
                  Pour créer un ticket de support, utilisez la commande :
                </p>
                <div className="bg-secondary-700/50 p-4 rounded-lg border border-secondary-600">
                  <code className="text-aurora-accent">/ticket create</code>
                </div>
                <p className="text-secondary-300">
                  Vous devrez ensuite spécifier la raison de votre ticket. Notre équipe de support vous répondra dans les plus brefs délais.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-800/50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Autres moyens de contact</h2>
              <div className="space-y-4">
                <a
                  href="https://discord.gg/A4d2t9j62T"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-secondary-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Serveur Discord
                </a>
                <a
                  href="/documentation"
                  className="flex items-center text-secondary-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Documentation
                </a>
              </div>
            </motion.div>
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-secondary-800/50 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Questions fréquentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Comment configurer le système de tickets ?</h3>
                <p className="text-secondary-300">
                  Utilisez la commande <code className="text-aurora-accent">/config tickets</code> pour configurer les paramètres du système de tickets, comme la catégorie, le salon de logs et le rôle du support.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Comment gérer les tickets ?</h3>
                <p className="text-secondary-300">
                  Les tickets peuvent être gérés avec les commandes suivantes :
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><code className="text-aurora-accent">/ticket close</code> - Fermer un ticket</li>
                    <li><code className="text-aurora-accent">/ticket add</code> - Ajouter un membre au ticket</li>
                    <li><code className="text-aurora-accent">/ticket remove</code> - Retirer un membre du ticket</li>
                  </ul>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Comment suivre les tickets ?</h3>
                <p className="text-secondary-300">
                  Le système de logs de tickets permet de suivre toutes les actions effectuées dans les tickets. Configurez le salon de logs avec <code className="text-aurora-accent">/config logs</code> pour activer cette fonctionnalité.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support; 