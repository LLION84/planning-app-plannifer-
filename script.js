(function () {
  "use strict";

  /* =========================================================
     1. DONNÉES DE RÉFÉRENCE : catégories, conseils, jours
     ========================================================= */
  const CATEGORIES = {
    sport:  { label: "Sport" },
    etudes: { label: "Études" },
    menage: { label: "Ménage / Maison" },
    admin:  { label: "Admin / Vie perso" },
    pro:    { label: "Vie pro" }
  };

  const CONSEILS = {
    sport: [
      "Bois de l'eau avant, pendant et après ta séance.",
      "Échauffe-toi 5 minutes avant l'effort intense pour éviter les blessures.",
      "Étire-toi après chaque série pour préserver ta souplesse.",
      "Respire profondément entre les répétitions pour mieux récupérer.",
      "Dors au moins 7h la nuit qui suit un entraînement intense, c'est là que le muscle se répare.",
      "Mange une source de protéines dans l'heure qui suit ta séance.",
      "Ne saute pas les jours de repos, ils font partie du programme.",
      "Varie les exercices de temps en temps pour ne pas stagner.",
      "Concentre-toi sur la qualité du mouvement plutôt que sur le poids soulevé.",
      "Note tes performances pour voir ta progression dans le temps.",
      "Une douleur vive n'est jamais normale, écoute ton corps.",
      "Fixe-toi un objectif précis pour cette séance, pas juste \"faire du sport\".",
      "Chauffe bien les articulations sollicitées avant les charges lourdes.",
      "Garde le dos droit et le gainage actif pendant l'effort.",
      "Une séance courte mais régulière vaut mieux qu'une longue par mois.",
      "Range ton téléphone pendant la séance, la concentration en dépend.",
      "Limite la caféine après 16h si tu t'entraînes le soir, ça perturbe le sommeil.",
      "Compare ta séance d'aujourd'hui seulement à celle d'hier, pas à celle des autres.",
      "Termine par un retour au calme pour faire redescendre le rythme cardiaque.",
      "Prépare ton sac et tes affaires la veille, ça enlève une excuse de plus.",
      "Mets des chaussures adaptées à ton activité pour éviter les blessures.",
      "Hydrate-toi tout au long de la journée, pas seulement pendant l'effort.",
      "Ajuste la charge ou l'intensité si tu sens une fatigue anormale.",
      "Fixe-toi des objectifs progressifs plutôt qu'un objectif final trop loin.",
      "Un carnet d'entraînement aide à voir tes progrès sur plusieurs semaines.",
      "Mange léger avant l'effort pour éviter l'inconfort digestif.",
      "Respecte au moins 48h de repos pour un même groupe musculaire.",
      "La régularité compte plus que l'intensité d'une seule séance.",
      "Prépare ta tenue de sport la veille pour réduire les excuses du matin.",
      "Célèbre chaque séance faite, même courte : c'est une victoire sur la procrastination."
    ],
    etudes: [
      "Coupe les notifications du téléphone avant de commencer.",
      "Utilise la technique Pomodoro : 25 minutes de travail, 5 de pause.",
      "Reformule ce que tu apprends avec tes propres mots, ça ancre mieux la mémoire.",
      "Teste-toi régulièrement plutôt que de relire, la mémoire active est plus efficace.",
      "Étale tes révisions dans le temps plutôt que de tout faire la veille.",
      "Explique ce que t'as appris à voix haute, comme si tu l'enseignais à quelqu'un.",
      "Travaille toujours au même endroit calme, ton cerveau associe le lieu à la concentration.",
      "Bois de l'eau, la déshydratation réduit la concentration.",
      "Dors suffisamment, c'est pendant le sommeil que les souvenirs se consolident.",
      "Découpe une grosse tâche en petites étapes claires.",
      "Élimine les distractions visuelles de ton bureau avant de commencer.",
      "Change de matière toutes les heures pour garder l'attention fraîche.",
      "Fais des fiches courtes plutôt que de recopier tout le cours.",
      "Utilise des exemples concrets pour comprendre une notion abstraite.",
      "Relie les nouvelles infos à des choses que tu connais déjà.",
      "Prends une vraie pause (pas ton téléphone) pour reposer les yeux et le cerveau.",
      "Fixe une durée précise avant de commencer, ça aide à démarrer.",
      "Récite ce que t'as retenu sans regarder tes notes pour tester vraiment.",
      "Travaille les sujets difficiles au moment où t'es le plus concentré.",
      "Une bonne nuit de sommeil vaut mieux qu'une nuit blanche à réviser.",
      "Prépare ton espace de travail avant de t'asseoir, ça évite les micro-interruptions.",
      "Alterne les matières difficiles et faciles pour garder l'énergie mentale.",
      "Utilise des couleurs ou des schémas pour visualiser les liens entre les idées.",
      "Fixe-toi un petit objectif atteignable par session, pas juste \"réviser\".",
      "Note tes questions en cours de route plutôt que de rester bloqué dessus.",
      "Une session de 25 à 45 minutes bien concentrée vaut mieux que 3h dispersées.",
      "Vérifie ta compréhension en essayant d'expliquer un concept sans tes notes.",
      "Prends l'air quelques minutes entre deux sessions pour raviver l'attention.",
      "Range ton téléphone dans une autre pièce pendant les phases importantes.",
      "Relis tes erreurs passées, elles indiquent exactement quoi retravailler."
    ],
    menage: [
      "Mets une playlist ou un podcast, le temps passe plus vite.",
      "Commence par la pièce qui te dérange le plus, tu seras soulagé plus vite.",
      "Range d'abord, nettoie ensuite, c'est plus efficace.",
      "Mets un minuteur de 15 minutes, tu seras surpris de ce que tu peux faire.",
      "Un sac poubelle à portée de main pendant que tu ranges évite les allers-retours.",
      "Fais un tour rapide de 5 minutes chaque soir pour éviter l'accumulation.",
      "Aère la pièce pendant que tu nettoies.",
      "Un objet, une décision : garder, ranger ou jeter, ne le repose pas \"pour plus tard\".",
      "Nettoie de haut en bas, la poussière tombe.",
      "Prépare tous tes produits avant de commencer pour ne pas t'interrompre.",
      "Découpe la corvée en zones si t'as peu de temps, une pièce à la fois.",
      "Prévois une petite pause après, ça motive à s'y remettre la fois d'après.",
      "Garde un panier pour les objets \"mal placés\" que tu ranges à la fin.",
      "Nettoie juste après usage (vaisselle, plan de travail), ça évite l'accumulation.",
      "Change l'eau ou le produit dès qu'il est sale, tu nettoies pas avec de la saleté.",
      "Utilise un panier par pièce pour trier ce qui doit être rangé ailleurs.",
      "Fais tourner une lessive pendant que tu t'occupes d'autre chose.",
      "Nettoie les surfaces juste après les avoir salies, c'est plus rapide.",
      "Prévois un jour fixe dans la semaine pour le grand ménage, ça devient automatique.",
      "Désencombre avant de nettoyer, il y a moins d'objets à contourner.",
      "Utilise une checklist pour ne rien oublier dans les pièces moins visibles.",
      "Change les draps une fois par semaine, ça prend 5 minutes et ça fait du bien.",
      "Vide les poubelles avant qu'elles débordent, pas après.",
      "Nettoie l'évier juste après la vaisselle pour garder la cuisine impeccable.",
      "Un coin rangé donne envie de garder le reste rangé, commence petit.",
      "Prépare un kit de nettoyage rapide, facile à attraper pour les corvées express.",
      "Trie par catégorie (vêtements, papiers, objets) plutôt que pièce par pièce.",
      "Programme un rappel pour les tâches qu'on oublie facilement (vitres, frigo).",
      "Nettoie en partant de la pièce la plus utilisée vers la moins utilisée.",
      "Ouvre une fenêtre en fin de ménage pour faire circuler l'air propre."
    ],
    admin: [
      "Prépare tous les documents nécessaires avant de commencer une démarche.",
      "Note les numéros de dossier ou de référence au fur et à mesure.",
      "Fais les démarches administratives tôt le matin, les lignes sont moins chargées.",
      "Garde une copie (photo ou scan) de chaque document important.",
      "Occupe-toi d'une seule démarche à la fois, ne mélange pas plusieurs dossiers.",
      "Utilise un dossier dédié (physique ou numérique) pour ne rien perdre.",
      "Note la date et l'interlocuteur à chaque appel ou échange important.",
      "Prévois plus de temps que ce que tu penses, l'administratif traîne souvent.",
      "Relis un document avant de l'envoyer, une erreur coûte du temps derrière.",
      "Classe tes papiers au fur et à mesure plutôt qu'en gros tas plus tard.",
      "Fixe un créneau fixe chaque semaine pour traiter l'administratif en bloc.",
      "Scanne systématiquement les documents importants dès leur réception.",
      "Utilise un tableau simple pour suivre l'état de chaque démarche en cours.",
      "Note le délai de réponse annoncé pour savoir quand relancer.",
      "Garde tes identifiants administratifs dans un endroit sûr et centralisé.",
      "Traite les démarches urgentes en premier, le reste peut attendre une semaine.",
      "Prépare une pièce d'identité et un justificatif à jour, souvent demandés.",
      "Envoie tes documents importants en recommandé, tu gardes une preuve.",
      "Note les horaires d'ouverture avant de te déplacer pour une démarche.",
      "Fais une liste des démarches en attente pour ne pas en oublier une.",
      "Relis un formulaire deux fois avant de le valider, une erreur ralentit tout.",
      "Privilégie l'écrit (mail) au téléphone, tu gardes une trace de l'échange.",
      "Anticipe les renouvellements (papiers, abonnements) avant l'échéance.",
      "Regroupe les démarches similaires le même jour pour gagner du temps.",
      "Demande un accusé de réception pour les démarches importantes.",
      "Range tes documents administratifs par année pour t'y retrouver.",
      "Prévois une petite récompense après une démarche pénible, ça aide à s'y mettre.",
      "Prends en photo chaque document avant de l'envoyer ou de le poster.",
      "Découpe une démarche complexe en petites étapes avec des cases à cocher.",
      "Ne remets pas à demain une démarche qui prend moins de 10 minutes."
    ],
    pro: [
      "Fais la liste de tes 3 priorités du jour avant de commencer à travailler.",
      "Traite les mails par blocs plutôt qu'en continu, ça évite les interruptions.",
      "Ferme les onglets inutiles pendant une tâche qui demande de la concentration.",
      "Prends une vraie pause déjeuner, loin de l'écran.",
      "Prépare ce dont t'as besoin pour demain avant de finir ta journée.",
      "Dis non à une nouvelle tâche si ton temps du jour est déjà plein.",
      "Fais les tâches difficiles au moment où t'es le plus concentré dans la journée.",
      "Note les idées qui te viennent en cours de tâche pour ne pas perdre le fil.",
      "Prends 2 minutes pour relire un message important avant de l'envoyer.",
      "Termine la journée en notant où tu t'es arrêté, ça facilite la reprise demain.",
      "Bloque des créneaux dans ton agenda pour le travail profond, sans interruption.",
      "Prépare ta liste du lendemain la veille au soir, tu démarres plus vite le matin.",
      "Fais une seule chose à la fois, le multitâche ralentit la qualité globale.",
      "Prends des notes de réunion structurées pour ne rien perdre après coup.",
      "Vérifie tes priorités en fin de matinée, elles changent parfois vite.",
      "Accorde-toi une vraie coupure entre deux tâches différentes.",
      "Préviens tôt si un délai risque de ne pas être tenu.",
      "Range ton espace de travail en fin de journée, tu commences mieux le lendemain.",
      "Évite de répondre aux messages non urgents pendant une tâche importante.",
      "Fixe une heure de fin de journée et respecte-la autant que possible.",
      "Prépare l'ordre du jour avant une réunion, ça la rend plus efficace.",
      "Découpe un gros projet en étapes avec des échéances intermédiaires.",
      "Fais le point une fois par semaine sur ce qui avance et ce qui bloque.",
      "Priorise ce qui a un impact réel plutôt que ce qui est juste urgent.",
      "Documente tes méthodes de travail, ça t'évite de tout refaire de mémoire.",
      "Demande de l'aide dès qu'un blocage dépasse 15 à 20 minutes.",
      "Sépare clairement l'urgent de l'important mais non urgent.",
      "Termine une tâche avant d'en commencer une autre quand c'est possible.",
      "Note les décisions prises en réunion pour éviter les malentendus plus tard.",
      "Célèbre les petites victoires du jour, pas seulement les grands objectifs."
    ]
  };
  const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const JOURS_COURTS = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
  const JOURS_LETTRE = ["D", "L", "M", "M", "J", "V", "S"];
  const ORDRE_SEMAINE = [1, 2, 3, 4, 5, 6, 0]; // lundi -> dimanche
  const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  const ICONES = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"/></svg>',
    star: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6.5 7l1 13h9l1-13"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l3 3-3 3"/><path d="M4 12V9a3 3 0 0 1 3-3h13"/><path d="M7 21l-3-3 3-3"/><path d="M20 12v3a3 3 0 0 1-3 3H4"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c.6 3.2-1.4 4.9-2.9 6.6C7.6 10.8 6 12.6 6 15.2 6 18.9 8.7 21.5 12 21.5s6-2.6 6-6.1c0-2.6-1.3-4.3-2.6-5.6-.2 1.6-.9 2.6-2 3 .5-3.5-.4-7.2-1.4-9.4z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 5 8 12 15 19"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 16 12 9 19"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="12" x2="18" y2="12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>'
  };

  /* =========================================================
     2. PETITS OUTILS (dates, heures, textes)
     ========================================================= */
  function pad(n) { return String(n).padStart(2, "0"); }
  function cleDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function depuisCle(k) { const p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function ajouterJours(k, n) { const d = depuisCle(k); d.setDate(d.getDate() + n); return cleDate(d); }
  function aujourdhui() { return cleDate(new Date()); }
  function lundiDe(k) { const d = depuisCle(k); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return cleDate(d); }
  function jourSemaine(k) { return depuisCle(k).getDay(); }
  function enMinutes(h) { const p = String(h || "0:0").split(":").map(Number); return p[0] * 60 + (p[1] || 0); }
  function minutesMaintenant() { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  function heureMaintenant() { const d = new Date(); return pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function formatDuree(min) {
    const h = Math.floor(min / 60), m = min % 60;
    if (h === 0) return m + " min";
    return h + "h" + (m ? pad(m) : "");
  }
  function dateLongue(k) { const d = depuisCle(k); return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()]; }
  function nouvelId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function idPropre(v, i) {
    const s = String(v == null ? "" : v).replace(/[^A-Za-z0-9_.~:@+-]/g, "");
    return (s && s !== "." && s !== "..") ? s.slice(0, 60) : "old" + i + nouvelId();
  }
  function cloner(o) { return JSON.parse(JSON.stringify(o)); }
  function el(tag, cls, texte) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texte != null) e.textContent = texte;
    return e;
  }
  function boutonIcone(cls, icone, label) {
    const b = el("button", cls);
    b.type = "button";
    b.innerHTML = ICONES[icone];
    b.setAttribute("aria-label", label);
    b.title = label;
    return b;
  }
  function chip(icone, texte, cls) {
    const b = el("button", "chip-btn" + (cls ? " " + cls : ""));
    b.type = "button";
    if (icone) b.innerHTML = ICONES[icone];
    b.appendChild(document.createTextNode(texte));
    return b;
  }
  function libelleJours(jours) {
    if (!jours || !jours.length) return "";
    if (jours.length === 7) return "Tous les jours";
    const semaine = [1, 2, 3, 4, 5];
    if (jours.length === 5 && semaine.every(function (j) { return jours.includes(j); })) return "En semaine";
    if (jours.length === 2 && jours.includes(0) && jours.includes(6)) return "Le week-end";
    if (jours.length === 6) return "Sauf " + JOURS_COURTS[[0, 1, 2, 3, 4, 5, 6].find(function (j) { return !jours.includes(j); })];
    return ORDRE_SEMAINE.filter(function (j) { return jours.includes(j); })
      .map(function (j) { return JOURS_COURTS[j]; }).join(", ");
  }

  /* =========================================================
     3. ÉTAT DE L'APPLI
     ========================================================= */
  function etatVide() { return { tasks: {}, todos: {}, meta: { top3: {}, focus: {}, journal: {} } }; }

  function normTache(t, i) {
    const jours = Array.isArray(t.jours) ? t.jours.filter(function (j) { return j >= 0 && j <= 6; }) : [];
    return {
      id: idPropre(t.id, i || 0),
      titre: String(t.titre || "Sans titre"),
      heure: t.heure || "08:00",
      heureFin: t.heureFin || "",
      categorie: CATEGORIES[t.categorie] ? t.categorie : "pro",
      notes: t.notes || "",
      date: t.date || null,
      jours: jours,
      debut: t.debut || "",
      faits: t.faits && typeof t.faits === "object" ? t.faits : {},
      etapes: Array.isArray(t.etapes) ? t.etapes : [],
      etapesFaites: t.etapesFaites && typeof t.etapesFaites === "object" ? t.etapesFaites : {},
      creeLe: t.creeLe || ""
    };
  }
  function normTodo(d, i) {
    return {
      id: idPropre(d.id, i || 0),
      texte: String(d.texte || "Sans titre"),
      date: d.date || aujourdhui(),
      fait: !!d.fait,
      faitLe: d.faitLe || null,
      etapes: Array.isArray(d.etapes) ? d.etapes : [],
      creeLe: d.creeLe || Date.now()
    };
  }
  function normMeta(m) {
    m = m || {};
    return {
      top3: m.top3 && typeof m.top3 === "object" ? m.top3 : {},
      focus: m.focus && typeof m.focus === "object" ? m.focus : {},
      journal: m.journal && typeof m.journal === "object" ? m.journal : {}
    };
  }
  function normEtat(s) {
    const n = etatVide();
    Object.keys((s && s.tasks) || {}).forEach(function (k, i) { const t = normTache(s.tasks[k], i); n.tasks[t.id] = t; });
    Object.keys((s && s.todos) || {}).forEach(function (k, i) { const d = normTodo(s.todos[k], i); n.todos[d.id] = d; });
    n.meta = normMeta(s && s.meta);
    return n;
  }

  let etat = etatVide();

  /* =========================================================
     4. SAUVEGARDE : sur l'appareil, ou synchronisée (lien Claude)
     ========================================================= */
  const CLE_LOCALE = "planningZinouV2";
  const CLE_CACHE = "planningZinouCache";
  const CLE_FOCUS = "planningZinouFocus";

  function lireLocal(cle) { try { return JSON.parse(localStorage.getItem(cle)); } catch (e) { return null; } }
  function ecrireLocal(cle, v) { try { localStorage.setItem(cle, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } }

  // Ancien format (première version de l'appli) -> nouveau format
  function depuisAncienFormat() {
    const s = etatVide();
    const today = aujourdhui();
    (lireLocal("planningTasks") || []).forEach(function (t, i) {
      const n = normTache({
        id: t.id, titre: t.titre, heure: t.heure, heureFin: t.heureFin, categorie: t.categorie, notes: t.notes,
        jours: [0, 1, 2, 3, 4, 5, 6]
      }, i);
      s.tasks[n.id] = n;
    });
    (lireLocal("todos") || []).forEach(function (d, i) {
      const n = normTodo({ id: d.id, texte: d.texte, date: today, fait: d.fait, faitLe: d.fait ? today : null }, i);
      s.todos[n.id] = n;
    });
    return s;
  }
  function chargerLocal() {
    const v2 = lireLocal(CLE_LOCALE);
    if (v2 && v2.tasks) return normEtat(v2);
    return depuisAncienFormat();
  }

  const sync = { mode: "local", pret: false, refs: null, enAttente: [], files: {}, erreur: false };

  function persister(op) {
    if (sync.mode === "db" && sync.pret) { ecrireDb(op); ecrireLocal(CLE_CACHE, etat); return; }
    if (!sync.pret) sync.enAttente.push(op);
    ecrireLocal(sync.mode === "db" ? CLE_CACHE : CLE_LOCALE, etat);
  }

  function enFile(chemin, fn) {
    const avant = sync.files[chemin] || Promise.resolve();
    const apres = avant.catch(function () {}).then(fn).catch(function (e) { erreurDb(e); });
    sync.files[chemin] = apres;
    return apres;
  }
  function ecrireDb(op) {
    const r = sync.refs;
    if (op.type === "task") {
      const ref = r.tasks.doc(op.id);
      enFile(ref.path, op.suppr ? function () { return ref.delete(); } : function () { return ref.set(op.valeur); });
    } else if (op.type === "todo") {
      const ref = r.todos.doc(op.id);
      enFile(ref.path, op.suppr ? function () { return ref.delete(); } : function () { return ref.set(op.valeur); });
    } else if (op.type === "meta") {
      enFile(r.meta.path, function () { return r.meta.update(op.patch); });
    }
  }
  function erreurDb(e) {
    const code = e && e.code;
    if (code === "quota_exceeded") notifier("Stockage plein : supprime quelques vieilles tâches.");
    else if (code === "revoked" || code === "not_granted") { sync.erreur = true; rendreSync(); }
    else if (code === "unavailable") notifier("Connexion instable, réessaie dans un instant.");
  }

  // Modifications (toujours via ces fonctions)
  function enregistrerTache(t) { etat.tasks[t.id] = t; persister({ type: "task", id: t.id, valeur: cloner(t) }); rendre(); }
  function supprimerTache(id) { delete etat.tasks[id]; persister({ type: "task", id: id, suppr: true }); rendre(); }
  function enregistrerTodo(d) { etat.todos[d.id] = d; persister({ type: "todo", id: d.id, valeur: cloner(d) }); rendre(); }
  function supprimerTodo(id) { delete etat.todos[id]; persister({ type: "todo", id: id, suppr: true }); rendre(); }
  function fusion(cible, patch) {
    Object.keys(patch).forEach(function (k) {
      const v = patch[k];
      if (v && typeof v === "object" && !Array.isArray(v)) {
        if (!cible[k] || typeof cible[k] !== "object") cible[k] = {};
        fusion(cible[k], v);
      } else {
        cible[k] = v;
      }
    });
  }
  function majMeta(patch, sansRendu) {
    fusion(etat.meta, patch);
    persister({ type: "meta", patch: cloner(patch) });
    if (!sansRendu) rendre();
  }

  async function demarrerSync() {
    const claude = window.claude;
    if (!claude || typeof claude.use !== "function") return passerEnLocal();
    let dbNs = null, userNs = null;
    try {
      const r = await Promise.all([claude.use("db"), claude.use("user")]);
      dbNs = r[0]; userNs = r[1];
    } catch (e) { /* rien */ }
    if (!dbNs || !userNs) return passerEnLocal();
    let uid = null;
    try { uid = await userNs.id(); } catch (e) { uid = null; }
    if (!uid) return passerEnLocal();

    try {
      const base = dbNs.doc("data/users/" + uid + "/planner");
      const refs = { tasks: base.collection("tasks"), todos: base.collection("todos"), meta: dbNs.doc("data/users/" + uid + "/meta") };
      const lus = await Promise.all([refs.tasks.get(), refs.todos.get(), refs.meta.get()]);

      if (!lus[2].exists && lus[0].empty && lus[1].empty) {
        // Première ouverture synchronisée : on envoie ce qui était enregistré sur cet appareil
        const local = chargerLocal();
        const taches = Object.keys(local.tasks), todos = Object.keys(local.todos);
        for (let i = 0; i < taches.length; i++) await refs.tasks.doc(taches[i]).set(cloner(local.tasks[taches[i]]));
        for (let i = 0; i < todos.length; i++) await refs.todos.doc(todos[i]).set(cloner(local.todos[todos[i]]));
        await refs.meta.set(cloner(local.meta));
      } else if (!lus[2].exists) {
        await refs.meta.set({ top3: {}, focus: {}, journal: {} });
      }

      sync.refs = refs;
      sync.mode = "db";
      sync.pret = true;
      // Ce qui a été modifié pendant le chargement part maintenant
      sync.enAttente.splice(0).forEach(ecrireDb);

      refs.tasks.onSnapshot(function (snap) {
        const n = {};
        snap.docs.forEach(function (d, i) { const v = d.data(); if (v) { const t = normTache(cloner(v), i); n[t.id] = t; } });
        etat.tasks = n; ecrireLocal(CLE_CACHE, etat); rendre();
      }, erreurDb);
      refs.todos.onSnapshot(function (snap) {
        const n = {};
        snap.docs.forEach(function (d, i) { const v = d.data(); if (v) { const t = normTodo(cloner(v), i); n[t.id] = t; } });
        etat.todos = n; ecrireLocal(CLE_CACHE, etat); rendre();
      }, erreurDb);
      refs.meta.onSnapshot(function (snap) {
        const v = snap.data();
        if (v) { etat.meta = normMeta(cloner(v)); ecrireLocal(CLE_CACHE, etat); rendre(); }
      }, erreurDb);
      rendreSync();
    } catch (e) {
      passerEnLocal();
    }
  }
  function passerEnLocal() {
    if (sync.pret) return;
    sync.mode = "local";
    sync.pret = true;
    sync.enAttente = [];
    ecrireLocal(CLE_LOCALE, etat);
    rendreSync();
  }

  /* =========================================================
     5. LOGIQUE : tâches du jour, états, Top 3, série
     ========================================================= */
  function tachesDu(date) {
    const dow = jourSemaine(date);
    return Object.values(etat.tasks).filter(function (t) {
      if (t.jours && t.jours.length) return t.jours.includes(dow) && (!t.debut || date >= t.debut);
      return t.date === date;
    }).sort(function (a, b) { return a.heure.localeCompare(b.heure) || a.titre.localeCompare(b.titre); });
  }
  function estFaite(t, date) { return !!(t.faits && t.faits[date]); }

  function todosDu(date) {
    const today = aujourdhui();
    return Object.values(etat.todos).filter(function (d) {
      if (d.date === date) return true;
      if (date === today && !d.fait && d.date < today) return true;          // reportée
      if (d.fait && d.faitLe === date && d.date < date) return true;          // faite après report
      return false;
    }).sort(function (a, b) {
      if (a.fait !== b.fait) return a.fait ? 1 : -1;
      return (a.creeLe || 0) > (b.creeLe || 0) ? 1 : -1;
    });
  }
  function estReportee(d, date) { return d.date < date; }

  // État horaire de chaque tâche (aujourd'hui seulement)
  function etatsHoraires(date) {
    const liste = tachesDu(date);
    const today = aujourdhui();
    const nowMin = minutesMaintenant();
    return liste.map(function (t, i) {
      const debut = enMinutes(t.heure);
      let fin = t.heureFin ? enMinutes(t.heureFin) : (liste[i + 1] ? enMinutes(liste[i + 1].heure) : 24 * 60);
      if (fin <= debut) fin = debut + 30;
      let moment = "futur";
      if (date < today) moment = "passe";
      else if (date === today) {
        if (nowMin >= fin) moment = "passe";
        else if (nowMin >= debut) moment = "maintenant";
      }
      return { tache: t, debut: debut, fin: fin, moment: moment, fait: estFaite(t, date) };
    });
  }

  function top3Cles(date) {
    const m = (etat.meta.top3 || {})[date] || {};
    return Object.keys(m).filter(function (k) { return m[k] != null; })
      .sort(function (a, b) { return m[a] - m[b]; });
  }
  function elementTop(cle, date) {
    const id = cle.slice(2);
    if (cle.indexOf("t:") === 0) {
      const t = etat.tasks[id];
      if (!t) return null;
      return { cle: cle, genre: "task", item: t, titre: t.titre, sous: t.heure, categorie: t.categorie, fait: estFaite(t, date) };
    }
    const d = etat.todos[id];
    if (!d) return null;
    return { cle: cle, genre: "todo", item: d, titre: d.texte, sous: "À faire", categorie: null, fait: d.fait };
  }
  function top3Du(date) {
    return top3Cles(date).map(function (k) { return elementTop(k, date); }).filter(Boolean);
  }
  function jourGagne(date) {
    const l = top3Du(date);
    return l.length > 0 && l.every(function (e) { return e.fait; });
  }
  function serieActuelle() {
    const today = aujourdhui();
    let d = jourGagne(today) ? today : ajouterJours(today, -1);
    let n = 0;
    while (jourGagne(d) && n < 3650) { n++; d = ajouterJours(d, -1); }
    return n;
  }
  function meilleureSerie() {
    const dates = Object.keys(etat.meta.top3 || {}).filter(jourGagne).sort();
    let best = 0, cur = 0, prev = null;
    dates.forEach(function (d) {
      cur = (prev && ajouterJours(prev, 1) === d) ? cur + 1 : 1;
      if (cur > best) best = cur;
      prev = d;
    });
    return best;
  }
  function basculerTop3(cle, date) {
    const cles = top3Cles(date);
    if (cles.includes(cle)) {
      majMeta({ top3: { [date]: { [cle]: null } } });
      return;
    }
    if (top3Du(date).length >= 3) { notifier("Ton Top 3 est déjà plein. Retire une étoile d'abord."); return; }
    // on nettoie les entrées d'éléments supprimés
    const patch = {}; patch[cle] = Date.now();
    cles.forEach(function (k) { if (!elementTop(k, date)) patch[k] = null; });
    majMeta({ top3: { [date]: patch } });
  }
  function apresCoche(date) {
    if (date === aujourdhui() && jourGagne(date)) {
      const s = serieActuelle();
      notifier("Top 3 terminé ! Série : " + s + " jour" + (s > 1 ? "s" : "") + " d'affilée.");
    }
  }

  function conseilDuJour(t, date) {
    const liste = CONSEILS[t.categorie] || [];
    if (!liste.length) return "";
    const cle = t.id + (date || aujourdhui());
    let somme = 0;
    for (let i = 0; i < cle.length; i++) somme = (somme * 31 + cle.charCodeAt(i)) % 100000;
    return liste[somme % liste.length];
  }

  function minutesFocus(date) {
    const j = (etat.meta.focus || {})[date] || {};
    return Object.keys(j).reduce(function (s, k) { return s + ((j[k] && j[k].min) || 0); }, 0);
  }

  /* =========================================================
     6. ÉTAT DE L'ÉCRAN
     ========================================================= */
  const ui = {
    jour: aujourdhui(),
    semaine: lundiDe(aujourdhui()),
    onglet: "planning",
    ouverts: new Set(),        // panneaux "Étapes" ouverts
    arme: null,                // bouton supprimer en attente de confirmation
    edition: null,             // id de la tâche en cours de modification
    formJours: new Set(),
    iaDispo: false,
    iaEnCours: new Set()
  };
  let sampleNs = null;

  const $ = function (s) { return document.querySelector(s); };

  /* =========================================================
     7. AFFICHAGE
     ========================================================= */
  function capturerFocus() {
    const a = document.activeElement;
    if (a && a.dataset && a.dataset.fk) return { fk: a.dataset.fk, v: a.value, s: a.selectionStart, e: a.selectionEnd };
    return null;
  }
  function restaurerFocus(f) {
    if (!f) return;
    const x = document.querySelector('[data-fk="' + f.fk + '"]');
    if (!x || x === document.activeElement) return;
    x.value = f.v;
    x.focus();
    try { x.setSelectionRange(f.s, f.e); } catch (e) { /* champ sans sélection */ }
  }

  function rendre() {
    const f = capturerFocus();
    rendreEntete();
    rendreSemaine();
    rendreTop3();
    rendrePlanning();
    rendreTodos();
    rendreBilan();
    restaurerFocus(f);
  }

  // ---------- En-tête ----------
  function rendreEntete() {
    const today = aujourdhui();
    const estAujourdhui = ui.jour === today;
    $("#hero-date").textContent = (estAujourdhui ? "Aujourd'hui · " : "") + dateLongue(ui.jour);
    $("#clock").textContent = heureMaintenant();

    const etats = etatsHoraires(ui.jour);
    const todos = todosDu(ui.jour);
    const restantes = etats.filter(function (e) { return !e.fait; }).length + todos.filter(function (d) { return !d.fait; }).length;
    $("#remaining-count").textContent = restantes;

    let prochaine;
    if (estAujourdhui) prochaine = etats.find(function (e) { return e.moment === "futur" && !e.fait; });
    else prochaine = etats[0];
    if (prochaine) {
      $("#next-time").textContent = prochaine.tache.heure;
      $("#next-title").textContent = prochaine.tache.titre;
    } else {
      $("#next-time").textContent = "--:--";
      $("#next-title").textContent = estAujourdhui && etats.length ? "Journée terminée" : "Rien de prévu";
    }

    // Série
    const serie = serieActuelle();
    const chipS = $("#streak-chip");
    chipS.innerHTML = ICONES.flame;
    chipS.appendChild(document.createTextNode(serie + (serie > 1 ? " jours" : " jour")));
    chipS.classList.toggle("zero", serie === 0);

    // Bandeau "en cours"
    const badge = $("#now-badge");
    badge.innerHTML = "";
    const txt = el("span", "nb-text");
    badge.appendChild(txt);
    if (!estAujourdhui) {
      txt.appendChild(document.createTextNode("Tu prépares "));
      txt.appendChild(el("b", null, dateLongue(ui.jour)));
      const b = el("button", "nb-btn", "Aujourd'hui");
      b.onclick = function () { choisirJour(today); };
      badge.appendChild(b);
      return;
    }
    const enCours = etats.filter(function (e) { return e.moment === "maintenant"; }).pop();
    if (enCours && !enCours.fait) {
      txt.appendChild(document.createTextNode("En cours : "));
      txt.appendChild(el("b", null, enCours.tache.titre));
      txt.appendChild(document.createTextNode(" · jusqu'à " + (enCours.tache.heureFin || "la suite")));
      const b = el("button", "nb-btn", "Juste 2 min");
      b.onclick = function () { ouvrirFocus(cibleTache(enCours.tache), 2, true); };
      badge.appendChild(b);
    } else if (enCours && enCours.fait) {
      txt.appendChild(document.createTextNode("Fait : "));
      txt.appendChild(el("b", null, enCours.tache.titre));
      txt.appendChild(document.createTextNode(prochaine ? " · ensuite à " + prochaine.tache.heure : " · bien joué"));
    } else if (prochaine) {
      txt.appendChild(document.createTextNode("Prochaine : "));
      txt.appendChild(el("b", null, prochaine.tache.titre));
      txt.appendChild(document.createTextNode(" à " + prochaine.tache.heure));
    } else {
      const reste = todos.filter(function (d) { return !d.fait; });
      if (reste.length) {
        txt.appendChild(document.createTextNode("Rien de planifié · "));
        txt.appendChild(el("b", null, reste.length + " à faire"));
        const b = el("button", "nb-btn", "Juste 2 min");
        b.onclick = function () { ouvrirFocus(cibleTodo(reste[0]), 2, true); };
        badge.appendChild(b);
      } else {
        txt.appendChild(document.createTextNode("Rien en cours pour l'instant"));
      }
    }
  }

  // ---------- Semaine ----------
  function rendreSemaine() {
    const box = $("#week-days");
    box.innerHTML = "";
    const today = aujourdhui();
    for (let i = 0; i < 7; i++) {
      const k = ajouterJours(ui.semaine, i);
      const d = depuisCle(k);
      const b = el("button", "day");
      b.type = "button";
      if (k === today) b.classList.add("today");
      if (k === ui.jour) b.classList.add("sel");
      if (jourGagne(k)) b.classList.add("win");
      b.setAttribute("aria-label", dateLongue(k));
      b.appendChild(el("span", "d-name", JOURS_COURTS[d.getDay()]));
      b.appendChild(el("span", "d-num", String(d.getDate())));
      const dots = el("span", "d-dots");
      const n = Math.min(tachesDu(k).length + todosDu(k).filter(function (x) { return x.date === k; }).length, 4);
      for (let j = 0; j < n; j++) dots.appendChild(el("i"));
      b.appendChild(dots);
      b.onclick = function () { choisirJour(k); };
      box.appendChild(b);
    }
  }
  function choisirJour(k) {
    ui.jour = k;
    ui.semaine = lundiDe(k);
    ui.arme = null;
    rendre();
  }

  // ---------- Top 3 ----------
  function rendreTop3() {
    const liste = $("#top3-list");
    liste.innerHTML = "";
    const items = top3Du(ui.jour);
    const faits = items.filter(function (e) { return e.fait; }).length;
    $("#top3").classList.toggle("complete", items.length > 0 && faits === items.length);
    $("#top3-meta").textContent = items.length ? (faits === items.length ? "Terminé, bravo !" : faits + " / " + items.length + " fait" + (faits > 1 ? "s" : "")) : "";

    if (!items.length) {
      const vide = el("div", "top3-empty");
      vide.innerHTML = ICONES.star.replace("<svg ", '<svg fill="currentColor" ');
      vide.appendChild(document.createTextNode("Touche l'étoile de 3 tâches importantes. Fais-les en premier."));
      liste.appendChild(vide);
      return;
    }
    items.forEach(function (e, i) {
      const row = el("div", "top3-item" + (e.fait ? " done" : ""));
      if (e.categorie) row.style.setProperty("--cat", "var(--" + e.categorie + ")");
      row.appendChild(el("span", "top3-num", String(i + 1)));
      const c = el("button", "check" + (e.fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute("aria-label", e.fait ? "Marquer comme non faite" : "Marquer comme faite");
      c.onclick = function () { e.genre === "task" ? cocherTache(e.item, ui.jour) : cocherTodo(e.item, ui.jour); };
      row.appendChild(c);
      row.appendChild(el("span", "top3-title", e.titre));
      row.appendChild(el("span", "top3-sub", e.sous));
      if (!e.fait) {
        const f = boutonIcone("mini-btn", "play", "Lancer le focus");
        f.onclick = function () { ouvrirFocus(e.genre === "task" ? cibleTache(e.item) : cibleTodo(e.item)); };
        row.appendChild(f);
      }
      liste.appendChild(row);
    });
  }

  // ---------- Étapes (partagé Planning / À faire) ----------
  function etapeFaite(genre, item, sid, date) {
    if (genre === "task") return !!(((item.etapesFaites || {})[date] || {})[sid]);
    const s = item.etapes.find(function (x) { return x.id === sid; });
    return !!(s && s.fait);
  }
  function sauverItem(genre, item) { genre === "task" ? enregistrerTache(item) : enregistrerTodo(item); }

  function panneauEtapes(genre, item, date) {
    const cle = (genre === "task" ? "t:" : "d:") + item.id;
    const box = el("div", "steps");
    const ul = el("ul");
    let prochaineMarquee = false;
    item.etapes.forEach(function (s) {
      const fait = etapeFaite(genre, item, s.id, date);
      const li = el("li", fait ? "done" : "");
      if (!fait && !prochaineMarquee) { li.classList.add("next"); prochaineMarquee = true; }
      const c = el("button", "check small" + (fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute("aria-label", "Cocher l'étape");
      c.onclick = function () {
        const copie = cloner(item);
        if (genre === "task") {
          copie.etapesFaites[date] = copie.etapesFaites[date] || {};
          if (fait) delete copie.etapesFaites[date][s.id]; else copie.etapesFaites[date][s.id] = true;
        } else {
          copie.etapes.forEach(function (x) { if (x.id === s.id) x.fait = !fait; });
        }
        sauverItem(genre, copie);
      };
      li.appendChild(c);
      li.appendChild(el("span", "s-text", s.texte));
      const x = boutonIcone("mini-btn", "x", "Retirer l'étape");
      x.onclick = function () {
        const copie = cloner(item);
        copie.etapes = copie.etapes.filter(function (y) { return y.id !== s.id; });
        sauverItem(genre, copie);
      };
      li.appendChild(x);
      ul.appendChild(li);
    });
    if (item.etapes.length) box.appendChild(ul);

    const add = el("div", "step-add");
    const input = el("input");
    input.type = "text";
    input.maxLength = 80;
    input.placeholder = item.etapes.length ? "Ajouter une étape…" : "Ex : ouvrir le cahier";
    input.dataset.fk = "step-" + cle;
    const ok = el("button", "btn btn-soft", "Ajouter");
    function ajouter() {
      const v = input.value.trim();
      if (!v) { input.focus(); return; }
      const copie = cloner(item);
      copie.etapes.push({ id: nouvelId(), texte: v, fait: false });
      input.value = "";
      sauverItem(genre, copie);
    }
    ok.onclick = ajouter;
    input.onkeydown = function (e) { if (e.key === "Enter") ajouter(); };
    add.appendChild(input);
    add.appendChild(ok);
    box.appendChild(add);

    const outils = el("div", "step-tools");
    const deux = chip("play", "Juste 2 minutes", "accent");
    deux.onclick = function () { ouvrirFocus(genre === "task" ? cibleTache(item) : cibleTodo(item), 2, true); };
    outils.appendChild(deux);
    if (ui.iaDispo) {
      const enCours = ui.iaEnCours.has(cle);
      const ia = chip("spark", enCours ? "Claude réfléchit…" : "Découper avec Claude");
      ia.disabled = enCours;
      ia.onclick = function () { decouperAvecClaude(genre, item.id); };
      outils.appendChild(ia);
    }
    box.appendChild(outils);
    box.appendChild(el("p", "steps-hint", item.etapes.length
      ? "Une étape à la fois. Commence par celle en gras."
      : "Bloqué ? Découpe en étapes si petites qu'elles paraissent ridicules."));
    return box;
  }

  function boutonSupprimer(cle, label, action) {
    const arme = ui.arme === cle;
    const b = boutonIcone("mini-btn" + (arme ? " armed" : ""), "trash", arme ? "Confirmer la suppression" : label);
    if (arme) { b.innerHTML = ""; b.className = "chip-btn armed"; b.textContent = "Confirmer ?"; }
    b.onclick = function () {
      if (ui.arme === cle) { ui.arme = null; action(); return; }
      ui.arme = cle;
      rendre();
      setTimeout(function () { if (ui.arme === cle) { ui.arme = null; rendre(); } }, 3500);
    };
    return b;
  }

  function boutonEtapes(cle, genre, item, date) {
    const total = item.etapes.length;
    const faites = item.etapes.filter(function (s) { return etapeFaite(genre, item, s.id, date); }).length;
    const b = chip("list", total ? "Étapes " + faites + "/" + total : "Étapes");
    if (ui.ouverts.has(cle)) b.classList.add("accent");
    b.onclick = function () {
      if (ui.ouverts.has(cle)) ui.ouverts.delete(cle); else ui.ouverts.add(cle);
      rendre();
      if (ui.ouverts.has(cle)) {
        const inp = document.querySelector('[data-fk="step-' + cle + '"]');
        if (inp && !total) inp.focus();
      }
    };
    return b;
  }

  function boutonEtoile(cle, date) {
    const on = top3Cles(date).includes(cle);
    const b = boutonIcone("mini-btn star-btn" + (on ? " on" : ""), "star", on ? "Retirer du Top 3" : "Mettre dans le Top 3");
    b.onclick = function () { basculerTop3(cle, date); };
    return b;
  }

  // ---------- Planning ----------
  function rendrePlanning() {
    const today = aujourdhui();
    $("#planning-label").textContent = ui.jour === today ? "Ta journée" : dateLongue(ui.jour);
    $("#btn-open-form").textContent = ui.edition || !$("#planning-form").hidden ? "Fermer" : "+ Nouvelle tâche";

    const box = $("#planning-list");
    box.innerHTML = "";
    const etats = etatsHoraires(ui.jour);
    box.classList.toggle("is-empty", etats.length === 0);
    if (!etats.length) {
      box.appendChild(el("div", "empty", ui.jour < today
        ? "Rien n'était planifié ce jour-là."
        : "Rien de planifié. Ajoute ta première tâche avec « + Nouvelle tâche »."));
      return;
    }

    etats.forEach(function (e) {
      const t = e.tache;
      const cle = "t:" + t.id;
      const cat = CATEGORIES[t.categorie];
      const item = el("div", "t-item");
      item.dataset.id = t.id;
      if (e.fait) item.classList.add("done");
      else if (e.moment === "maintenant") item.classList.add("now");
      else if (e.moment === "passe") item.classList.add("past");
      item.style.setProperty("--cat", "var(--" + t.categorie + ")");

      item.appendChild(el("div", "t-dot"));
      const body = el("div", "t-body");

      const top = el("div", "t-top");
      const c = el("button", "check" + (e.fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute("aria-label", e.fait ? "Marquer comme non faite" : "Marquer comme faite");
      c.onclick = function () { cocherTache(t, ui.jour); };
      top.appendChild(c);
      top.appendChild(el("div", "t-time", t.heureFin ? t.heure + " – " + t.heureFin : t.heure));
      if (t.jours.length) {
        const rep = el("span", "t-rep");
        rep.innerHTML = ICONES.repeat;
        rep.appendChild(document.createTextNode(libelleJours(t.jours)));
        top.appendChild(rep);
      }
      top.appendChild(el("span", "spacer"));
      top.appendChild(boutonEtoile(cle, ui.jour));
      body.appendChild(top);

      body.appendChild(el("div", "t-title", t.titre));
      body.appendChild(el("div", "t-cat", cat.label + (t.heureFin ? " · " + formatDuree(e.fin - e.debut) : "")));
      if (t.notes) body.appendChild(el("div", "t-notes", t.notes));
      const conseil = conseilDuJour(t, ui.jour);
      if (conseil) body.appendChild(el("div", "t-tip", conseil));

      const actions = el("div", "t-actions");
      if (!e.fait) {
        const f = chip("play", "Focus", "accent");
        f.onclick = function () { ouvrirFocus(cibleTache(t)); };
        actions.appendChild(f);
      }
      actions.appendChild(boutonEtapes(cle, "task", t, ui.jour));
      actions.appendChild(el("span", "spacer"));
      const ed = boutonIcone("mini-btn", "edit", "Modifier");
      ed.onclick = function () { ouvrirFormulaire(t); };
      actions.appendChild(ed);
      actions.appendChild(boutonSupprimer("del-" + cle, t.jours.length ? "Supprimer (tous les jours)" : "Supprimer", function () {
        ui.ouverts.delete(cle);
        supprimerTache(t.id);
      }));
      body.appendChild(actions);

      if (ui.ouverts.has(cle)) body.appendChild(panneauEtapes("task", t, ui.jour));

      item.appendChild(body);
      box.appendChild(item);
    });
  }

  function cocherTache(t, date) {
    const copie = cloner(etat.tasks[t.id] || t);
    if (copie.faits[date]) delete copie.faits[date]; else copie.faits[date] = true;
    enregistrerTache(copie);
    apresCoche(date);
  }

  // Formulaire Planning
  function rendreJoursForm() {
    const box = $("#repeat-days");
    box.innerHTML = "";
    const tous = el("button", "day-chip wide" + (ui.formJours.size === 7 ? " on" : ""), "Tous les jours");
    tous.type = "button";
    tous.onclick = function () {
      if (ui.formJours.size === 7) ui.formJours.clear(); else ORDRE_SEMAINE.forEach(function (j) { ui.formJours.add(j); });
      rendreJoursForm();
    };
    ORDRE_SEMAINE.forEach(function (j) {
      const b = el("button", "day-chip" + (ui.formJours.has(j) ? " on" : ""), JOURS_LETTRE[j]);
      b.type = "button";
      b.setAttribute("aria-label", JOURS[j]);
      b.setAttribute("aria-pressed", ui.formJours.has(j) ? "true" : "false");
      b.onclick = function () {
        if (ui.formJours.has(j)) ui.formJours.delete(j); else ui.formJours.add(j);
        rendreJoursForm();
      };
      box.appendChild(b);
    });
    box.appendChild(tous);
    $("#repeat-hint").textContent = ui.formJours.size
      ? "Revient : " + libelleJours(Array.from(ui.formJours)).toLowerCase()
      : "Aucun jour choisi : seulement le " + dateLongue(ui.jour) + ".";
  }

  function ouvrirFormulaire(t) {
    const form = $("#planning-form");
    form.hidden = false;
    ui.edition = t ? t.id : null;
    $("#form-title").textContent = t ? "Modifier la tâche" : "Nouvelle tâche";
    $("#btn-add-planning").textContent = t ? "Enregistrer" : "Ajouter";
    $("#planning-title").value = t ? t.titre : "";
    $("#planning-time").value = t ? t.heure : "";
    $("#planning-end").value = t ? t.heureFin : "";
    $("#planning-category").value = t ? t.categorie : $("#planning-category").value;
    $("#planning-notes").value = t ? t.notes : "";
    ui.formJours = new Set(t ? t.jours : []);
    afficherErreur("");
    rendreJoursForm();
    montrerOnglet("planning");
    rendrePlanning();
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(function () { $("#planning-title").focus(); }, 60);
  }
  function fermerFormulaire() {
    $("#planning-form").hidden = true;
    ui.edition = null;
    rendrePlanning();
  }
  function afficherErreur(m) { $("#planning-error").textContent = m; }

  function validerFormulaire() {
    const titre = $("#planning-title").value.trim();
    const heure = $("#planning-time").value;
    const heureFin = $("#planning-end").value;
    if (!titre) { afficherErreur("Donne un titre à ta tâche."); $("#planning-title").focus(); return; }
    if (!heure) { afficherErreur("Choisis l'heure de début."); $("#planning-time").focus(); return; }
    if (!heureFin) { afficherErreur("Choisis l'heure de fin."); $("#planning-end").focus(); return; }
    if (enMinutes(heureFin) <= enMinutes(heure)) { afficherErreur("L'heure de fin doit être après l'heure de début."); $("#planning-end").focus(); return; }
    afficherErreur("");

    const jours = Array.from(ui.formJours).sort();
    const ancien = ui.edition ? etat.tasks[ui.edition] : null;
    const t = ancien ? cloner(ancien) : normTache({ id: nouvelId(), creeLe: aujourdhui() }, 0);
    t.titre = titre;
    t.heure = heure;
    t.heureFin = heureFin;
    t.categorie = $("#planning-category").value;
    t.notes = $("#planning-notes").value.trim();
    t.jours = jours;
    if (jours.length) { t.date = null; if (!ancien || !ancien.jours.length) t.debut = ui.jour < aujourdhui() ? ui.jour : aujourdhui(); }
    else { t.date = ancien && ancien.date ? ancien.date : ui.jour; t.debut = ""; }
    $("#planning-form").hidden = true;
    ui.edition = null;
    enregistrerTache(t);
    notifier(ancien ? "Tâche modifiée." : "Tâche ajoutée" + (jours.length ? " (" + libelleJours(jours).toLowerCase() + ")." : "."));
  }

  // ---------- À faire ----------
  function rendreTodos() {
    const box = $("#todo-list");
    box.innerHTML = "";
    const liste = todosDu(ui.jour);
    const faites = liste.filter(function (d) { return d.fait; }).length;
    $("#progress-fill").style.width = (liste.length ? Math.round((faites / liste.length) * 100) : 0) + "%";
    $("#progress-num").textContent = faites + " / " + liste.length;

    if (!liste.length) {
      box.appendChild(el("div", "empty", "Rien à faire pour ce jour. Note ici les petites choses sans heure précise."));
      return;
    }
    liste.forEach(function (d) {
      const cle = "d:" + d.id;
      const item = el("div", "todo-item" + (d.fait ? " done" : ""));
      const main = el("div", "todo-main");
      const c = el("button", "check" + (d.fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute("aria-label", d.fait ? "Marquer comme non faite" : "Marquer comme faite");
      c.onclick = function () { cocherTodo(d, ui.jour); };
      main.appendChild(c);
      main.appendChild(el("div", "todo-title", d.texte));
      if (!d.fait && estReportee(d, ui.jour)) {
        const tag = el("span", "tag", "Reportée");
        tag.title = "Prévue le " + dateLongue(d.date);
        main.appendChild(tag);
      }
      main.appendChild(boutonEtoile(cle, ui.jour));
      item.appendChild(main);

      const actions = el("div", "t-actions");
      if (!d.fait) {
        const f = chip("play", "Focus", "accent");
        f.onclick = function () { ouvrirFocus(cibleTodo(d)); };
        actions.appendChild(f);
      }
      actions.appendChild(boutonEtapes(cle, "todo", d, ui.jour));
      actions.appendChild(el("span", "spacer"));
      actions.appendChild(boutonSupprimer("del-" + cle, "Supprimer", function () {
        ui.ouverts.delete(cle);
        supprimerTodo(d.id);
      }));
      item.appendChild(actions);
      if (ui.ouverts.has(cle)) item.appendChild(panneauEtapes("todo", d, ui.jour));
      box.appendChild(item);
    });
  }
  function cocherTodo(d, date) {
    const copie = cloner(etat.todos[d.id] || d);
    copie.fait = !copie.fait;
    copie.faitLe = copie.fait ? date : null;
    enregistrerTodo(copie);
    apresCoche(date);
  }
  function ajouterTodo() {
    const input = $("#todo-input");
    const texte = input.value.trim();
    if (!texte) { input.focus(); return; }
    enregistrerTodo(normTodo({ id: nouvelId(), texte: texte, date: ui.jour, creeLe: Date.now() }, 0));
    input.value = "";
    input.focus();
  }

  // ---------- Bilan ----------
  function rendreBilan() {
    const today = aujourdhui();
    const serie = serieActuelle();
    const record = Math.max(meilleureSerie(), serie);
    $("#streak-num").textContent = serie;
    $("#streak-label").textContent = serie === 0
      ? "Termine ton Top 3 aujourd'hui pour lancer ta série."
      : (serie > 1 ? "jours d'affilée avec ton Top 3 terminé" : "jour avec ton Top 3 terminé. Continue demain !");
    $("#streak-record").textContent = "Record : " + record + " jour" + (record > 1 ? "s" : "");
    const dots = $("#streak-dots");
    dots.innerHTML = "";
    for (let i = 6; i >= 0; i--) {
      const k = ajouterJours(today, -i);
      const s = el("span", "sd" + (jourGagne(k) ? " ok" : "") + (k === today ? " today" : ""));
      s.title = dateLongue(k) + (jourGagne(k) ? " : Top 3 terminé" : "");
      s.appendChild(el("i"));
      s.appendChild(document.createTextNode(JOURS_LETTRE[jourSemaine(k)]));
      dots.appendChild(s);
    }

    // Chiffres du jour choisi
    $("#bilan-label").textContent = ui.jour === today ? "Aujourd'hui en chiffres" : dateLongue(ui.jour) + " en chiffres";
    const top = top3Du(ui.jour);
    const etats = etatsHoraires(ui.jour);
    const todos = todosDu(ui.jour);
    const tiles = [
      [top.filter(function (e) { return e.fait; }).length + " / " + top.length, "Top 3"],
      [etats.filter(function (e) { return e.fait; }).length + " / " + etats.length, "Planning"],
      [todos.filter(function (d) { return d.fait; }).length + " / " + todos.length, "À faire"],
      [formatDuree(minutesFocus(ui.jour)), "Focus"]
    ];
    const box = $("#bilan-tiles");
    box.innerHTML = "";
    tiles.forEach(function (t) {
      const d = el("div", "tile");
      d.appendChild(el("b", null, t[0]));
      d.appendChild(el("span", null, t[1]));
      box.appendChild(d);
    });

    // Barres focus (7 derniers jours)
    const bars = $("#focus-bars");
    bars.innerHTML = "";
    const valeurs = [];
    for (let i = 6; i >= 0; i--) { const k = ajouterJours(today, -i); valeurs.push({ k: k, min: minutesFocus(k) }); }
    const max = Math.max.apply(null, valeurs.map(function (v) { return v.min; }).concat([30]));
    const total = valeurs.reduce(function (s, v) { return s + v.min; }, 0);
    $("#bars-meta").textContent = total ? formatDuree(total) + " au total" : "Lance un focus pour remplir";
    const labels = $("#bar-labels");
    labels.innerHTML = "";
    valeurs.forEach(function (v) {
      const col = el("div", "bar-col");
      col.appendChild(el("div", "bar-tip", dateLongue(v.k) + " · " + (v.min ? formatDuree(v.min) : "aucun focus")));
      if (v.k === today && v.min) col.appendChild(el("div", "bar-val", formatDuree(v.min)));
      const bar = el("div", "bar" + (v.min ? "" : " zero"));
      bar.style.height = v.min ? Math.max(4, Math.round((v.min / max) * 100)) + "%" : "2px";
      col.appendChild(bar);
      bars.appendChild(col);
      labels.appendChild(el("span", v.k === today ? "today" : "", JOURS_LETTRE[jourSemaine(v.k)]));
    });

    // Journal : on ne touche pas au champ en cours d'écriture
    const j = (etat.meta.journal || {})[ui.jour] || {};
    const jb = $("#journal-bien"), jc = $("#journal-change");
    if (document.activeElement !== jb) jb.value = j.bien || "";
    if (document.activeElement !== jc) jc.value = j.change || "";

    $("#btn-demain").textContent = ui.jour === today ? "Préparer demain" : "Préparer le jour suivant";
  }

  let minuteurJournal = null;
  function saisieJournal() {
    const bien = $("#journal-bien").value, change = $("#journal-change").value;
    const jour = ui.jour;
    etat.meta.journal[jour] = { bien: bien, change: change };
    clearTimeout(minuteurJournal);
    minuteurJournal = setTimeout(function () {
      majMeta({ journal: { [jour]: { bien: bien, change: change } } }, true);
    }, 700);
  }

  // ---------- Synchro ----------
  function rendreSync() {
    const n = $("#sync-note");
    n.classList.toggle("ok", sync.mode === "db" && !sync.erreur);
    if (!sync.pret) n.textContent = "Chargement…";
    else if (sync.erreur) n.textContent = "Synchro interrompue : recharge la page.";
    else if (sync.mode === "db") n.textContent = "Synchronisé entre ton téléphone et ton ordi";
    else n.textContent = "Enregistré sur cet appareil";
  }

  function montrerOnglet(nom) {
    ui.onglet = nom;
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("active", t.dataset.tab === nom); });
    document.querySelectorAll(".panel").forEach(function (p) { p.classList.toggle("active", p.id === "panel-" + nom); });
  }

  let minuteurSnack = null;
  function notifier(msg) {
    const s = $("#snack");
    s.textContent = msg;
    s.hidden = false;
    clearTimeout(minuteurSnack);
    minuteurSnack = setTimeout(function () { s.hidden = true; }, 3200);
  }

  /* =========================================================
     8. MODE FOCUS (minuteur)
     ========================================================= */
  const CIRC = 2 * Math.PI * 52;
  let focus = lireLocal(CLE_FOCUS) || { statut: "pret", mode: "focus", duree: 25, finA: 0, reste: 0, cible: null, debutA: 0 };
  let boucleFocus = null;
  let audio = null;

  function cibleTache(t) { return { genre: "task", id: t.id, titre: t.titre, categorie: t.categorie }; }
  function cibleTodo(d) { return { genre: "todo", id: d.id, titre: d.texte, categorie: null }; }
  function sauverFocus() { ecrireLocal(CLE_FOCUS, focus); }

  function ouvrirFocus(cible, minutes, lancer) {
    if (focus.statut === "marche" || focus.statut === "pause") {
      if (cible && focus.cible && cible.id !== focus.cible.id) notifier("Un focus est déjà en cours. Termine-le d'abord.");
      $("#focus-sheet").hidden = false;
      rendreFocus();
      return;
    }
    focus = { statut: "pret", mode: "focus", duree: minutes || focus.duree || 25, finA: 0, reste: 0, cible: cible || null, debutA: 0 };
    sauverFocus();
    $("#focus-sheet").hidden = false;
    if (lancer) demarrerFocus(); else rendreFocus();
  }
  function fermerFocus() { $("#focus-sheet").hidden = true; rendreFocus(); }

  function demarrerFocus() {
    preparerSon();
    focus.statut = "marche";
    focus.debutA = Date.now();
    focus.finA = Date.now() + focus.duree * 60000;
    sauverFocus();
    lancerBoucle();
    rendreFocus();
  }
  function pauseFocus() {
    focus.reste = Math.max(0, focus.finA - Date.now());
    focus.statut = "pause";
    sauverFocus();
    rendreFocus();
  }
  function reprendreFocus() {
    focus.finA = Date.now() + focus.reste;
    focus.statut = "marche";
    sauverFocus();
    lancerBoucle();
    rendreFocus();
  }
  function arreterFocus() {
    if (focus.mode === "focus") {
      const ecoule = focus.statut === "pause" ? focus.duree * 60000 - focus.reste : focus.duree * 60000 - (focus.finA - Date.now());
      const min = Math.floor(ecoule / 60000);
      if (min >= 1) enregistrerSession(min);
    }
    if (focus.mode === "pause") focus.duree = focus.dureeAvantPause || 25;
    focus.statut = "pret";
    focus.mode = "focus";
    sauverFocus();
    document.title = "Planning Zinou";
    rendreFocus();
  }
  function enregistrerSession(min) {
    const jour = aujourdhui();
    majMeta({ focus: { [jour]: { [nouvelId()]: { min: min, titre: focus.cible ? focus.cible.titre : "Session libre" } } } });
  }
  function finirFocus() {
    jouerSon();
    if (focus.mode === "focus") {
      enregistrerSession(focus.duree);
      focus.statut = "fini";
    } else {
      focus.statut = "pret";
      focus.mode = "focus";
      focus.duree = focus.dureeAvantPause || 25;
      notifier("Pause terminée. On y retourne ?");
    }
    sauverFocus();
    document.title = "Planning Zinou";
    $("#focus-sheet").hidden = false;
    rendreFocus();
  }
  function lancerPause(min) {
    focus.dureeAvantPause = focus.duree;
    focus.mode = "pause";
    focus.duree = min;
    demarrerFocus();
  }
  function continuer(min) {
    focus.mode = "focus";
    focus.duree = min;
    demarrerFocus();
  }
  function lancerBoucle() {
    clearInterval(boucleFocus);
    boucleFocus = setInterval(function () {
      if (focus.statut !== "marche") { clearInterval(boucleFocus); return; }
      if (Date.now() >= focus.finA) { clearInterval(boucleFocus); finirFocus(); return; }
      rendreTemps();
    }, 250);
  }

  function tempsRestantMs() {
    if (focus.statut === "marche") return Math.max(0, focus.finA - Date.now());
    if (focus.statut === "pause") return focus.reste;
    if (focus.statut === "fini") return 0;
    return focus.duree * 60000;
  }
  function formatChrono(ms) {
    const s = Math.ceil(ms / 1000);
    return pad(Math.floor(s / 60)) + ":" + pad(s % 60);
  }
  function rendreTemps() {
    const ms = tempsRestantMs();
    const txt = formatChrono(ms);
    $("#focus-time").textContent = txt;
    $("#focus-pill-time").textContent = txt;
    const total = focus.duree * 60000;
    const fait = total ? 1 - ms / total : 0;
    $("#focus-ring").style.strokeDashoffset = String(CIRC * (1 - fait));
    if (focus.statut === "marche") document.title = txt + " · " + (focus.mode === "pause" ? "Pause" : "Focus");
  }

  function rendreFocus() {
    const sheet = $("#focus-sheet");
    const card = sheet.querySelector(".sheet-card");
    const ring = $("#focus-ring");
    ring.style.strokeDasharray = String(CIRC);
    if (focus.cible && focus.cible.categorie) card.style.setProperty("--cat", "var(--" + focus.cible.categorie + ")");
    else card.style.removeProperty("--cat");

    $("#focus-mode").textContent = focus.mode === "pause" ? "Pause" : "Mode focus";
    $("#focus-task").textContent = focus.mode === "pause" ? "Respire, étire-toi, bois un verre d'eau" : (focus.cible ? focus.cible.titre : "Session libre");
    const etiquettes = { pret: "Prêt", marche: focus.mode === "pause" ? "Pause" : "Concentration", pause: "En pause", fini: "Terminé" };
    $("#focus-state").textContent = etiquettes[focus.statut];

    // Durées
    const durs = $("#focus-durations");
    durs.hidden = focus.statut !== "pret";
    durs.querySelectorAll(".dur").forEach(function (b) { b.classList.toggle("on", Number(b.dataset.min) === focus.duree); });

    // Message
    let msg = "";
    if (focus.statut === "pret") msg = focus.duree === 2 ? "Juste 2 minutes. Pas plus. Tu as le droit d'arrêter après." : "Téléphone retourné, une seule chose à la fois.";
    if (focus.statut === "fini") msg = focus.duree === 2 ? "2 minutes faites ! Le plus dur, c'était de commencer. Tu continues ?" : "Bien joué : " + formatDuree(focus.duree) + " de concentration.";
    if (focus.statut === "marche" && focus.mode === "focus") {
      const t = focus.cible && focus.cible.genre === "task" ? etat.tasks[focus.cible.id] : null;
      msg = t ? conseilDuJour(t, aujourdhui()) : "Une seule chose à la fois. Tu peux réduire cette fenêtre.";
    }
    if (focus.statut === "pause") msg = "Reprends quand tu es prêt.";
    $("#focus-msg").textContent = msg;

    // Boutons
    const act = $("#focus-actions");
    act.innerHTML = "";
    function bouton(texte, cls, fn) { const b = el("button", "btn " + cls, texte); b.type = "button"; b.onclick = fn; act.appendChild(b); return b; }
    if (focus.statut === "pret") {
      bouton(focus.mode === "pause" ? "Lancer la pause" : "Démarrer", "btn-primary", demarrerFocus);
    } else if (focus.statut === "marche") {
      bouton("Pause", "btn-soft", pauseFocus);
      bouton("Arrêter", "btn-ghost", arreterFocus);
    } else if (focus.statut === "pause") {
      bouton("Reprendre", "btn-primary", reprendreFocus);
      bouton("Arrêter", "btn-ghost", arreterFocus);
    } else if (focus.statut === "fini") {
      if (focus.duree === 2) {
        bouton("Continuer 15 min", "btn-primary", function () { continuer(15); });
        if (focus.cible && !cibleFaite(focus.cible)) bouton("C'est fait", "btn-soft", function () { terminerCible(); });
        bouton("J'arrête là", "btn-ghost", function () { focus.statut = "pret"; sauverFocus(); fermerFocus(); });
      } else {
        if (focus.cible && !cibleFaite(focus.cible)) bouton("Tâche terminée", "btn-primary", function () { terminerCible(); });
        bouton("Pause 5 min", "btn-soft", function () { lancerPause(5); });
        bouton("Fermer", "btn-ghost", function () { focus.statut = "pret"; sauverFocus(); fermerFocus(); });
      }
    }

    // Pastille quand la fenêtre est réduite
    const actif = focus.statut === "marche" || focus.statut === "pause";
    $("#focus-pill").hidden = !(actif && sheet.hidden);
    $("#focus-pill-title").textContent = focus.mode === "pause" ? "Pause" : (focus.cible ? focus.cible.titre : "Focus");
    rendreTemps();
  }
  function cibleFaite(c) {
    if (c.genre === "task") { const t = etat.tasks[c.id]; return !t || estFaite(t, aujourdhui()); }
    const d = etat.todos[c.id]; return !d || d.fait;
  }
  function terminerCible() {
    const c = focus.cible;
    if (c.genre === "task" && etat.tasks[c.id]) cocherTache(etat.tasks[c.id], aujourdhui());
    else if (c.genre === "todo" && etat.todos[c.id]) cocherTodo(etat.todos[c.id], aujourdhui());
    rendreFocus();
  }

  // Petit son doux de fin (si le navigateur l'autorise)
  function preparerSon() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC && !audio) audio = new AC();
      if (audio && audio.state === "suspended") audio.resume();
    } catch (e) { audio = null; }
  }
  function jouerSon() {
    if (!audio) return;
    try {
      [0, 0.18, 0.36].forEach(function (dt, i) {
        const o = audio.createOscillator(), g = audio.createGain();
        o.type = "sine";
        o.frequency.value = [660, 880, 990][i];
        g.gain.setValueAtTime(0.0001, audio.currentTime + dt);
        g.gain.exponentialRampToValueAtTime(0.18, audio.currentTime + dt + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dt + 0.5);
        o.connect(g); g.connect(audio.destination);
        o.start(audio.currentTime + dt); o.stop(audio.currentTime + dt + 0.55);
      });
    } catch (e) { /* pas de son */ }
  }

  /* =========================================================
     9. CLAUDE DÉCOUPE UNE TÂCHE EN ÉTAPES
     ========================================================= */
  async function decouperAvecClaude(genre, id) {
    const item = genre === "task" ? etat.tasks[id] : etat.todos[id];
    if (!item || !sampleNs) return;
    const cle = (genre === "task" ? "t:" : "d:") + id;
    ui.iaEnCours.add(cle);
    rendre();
    const titre = genre === "task" ? item.titre : item.texte;
    const categorie = genre === "task" ? CATEGORIES[item.categorie].label : "Tâche du quotidien";
    const notes = genre === "task" && item.notes ? item.notes : "aucune";
    const deja = item.etapes.map(function (s) { return s.texte; }).join(" | ") || "aucune";
    const prompt =
      "Tu aides une personne qui procrastine à démarrer une tâche. Découpe la tâche en 3 à 5 étapes très concrètes, " +
      "dans l'ordre, en français, au tutoiement et à l'impératif, 60 caractères maximum chacune. " +
      "La première étape doit prendre moins de 2 minutes et être ridiculement facile. Pas de numéros.\n" +
      "Réponds uniquement avec un tableau JSON de chaînes, par exemple : [\"Ouvrir le cahier de maths\", \"Relire la leçon 3\"].\n\n" +
      "Tâche : " + titre + "\nCatégorie : " + categorie + "\nNotes : " + notes + "\nÉtapes déjà prévues (à ne pas répéter) : " + deja;
    try {
      const rep = await sampleNs.json(prompt, { modelTier: "quick" });
      const etapes = (Array.isArray(rep) ? rep : []).map(function (s) { return String(s).trim().slice(0, 80); }).filter(Boolean).slice(0, 6);
      if (!etapes.length) throw { code: "invalid_json" };
      const actuel = genre === "task" ? etat.tasks[id] : etat.todos[id];
      if (!actuel) return;
      const copie = cloner(actuel);
      etapes.forEach(function (t) { copie.etapes.push({ id: nouvelId(), texte: t, fait: false }); });
      ui.ouverts.add(cle);
      sauverItem(genre, copie);
      notifier("Voilà tes étapes. Commence par la première !");
    } catch (e) {
      const code = e && e.code;
      if (["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(code)) {
        ui.iaDispo = false;
        notifier("Claude n'est pas disponible ici. Ajoute tes étapes à la main.");
      } else if (code === "rate_limited") {
        notifier("Trop de demandes pour l'instant, réessaie dans un moment.");
      } else if (code !== "cancelled") {
        notifier("Claude n'a pas pu répondre. Réessaie ou écris tes étapes.");
      }
    } finally {
      ui.iaEnCours.delete(cle);
      rendre();
    }
  }

  /* =========================================================
     10. ALERTE À L'HEURE DE DÉBUT
     ========================================================= */
  const dejaAlerte = new Set();
  let alerteCible = null;

  function verifierAlertes() {
    const today = aujourdhui();
    const maintenant = heureMaintenant();
    etatsHoraires(today).forEach(function (e) {
      const t = e.tache;
      const cle = t.id + "@" + today;
      if (t.heure === maintenant && !e.fait && !dejaAlerte.has(cle)) {
        dejaAlerte.add(cle);
        alerteCible = t;
        $("#alert-cat").textContent = CATEGORIES[t.categorie].label + (t.heureFin ? " · jusqu'à " + t.heureFin : "");
        $("#alert-title").textContent = t.titre;
        $("#alert-tip").textContent = conseilDuJour(t, today);
        $("#alert-overlay").hidden = false;
        jouerSon();
      }
    });
  }
  function fermerAlerte() { $("#alert-overlay").hidden = true; }

  /* =========================================================
     11. BRANCHEMENTS ET DÉMARRAGE
     ========================================================= */
  function brancher() {
    $("#week-prev").innerHTML = ICONES.left;
    $("#week-next").innerHTML = ICONES.right;
    $("#focus-close").innerHTML = ICONES.minus;

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () { montrerOnglet(tab.dataset.tab); });
    });
    $("#week-prev").onclick = function () { ui.semaine = ajouterJours(ui.semaine, -7); rendreSemaine(); };
    $("#week-next").onclick = function () { ui.semaine = ajouterJours(ui.semaine, 7); rendreSemaine(); };

    $("#btn-open-form").onclick = function () {
      if ($("#planning-form").hidden) ouvrirFormulaire(null); else fermerFormulaire();
    };
    $("#btn-cancel-planning").onclick = fermerFormulaire;
    $("#btn-add-planning").onclick = validerFormulaire;
    $("#planning-title").addEventListener("keydown", function (e) { if (e.key === "Enter") validerFormulaire(); });

    $("#btn-add-todo").onclick = ajouterTodo;
    $("#todo-input").addEventListener("keydown", function (e) { if (e.key === "Enter") ajouterTodo(); });

    $("#journal-bien").addEventListener("input", saisieJournal);
    $("#journal-change").addEventListener("input", saisieJournal);
    $("#btn-demain").onclick = function () {
      choisirJour(ajouterJours(ui.jour, 1));
      montrerOnglet("planning");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Focus
    $("#focus-durations").querySelectorAll(".dur").forEach(function (b) {
      b.onclick = function () { focus.duree = Number(b.dataset.min); sauverFocus(); rendreFocus(); };
    });
    $("#focus-close").onclick = fermerFocus;
    $("#focus-pill").onclick = function () { $("#focus-sheet").hidden = false; rendreFocus(); };
    $("#focus-sheet").addEventListener("click", function (e) { if (e.target === $("#focus-sheet")) fermerFocus(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !$("#focus-sheet").hidden) fermerFocus();
    });

    // Alerte
    $("#btn-alert-later").onclick = fermerAlerte;
    $("#btn-alert-2min").onclick = function () { fermerAlerte(); if (alerteCible) ouvrirFocus(cibleTache(alerteCible), 2, true); };
    $("#btn-alert-focus").onclick = function () { fermerAlerte(); if (alerteCible) ouvrirFocus(cibleTache(alerteCible)); };
  }

  let dernierJour = aujourdhui();
  function tic() {
    const today = aujourdhui();
    if (today !== dernierJour) {
      // minuit : on passe au nouveau jour
      if (ui.jour === dernierJour) { ui.jour = today; ui.semaine = lundiDe(today); }
      dernierJour = today;
      rendre();
    } else {
      rendreEntete();
      rendrePlanningEtats();
    }
    verifierAlertes();
  }
  // Mise à jour légère des états "en cours / passé" sans tout redessiner
  function rendrePlanningEtats() {
    etatsHoraires(ui.jour).forEach(function (e) {
      const item = document.querySelector('#planning-list .t-item[data-id="' + e.tache.id + '"]');
      if (!item) return;
      item.classList.toggle("now", !e.fait && e.moment === "maintenant");
      item.classList.toggle("past", !e.fait && e.moment === "passe");
    });
  }

  async function demarrer() {
    // Affichage immédiat avec ce qu'on a sur l'appareil
    const cache = window.claude ? lireLocal(CLE_CACHE) : null;
    etat = cache && cache.tasks ? normEtat(cache) : chargerLocal();
    brancher();
    rendre();
    rendreSync();
    rendreFocus();
    if (focus.statut === "marche") {
      if (Date.now() >= focus.finA) finirFocus(); else lancerBoucle();
    }
    setInterval(tic, 10000);
    verifierAlertes();

    // Claude pour découper les tâches (seulement sur le lien Claude)
    if (window.claude && typeof window.claude.use === "function") {
      window.claude.use("sample").then(function (ns) {
        sampleNs = ns;
        ui.iaDispo = !!ns;
        if (ns) rendre();
      }).catch(function () { /* indisponible */ });
    }
    await demarrerSync();
  }

  demarrer();
})();
