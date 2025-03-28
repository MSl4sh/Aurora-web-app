import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Documentation = () => {
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
              Documentation Aurora
            </h1>
            <p className="text-xl md:text-2xl text-secondary-100 mb-8 max-w-3xl mx-auto">
              Guide complet pour installer et configurer Aurora sur votre serveur Discord
            </p>
          </motion.div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-secondary-800/30 rounded-xl p-8 backdrop-blur-sm border border-white/5 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Installation</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Inviter le bot
                  </h3>
                  <p className="text-secondary-200 mb-6">
                    Pour ajouter Aurora à votre serveur, cliquez sur le bouton ci-dessous et sélectionnez votre serveur.
                  </p>
                  <a
                    href="https://discord.com/oauth2/authorize?client_id=1304850168981749780&permissions=8&scope=bot%20applications.commands"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center gap-2 justify-center w-fit"
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

                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Permissions Requises
                  </h3>
                  <p className="text-secondary-200 mb-4">
                    Pour fonctionner correctement, Aurora nécessite les permissions suivantes :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-secondary-700/30 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-3">Permissions de Base</h4>
                      <ul className="space-y-2">
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Lire les messages</span>
                            <p className="text-secondary-400 text-xs mt-1">Nécessaire pour les commandes et la modération automatique</p>
                          </div>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Envoyer des messages</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour les réponses aux commandes et les notifications</p>
                          </div>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Gérer les messages</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour la modération et le nettoyage automatique</p>
                          </div>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Voir les salons</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour accéder aux canaux de logs et de modération</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-secondary-700/30 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-3">Permissions de Modération</h4>
                      <ul className="space-y-2">
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Gérer les rôles</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour le système de niveaux et les récompenses</p>
                          </div>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Gérer les salons</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour le système de tickets et la création de canaux</p>
                          </div>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Bannir des membres</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour la modération et la protection anti-raid</p>
                          </div>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <div>
                            <span className="font-medium">Expulser des membres</span>
                            <p className="text-secondary-400 text-xs mt-1">Pour la modération et les actions temporaires</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 bg-secondary-700/30 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-white mb-3">Configuration des Permissions</h4>
                    <div className="space-y-3">
                      <p className="text-secondary-300 text-sm">
                        Pour configurer les permissions du bot :
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-secondary-300 text-sm">
                        <li>Assurez-vous que le rôle du bot est placé au-dessus des rôles qu'il doit gérer</li>
                        <li>Vérifiez que le bot a accès aux canaux nécessaires</li>
                        <li>Configurez les permissions spécifiques pour chaque système dans les paramètres du serveur</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary-800/30 rounded-xl p-8 backdrop-blur-sm border border-white/5">
              <h2 className="text-3xl font-bold text-white mb-6">Configuration</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Configuration Initiale
                  </h3>
                  <p className="text-secondary-200 mb-4">
                    Une fois le bot invité, utilisez les commandes suivantes pour le configurer :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-secondary-700/30 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-3">Commandes de Base</h4>
                      <ul className="space-y-2">
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <code className="text-aurora-accent">/config</code>
                          <span className="ml-2 text-secondary-400">- Configuration générale</span>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <code className="text-aurora-accent">/config logs</code>
                          <span className="ml-2 text-secondary-400">- Configuration des logs</span>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <code className="text-aurora-accent">/config automod</code>
                          <span className="ml-2 text-secondary-400">- Configuration de l'AutoMod</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-secondary-700/30 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-3">Systèmes Avancés</h4>
                      <ul className="space-y-2">
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <code className="text-aurora-accent">/config xp</code>
                          <span className="ml-2 text-secondary-400">- Configuration du système d'XP</span>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <code className="text-aurora-accent">/config anti-raid</code>
                          <span className="ml-2 text-secondary-400">- Configuration de l'anti-raid</span>
                        </li>
                        <li className="text-secondary-300 text-sm flex items-start">
                          <span className="mr-2 text-aurora-accent mt-1">•</span>
                          <code className="text-aurora-accent">/config welcome</code>
                          <span className="ml-2 text-secondary-400">- Configuration des messages de bienvenue</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Exemples d'Utilisation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-secondary-700/30 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-3">Configuration des Logs</h4>
                      <div className="space-y-3">
                        <p className="text-secondary-300 text-sm">
                          Pour configurer les logs de modération :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config logs mod-logs #logs-modération
                        </code>
                        <p className="text-secondary-300 text-sm">
                          Pour configurer les logs de messages :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config logs message-logs #logs-messages
                        </code>
                      </div>
                    </div>
                    <div className="bg-secondary-700/30 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-3">Configuration de l'AutoMod</h4>
                      <div className="space-y-3">
                        <p className="text-secondary-300 text-sm">
                          Pour activer l'AutoMod :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config automod enable
                        </code>
                        <p className="text-secondary-300 text-sm">
                          Pour ajouter un mot interdit :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config automod add-word spam
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Système d'XP et Niveaux
                  </h3>
                  <div className="bg-secondary-700/30 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-secondary-300 text-sm mb-2">
                          Pour configurer le système d'XP :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config xp enable
                        </code>
                      </div>
                      <div>
                        <p className="text-secondary-300 text-sm mb-2">
                          Pour définir un rôle de récompense :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config xp add-role @Niveau10 10
                        </code>
                      </div>
                      <div>
                        <p className="text-secondary-300 text-sm mb-2">
                          Pour vérifier le niveau d'un membre :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /xp @membre
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Protection Anti-Raid
                  </h3>
                  <div className="bg-secondary-700/30 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-secondary-300 text-sm mb-2">
                          Pour activer la protection anti-raid :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config anti-raid enable
                        </code>
                      </div>
                      <div>
                        <p className="text-secondary-300 text-sm mb-2">
                          Pour configurer le seuil de détection :
                        </p>
                        <code className="block text-aurora-accent bg-secondary-800/50 p-2 rounded text-sm">
                          /config anti-raid set-threshold 5 10
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-aurora-accent mb-4">
                    Vérification
                  </h3>
                  <p className="text-secondary-200 mb-4">
                    Pour vérifier que tout fonctionne correctement :
                  </p>
                  <div className="bg-secondary-700/30 rounded-lg p-4">
                    <ul className="space-y-3">
                      <li className="text-secondary-300 text-sm flex items-start">
                        <span className="mr-2 text-aurora-accent mt-1">•</span>
                        Utilisez <code className="text-aurora-accent">/help</code> pour voir toutes les commandes disponibles
                      </li>
                      <li className="text-secondary-300 text-sm flex items-start">
                        <span className="mr-2 text-aurora-accent mt-1">•</span>
                        Testez les commandes de base comme <code className="text-aurora-accent">/ping</code>
                      </li>
                      <li className="text-secondary-300 text-sm flex items-start">
                        <span className="mr-2 text-aurora-accent mt-1">•</span>
                        Vérifiez que les logs sont bien envoyés dans les canaux configurés
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/commands" className="btn btn-secondary w-full justify-center">
                  Voir toutes les commandes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Documentation; 