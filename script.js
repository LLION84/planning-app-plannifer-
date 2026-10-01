(function () {
  "use strict";

  /* =========================================================
     1. DONNÉES DE RÉFÉRENCE : catégories, conseils, jours
     ========================================================= */
  const CATEGORIES = {
    sport: { label: "Sport" },
    etudes: { label: "Études" },
    menage: { label: "Ménage / Maison" },
    admin: { label: "Admin / Vie perso" },
    pro: { label: "Vie pro" },
  };

  const JOURS = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const JOURS_COURTS = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
  const JOURS_LETTRE = ["D", "L", "M", "M", "J", "V", "S"];
  // Logos des tâches à faire : traits simples, couleurs de l'appli
  const LOGOS = {
    courses: {
      nom: "Courses",
      svg: '<path d="M3 4.5h2.2l2.3 10a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8l1.5-6.7H6.4"/><circle cx="9.3" cy="19" r="1.3"/><circle cx="16.8" cy="19" r="1.3"/>',
    },
    appel: {
      nom: "Appel",
      svg: '<path d="M5.5 4h2.8l1.4 3.8-1.9 1.3a11 11 0 0 0 5.1 5.1l1.3-1.9 3.8 1.4v2.8a1.8 1.8 0 0 1-1.9 1.8A14.5 14.5 0 0 1 3.7 5.9 1.8 1.8 0 0 1 5.5 4z"/>',
    },
    maison: {
      nom: "Maison",
      svg: '<path d="M4 11 12 4.5l8 6.5"/><path d="M6 9.6V19.5h12V9.6"/><path d="M10 19.5v-5h4v5"/>',
    },
    lecture: {
      nom: "Lecture",
      svg: '<path d="M12 6.8C10 5.3 7.6 4.8 4 4.8v13c3.6 0 6 .5 8 2 2-1.5 4.4-2 8-2v-13c-3.6 0-6 .5-8 2z"/><path d="M12 6.8v13"/>',
    },
    ordi: {
      nom: "Ordinateur",
      svg: '<rect x="3.5" y="4.5" width="17" height="11.5" rx="2"/><path d="M12 16v3.5M8 19.5h8"/>',
    },
    papiers: {
      nom: "Papiers",
      svg: '<path d="M7.5 3.5h6.5l4.5 4.5v11.5a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z"/><path d="M14 3.5V8h4.5M9.5 12.5h5M9.5 16h5"/>',
    },
    argent: {
      nom: "Argent",
      svg: '<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2a3.6 3.6 0 1 0 0 5.6M8 11h5.2M8 13.2h5.2"/>',
    },
    sante: {
      nom: "Santé",
      svg: '<path d="M12 19.5s-7.2-4.4-7.2-9.5A4 4 0 0 1 12 7.8 4 4 0 0 1 19.2 10c0 5.1-7.2 9.5-7.2 9.5z"/>',
    },
  };
  function svgLogo(cle) {
    const l = LOGOS[cle];
    return l
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          l.svg +
          "</svg>"
      : "";
  }

  const ORDRE_SEMAINE = [1, 2, 3, 4, 5, 6, 0]; // lundi -> dimanche
  const MOIS = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const ICONES = {
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"/></svg>',
    star: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
    trash:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6.5 7l1 13h9l1-13"/></svg>',
    repeat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l3 3-3 3"/><path d="M4 12V9a3 3 0 0 1 3-3h13"/><path d="M7 21l-3-3 3-3"/><path d="M20 12v3a3 3 0 0 1-3 3H4"/></svg>',
    flame:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c.6 3.2-1.4 4.9-2.9 6.6C7.6 10.8 6 12.6 6 15.2 6 18.9 8.7 21.5 12 21.5s6-2.6 6-6.1c0-2.6-1.3-4.3-2.6-5.6-.2 1.6-.9 2.6-2 3 .5-3.5-.4-7.2-1.4-9.4z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 5 8 12 15 19"/></svg>',
    right:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 16 12 9 19"/></svg>',
    minus:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="12" x2="18" y2="12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',
    compteur:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="19" x2="6" y2="14"/><line x1="12" y1="19" x2="12" y2="9"/><line x1="18" y1="19" x2="18" y2="5"/></svg>',
    cible:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    retour:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  };

  /* =========================================================
     2. PETITS OUTILS (dates, heures, textes)
     ========================================================= */
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function cleDate(d) {
    return (
      d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate())
    );
  }
  function depuisCle(k) {
    const p = k.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function ajouterJours(k, n) {
    const d = depuisCle(k);
    d.setDate(d.getDate() + n);
    return cleDate(d);
  }
  function aujourdhui() {
    return cleDate(new Date());
  }
  function lundiDe(k) {
    const d = depuisCle(k);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return cleDate(d);
  }
  function jourSemaine(k) {
    return depuisCle(k).getDay();
  }
  function enMinutes(h) {
    const p = String(h || "0:0")
      .split(":")
      .map(Number);
    return p[0] * 60 + (p[1] || 0);
  }
  function minutesMaintenant() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }
  function heureMaintenant() {
    const d = new Date();
    return pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function formatDuree(min) {
    const h = Math.floor(min / 60),
      m = min % 60;
    if (h === 0) return m + " min";
    return h + "h" + (m ? pad(m) : "");
  }
  function dateLongue(k) {
    const d = depuisCle(k);
    return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()];
  }
  function nouvelId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  function idPropre(v, i) {
    const s = String(v == null ? "" : v).replace(/[^A-Za-z0-9_.~:@+-]/g, "");
    return s && s !== "." && s !== ".."
      ? s.slice(0, 60)
      : "old" + i + nouvelId();
  }
  function cloner(o) {
    return JSON.parse(JSON.stringify(o));
  }
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
    if (
      jours.length === 5 &&
      semaine.every(function (j) {
        return jours.includes(j);
      })
    )
      return "En semaine";
    if (jours.length === 2 && jours.includes(0) && jours.includes(6))
      return "Le week-end";
    if (jours.length === 6)
      return (
        "Sauf " +
        JOURS_COURTS[
          [0, 1, 2, 3, 4, 5, 6].find(function (j) {
            return !jours.includes(j);
          })
        ]
      );
    return ORDRE_SEMAINE.filter(function (j) {
      return jours.includes(j);
    })
      .map(function (j) {
        return JOURS_COURTS[j];
      })
      .join(", ");
  }

  /* =========================================================
     3. ÉTAT DE L'APPLI
     ========================================================= */
  function etatVide() {
    return {
      tasks: {},
      todos: {},
      meta: { top3: {}, focus: {}, journal: {}, faits: {} },
    };
  }

  function normTache(t, i) {
    const jours = Array.isArray(t.jours)
      ? t.jours.filter(function (j) {
          return j >= 0 && j <= 6;
        })
      : [];
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
      etapesFaites:
        t.etapesFaites && typeof t.etapesFaites === "object"
          ? t.etapesFaites
          : {},
      etapesValeurs:
        t.etapesValeurs && typeof t.etapesValeurs === "object"
          ? t.etapesValeurs
          : {},
      creeLe: t.creeLe || "",
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
      icone: typeof d.icone === "string" && LOGOS[d.icone] ? d.icone : "",
      creeLe: d.creeLe || Date.now(),
    };
  }
  function normMeta(m) {
    m = m || {};
    return {
      top3: m.top3 && typeof m.top3 === "object" ? m.top3 : {},
      focus: m.focus && typeof m.focus === "object" ? m.focus : {},
      journal: m.journal && typeof m.journal === "object" ? m.journal : {},
      faits: m.faits && typeof m.faits === "object" ? m.faits : {}, // historique : jamais effacé
    };
  }
  function normEtat(s) {
    const n = etatVide();
    Object.keys((s && s.tasks) || {}).forEach(function (k, i) {
      const t = normTache(s.tasks[k], i);
      n.tasks[t.id] = t;
    });
    Object.keys((s && s.todos) || {}).forEach(function (k, i) {
      const d = normTodo(s.todos[k], i);
      n.todos[d.id] = d;
    });
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

  // Adresse de ton serveur Django (à changer le jour de la mise en ligne)
  const API_PLANNING = "http://127.0.0.1:8000/api/planning/";
  // Le serveur Django tourne seulement sur ton PC pour l'instant :
  // en ligne (GitHub), l'appli marche sans compte, sur l'appareil.
  const AVEC_SERVEUR = ["127.0.0.1", "localhost"].includes(location.hostname);
  function jeton() {
    return AVEC_SERVEUR ? localStorage.getItem("planningToken") : null;
  }

  function lireLocal(cle) {
    try {
      return JSON.parse(localStorage.getItem(cle));
    } catch (e) {
      return null;
    }
  }
  function ecrireLocal(cle, v) {
    try {
      localStorage.setItem(cle, JSON.stringify(v));
    } catch (e) {
      /* stockage indisponible */
    }
  }

  // Ancien format (première version de l'appli) -> nouveau format
  function depuisAncienFormat() {
    const s = etatVide();
    const today = aujourdhui();
    (lireLocal("planningTasks") || []).forEach(function (t, i) {
      const n = normTache(
        {
          id: t.id,
          titre: t.titre,
          heure: t.heure,
          heureFin: t.heureFin,
          categorie: t.categorie,
          notes: t.notes,
          jours: [0, 1, 2, 3, 4, 5, 6],
        },
        i,
      );
      s.tasks[n.id] = n;
    });
    (lireLocal("todos") || []).forEach(function (d, i) {
      const n = normTodo(
        {
          id: d.id,
          texte: d.texte,
          date: today,
          fait: d.fait,
          faitLe: d.fait ? today : null,
        },
        i,
      );
      s.todos[n.id] = n;
    });
    return s;
  }
  function chargerLocal() {
    const v2 = lireLocal(CLE_LOCALE);
    if (v2 && v2.tasks) return normEtat(v2);
    return depuisAncienFormat();
  }

  const sync = {
    mode: "local",
    pret: false,
    refs: null,
    enAttente: [],
    files: {},
    erreur: false,
  };

  function persister(op) {
    if (sync.mode === "api" && sync.pret) {
      ecrireApi(op);
      ecrireLocal(CLE_CACHE, etat);
      return;
    }
    if (sync.mode === "db" && sync.pret) {
      ecrireDb(op);
      ecrireLocal(CLE_CACHE, etat);
      return;
    }
    if (!sync.pret) sync.enAttente.push(op);
    ecrireLocal(sync.mode === "db" || jeton() ? CLE_CACHE : CLE_LOCALE, etat);
  }

  function enFile(chemin, fn) {
    const avant = sync.files[chemin] || Promise.resolve();
    const apres = avant
      .catch(function () {})
      .then(fn)
      .catch(function (e) {
        erreurDb(e);
      });
    sync.files[chemin] = apres;
    return apres;
  }
  function ecrireDb(op) {
    const r = sync.refs;
    if (op.type === "task") {
      const ref = r.tasks.doc(op.id);
      enFile(
        ref.path,
        op.suppr
          ? function () {
              return ref.delete();
            }
          : function () {
              return ref.set(op.valeur);
            },
      );
    } else if (op.type === "todo") {
      const ref = r.todos.doc(op.id);
      enFile(
        ref.path,
        op.suppr
          ? function () {
              return ref.delete();
            }
          : function () {
              return ref.set(op.valeur);
            },
      );
    } else if (op.type === "meta") {
      enFile(r.meta.path, function () {
        return r.meta.update(op.patch);
      });
    }
  }
  function erreurDb(e) {
    const code = e && e.code;
    if (code === "quota_exceeded")
      notifier("Stockage plein : supprime quelques vieilles tâches.");
    else if (code === "revoked" || code === "not_granted") {
      sync.erreur = true;
      rendreSync();
    } else if (code === "unavailable")
      notifier("Enregistrement impossible : vérifie que le serveur est lancé.");
  }

  // Modifications (toujours via ces fonctions)
  function enregistrerTache(t) {
    etat.tasks[t.id] = t;
    persister({ type: "task", id: t.id, valeur: cloner(t) });
    rendre();
  }
  function supprimerTache(id) {
    delete etat.tasks[id];
    persister({ type: "task", id: id, suppr: true });
    rendre();
  }
  function enregistrerTodo(d) {
    etat.todos[d.id] = d;
    persister({ type: "todo", id: d.id, valeur: cloner(d) });
    rendre();
  }
  function supprimerTodo(id) {
    delete etat.todos[id];
    persister({ type: "todo", id: id, suppr: true });
    rendre();
  }
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

  /* ---------- Synchronisation avec ton serveur Django ---------- */

  // Envoie une demande à l'API avec le jeton du compte
  async function appelApi(chemin, methode, corps) {
    const reponse = await fetch(API_PLANNING + chemin, {
      method: methode,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + jeton(),
      },
      body: corps === undefined ? undefined : JSON.stringify(corps),
    });
    if (reponse.status === 401) {
      // Jeton refusé : on déconnecte proprement
      localStorage.removeItem("planningToken");
      localStorage.removeItem("planningEmail");
      localStorage.removeItem(CLE_CACHE);
      location.reload();
      throw { code: "revoked" };
    }
    if (!reponse.ok) throw { code: "unavailable" };
    return reponse.status === 204 ? null : reponse.json();
  }

  // Transforme une modification de l'appli en demande à l'API
  function ecrireApi(op) {
    let chemin, methode, corps;
    if (op.type === "task" || op.type === "todo") {
      chemin =
        (op.type === "task" ? "taches/" : "todos/") +
        encodeURIComponent(op.id) +
        "/";
      methode = op.suppr ? "DELETE" : "PUT";
      corps = op.suppr ? undefined : op.valeur;
    } else if (op.type === "meta") {
      chemin = "suivi/";
      methode = "PATCH";
      corps = op.patch;
    } else {
      return;
    }
    enFile("api:" + chemin, function () {
      return appelApi(chemin, methode, corps);
    });
  }

  // Applique une modification faite pendant le chargement
  function appliquerOp(op) {
    if (op.type === "task") {
      if (op.suppr) delete etat.tasks[op.id];
      else etat.tasks[op.id] = normTache(op.valeur, 0);
    } else if (op.type === "todo") {
      if (op.suppr) delete etat.todos[op.id];
      else etat.todos[op.id] = normTodo(op.valeur, 0);
    } else if (op.type === "meta") fusion(etat.meta, op.patch);
  }

  // Au lancement, quand on est connecté : on charge les tâches du compte
  async function demarrerApi() {
    try {
      const distant = await appelApi("etat/", "GET");
      if (distant.nouveau) {
        // Premier lancement du compte : on envoie les tâches déjà présentes sur cet appareil
        const local = chargerLocal();
        await appelApi("import/", "POST", cloner(local));
        etat = local;
      } else {
        etat = normEtat(distant);
      }
      sync.mode = "api";
      sync.pret = true;
      const attente = sync.enAttente.splice(0);
      attente.forEach(function (op) {
        appliquerOp(op);
        ecrireApi(op);
      });
      ecrireLocal(CLE_CACHE, etat);
      rendre();
      rendreSync();
    } catch (e) {
      if (e && e.code === "revoked") return;
      sync.mode = "horsligne";
      sync.pret = true;
      sync.enAttente = [];
      rendreSync();
      notifier(
        "Serveur injoignable : tes modifications restent sur cet appareil.",
      );
    }
  }

  async function demarrerSync() {
    if (jeton()) return demarrerApi();
    const claude = window.claude;
    if (!claude || typeof claude.use !== "function") return passerEnLocal();
    let dbNs = null,
      userNs = null;
    try {
      const r = await Promise.all([claude.use("db"), claude.use("user")]);
      dbNs = r[0];
      userNs = r[1];
    } catch (e) {
      /* rien */
    }
    if (!dbNs || !userNs) return passerEnLocal();
    let uid = null;
    try {
      uid = await userNs.id();
    } catch (e) {
      uid = null;
    }
    if (!uid) return passerEnLocal();

    try {
      const base = dbNs.doc("data/users/" + uid + "/planner");
      const refs = {
        tasks: base.collection("tasks"),
        todos: base.collection("todos"),
        meta: dbNs.doc("data/users/" + uid + "/meta"),
      };
      const lus = await Promise.all([
        refs.tasks.get(),
        refs.todos.get(),
        refs.meta.get(),
      ]);

      if (!lus[2].exists && lus[0].empty && lus[1].empty) {
        // Première ouverture synchronisée : on envoie ce qui était enregistré sur cet appareil
        const local = chargerLocal();
        const taches = Object.keys(local.tasks),
          todos = Object.keys(local.todos);
        for (let i = 0; i < taches.length; i++)
          await refs.tasks.doc(taches[i]).set(cloner(local.tasks[taches[i]]));
        for (let i = 0; i < todos.length; i++)
          await refs.todos.doc(todos[i]).set(cloner(local.todos[todos[i]]));
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
        snap.docs.forEach(function (d, i) {
          const v = d.data();
          if (v) {
            const t = normTache(cloner(v), i);
            n[t.id] = t;
          }
        });
        etat.tasks = n;
        ecrireLocal(CLE_CACHE, etat);
        rendre();
      }, erreurDb);
      refs.todos.onSnapshot(function (snap) {
        const n = {};
        snap.docs.forEach(function (d, i) {
          const v = d.data();
          if (v) {
            const t = normTodo(cloner(v), i);
            n[t.id] = t;
          }
        });
        etat.todos = n;
        ecrireLocal(CLE_CACHE, etat);
        rendre();
      }, erreurDb);
      refs.meta.onSnapshot(function (snap) {
        const v = snap.data();
        if (v) {
          etat.meta = normMeta(cloner(v));
          ecrireLocal(CLE_CACHE, etat);
          rendre();
        }
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
    return Object.values(etat.tasks)
      .filter(function (t) {
        if (t.jours && t.jours.length)
          return t.jours.includes(dow) && (!t.debut || date >= t.debut);
        return t.date === date;
      })
      .sort(function (a, b) {
        return a.heure.localeCompare(b.heure) || a.titre.localeCompare(b.titre);
      });
  }
  function estFaite(t, date) {
    return !!(t.faits && t.faits[date]);
  }

  function todosDu(date) {
    const today = aujourdhui();
    return Object.values(etat.todos)
      .filter(function (d) {
        if (d.date === date) return true;
        if (date === today && !d.fait && d.date < today) return true; // reportée
        if (d.fait && d.faitLe === date && d.date < date) return true; // faite après report
        return false;
      })
      .sort(function (a, b) {
        if (a.fait !== b.fait) return a.fait ? 1 : -1;
        return (a.creeLe || 0) > (b.creeLe || 0) ? 1 : -1;
      });
  }
  function estReportee(d, date) {
    return d.date < date;
  }

  // État horaire de chaque tâche (aujourd'hui seulement)
  function etatsHoraires(date) {
    const liste = tachesDu(date);
    const today = aujourdhui();
    const nowMin = minutesMaintenant();
    return liste.map(function (t, i) {
      const debut = enMinutes(t.heure);
      let fin = t.heureFin
        ? enMinutes(t.heureFin)
        : liste[i + 1]
          ? enMinutes(liste[i + 1].heure)
          : 24 * 60;
      if (fin <= debut) fin = debut + 30;
      let moment = "futur";
      if (date < today) moment = "passe";
      else if (date === today) {
        if (nowMin >= fin) moment = "passe";
        else if (nowMin >= debut) moment = "maintenant";
      }
      return {
        tache: t,
        debut: debut,
        fin: fin,
        moment: moment,
        fait: estFaite(t, date),
      };
    });
  }

  function top3Cles(date) {
    const m = (etat.meta.top3 || {})[date] || {};
    return Object.keys(m)
      .filter(function (k) {
        return m[k] != null;
      })
      .sort(function (a, b) {
        return m[a] - m[b];
      });
  }
  function elementTop(cle, date) {
    const id = cle.slice(2);
    if (cle.indexOf("t:") === 0) {
      const t = etat.tasks[id];
      if (!t) return null;
      return {
        cle: cle,
        genre: "task",
        item: t,
        titre: t.titre,
        sous: t.heure,
        categorie: t.categorie,
        fait: estFaite(t, date),
      };
    }
    const d = etat.todos[id];
    if (!d) return null;
    return {
      cle: cle,
      genre: "todo",
      item: d,
      titre: d.texte,
      sous: "À faire",
      categorie: null,
      fait: d.fait,
    };
  }
  function top3Du(date) {
    return top3Cles(date)
      .map(function (k) {
        return elementTop(k, date);
      })
      .filter(Boolean);
  }
  function jourGagne(date) {
    const l = top3Du(date);
    return (
      l.length > 0 &&
      l.every(function (e) {
        return e.fait;
      })
    );
  }
  function serieActuelle() {
    const today = aujourdhui();
    let d = jourGagne(today) ? today : ajouterJours(today, -1);
    let n = 0;
    while (jourGagne(d) && n < 3650) {
      n++;
      d = ajouterJours(d, -1);
    }
    return n;
  }
  function basculerTop3(cle, date) {
    const cles = top3Cles(date);
    if (cles.includes(cle)) {
      majMeta({ top3: { [date]: { [cle]: null } } });
      return;
    }
    if (top3Du(date).length >= 3) {
      notifier("Ton Top 3 est déjà plein. Retire une étoile d'abord.");
      return;
    }
    // on nettoie les entrées d'éléments supprimés
    const patch = {};
    patch[cle] = Date.now();
    cles.forEach(function (k) {
      if (!elementTop(k, date)) patch[k] = null;
    });
    majMeta({ top3: { [date]: patch } });
  }
  function apresCoche(date) {
    if (date === aujourdhui() && jourGagne(date)) {
      const s = serieActuelle();
      notifier(
        "Top 3 terminé ! Série : " +
          s +
          " jour" +
          (s > 1 ? "s" : "") +
          " d'affilée.",
      );
    }
  }

  /* =========================================================
     6. ÉTAT DE L'ÉCRAN
     ========================================================= */
  const ui = {
    jour: aujourdhui(),
    semaine: lundiDe(aujourdhui()),
    onglet: "planning",
    ouverts: new Set(), // panneaux "Étapes" ouverts
    arme: null, // bouton supprimer en attente de confirmation
    edition: null, // id de la tâche en cours de modification
    formJours: new Set(),
    iaDispo: false,
    iaEnCours: new Set(),
    logoNouveau: "", // logo choisi pour la prochaine tâche à faire
    logoOuvert: false, // la liste des logos est-elle ouverte ?
    modesEtape: {}, // genre de la prochaine étape (simple / chrono / compteur)
    bilan: { periode: "semaine", ref: aujourdhui() }, // période affichée dans le bilan
    une: false, // écran « Une seule chose » ouvert ?
    uneSaut: [], // tâches passées avec « Autre chose »
    uneAffichee: null, // tâche affichée (pour l'animation)
  };
  let sampleNs = null;

  const $ = function (s) {
    return document.querySelector(s);
  };

  /* =========================================================
     7. AFFICHAGE
     ========================================================= */
  function capturerFocus() {
    const a = document.activeElement;
    if (a && a.dataset && a.dataset.fk)
      return {
        fk: a.dataset.fk,
        v: a.value,
        s: a.selectionStart,
        e: a.selectionEnd,
      };
    return null;
  }
  function restaurerFocus(f) {
    if (!f) return;
    const x = document.querySelector('[data-fk="' + f.fk + '"]');
    if (!x || x === document.activeElement) return;
    x.value = f.v;
    x.focus();
    try {
      x.setSelectionRange(f.s, f.e);
    } catch (e) {
      /* champ sans sélection */
    }
  }

  function rendre() {
    const f = capturerFocus();
    rendreEntete();
    rendreSemaine();
    rendreTop3();
    rendrePlanning();
    rendreTodos();
    rendreUne();
    rendreSemaineCarte();
    if (ui.onglet === "bilan") rendreBilan();
    restaurerFocus(f);
  }

  // ---------- En-tête ----------
  function rendreEntete() {
    const today = aujourdhui();
    const estAujourdhui = ui.jour === today;
    const dj = depuisCle(ui.jour);
    $("#hero-date").textContent = estAujourdhui
      ? "Aujourd'hui · " + dj.getDate() + " " + MOIS[dj.getMonth()]
      : dateLongue(ui.jour);
    $("#clock").textContent = heureMaintenant();

    const etats = etatsHoraires(ui.jour);
    const todos = todosDu(ui.jour);
    const total = etats.length + todos.length;
    const faites =
      etats.filter(function (e) {
        return e.fait;
      }).length +
      todos.filter(function (d) {
        return d.fait;
      }).length;
    $("#done-count").textContent = faites;
    $("#remaining-count").textContent = total - faites;

    let prochaine;
    if (estAujourdhui)
      prochaine = etats.find(function (e) {
        return e.moment === "futur" && !e.fait;
      });
    else prochaine = etats[0];

    // Série
    const serie = serieActuelle();
    const chipS = $("#streak-chip");
    chipS.innerHTML = ICONES.flame;
    chipS.appendChild(
      document.createTextNode(serie + (serie > 1 ? " jours" : " jour")),
    );
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
      b.onclick = function () {
        choisirJour(today);
      };
      badge.appendChild(b);
      return;
    }
    const enCours = etats
      .filter(function (e) {
        return e.moment === "maintenant";
      })
      .pop();
    if (enCours && !enCours.fait) {
      txt.appendChild(document.createTextNode("En cours : "));
      txt.appendChild(el("b", null, enCours.tache.titre));
      txt.appendChild(
        document.createTextNode(
          " · jusqu'à " + (enCours.tache.heureFin || "la suite"),
        ),
      );
      const b = el("button", "nb-btn", "Focus");
      b.onclick = function () {
        ouvrirFocus(cibleTache(enCours.tache));
      };
      badge.appendChild(b);
    } else if (enCours && enCours.fait) {
      txt.appendChild(document.createTextNode("Fait : "));
      txt.appendChild(el("b", null, enCours.tache.titre));
      txt.appendChild(
        document.createTextNode(
          prochaine ? " · ensuite à " + prochaine.tache.heure : " · bien joué",
        ),
      );
    } else if (prochaine) {
      txt.appendChild(document.createTextNode("Prochaine : "));
      txt.appendChild(el("b", null, prochaine.tache.titre));
      txt.appendChild(document.createTextNode(" à " + prochaine.tache.heure));
    } else {
      const reste = todos.filter(function (d) {
        return !d.fait;
      });
      if (reste.length) {
        txt.appendChild(document.createTextNode("Rien de planifié · "));
        txt.appendChild(el("b", null, reste.length + " à faire"));
        const b = el("button", "nb-btn", "Focus");
        b.onclick = function () {
          ouvrirFocus(cibleTodo(reste[0]));
        };
        badge.appendChild(b);
      } else {
        txt.appendChild(
          document.createTextNode("Rien en cours pour l'instant"),
        );
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
      const n = Math.min(
        tachesDu(k).length +
          todosDu(k).filter(function (x) {
            return x.date === k;
          }).length,
        4,
      );
      for (let j = 0; j < n; j++) dots.appendChild(el("i"));
      b.appendChild(dots);
      b.onclick = function () {
        choisirJour(k);
      };
      box.appendChild(b);
    }
  }
  function choisirJour(k) {
    if (ui.une) ui.une = false;
    if (ui.onglet === "bilan") montrerOnglet("planning");
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
    const faits = items.filter(function (e) {
      return e.fait;
    }).length;
    $("#top3").classList.toggle(
      "complete",
      items.length > 0 && faits === items.length,
    );
    $("#top3-meta").textContent = items.length
      ? faits === items.length
        ? "Terminé, bravo !"
        : faits + " / " + items.length + " fait" + (faits > 1 ? "s" : "")
      : "";

    if (!items.length) {
      const vide = el("div", "top3-empty");
      vide.innerHTML = ICONES.star.replace(
        "<svg ",
        '<svg fill="currentColor" ',
      );
      vide.appendChild(
        document.createTextNode(
          "Touche l'étoile de 3 tâches importantes. Fais-les en premier.",
        ),
      );
      liste.appendChild(vide);
      return;
    }
    items.forEach(function (e, i) {
      const row = el("div", "top3-item" + (e.fait ? " done" : ""));
      if (e.categorie)
        row.style.setProperty("--cat", "var(--" + e.categorie + ")");
      row.appendChild(el("span", "top3-num", String(i + 1)));
      const c = el("button", "check" + (e.fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute(
        "aria-label",
        e.fait ? "Marquer comme non faite" : "Marquer comme faite",
      );
      c.onclick = function () {
        e.genre === "task"
          ? cocherTache(e.item, ui.jour)
          : cocherTodo(e.item, ui.jour);
      };
      row.appendChild(c);
      row.appendChild(el("span", "top3-title", e.titre));
      row.appendChild(el("span", "top3-sub", e.sous));
      if (!e.fait) {
        const f = boutonIcone("mini-btn", "play", "Lancer le focus");
        f.onclick = function () {
          ouvrirFocus(
            e.genre === "task" ? cibleTache(e.item) : cibleTodo(e.item),
          );
        };
        row.appendChild(f);
      }
      liste.appendChild(row);
    });
  }

  // ---------- Étapes (partagé Planning / À faire) ----------
  function etapeFaite(genre, item, sid, date) {
    if (genre === "task") return !!((item.etapesFaites || {})[date] || {})[sid];
    const s = item.etapes.find(function (x) {
      return x.id === sid;
    });
    return !!(s && s.fait);
  }
  function sauverItem(genre, item) {
    genre === "task" ? enregistrerTache(item) : enregistrerTodo(item);
  }

  // Valeur du compteur d'une étape (par jour pour les tâches du planning)
  function valeurEtape(genre, item, s, date) {
    if (genre === "task")
      return Number(((item.etapesValeurs || {})[date] || {})[s.id]) || 0;
    return Number(s.valeur) || 0;
  }

  // Coche ou décoche une étape dans une copie de la tâche
  function marquerEtape(genre, copie, sid, date, fait) {
    if (genre === "task") {
      copie.etapesFaites[date] = copie.etapesFaites[date] || {};
      if (fait) copie.etapesFaites[date][sid] = true;
      else delete copie.etapesFaites[date][sid];
    } else {
      copie.etapes.forEach(function (x) {
        if (x.id === sid) x.fait = fait;
      });
    }
  }

  // + ou − sur le compteur d'une étape, avec les messages de réussite
  function changerCompteurEtape(genre, item, s, date, delta) {
    const copie = cloner(item);
    const avant = valeurEtape(genre, item, s, date);
    const apres = Math.max(0, avant + delta);
    if (genre === "task") {
      copie.etapesValeurs = copie.etapesValeurs || {};
      copie.etapesValeurs[date] = copie.etapesValeurs[date] || {};
      copie.etapesValeurs[date][s.id] = apres;
    } else {
      copie.etapes.forEach(function (x) {
        if (x.id === s.id) x.valeur = apres;
      });
    }
    const obj = s.objectif;
    const unite = s.unite ? " " + s.unite : "";
    if (avant < obj && apres >= obj) {
      marquerEtape(genre, copie, s.id, date, true);
      notifier(
        "Objectif atteint : " +
          obj +
          unite +
          " ! Tu peux continuer si tu veux.",
      );
    } else if (avant < obj / 2 && apres >= obj / 2) {
      notifier(
        "La moitié ! Plus que " +
          (obj - apres) +
          unite +
          ", continue comme ça.",
      );
    }
    sauverItem(genre, copie);
  }

  function panneauEtapes(genre, item, date) {
    const cle = (genre === "task" ? "t:" : "d:") + item.id;
    const box = el("div", "steps");
    const ul = el("ul");
    let prochaineMarquee = false;

    item.etapes.forEach(function (s) {
      const mode = s.mode || "simple";
      const fait = etapeFaite(genre, item, s.id, date);
      const li = el("li", "step-" + mode + (fait ? " done" : ""));
      if (!fait && !prochaineMarquee) {
        li.classList.add("next");
        prochaineMarquee = true;
      }

      // Case à cocher
      const c = el("button", "check small" + (fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute("aria-label", "Cocher l'étape");
      c.onclick = function () {
        const copie = cloner(item);
        marquerEtape(genre, copie, s.id, date, !fait);
        sauverItem(genre, copie);
      };
      li.appendChild(c);
      li.appendChild(el("span", "s-text", s.texte));

      // Chrono : bouton qui lance le minuteur
      if (mode === "chrono") {
        const b = chip("play", s.minutes + " min", fait ? "" : "accent");
        b.onclick = function () {
          const base = genre === "task" ? cibleTache(item) : cibleTodo(item);
          base.titre = base.titre + " · " + s.texte;
          base.etapeId = s.id;
          base.etapeDate = date;
          ouvrirFocus(base, s.minutes, true);
        };
        li.appendChild(b);
      }

      // Compteur : valeur actuelle
      let valeur = 0;
      if (mode === "compteur") {
        valeur = valeurEtape(genre, item, s, date);
        li.appendChild(
          el(
            "span",
            "s-valeur",
            valeur + "/" + s.objectif + (s.unite ? " " + s.unite : ""),
          ),
        );
      }

      // Retirer l'étape
      const x = boutonIcone("mini-btn", "x", "Retirer l'étape");
      x.onclick = function () {
        const copie = cloner(item);
        copie.etapes = copie.etapes.filter(function (y) {
          return y.id !== s.id;
        });
        sauverItem(genre, copie);
      };
      li.appendChild(x);

      // Compteur : barre de progression et boutons + / −
      if (mode === "compteur") {
        const zone = el("div", "s-compteur");
        const barre = el("div", "progress-track");
        const rempli = el("div", "progress-fill");
        rempli.style.width =
          Math.min(100, Math.round((valeur / s.objectif) * 100)) + "%";
        barre.appendChild(rempli);
        zone.appendChild(barre);
        const boutons = el("div", "compteur-boutons");
        [-1, 1, 5, 10].forEach(function (n) {
          const b = el(
            "button",
            "chip-btn" + (n > 0 ? " accent" : ""),
            (n > 0 ? "+" : "−") + Math.abs(n),
          );
          b.type = "button";
          b.setAttribute(
            "aria-label",
            (n > 0 ? "Ajouter " : "Retirer ") + Math.abs(n),
          );
          b.onclick = function () {
            changerCompteurEtape(genre, item, s, date, n);
          };
          boutons.appendChild(b);
        });
        const libre = el("input");
        libre.type = "number";
        libre.inputMode = "numeric";
        libre.placeholder = "+ …";
        libre.className = "compteur-libre";
        libre.dataset.fk = "clibre-" + cle + "-" + s.id;
        libre.onkeydown = function (e) {
          if (e.key !== "Enter") return;
          const n = Math.round(Number(libre.value));
          if (n) {
            libre.value = "";
            changerCompteurEtape(genre, item, s, date, n);
          }
        };
        boutons.appendChild(libre);
        zone.appendChild(boutons);
        li.appendChild(zone);
      }
      ul.appendChild(li);
    });
    if (item.etapes.length) box.appendChild(ul);

    // Choix du genre de la nouvelle étape
    const modeChoisi = ui.modesEtape[cle] || "simple";
    const choix = el("div", "step-modes");
    [
      ["simple", "Simple"],
      ["chrono", "Chrono"],
      ["compteur", "Compteur"],
    ].forEach(function (m) {
      const b = el(
        "button",
        "day-chip wide" + (modeChoisi === m[0] ? " on" : ""),
        m[1],
      );
      b.type = "button";
      b.onclick = function () {
        ui.modesEtape[cle] = m[0];
        rendre();
      };
      choix.appendChild(b);
    });
    box.appendChild(choix);

    // Ajout d'une étape
    const add = el(
      "div",
      "step-add" + (modeChoisi !== "simple" ? " options" : ""),
    );
    const input = el("input");
    input.type = "text";
    input.maxLength = 80;
    input.placeholder =
      modeChoisi === "chrono"
        ? "Ex : gainage"
        : modeChoisi === "compteur"
          ? "Ex : lire le livre"
          : item.etapes.length
            ? "Ajouter une étape…"
            : "Ex : ouvrir le cahier";
    input.dataset.fk = "step-" + cle;
    add.appendChild(input);

    let champMinutes = null,
      champObjectif = null,
      champUnite = null;
    if (modeChoisi === "chrono") {
      champMinutes = el("input", "step-nombre");
      champMinutes.type = "number";
      champMinutes.min = "1";
      champMinutes.inputMode = "numeric";
      champMinutes.placeholder = "min";
      champMinutes.dataset.fk = "smin-" + cle;
      add.appendChild(champMinutes);
    }
    if (modeChoisi === "compteur") {
      champObjectif = el("input", "step-nombre");
      champObjectif.type = "number";
      champObjectif.min = "1";
      champObjectif.inputMode = "numeric";
      champObjectif.placeholder = "Objectif";
      champObjectif.dataset.fk = "sobj-" + cle;
      champUnite = el("input", "step-unite");
      champUnite.type = "text";
      champUnite.maxLength = 20;
      champUnite.placeholder = "pages";
      champUnite.dataset.fk = "sunite-" + cle;
      add.appendChild(champObjectif);
      add.appendChild(champUnite);
    }

    const ok = el("button", "btn btn-soft", "Ajouter");
    function ajouter() {
      const v = input.value.trim();
      if (!v) {
        input.focus();
        return;
      }
      const etape = { id: nouvelId(), texte: v, fait: false, mode: modeChoisi };
      if (modeChoisi === "chrono") {
        const m = Math.round(Number(champMinutes.value));
        if (!m || m < 1) {
          champMinutes.focus();
          return;
        }
        etape.minutes = Math.min(m, 600);
      }
      if (modeChoisi === "compteur") {
        const o = Math.round(Number(champObjectif.value));
        if (!o || o < 1) {
          champObjectif.focus();
          return;
        }
        etape.objectif = o;
        etape.unite = champUnite.value.trim();
        etape.valeur = 0;
      }
      const copie = cloner(item);
      copie.etapes.push(etape);
      input.value = "";
      sauverItem(genre, copie);
    }
    ok.onclick = ajouter;
    [input, champMinutes, champObjectif, champUnite].forEach(function (c) {
      if (c)
        c.onkeydown = function (e) {
          if (e.key === "Enter") ajouter();
        };
    });
    add.appendChild(ok);
    box.appendChild(add);

    if (ui.iaDispo) {
      const outils = el("div", "step-tools");
      const enCours = ui.iaEnCours.has(cle);
      const ia = chip(
        "spark",
        enCours ? "Claude réfléchit…" : "Découper avec Claude",
      );
      ia.disabled = enCours;
      ia.onclick = function () {
        decouperAvecClaude(genre, item.id);
      };
      outils.appendChild(ia);
      box.appendChild(outils);
    }
    box.appendChild(
      el(
        "p",
        "steps-hint",
        item.etapes.length
          ? "Une étape à la fois. Commence par celle en gras."
          : "Découpe ta tâche en petites étapes faciles à cocher.",
      ),
    );
    return box;
  }

  function boutonSupprimer(cle, label, action) {
    const arme = ui.arme === cle;
    const b = boutonIcone(
      "mini-btn" + (arme ? " armed" : ""),
      "trash",
      arme ? "Confirmer la suppression" : label,
    );
    if (arme) {
      b.innerHTML = "";
      b.className = "chip-btn armed";
      b.textContent = "Confirmer ?";
    }
    b.onclick = function () {
      if (ui.arme === cle) {
        ui.arme = null;
        action();
        return;
      }
      ui.arme = cle;
      rendre();
      setTimeout(function () {
        if (ui.arme === cle) {
          ui.arme = null;
          rendre();
        }
      }, 3500);
    };
    return b;
  }

  function boutonEtapes(cle, genre, item, date) {
    const total = item.etapes.length;
    const faites = item.etapes.filter(function (s) {
      return etapeFaite(genre, item, s.id, date);
    }).length;
    const b = chip("list", total ? "Étapes " + faites + "/" + total : "Étapes");
    if (ui.ouverts.has(cle)) b.classList.add("accent");
    b.onclick = function () {
      if (ui.ouverts.has(cle)) ui.ouverts.delete(cle);
      else ui.ouverts.add(cle);
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
    const b = boutonIcone(
      "mini-btn star-btn" + (on ? " on" : ""),
      "star",
      on ? "Retirer du Top 3" : "Mettre dans le Top 3",
    );
    b.onclick = function () {
      basculerTop3(cle, date);
    };
    return b;
  }

  // ---------- Planning ----------
  function rendrePlanning() {
    const today = aujourdhui();
    $("#planning-label").textContent =
      ui.jour === today ? "Ta journée" : dateLongue(ui.jour);
    $("#btn-open-form").textContent =
      ui.edition || !$("#planning-form").hidden ? "Fermer" : "+ Nouvelle tâche";

    const box = $("#planning-list");
    box.innerHTML = "";
    const etats = etatsHoraires(ui.jour);
    box.classList.toggle("is-empty", etats.length === 0);
    if (!etats.length) {
      box.appendChild(
        el(
          "div",
          "empty",
          ui.jour < today
            ? "Rien n'était planifié ce jour-là."
            : "Rien de planifié. Ajoute ta première tâche avec « + Nouvelle tâche ».",
        ),
      );
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
      c.setAttribute(
        "aria-label",
        e.fait ? "Marquer comme non faite" : "Marquer comme faite",
      );
      c.onclick = function () {
        cocherTache(t, ui.jour);
      };
      top.appendChild(c);
      top.appendChild(
        el(
          "div",
          "t-time",
          t.heureFin ? t.heure + " – " + t.heureFin : t.heure,
        ),
      );
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
      body.appendChild(
        el(
          "div",
          "t-cat",
          cat.label + (t.heureFin ? " · " + formatDuree(e.fin - e.debut) : ""),
        ),
      );
      if (t.notes) body.appendChild(el("div", "t-notes", t.notes));

      const actions = el("div", "t-actions");
      if (!e.fait) {
        const f = chip("play", "Focus", "accent");
        f.onclick = function () {
          ouvrirFocus(cibleTache(t));
        };
        actions.appendChild(f);
      }
      actions.appendChild(boutonEtapes(cle, "task", t, ui.jour));
      // Modifier + supprimer restent ensemble, à droite
      const outils = el("span", "t-outils");
      const ed = boutonIcone("mini-btn", "edit", "Modifier");
      ed.onclick = function () {
        ouvrirFormulaire(t);
      };
      outils.appendChild(ed);
      outils.appendChild(
        boutonSupprimer(
          "del-" + cle,
          t.jours.length ? "Supprimer (tous les jours)" : "Supprimer",
          function () {
            ui.ouverts.delete(cle);
            supprimerTache(t.id);
          },
        ),
      );
      actions.appendChild(outils);
      body.appendChild(actions);

      if (ui.ouverts.has(cle))
        body.appendChild(panneauEtapes("task", t, ui.jour));

      item.appendChild(body);
      box.appendChild(item);
    });
  }

  function cocherTache(t, date) {
    const copie = cloner(etat.tasks[t.id] || t);
    if (copie.faits[date]) delete copie.faits[date];
    else copie.faits[date] = true;
    majMeta(
      {
        faits: {
          [date]: {
            ["t:" + copie.id]: copie.faits[date] ? copie.categorie : null,
          },
        },
      },
      true,
    );
    enregistrerTache(copie);
    apresCoche(date);
  }

  // Formulaire Planning
  function rendreJoursForm() {
    const box = $("#repeat-days");
    box.innerHTML = "";
    const tous = el(
      "button",
      "day-chip wide" + (ui.formJours.size === 7 ? " on" : ""),
      "Tous les jours",
    );
    tous.type = "button";
    tous.onclick = function () {
      if (ui.formJours.size === 7) ui.formJours.clear();
      else
        ORDRE_SEMAINE.forEach(function (j) {
          ui.formJours.add(j);
        });
      rendreJoursForm();
    };
    ORDRE_SEMAINE.forEach(function (j) {
      const b = el(
        "button",
        "day-chip" + (ui.formJours.has(j) ? " on" : ""),
        JOURS_LETTRE[j],
      );
      b.type = "button";
      b.setAttribute("aria-label", JOURS[j]);
      b.setAttribute("aria-pressed", ui.formJours.has(j) ? "true" : "false");
      b.onclick = function () {
        if (ui.formJours.has(j)) ui.formJours.delete(j);
        else ui.formJours.add(j);
        rendreJoursForm();
      };
      box.appendChild(b);
    });
    box.appendChild(tous);
    $("#repeat-hint").textContent = ui.formJours.size
      ? "Revient : " + libelleJours(Array.from(ui.formJours)).toLowerCase()
      : "Aucun jour choisi : seulement le " + dateLongue(ui.jour) + ".";
  }

  /* ---------- Choix de l'horaire : début, fin et durée ---------- */
  const DUREES = [15, 30, 45, 60, 90, 120, 180];
  const horaire = { debut: "", fin: "", ouvert: null }; // ouvert : "debut", "fin" ou null

  function enHeure(min) {
    min = Math.max(0, Math.min(min, 23 * 60 + 59));
    return pad(Math.floor(min / 60)) + ":" + pad(min % 60);
  }
  function prochainQuart() {
    return enHeure(Math.ceil((minutesMaintenant() + 1) / 15) * 15);
  }
  function dureeActuelle() {
    if (!horaire.debut || !horaire.fin) return 0;
    return enMinutes(horaire.fin) - enMinutes(horaire.debut);
  }

  function majHoraire() {
    $("#planning-time").value = horaire.debut;
    $("#planning-end").value = horaire.fin;
    $("#aff-debut").textContent = horaire.debut || "--:--";
    $("#aff-fin").textContent = horaire.fin || "--:--";
    $("#btn-debut").classList.toggle("on", horaire.ouvert === "debut");
    $("#btn-fin").classList.toggle("on", horaire.ouvert === "fin");
    const d = dureeActuelle();
    $("#aff-duree").textContent = d > 0 ? formatDuree(d) : "";

    // Durées rapides
    const zone = $("#durees");
    zone.innerHTML = "";
    DUREES.forEach(function (m) {
      const b = el(
        "button",
        "day-chip wide" + (d === m ? " on" : ""),
        formatDuree(m),
      );
      b.type = "button";
      b.onclick = function () {
        if (!horaire.debut) horaire.debut = prochainQuart();
        horaire.fin = enHeure(enMinutes(horaire.debut) + m);
        majHoraire();
      };
      zone.appendChild(b);
    });
    rendrePicker();
  }

  // La roue des heures et des minutes (on fait défiler, comme un réveil)
  const ROUE_H = 40; // hauteur d'une ligne (même valeur que --roue-h dans le CSS)
  let roue = null; // { champ, h, m } : la roue affichée

  function rendrePicker() {
    const p = $("#picker-heure");
    if (!horaire.ouvert) {
      p.hidden = true;
      p.innerHTML = "";
      roue = null;
      return;
    }
    p.hidden = false;
    if (!roue || roue.champ !== horaire.ouvert) construireRoue(horaire.ouvert);
    else placerRoue(true);
  }

  function construireRoue(champ) {
    const p = $("#picker-heure");
    p.innerHTML = "";
    p.appendChild(
      el(
        "div",
        "picker-titre",
        champ === "debut" ? "Heure de début" : "Heure de fin",
      ),
    );
    const zone = el("div", "roue");
    zone.appendChild(el("div", "roue-bande"));
    const colH = colonneRoue(24, "Heures");
    const colM = colonneRoue(60, "Minutes");
    zone.appendChild(colH);
    zone.appendChild(el("div", "roue-sep", ":"));
    zone.appendChild(colM);
    p.appendChild(zone);
    const ok = el("button", "btn btn-primary btn-block", "OK");
    ok.type = "button";
    ok.onclick = function () {
      horaire.ouvert = null;
      majHoraire();
    };
    p.appendChild(ok);
    roue = { champ: champ, h: colH, m: colM };
    placerRoue(false);
  }

  function colonneRoue(nombre, nom) {
    const c = el("div", "roue-col");
    c.tabIndex = 0;
    c.setAttribute("aria-label", nom);
    for (let i = 0; i < nombre; i++) {
      const item = el("div", "roue-item", pad(i));
      item.onclick = function () {
        c.scrollTo({ top: i * ROUE_H, behavior: "smooth" });
      };
      c.appendChild(item);
    }
    let attente = null;
    c.addEventListener(
      "scroll",
      function () {
        surlignerRoue(c);
        clearTimeout(attente);
        attente = setTimeout(lireRoue, 120);
      },
      { passive: true },
    );
    c.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const i = indexRoue(c) + (e.key === "ArrowDown" ? 1 : -1);
      c.scrollTo({
        top: Math.max(0, Math.min(i, nombre - 1)) * ROUE_H,
        behavior: "smooth",
      });
    });
    return c;
  }

  function indexRoue(c) {
    return Math.max(
      0,
      Math.min(Math.round(c.scrollTop / ROUE_H), c.children.length - 1),
    );
  }

  // Met en valeur le chiffre au centre
  function surlignerRoue(c) {
    const i = indexRoue(c);
    if (c._on === i) return;
    if (c._on != null && c.children[c._on])
      c.children[c._on].classList.remove("on");
    c.children[i].classList.add("on");
    c._on = i;
  }

  // Place la roue sur l'heure enregistrée
  function placerRoue(doux) {
    if (!roue) return;
    const v = horaire[roue.champ] || prochainQuart();
    [
      [roue.h, Number(v.slice(0, 2))],
      [roue.m, Number(v.slice(3, 5))],
    ].forEach(function (x) {
      if (indexRoue(x[0]) === x[1] && x[0]._on === x[1]) return;
      if (doux) x[0].scrollTo({ top: x[1] * ROUE_H, behavior: "smooth" });
      else x[0].scrollTop = x[1] * ROUE_H;
      surlignerRoue(x[0]);
    });
  }

  // Quand la roue s'arrête : on enregistre l'heure choisie
  function lireRoue() {
    if (!roue) return;
    const v = pad(indexRoue(roue.h)) + ":" + pad(indexRoue(roue.m));
    if (v !== horaire[roue.champ]) choisirHeure(roue.champ, v);
  }

  // Quand on change le début, la fin suit en gardant la même durée
  function choisirHeure(champ, valeur) {
    const duree = dureeActuelle() > 0 ? dureeActuelle() : 30;
    horaire[champ] = valeur;
    if (champ === "debut") horaire.fin = enHeure(enMinutes(valeur) + duree);
    majHoraire();
  }

  function basculerPicker(champ) {
    horaire.ouvert = horaire.ouvert === champ ? null : champ;
    majHoraire();
  }

  function ouvrirFormulaire(t) {
    const form = $("#planning-form");
    form.hidden = false;
    ui.edition = t ? t.id : null;
    $("#form-title").textContent = t ? "Modifier la tâche" : "Nouvelle tâche";
    $("#btn-add-planning").textContent = t ? "Enregistrer" : "Ajouter";
    $("#planning-title").value = t ? t.titre : "";
    if (t) {
      horaire.debut = t.heure;
      horaire.fin = t.heureFin || enHeure(enMinutes(t.heure) + 30);
    } else {
      horaire.debut = ui.jour === aujourdhui() ? prochainQuart() : "09:00";
      horaire.fin = enHeure(enMinutes(horaire.debut) + 30);
    }
    horaire.ouvert = null;
    majHoraire();
    $("#planning-category").value = t
      ? t.categorie
      : $("#planning-category").value;
    $("#planning-notes").value = t ? t.notes : "";
    ui.formJours = new Set(t ? t.jours : []);
    afficherErreur("");
    rendreJoursForm();
    montrerOnglet("planning");
    rendrePlanning();
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(function () {
      $("#planning-title").focus();
    }, 60);
  }
  function fermerFormulaire() {
    $("#planning-form").hidden = true;
    ui.edition = null;
    rendrePlanning();
  }
  function afficherErreur(m) {
    $("#planning-error").textContent = m;
  }

  function validerFormulaire() {
    const titre = $("#planning-title").value.trim();
    const heure = $("#planning-time").value;
    const heureFin = $("#planning-end").value;
    if (!titre) {
      afficherErreur("Donne un titre à ta tâche.");
      $("#planning-title").focus();
      return;
    }
    if (!heure) {
      afficherErreur("Choisis l'heure de début.");
      basculerPicker("debut");
      return;
    }
    if (!heureFin) {
      afficherErreur("Choisis l'heure de fin.");
      basculerPicker("fin");
      return;
    }
    if (enMinutes(heureFin) <= enMinutes(heure)) {
      afficherErreur("L'heure de fin doit être après l'heure de début.");
      horaire.ouvert = "fin";
      majHoraire();
      return;
    }
    afficherErreur("");

    const jours = Array.from(ui.formJours).sort();
    const ancien = ui.edition ? etat.tasks[ui.edition] : null;
    const t = ancien
      ? cloner(ancien)
      : normTache({ id: nouvelId(), creeLe: aujourdhui() }, 0);
    t.titre = titre;
    t.heure = heure;
    t.heureFin = heureFin;
    t.categorie = $("#planning-category").value;
    t.notes = $("#planning-notes").value.trim();
    t.jours = jours;
    if (jours.length) {
      t.date = null;
      if (!ancien || !ancien.jours.length)
        t.debut = ui.jour < aujourdhui() ? ui.jour : aujourdhui();
    } else {
      t.date = ancien && ancien.date ? ancien.date : ui.jour;
      t.debut = "";
    }
    $("#planning-form").hidden = true;
    ui.edition = null;
    enregistrerTache(t);
    notifier(
      ancien
        ? "Tâche modifiée."
        : "Tâche ajoutée" +
            (jours.length
              ? " (" + libelleJours(jours).toLowerCase() + ")."
              : "."),
    );
  }

  // ---------- À faire ----------
  // Rangée de logos (formulaire ou tâche existante)
  function rangeeLogos(actuel, choisir) {
    const box = el("div", "logos");
    Object.keys(LOGOS).forEach(function (l) {
      const b = el("button", "logo-btn" + (l === actuel ? " on" : ""));
      b.type = "button";
      b.innerHTML = svgLogo(l);
      b.title = LOGOS[l].nom;
      b.setAttribute("aria-label", LOGOS[l].nom);
      b.setAttribute("aria-pressed", l === actuel ? "true" : "false");
      b.onclick = function () {
        choisir(l === actuel ? "" : l);
      };
      box.appendChild(b);
    });
    if (actuel) {
      const aucun = el("button", "chip-btn logos-aucun", "Sans logo");
      aucun.type = "button";
      aucun.onclick = function () {
        choisir("");
      };
      box.appendChild(aucun);
    }
    return box;
  }

  // Logo : caché par défaut, on l'ajoute seulement si on veut
  function rendreLogosForm() {
    const zone = $("#todo-logos");
    zone.innerHTML = "";
    const l = ui.logoNouveau;
    const bouton = el(
      "button",
      "chip-btn logo-choix" +
        (l ? " choisi" : "") +
        (ui.logoOuvert ? " ouvert" : ""),
    );
    bouton.type = "button";
    bouton.setAttribute("aria-expanded", ui.logoOuvert ? "true" : "false");
    bouton.innerHTML = l
      ? svgLogo(l) + "<span>" + LOGOS[l].nom + "</span>"
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 8.5v7M8.5 12h7"/></svg><span>Ajouter un logo</span>';
    bouton.onclick = function () {
      ui.logoOuvert = !ui.logoOuvert;
      rendreLogosForm();
    };
    zone.appendChild(bouton);
    if (ui.logoOuvert) {
      zone.appendChild(
        rangeeLogos(l, function (choix) {
          ui.logoNouveau = choix;
          ui.logoOuvert = false;
          rendreLogosForm();
          $("#todo-input").focus();
        }),
      );
    }
  }

  function rendreTodos() {
    rendreLogosForm();
    const box = $("#todo-list");
    box.innerHTML = "";
    const liste = todosDu(ui.jour);
    const faites = liste.filter(function (d) {
      return d.fait;
    }).length;
    $("#progress-fill").style.width =
      (liste.length ? Math.round((faites / liste.length) * 100) : 0) + "%";
    $("#progress-num").textContent = faites + " / " + liste.length;

    if (!liste.length) {
      box.appendChild(
        el(
          "div",
          "empty",
          "Rien à faire pour ce jour. Note ici les petites choses sans heure précise.",
        ),
      );
      return;
    }
    liste.forEach(function (d) {
      const cle = "d:" + d.id;
      const item = el("div", "todo-item" + (d.fait ? " done" : ""));
      const main = el("div", "todo-main");
      const c = el("button", "check" + (d.fait ? " on" : ""));
      c.type = "button";
      c.innerHTML = ICONES.check;
      c.setAttribute(
        "aria-label",
        d.fait ? "Marquer comme non faite" : "Marquer comme faite",
      );
      c.onclick = function () {
        cocherTodo(d, ui.jour);
      };
      main.appendChild(c);
      // Le logo s'affiche seulement si la tâche en a un
      if (d.icone) {
        const logo = el("button", "todo-logo");
        logo.type = "button";
        logo.innerHTML = svgLogo(d.icone);
        logo.setAttribute("aria-label", "Changer le logo");
        logo.onclick = function () {
          const k = "i:" + cle;
          if (ui.ouverts.has(k)) ui.ouverts.delete(k);
          else ui.ouverts.add(k);
          rendre();
        };
        main.appendChild(logo);
      }
      main.appendChild(el("div", "todo-title", d.texte));
      if (!d.fait && estReportee(d, ui.jour)) {
        const tag = el("span", "tag", "Reportée");
        tag.title = "Prévue le " + dateLongue(d.date);
        main.appendChild(tag);
      }
      main.appendChild(boutonEtoile(cle, ui.jour));
      item.appendChild(main);
      if (d.icone && ui.ouverts.has("i:" + cle)) {
        item.appendChild(
          rangeeLogos(d.icone, function (l) {
            const copie = cloner(d);
            copie.icone = l;
            ui.ouverts.delete("i:" + cle);
            enregistrerTodo(copie);
          }),
        );
      }

      const actions = el("div", "t-actions");
      if (!d.fait) {
        const f = chip("play", "Focus", "accent");
        f.onclick = function () {
          ouvrirFocus(cibleTodo(d));
        };
        actions.appendChild(f);
      }
      actions.appendChild(boutonEtapes(cle, "todo", d, ui.jour));
      actions.appendChild(el("span", "spacer"));
      actions.appendChild(
        boutonSupprimer("del-" + cle, "Supprimer", function () {
          ui.ouverts.delete(cle);
          supprimerTodo(d.id);
        }),
      );
      item.appendChild(actions);
      if (ui.ouverts.has(cle))
        item.appendChild(panneauEtapes("todo", d, ui.jour));
      box.appendChild(item);
    });
  }
  function cocherTodo(d, date) {
    const copie = cloner(etat.todos[d.id] || d);
    copie.fait = !copie.fait;
    copie.faitLe = copie.fait ? date : null;
    majMeta(
      { faits: { [date]: { ["d:" + copie.id]: copie.fait ? "todo" : null } } },
      true,
    );
    enregistrerTodo(copie);
    apresCoche(date);
  }
  function ajouterTodo() {
    const input = $("#todo-input");
    const texte = input.value.trim();
    if (!texte) {
      input.focus();
      return;
    }
    enregistrerTodo(
      normTodo(
        {
          id: nouvelId(),
          texte: texte,
          icone: ui.logoNouveau,
          date: ui.jour,
          creeLe: Date.now(),
        },
        0,
      ),
    );
    ui.logoNouveau = "";
    ui.logoOuvert = false;
    rendreLogosForm();
    input.value = "";
    input.focus();
  }

  // ---------- Synchro ----------
  /* ---------- Écran « Une seule chose » ---------- */
  // La liste des choses possibles, dans l'ordre : en cours, la prochaine, Top 3, le reste
  function candidatsUne() {
    const today = aujourdhui();
    const liste = [];
    const vus = new Set();
    function ajouter(genre, item, contexte, categorie) {
      const cle = (genre === "task" ? "t:" : "d:") + item.id;
      if (vus.has(cle)) return;
      vus.add(cle);
      liste.push({
        cle: cle,
        genre: genre,
        item: item,
        contexte: contexte,
        categorie: categorie,
      });
    }
    const horaires = etatsHoraires(today).filter(function (e) {
      return !e.fait;
    });
    const futures = horaires.filter(function (e) {
      return e.moment === "futur";
    });
    function ajouterTache(e) {
      const t = e.tache;
      const quand =
        e.moment === "maintenant"
          ? "En cours · " + t.heure + " – " + enHeure(e.fin)
          : "À " + t.heure;
      ajouter("task", t, quand, t.categorie);
    }
    horaires
      .filter(function (e) {
        return e.moment === "maintenant";
      })
      .forEach(ajouterTache);
    futures.slice(0, 1).forEach(ajouterTache);
    top3Du(today)
      .filter(function (e) {
        return !e.fait;
      })
      .forEach(function (e) {
        ajouter(e.genre, e.item, "Top 3", e.categorie);
      });
    futures.slice(1).forEach(ajouterTache);
    todosDu(today)
      .filter(function (d) {
        return !d.fait;
      })
      .forEach(function (d) {
        ajouter("todo", d, "À faire", null);
      });
    return liste;
  }

  function choseActuelle() {
    const liste = candidatsUne();
    if (!liste.length) return { chose: null, total: 0 };
    let restantes = liste.filter(function (c) {
      return !ui.uneSaut.includes(c.cle);
    });
    if (!restantes.length) {
      ui.uneSaut = [];
      restantes = liste;
    }
    return { chose: restantes[0], total: liste.length };
  }

  function basculerUne(ouvrir) {
    ui.une = typeof ouvrir === "boolean" ? ouvrir : !ui.une;
    ui.uneSaut = [];
    ui.uneAffichee = null;
    if (ui.une) {
      $("#planning-form").hidden = true;
      ui.edition = null;
    }
    rendre();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // La première étape pas encore faite
  function etapeActuelle(c) {
    const date = aujourdhui();
    const etapes = c.item.etapes || [];
    for (let i = 0; i < etapes.length; i++) {
      if (!etapeFaite(c.genre, c.item, etapes[i].id, date))
        return { etape: etapes[i], num: i + 1, total: etapes.length };
    }
    return null;
  }

  function rendreUne() {
    document.body.classList.toggle("mode-une", ui.une);
    const bouton = $("#btn-une");
    bouton.innerHTML = ui.une
      ? ICONES.retour + "<span>Tout afficher</span>"
      : ICONES.play + "<span>C'est parti !</span>";
    bouton.classList.toggle("retour", ui.une);
    $("#une").hidden = !ui.une;
    if (!ui.une) return;

    const carte = $("#une-carte");
    const r = choseActuelle();
    const c = r.chose;
    carte.innerHTML = "";
    carte.style.removeProperty("--cat");
    const cleAffichee = c ? c.cle : "vide";
    carte.classList.remove("entre");
    if (ui.uneAffichee !== cleAffichee) {
      void carte.offsetWidth;
      carte.classList.add("entre");
    }
    ui.uneAffichee = cleAffichee;

    if (!c) {
      carte.appendChild(el("div", "une-contexte", "C'est calme"));
      carte.appendChild(el("h2", "une-titre", "Rien à faire pour l'instant."));
      carte.appendChild(
        el("p", "une-notes", "Tout est fait ou rien n'est prévu. Profite."),
      );
      const retour = el("button", "btn btn-soft", "Tout afficher");
      retour.type = "button";
      retour.onclick = function () {
        basculerUne(false);
      };
      carte.appendChild(retour);
      return;
    }

    if (c.categorie)
      carte.style.setProperty("--cat", "var(--" + c.categorie + ")");
    carte.appendChild(el("div", "une-contexte", c.contexte));
    carte.appendChild(
      el("h2", "une-titre", c.genre === "task" ? c.item.titre : c.item.texte),
    );
    if (c.genre === "task" && c.item.notes)
      carte.appendChild(el("p", "une-notes", c.item.notes));

    // L'étape à faire maintenant
    const ea = etapeActuelle(c);
    if (ea) {
      const s = ea.etape;
      const bloc = el("div", "une-etape");
      bloc.appendChild(
        el("span", "une-etape-num", "Étape " + ea.num + " / " + ea.total),
      );
      bloc.appendChild(el("p", "une-etape-texte", s.texte));
      if (s.mode === "compteur") {
        const valeur = valeurEtape(c.genre, c.item, s, aujourdhui());
        const ligne = el("div", "une-compteur");
        const barre = el("div", "progress-track");
        const rempli = el("div", "progress-fill");
        rempli.style.width =
          Math.min(100, Math.round((valeur / s.objectif) * 100)) + "%";
        barre.appendChild(rempli);
        ligne.appendChild(barre);
        ligne.appendChild(
          el(
            "span",
            "progress-num",
            valeur + " / " + s.objectif + (s.unite ? " " + s.unite : ""),
          ),
        );
        bloc.appendChild(ligne);
        const boutons = el("div", "compteur-boutons");
        [-1, 1, 5, 10].forEach(function (n) {
          const b = el(
            "button",
            "chip-btn" + (n > 0 ? " accent" : ""),
            (n > 0 ? "+" : "−") + Math.abs(n),
          );
          b.type = "button";
          b.onclick = function () {
            changerCompteurEtape(c.genre, c.item, s, aujourdhui(), n);
          };
          boutons.appendChild(b);
        });
        bloc.appendChild(boutons);
      }
      carte.appendChild(bloc);
    }

    // Les 3 boutons
    const actions = el("div", "une-actions");
    const fait = el(
      "button",
      "btn btn-primary une-fait",
      ea ? "Étape faite" : "C'est fait",
    );
    fait.type = "button";
    fait.onclick = function () {
      const today = aujourdhui();
      if (ea) {
        const copie = cloner(c.item);
        marquerEtape(c.genre, copie, ea.etape.id, today, true);
        if (ea.num < ea.total) {
          sauverItem(c.genre, copie);
          notifier("Étape faite. La suite !");
          return;
        }
        sauverItem(c.genre, copie);
      }
      if (c.genre === "task")
        cocherTache(etat.tasks[c.item.id] || c.item, today);
      else cocherTodo(etat.todos[c.item.id] || c.item, today);
      notifier("Bien joué !");
    };
    actions.appendChild(fait);

    const chrono = ea && ea.etape.mode === "chrono";
    const focusBtn = el("button", "btn btn-soft", "");
    focusBtn.type = "button";
    focusBtn.innerHTML =
      ICONES.play +
      "<span>" +
      (chrono ? "Focus " + ea.etape.minutes + " min" : "Focus") +
      "</span>";
    focusBtn.onclick = function () {
      const cible = c.genre === "task" ? cibleTache(c.item) : cibleTodo(c.item);
      if (chrono) {
        cible.titre = cible.titre + " · " + ea.etape.texte;
        cible.etapeId = ea.etape.id;
        cible.etapeDate = aujourdhui();
        ouvrirFocus(cible, ea.etape.minutes, true);
      } else ouvrirFocus(cible);
    };
    actions.appendChild(focusBtn);

    const autre = el("button", "btn btn-ghost", "Autre chose");
    autre.type = "button";
    autre.disabled = r.total < 2;
    autre.onclick = function () {
      ui.uneSaut.push(c.cle);
      rendreUne();
    };
    actions.appendChild(autre);
    carte.appendChild(actions);
  }

  /* ---------- Bilan : semaine, mois, année (rien n'est jamais effacé) ---------- */
  const MOIS_COURTS = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ];
  const NOMS_CATS = {
    sport: "Sport",
    etudes: "Études",
    menage: "Ménage / Maison",
    admin: "Admin / Vie perso",
    pro: "Vie pro",
    todo: "À faire",
  };

  // Ce qui a été fait un jour donné : { "t:id": catégorie, "d:id": "todo" }
  function faitsDu(k) {
    const res = {};
    const log = (etat.meta.faits || {})[k] || {};
    Object.keys(log).forEach(function (c) {
      if (log[c]) res[c] = log[c];
    });
    // anciennes données (avant l'historique)
    Object.values(etat.tasks).forEach(function (t) {
      const c = "t:" + t.id;
      if (t.faits && t.faits[k] && !(c in log)) res[c] = t.categorie;
    });
    Object.values(etat.todos).forEach(function (d) {
      const c = "d:" + d.id;
      if (d.fait && d.faitLe === k && !(c in log)) res[c] = "todo";
    });
    return res;
  }
  function focusDu(k) {
    const f = (etat.meta.focus || {})[k] || {};
    return Object.values(f).reduce(function (s, x) {
      return s + (x && x.min ? Number(x.min) : 0);
    }, 0);
  }

  function bornesBilan() {
    const p = ui.bilan.periode,
      ref = depuisCle(ui.bilan.ref);
    if (p === "semaine") {
      const d = lundiDe(ui.bilan.ref);
      return { debut: d, fin: ajouterJours(d, 6) };
    }
    if (p === "mois") {
      const d = new Date(ref.getFullYear(), ref.getMonth(), 1),
        f = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
      return { debut: cleDate(d), fin: cleDate(f) };
    }
    return {
      debut: ref.getFullYear() + "-01-01",
      fin: ref.getFullYear() + "-12-31",
    };
  }
  function titreBilan(b) {
    const today = aujourdhui();
    const dedans = b.debut <= today && today <= b.fin;
    const d = depuisCle(b.debut),
      f = depuisCle(b.fin);
    if (ui.bilan.periode === "semaine") {
      if (dedans) return "Cette semaine";
      return (
        d.getDate() +
        " " +
        MOIS_COURTS[d.getMonth()] +
        " – " +
        f.getDate() +
        " " +
        MOIS_COURTS[f.getMonth()] +
        (f.getFullYear() !== new Date().getFullYear()
          ? " " + f.getFullYear()
          : "")
      );
    }
    if (ui.bilan.periode === "mois") {
      const t = MOIS[d.getMonth()] + " " + d.getFullYear();
      return t.charAt(0).toUpperCase() + t.slice(1);
    }
    return String(d.getFullYear());
  }
  function deplacerBilan(sens) {
    const p = ui.bilan.periode,
      ref = depuisCle(ui.bilan.ref);
    if (p === "semaine") ui.bilan.ref = ajouterJours(ui.bilan.ref, 7 * sens);
    else if (p === "mois")
      ui.bilan.ref = cleDate(
        new Date(ref.getFullYear(), ref.getMonth() + sens, 1),
      );
    else ui.bilan.ref = cleDate(new Date(ref.getFullYear() + sens, 0, 1));
    rendreBilan();
  }

  function rendreBilan() {
    const today = aujourdhui();
    const b = bornesBilan();
    document.querySelectorAll("#bilan-periodes button").forEach(function (x) {
      x.classList.toggle("on", x.dataset.p === ui.bilan.periode);
    });
    $("#bilan-titre").textContent = titreBilan(b);
    $("#bilan-suiv").disabled = b.fin >= today;

    // On parcourt chaque jour de la période
    const total = {
      faits: 0,
      planning: 0,
      prevues: 0,
      focus: 0,
      top3: 0,
      actifs: 0,
      jours: 0,
    };
    const cats = {};
    const unites = []; // une barre par jour (semaine, mois) ou par mois (année)
    for (let k = b.debut; k <= b.fin; k = ajouterJours(k, 1)) {
      const f = faitsDu(k);
      const n = Object.keys(f).length;
      const fm = focusDu(k);
      Object.keys(f).forEach(function (c) {
        cats[f[c]] = (cats[f[c]] || 0) + 1;
        if (c.indexOf("t:") === 0) total.planning++;
      });
      total.faits += n;
      total.focus += fm;
      if (k <= today) {
        total.jours++;
        total.prevues += tachesDu(k).length;
        if (n) total.actifs++;
        if (jourGagne(k)) total.top3++;
      }
      const d = depuisCle(k);
      if (ui.bilan.periode === "annee") {
        const m = d.getMonth();
        if (!unites[m])
          unites[m] = {
            valeur: 0,
            focus: 0,
            label: MOIS[m].charAt(0).toUpperCase(),
            titre: MOIS[m].charAt(0).toUpperCase() + MOIS[m].slice(1),
            actuel: false,
            futur: true,
          };
        unites[m].valeur += n;
        unites[m].focus += fm;
        if (k === today) unites[m].actuel = true;
        if (k <= today) unites[m].futur = false;
      } else {
        unites.push({
          valeur: n,
          focus: fm,
          label:
            ui.bilan.periode === "semaine"
              ? JOURS_LETTRE[d.getDay()]
              : String(d.getDate()),
          titre:
            JOURS_COURTS[d.getDay()] +
            " " +
            d.getDate() +
            " " +
            MOIS_COURTS[d.getMonth()],
          actuel: k === today,
          futur: k > today,
        });
      }
    }

    // Tuiles
    const tuiles = $("#bilan-tuiles");
    tuiles.innerHTML = "";
    const h = Math.floor(total.focus / 60),
      mn = total.focus % 60;
    const taux = total.prevues
      ? Math.min(100, Math.round((total.planning / total.prevues) * 100))
      : null;
    [
      [String(total.faits), total.faits > 1 ? "tâches faites" : "tâche faite"],
      [h ? h + " h" + (mn ? " " + pad(mn) : "") : mn + " min", "de focus"],
      [String(total.top3), "Top 3 réussi" + (total.top3 > 1 ? "s" : "")],
      [taux === null ? "–" : taux + " %", "du planning fait"],
    ].forEach(function (t) {
      const x = el("div", "tuile");
      x.appendChild(el("b", null, t[0]));
      x.appendChild(el("span", null, t[1]));
      tuiles.appendChild(x);
    });
    $("#bilan-moyenne").textContent = total.actifs
      ? total.actifs +
        " jour" +
        (total.actifs > 1 ? "s" : "") +
        " actif" +
        (total.actifs > 1 ? "s" : "") +
        " sur " +
        total.jours
      : "";

    // Graphique en barres
    const zone = $("#bilan-barres");
    zone.innerHTML = "";
    zone.className = "barres " + ui.bilan.periode;
    const max = Math.max(
      1,
      ...unites.map(function (u) {
        return u.valeur;
      }),
    );
    const bulle = el("div", "bulle");
    bulle.hidden = true;
    const piste = el("div", "barres-piste");
    let maxMontre = false;
    unites.forEach(function (u, i) {
      const col = el(
        "button",
        "barre" + (u.actuel ? " actuel" : "") + (u.futur ? " futur" : ""),
      );
      col.type = "button";
      const texte =
        u.titre +
        " : " +
        u.valeur +
        " tâche" +
        (u.valeur > 1 ? "s" : "") +
        (u.focus ? " · " + formatDuree(u.focus) + " de focus" : "");
      col.setAttribute("aria-label", texte);
      const rempli = el("i");
      rempli.style.height =
        (u.valeur ? Math.max(4, (u.valeur / max) * 100) : 0) + "%";
      if (u.valeur === max && u.valeur > 0 && !maxMontre) {
        maxMontre = true;
        rempli.appendChild(el("em", null, String(u.valeur)));
      }
      col.appendChild(rempli);
      const montrer = function () {
        bulle.textContent = "";
        bulle.appendChild(
          el("b", null, u.valeur + " tâche" + (u.valeur > 1 ? "s" : "")),
        );
        bulle.appendChild(
          el(
            "span",
            null,
            u.titre +
              (u.focus ? " · " + formatDuree(u.focus) + " de focus" : ""),
          ),
        );
        bulle.hidden = false;
        const r = col.getBoundingClientRect(),
          z = zone.getBoundingClientRect();
        const x = r.left - z.left + r.width / 2;
        bulle.style.left = Math.max(70, Math.min(z.width - 70, x)) + "px";
      };
      col.addEventListener("pointerenter", montrer);
      col.addEventListener("focus", montrer);
      col.addEventListener("click", montrer);
      col.addEventListener("pointerleave", function () {
        bulle.hidden = true;
      });
      col.addEventListener("blur", function () {
        bulle.hidden = true;
      });
      piste.appendChild(col);
    });
    zone.appendChild(bulle);
    zone.appendChild(piste);
    const labels = el("div", "barres-labels");
    unites.forEach(function (u, i) {
      const montre =
        ui.bilan.periode !== "mois" || i === 0 || (i + 1) % 5 === 0;
      labels.appendChild(
        el("span", u.actuel ? "actuel" : null, montre ? u.label : ""),
      );
    });
    zone.appendChild(labels);

    // Par catégorie
    const liste = $("#bilan-cats");
    liste.innerHTML = "";
    const cles = Object.keys(cats).sort(function (a, c) {
      return cats[c] - cats[a];
    });
    if (!cles.length) {
      liste.appendChild(
        el(
          "p",
          "hint",
          "Rien de coché sur cette période. Chaque tâche cochée apparaîtra ici.",
        ),
      );
      return;
    }
    const maxCat = cats[cles[0]];
    cles.forEach(function (c) {
      const ligne = el("div", "cat-ligne");
      ligne.style.setProperty(
        "--cat",
        c === "todo" ? "var(--ink)" : "var(--" + c + ")",
      );
      ligne.appendChild(el("span", "cat-nom", NOMS_CATS[c] || c));
      const piste = el("div", "cat-piste");
      const rempli = el("i");
      rempli.style.width = Math.max(3, (cats[c] / maxCat) * 100) + "%";
      piste.appendChild(rempli);
      ligne.appendChild(piste);
      ligne.appendChild(el("b", "cat-val", String(cats[c])));
      liste.appendChild(ligne);
    });
  }

  // Petite carte « Ta semaine » (colonne de gauche sur PC)
  function rendreSemaineCarte() {
    const zone = $("#semaine-carte");
    const today = aujourdhui();
    const lundi = lundiDe(today);
    let faits = 0,
      focusMin = 0;
    const jours = [];
    for (let i = 0; i < 7; i++) {
      const k = ajouterJours(lundi, i);
      const n = Object.keys(faitsDu(k)).length;
      faits += n;
      focusMin += focusDu(k);
      jours.push({ k: k, n: n });
    }
    const max = Math.max(
      1,
      ...jours.map(function (j) {
        return j.n;
      }),
    );
    zone.innerHTML = "";
    const tete = el("div", "card-head");
    tete.appendChild(el("div", "card-title", "Ta semaine"));
    tete.appendChild(el("div", "card-meta", "Voir le bilan →"));
    zone.appendChild(tete);
    const chiffres = el("div", "sc-chiffres");
    const h = Math.floor(focusMin / 60),
      mn = focusMin % 60;
    [
      [String(faits), faits > 1 ? "tâches faites" : "tâche faite"],
      [h ? h + " h" + (mn ? " " + pad(mn) : "") : mn + " min", "de focus"],
    ].forEach(function (c) {
      const x = el("div", "sc-chiffre");
      x.appendChild(el("b", null, c[0]));
      x.appendChild(el("span", null, c[1]));
      chiffres.appendChild(x);
    });
    zone.appendChild(chiffres);
    const barres = el("div", "sc-barres");
    jours.forEach(function (j) {
      const col = el(
        "div",
        "sc-col" +
          (j.k === today ? " actuel" : "") +
          (j.k > today ? " futur" : ""),
      );
      const piste = el("div", "sc-piste");
      const i = el("i");
      i.style.height = (j.n ? Math.max(8, (j.n / max) * 100) : 0) + "%";
      piste.appendChild(i);
      col.appendChild(piste);
      col.appendChild(el("span", null, JOURS_LETTRE[jourSemaine(j.k)]));
      col.title = j.n + " tâche" + (j.n > 1 ? "s" : "");
      barres.appendChild(col);
    });
    zone.appendChild(barres);
  }

  function rendreSync() {
    const n = $("#sync-note");
    n.classList.toggle(
      "ok",
      (sync.mode === "db" || sync.mode === "api") && !sync.erreur,
    );
    if (!sync.pret) n.textContent = "Chargement…";
    else if (sync.erreur)
      n.textContent = "Synchro interrompue : recharge la page.";
    else if (sync.mode === "api") n.textContent = "Enregistré sur ton compte";
    else if (sync.mode === "horsligne")
      n.textContent =
        "Serveur injoignable : modifications gardées sur cet appareil";
    else if (sync.mode === "db")
      n.textContent = "Synchronisé entre ton téléphone et ton ordi";
    else n.textContent = "Enregistré sur cet appareil";
  }

  function montrerOnglet(nom) {
    ui.onglet = nom;
    document.body.dataset.onglet = nom;
    if (nom === "bilan") rendreBilan();
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.tab === nom);
    });
    document.querySelectorAll(".panel").forEach(function (p) {
      p.classList.toggle("active", p.id === "panel-" + nom);
    });
  }

  let minuteurSnack = null;
  function notifier(msg) {
    const s = $("#snack");
    s.textContent = msg;
    s.hidden = false;
    clearTimeout(minuteurSnack);
    minuteurSnack = setTimeout(function () {
      s.hidden = true;
    }, 3200);
  }

  /* =========================================================
     8. MODE FOCUS (minuteur)
     ========================================================= */
  const CIRC = 2 * Math.PI * 52;
  let focus = lireLocal(CLE_FOCUS) || {
    statut: "pret",
    mode: "focus",
    duree: 25,
    finA: 0,
    reste: 0,
    cible: null,
    debutA: 0,
  };
  if (focus.statut === "pret" && focus.duree < 15) focus.duree = 25;
  let boucleFocus = null;
  let audio = null;

  function cibleTache(t) {
    return { genre: "task", id: t.id, titre: t.titre, categorie: t.categorie };
  }
  function cibleTodo(d) {
    return { genre: "todo", id: d.id, titre: d.texte, categorie: null };
  }
  function sauverFocus() {
    ecrireLocal(CLE_FOCUS, focus);
  }

  function ouvrirFocus(cible, minutes, lancer) {
    if (focus.statut === "marche" || focus.statut === "pause") {
      if (cible && focus.cible && cible.id !== focus.cible.id)
        notifier("Un focus est déjà en cours. Termine-le d'abord.");
      $("#focus-sheet").hidden = false;
      rendreFocus();
      return;
    }
    focus = {
      statut: "pret",
      mode: "focus",
      duree: minutes || focus.duree || 25,
      finA: 0,
      reste: 0,
      cible: cible || null,
      debutA: 0,
    };
    sauverFocus();
    $("#focus-sheet").hidden = false;
    if (lancer) demarrerFocus();
    else rendreFocus();
  }
  function fermerFocus() {
    $("#focus-sheet").hidden = true;
    rendreFocus();
  }

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
      const ecoule =
        focus.statut === "pause"
          ? focus.duree * 60000 - focus.reste
          : focus.duree * 60000 - (focus.finA - Date.now());
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
    majMeta({
      focus: {
        [jour]: {
          [nouvelId()]: {
            min: min,
            titre: focus.cible ? focus.cible.titre : "Session libre",
          },
        },
      },
    });
  }
  function finirFocus() {
    jouerSon();
    if (focus.mode === "focus") {
      enregistrerSession(focus.duree);
      if (focus.cible && focus.cible.etapeId) terminerEtapeFocus();
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
  // Coche automatiquement l'étape dont le chrono vient de finir
  function terminerEtapeFocus() {
    const c = focus.cible;
    const item = c.genre === "task" ? etat.tasks[c.id] : etat.todos[c.id];
    if (!item) return;
    const copie = cloner(item);
    marquerEtape(c.genre, copie, c.etapeId, c.etapeDate || aujourdhui(), true);
    sauverItem(c.genre, copie);
  }
  function lancerPause(min) {
    focus.dureeAvantPause = focus.duree;
    focus.mode = "pause";
    focus.duree = min;
    demarrerFocus();
  }
  function lancerBoucle() {
    clearInterval(boucleFocus);
    boucleFocus = setInterval(function () {
      if (focus.statut !== "marche") {
        clearInterval(boucleFocus);
        return;
      }
      if (Date.now() >= focus.finA) {
        clearInterval(boucleFocus);
        finirFocus();
        return;
      }
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
    if (focus.statut === "marche")
      document.title =
        txt + " · " + (focus.mode === "pause" ? "Pause" : "Focus");
  }

  function rendreFocus() {
    const sheet = $("#focus-sheet");
    const card = sheet.querySelector(".sheet-card");
    const ring = $("#focus-ring");
    ring.style.strokeDasharray = String(CIRC);
    if (focus.cible && focus.cible.categorie)
      card.style.setProperty("--cat", "var(--" + focus.cible.categorie + ")");
    else card.style.removeProperty("--cat");

    $("#focus-mode").textContent =
      focus.mode === "pause" ? "Pause" : "Mode focus";
    $("#focus-task").textContent =
      focus.mode === "pause"
        ? "Pause"
        : focus.cible
          ? focus.cible.titre
          : "Session libre";
    const etiquettes = {
      pret: "Prêt",
      marche: focus.mode === "pause" ? "Pause" : "Concentration",
      pause: "En pause",
      fini: "Terminé",
    };
    $("#focus-state").textContent = etiquettes[focus.statut];

    // Durées
    const durs = $("#focus-durations");
    durs.hidden = focus.statut !== "pret";
    durs.querySelectorAll(".dur").forEach(function (b) {
      b.classList.toggle("on", Number(b.dataset.min) === focus.duree);
    });

    // Message
    let msg = "";
    const etape = !!(focus.cible && focus.cible.etapeId);
    if (focus.statut === "pret") msg = "Une seule chose à la fois.";
    if (focus.statut === "fini")
      msg = etape
        ? "Étape terminée, elle est cochée."
        : formatDuree(focus.duree) + " de concentration.";
    if (focus.statut === "marche" && focus.mode === "focus")
      msg = "Tu peux réduire cette fenêtre, le chrono continue.";
    if (focus.statut === "pause") msg = "Reprends quand tu es prêt.";
    $("#focus-msg").textContent = msg;

    // Boutons
    const act = $("#focus-actions");
    act.innerHTML = "";
    function bouton(texte, cls, fn) {
      const b = el("button", "btn " + cls, texte);
      b.type = "button";
      b.onclick = fn;
      act.appendChild(b);
      return b;
    }
    if (focus.statut === "pret") {
      bouton(
        focus.mode === "pause" ? "Lancer la pause" : "Démarrer",
        "btn-primary",
        demarrerFocus,
      );
    } else if (focus.statut === "marche") {
      bouton("Pause", "btn-soft", pauseFocus);
      bouton("Arrêter", "btn-ghost", arreterFocus);
    } else if (focus.statut === "pause") {
      bouton("Reprendre", "btn-primary", reprendreFocus);
      bouton("Arrêter", "btn-ghost", arreterFocus);
    } else if (focus.statut === "fini") {
      if (focus.cible && !etape && !cibleFaite(focus.cible))
        bouton("Tâche terminée", "btn-primary", function () {
          terminerCible();
        });
      bouton("Pause 5 min", "btn-soft", function () {
        lancerPause(5);
      });
      bouton("Fermer", "btn-ghost", function () {
        focus.statut = "pret";
        sauverFocus();
        fermerFocus();
      });
    }

    // Pastille quand la fenêtre est réduite
    const actif = focus.statut === "marche" || focus.statut === "pause";
    $("#focus-pill").hidden = !(actif && sheet.hidden);
    $("#focus-pill-title").textContent =
      focus.mode === "pause"
        ? "Pause"
        : focus.cible
          ? focus.cible.titre
          : "Focus";
    rendreTemps();
  }
  function cibleFaite(c) {
    if (c.genre === "task") {
      const t = etat.tasks[c.id];
      return !t || estFaite(t, aujourdhui());
    }
    const d = etat.todos[c.id];
    return !d || d.fait;
  }
  function terminerCible() {
    const c = focus.cible;
    if (c.genre === "task" && etat.tasks[c.id])
      cocherTache(etat.tasks[c.id], aujourdhui());
    else if (c.genre === "todo" && etat.todos[c.id])
      cocherTodo(etat.todos[c.id], aujourdhui());
    rendreFocus();
  }

  // Petit son doux de fin (si le navigateur l'autorise)
  function preparerSon() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC && !audio) audio = new AC();
      if (audio && audio.state === "suspended") audio.resume();
    } catch (e) {
      audio = null;
    }
  }
  function jouerSon() {
    if (!audio) return;
    try {
      [0, 0.18, 0.36].forEach(function (dt, i) {
        const o = audio.createOscillator(),
          g = audio.createGain();
        o.type = "sine";
        o.frequency.value = [660, 880, 990][i];
        g.gain.setValueAtTime(0.0001, audio.currentTime + dt);
        g.gain.exponentialRampToValueAtTime(
          0.18,
          audio.currentTime + dt + 0.02,
        );
        g.gain.exponentialRampToValueAtTime(
          0.0001,
          audio.currentTime + dt + 0.5,
        );
        o.connect(g);
        g.connect(audio.destination);
        o.start(audio.currentTime + dt);
        o.stop(audio.currentTime + dt + 0.55);
      });
    } catch (e) {
      /* pas de son */
    }
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
    const categorie =
      genre === "task"
        ? CATEGORIES[item.categorie].label
        : "Tâche du quotidien";
    const notes = genre === "task" && item.notes ? item.notes : "aucune";
    const deja =
      item.etapes
        .map(function (s) {
          return s.texte;
        })
        .join(" | ") || "aucune";
    const prompt =
      "Tu aides une personne qui procrastine à démarrer une tâche. Découpe la tâche en 3 à 5 étapes très concrètes, " +
      "dans l'ordre, en français, au tutoiement et à l'impératif, 60 caractères maximum chacune. " +
      "La première étape doit prendre moins de 2 minutes et être ridiculement facile. Pas de numéros.\n" +
      'Réponds uniquement avec un tableau JSON de chaînes, par exemple : ["Ouvrir le cahier de maths", "Relire la leçon 3"].\n\n' +
      "Tâche : " +
      titre +
      "\nCatégorie : " +
      categorie +
      "\nNotes : " +
      notes +
      "\nÉtapes déjà prévues (à ne pas répéter) : " +
      deja;
    try {
      const rep = await sampleNs.json(prompt, { modelTier: "quick" });
      const etapes = (Array.isArray(rep) ? rep : [])
        .map(function (s) {
          return String(s).trim().slice(0, 80);
        })
        .filter(Boolean)
        .slice(0, 6);
      if (!etapes.length) throw { code: "invalid_json" };
      const actuel = genre === "task" ? etat.tasks[id] : etat.todos[id];
      if (!actuel) return;
      const copie = cloner(actuel);
      etapes.forEach(function (t) {
        copie.etapes.push({ id: nouvelId(), texte: t, fait: false });
      });
      ui.ouverts.add(cle);
      sauverItem(genre, copie);
      notifier("Voilà tes étapes. Commence par la première !");
    } catch (e) {
      const code = e && e.code;
      if (
        [
          "not_granted",
          "sampling_disabled",
          "not_declared",
          "capability_disabled",
          "capability_removed",
        ].includes(code)
      ) {
        ui.iaDispo = false;
        notifier(
          "Claude n'est pas disponible ici. Ajoute tes étapes à la main.",
        );
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
        $("#alert-cat").textContent =
          CATEGORIES[t.categorie].label +
          (t.heureFin ? " · jusqu'à " + t.heureFin : "");
        $("#alert-title").textContent = t.titre;
        $("#alert-overlay").hidden = false;
        jouerSon();
      }
    });
  }
  function fermerAlerte() {
    $("#alert-overlay").hidden = true;
  }

  /* =========================================================
     11. BRANCHEMENTS ET DÉMARRAGE
     ========================================================= */
  // Pas de zoom : ni en pinçant (iPhone), ni avec Ctrl + molette
  function bloquerZoom() {
    ["gesturestart", "gesturechange"].forEach(function (ev) {
      document.addEventListener(
        ev,
        function (e) {
          e.preventDefault();
        },
        { passive: false },
      );
    });
    document.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches && e.touches.length > 1) e.preventDefault();
      },
      { passive: false },
    );
    document.addEventListener(
      "wheel",
      function (e) {
        if (e.ctrlKey) e.preventDefault();
      },
      { passive: false },
    );
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key))
        e.preventDefault();
    });
  }

  function brancher() {
    bloquerZoom();
    $("#week-prev").innerHTML = ICONES.left;
    $("#week-next").innerHTML = ICONES.right;
    $("#focus-close").innerHTML = ICONES.minus;

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        montrerOnglet(tab.dataset.tab);
      });
    });
    $("#week-prev").onclick = function () {
      ui.semaine = ajouterJours(ui.semaine, -7);
      rendreSemaine();
    };
    $("#week-next").onclick = function () {
      ui.semaine = ajouterJours(ui.semaine, 7);
      rendreSemaine();
    };

    $("#btn-open-form").onclick = function () {
      if ($("#planning-form").hidden) ouvrirFormulaire(null);
      else fermerFormulaire();
    };
    $("#btn-cancel-planning").onclick = fermerFormulaire;
    $("#btn-debut").onclick = function () {
      basculerPicker("debut");
    };
    $("#btn-fin").onclick = function () {
      basculerPicker("fin");
    };
    $("#btn-add-planning").onclick = validerFormulaire;
    $("#planning-title").addEventListener("keydown", function (e) {
      if (e.key === "Enter") validerFormulaire();
    });

    $("#btn-une").onclick = function () {
      basculerUne();
    };
    $("#semaine-carte").onclick = function () {
      ui.bilan = { periode: "semaine", ref: aujourdhui() };
      montrerOnglet("bilan");
    };
    $("#bilan-prec").innerHTML = ICONES.left;
    $("#bilan-suiv").innerHTML = ICONES.right;
    $("#bilan-prec").onclick = function () {
      deplacerBilan(-1);
    };
    $("#bilan-suiv").onclick = function () {
      deplacerBilan(1);
    };
    document.querySelectorAll("#bilan-periodes button").forEach(function (b) {
      b.onclick = function () {
        ui.bilan.periode = b.dataset.p;
        ui.bilan.ref = aujourdhui();
        rendreBilan();
      };
    });
    document.body.dataset.onglet = ui.onglet;
    $("#btn-add-todo").onclick = ajouterTodo;
    $("#todo-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") ajouterTodo();
    });

    // Focus
    $("#focus-durations")
      .querySelectorAll(".dur")
      .forEach(function (b) {
        b.onclick = function () {
          focus.duree = Number(b.dataset.min);
          sauverFocus();
          rendreFocus();
        };
      });
    $("#focus-close").onclick = fermerFocus;
    $("#focus-pill").onclick = function () {
      $("#focus-sheet").hidden = false;
      rendreFocus();
    };
    $("#focus-sheet").addEventListener("click", function (e) {
      if (e.target === $("#focus-sheet")) fermerFocus();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !$("#focus-sheet").hidden) fermerFocus();
    });

    // Alerte
    $("#btn-alert-later").onclick = fermerAlerte;
    $("#btn-alert-focus").onclick = function () {
      fermerAlerte();
      if (alerteCible) ouvrirFocus(cibleTache(alerteCible));
    };
  }

  let dernierJour = aujourdhui();
  function tic() {
    const today = aujourdhui();
    if (today !== dernierJour) {
      // minuit : on passe au nouveau jour
      if (ui.jour === dernierJour) {
        ui.jour = today;
        ui.semaine = lundiDe(today);
      }
      dernierJour = today;
      rendre();
    } else {
      rendreEntete();
      rendrePlanningEtats();
      if (ui.une) rendreUne();
    }
    verifierAlertes();
  }
  // Mise à jour légère des états "en cours / passé" sans tout redessiner
  function rendrePlanningEtats() {
    etatsHoraires(ui.jour).forEach(function (e) {
      const item = document.querySelector(
        '#planning-list .t-item[data-id="' + e.tache.id + '"]',
      );
      if (!item) return;
      item.classList.toggle("now", !e.fait && e.moment === "maintenant");
      item.classList.toggle("past", !e.fait && e.moment === "passe");
    });
  }

  async function demarrer() {
    // Affichage immédiat avec ce qu'on a sur l'appareil
    const cache = window.claude || jeton() ? lireLocal(CLE_CACHE) : null;
    etat = cache && cache.tasks ? normEtat(cache) : chargerLocal();
    brancher();
    rendre();
    rendreSync();
    rendreFocus();
    if (focus.statut === "marche") {
      if (Date.now() >= focus.finA) finirFocus();
      else lancerBoucle();
    }
    setInterval(tic, 10000);
    verifierAlertes();

    // Claude pour découper les tâches (seulement sur le lien Claude)
    if (window.claude && typeof window.claude.use === "function") {
      window.claude
        .use("sample")
        .then(function (ns) {
          sampleNs = ns;
          ui.iaDispo = !!ns;
          if (ns) rendre();
        })
        .catch(function () {
          /* indisponible */
        });
    }
    await demarrerSync();
  }

  demarrer();
})();

/* ---------- Intro au lancement ---------- */
(function () {
  const intro = document.querySelector("#intro");
  if (!intro) return;

  function retirer() {
    if (intro.isConnected) intro.remove();
  }

  // Si le téléphone demande moins d'animations, on n'affiche pas l'intro
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    retirer();
    return;
  }

  // On démarre quand les polices sont prêtes (ou au bout de 0,8 s maximum)
  const polices = document.fonts ? document.fonts.ready : Promise.resolve();
  const delaiMax = new Promise(function (ok) {
    setTimeout(ok, 800);
  });
  Promise.race([polices, delaiMax]).then(function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        intro.classList.add("go");
      });
    });
    // Sécurité : quoi qu'il arrive, l'intro disparaît après 5 secondes
    setTimeout(retirer, 5000);
  });

  // Quand l'intro a fini de s'effacer, on la retire de la page
  intro.addEventListener("animationend", function (e) {
    if (e.animationName === "intro-sortie") retirer();
  });

  // Toucher l'écran passe l'intro
  intro.addEventListener("click", retirer);
})();

/* ---------- Compte : connexion / inscription ---------- */
(function () {
  // En ligne (GitHub), pas de compte tant que le serveur n'est pas en ligne
  if (!["127.0.0.1", "localhost"].includes(location.hostname)) return;
  const API = "http://127.0.0.1:8000/api/comptes/";

  const ecran = document.querySelector("#auth");
  const form = document.querySelector("#auth-form");
  const titre = document.querySelector("#auth-titre");
  const sous = document.querySelector("#auth-sous");
  const champEmail = document.querySelector("#auth-email");
  const champMdp = document.querySelector("#auth-password");
  const erreur = document.querySelector("#auth-erreur");
  const bouton = document.querySelector("#auth-bouton");
  const bascule = document.querySelector("#auth-bascule");
  const barre = document.querySelector("#compte-bar");
  const emailAffiche = document.querySelector("#compte-email");
  const btnDeconnexion = document.querySelector("#btn-deconnexion");

  let mode = "connexion"; // ou "inscription"

  // Change les textes selon le mode
  function afficherMode() {
    const inscription = mode === "inscription";
    titre.textContent = inscription ? "Créer un compte" : "Connexion";
    sous.textContent = inscription
      ? "Un petit pas maintenant, un grand futur demain."
      : "Content de te revoir !";
    bouton.textContent = inscription ? "Créer mon compte" : "Se connecter";
    bascule.textContent = inscription
      ? "Déjà un compte ? Se connecter"
      : "Pas encore de compte ? Créer un compte";
    champMdp.autocomplete = inscription ? "new-password" : "current-password";
  }

  // Affiche l'email connecté en bas de l'appli
  function afficherCompte() {
    const email = localStorage.getItem("planningEmail");
    barre.hidden = !email;
    emailAffiche.textContent = email ? "Connecté : " + email : "";
  }

  // Bouton pour passer de Connexion à Inscription (et inversement)
  bascule.addEventListener("click", function () {
    mode = mode === "connexion" ? "inscription" : "connexion";
    erreur.textContent = "";
    afficherMode();
  });

  // Envoi du formulaire au serveur
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    erreur.textContent = "";
    bouton.disabled = true;
    bouton.textContent = "Patiente…";

    try {
      const reponse = await fetch(API + mode + "/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: champEmail.value,
          password: champMdp.value,
        }),
      });
      const donnees = await reponse.json();

      if (reponse.ok) {
        localStorage.setItem("planningToken", donnees.token);
        localStorage.setItem("planningEmail", donnees.email);
        // On recharge l'appli pour charger les tâches du compte
        location.reload();
        return;
      } else {
        erreur.textContent = donnees.erreur || "Une erreur est survenue.";
      }
    } catch (err) {
      erreur.textContent =
        "Impossible de joindre le serveur. Est-il bien lancé ?";
    }
    bouton.disabled = false;
    afficherMode();
  });

  // Déconnexion : on oublie le jeton et les tâches du compte sur cet appareil
  btnDeconnexion.addEventListener("click", function () {
    localStorage.removeItem("planningToken");
    localStorage.removeItem("planningEmail");
    localStorage.removeItem("planningZinouCache");
    location.reload();
  });

  // Au lancement
  afficherMode();
  afficherCompte();
  if (!localStorage.getItem("planningToken")) {
    ecran.hidden = false;
  }
})();
