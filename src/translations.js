// src/translations.js
export const translations = {
  ar: {
    dir: "rtl",
    // === واجهة المستخدم ===
    appName: "أكاديمية الضرب",
    tagline: "منهج تفاعلي للمتعلمين من 10 إلى 15 سنة",
    dashboard: "لوحة التحكم",
    conceptLessons: "الدروس المنهجية",
    trainingMode: "وضع التدريب",
    selectTable: "اختر الجدول:",
    mixed: "مختلط (1-12)",
    accuracy: "دقة",
    speed: "سرعة ⏱️",
    tableBtn: "الجدول التفاعلي",
    mistakesBtn: "مراجعة الأخطاء",
    printBtn: "إنشاء ورقة عمل",
    wordProblemsBtn: "مسائل كلامية",
    masteryTitle: "مستوى الإتقان",
    exit: "خروج",
    question: "السؤال",
    reviewSmart: "مراجعة ذكية",
    training: "تدريب",
    submit: "تأكيد",
    correctMsg: "صحيح!",
    wrongMsg: "إجابة خاطئة",
    resultsTitle: "جلسة مكتملة!",
    accuracyLabel: "الدقة",
    timeLabel: "الوقت",
    home: "الرئيسية",
    retry: "إعادة",
    back: "رجوع",
    lessonNext: "التالي",
    lessonFinish: "إنهاء الدرس",
    lessonConcept: "المفهوم",
    lessonCheck: "تحقق",
    printHeader: "ورقة تدريب جدول الضرب",
    printName: "الاسم",
    printDate: "التاريخ",
    printTable: "الجدول",
    noMistakes: "لا توجد أخطاء! أداء ممتاز 🌟",
    challengeMistakes: "تحدي أخطائي",
    wpTitle: "مسائل كلامية تفاعلية",
    wpRead: "القراءة",
    wpExtract: "استخراج الأرقام",
    wpModel: "النموذج",
    wpSolve: "الحل",
    wpCheck: "التحقق",
    wpHint: "تلميح",
    wpNew: "مسألة جديدة 🔄",
    wpFinish: "إنهاء التحدي وحفظ التقدم",

    // === محتوى الدروس العميق ===
    lessons: {
      concept: {
        title: "ما هو الضرب حقاً؟",
        concept: "الضرب ليس حفظاً، بل هو جمع متكرر منظم.",
        steps: [
          { text: "3 × 4 تعني: 3 مجموعات، في كل مجموعة 4 عناصر", answer: 10 },
          {
            text: "يمكن عكسها: 4 × 3 = نفس الناتج (خاصية التبادل)",
            answer: null,
          },
          { text: "جرب: كم عدد العناصر في 5 صفوف × 2 أعمدة؟", answer: 10 },
        ],
      },
      pattern9: {
        title: "حيلة الرقم 9 المتسلسلة",
        concept:
          "ناتج ضرب 9 يتبع نمطاً تسلسلياً: كل إجابة تُبنى على التي قبلها.",
        steps: [
          {
            text:
              "القاعدة: عند الانتقال لضرب العدد التالي في 9، نزيد العشرات بـ 1 وننقص الآحاد بـ 1.",
            answer: null,
          },
          { text: "نقطة الانطلاق: نعلم أن 9 × 7 = 63", answer: null },
          {
            text:
              "خطوة الانتقال لـ 9 × 8: من 63 ← العشرات (6+1=7)، الآحاد (3-1=2) ← الناتج 72",
            answer: null,
          },
          { text: "طبقها: احسب 9 × 9", answer: 81 },
        ],
      },
      placevalue: {
        title: "ضرب الأعداد الكبيرة بسهولة",
        concept: "قسّم العدد الكبير إلى أجزاء، اضرب كل جزء، ثم اجمع.",
        steps: [
          { text: "12 × 6 = (10 × 6) + (2 × 6)", answer: null },
          { text: "60 + 12 = 72", answer: null },
          { text: "جرّب: 14 × 5 = ؟", answer: 70 },
        ],
      },
      commutative: {
        title: "خاصية التبادل",
        concept: "ترتيب الأرقام في الضرب لا يغير الناتج: a × b = b × a.",
        steps: [
          { text: "لاحظ: 6 × 8 = 48 و 8 × 6 = 48.", answer: null },
          { text: "مسألة: 7 علب × 9 أقلام = ؟", answer: 63 },
        ],
      },
      areamodel: {
        title: "الضرب كنموذج مساحة",
        concept: "الضرب هو مساحة مستطيل. الطول × العرض.",
        steps: [
          { text: "مستطيل 5 × 4 يغطي 20 مربعاً.", answer: null },
          { text: "غرفة 7م × 5م = ؟", answer: 35 },
        ],
      },
      estimation: {
        title: "التقدير الذكي",
        concept: "التقريب يساعدنا على اتخاذ قرارات سريعة.",
        steps: [
          { text: "47 × 6 ≈ 50 × 6 = 300", answer: null },
          { text: "سعر اللعبة 43، تريد 8 ألعاب. هل 350 تكفي؟", answer: 1 },
        ],
      },
    },

    // === سيناريوهات المسائل الكلامية ===
    wordScenarios: [
      {
        type: "shopping",
        text: "اشتريت {n1} ألعاب، سعر كل لعبة {n2} ريالاً. كم دفعت إجمالاً؟",
        hint: "اضرب عدد الألعاب في سعر الوحدة",
      },
      {
        type: "sports",
        text:
          "يلعب فريق {n1} مباريات، ويسجل متوسط {n2} نقطة في كل مباراة. كم نقطة شهرياً؟",
        hint: "المباريات × النقاط",
      },
      {
        type: "gaming",
        text: "تكسب {n1} عملة كل مستوى. أكملت {n2} مستويات. كم عملة جمعت؟",
        hint: "العملات × المستويات",
      },
      {
        type: "cooking",
        text: "وصفة كعكة تحتاج {n1} بيضات. تريد خبز {n2} كعكات. كم بيضة تحتاج؟",
        hint: "المكونات × عدد الوحدات",
      },
    ],
  },

  en: {
    dir: "ltr",
    // === UI ===
    appName: "Multiplication Academy",
    tagline: "Interactive curriculum for ages 10-15",
    dashboard: "Dashboard",
    conceptLessons: "Concept Lessons",
    trainingMode: "Training Mode",
    selectTable: "Select Table:",
    mixed: "Mixed (1-12)",
    accuracy: "Accuracy",
    speed: "Speed ⏱️",
    tableBtn: "Interactive Table",
    mistakesBtn: "Mistake Review",
    printBtn: "Print Worksheet",
    wordProblemsBtn: "Word Problems",
    masteryTitle: "Mastery Level",
    exit: "Exit",
    question: "Question",
    reviewSmart: "Smart Review",
    training: "Practice",
    submit: "Submit",
    correctMsg: "Correct!",
    wrongMsg: "Wrong Answer",
    resultsTitle: "Session Complete!",
    accuracyLabel: "Accuracy",
    timeLabel: "Time",
    home: "Home",
    retry: "Retry",
    back: "Back",
    lessonNext: "Next",
    lessonFinish: "Finish Lesson",
    lessonConcept: "Concept",
    lessonCheck: "Check",
    printHeader: "Multiplication Worksheet",
    printName: "Name",
    printDate: "Date",
    printTable: "Table",
    noMistakes: "No mistakes! Excellent 🌟",
    challengeMistakes: "Challenge My Mistakes",
    wpTitle: "Interactive Word Problems",
    wpRead: "Reading",
    wpExtract: "Extract Numbers",
    wpModel: "Model",
    wpSolve: "Solve",
    wpCheck: "Verify",
    wpHint: "Hint",
    wpNew: "New Problem 🔄",
    wpFinish: "Finish & Save Progress",

    // === Deep Lesson Content ===
    lessons: {
      concept: {
        title: "What is Multiplication Really?",
        concept:
          "Multiplication is not memorization, it's organized repeated addition.",
        steps: [
          {
            text: "3 × 4 means: 3 groups, with 4 elements in each group",
            answer: 10,
          },
          {
            text:
              "It can be reversed: 4 × 3 = same result (commutative property)",
            answer: null,
          },
          { text: "Try: How many elements in 5 rows × 2 columns?", answer: 10 },
        ],
      },
      pattern9: {
        title: "The Sequential Trick of 9",
        concept:
          "Products of 9 follow a sequential pattern: each answer builds on the previous one.",
        steps: [
          {
            text:
              "Rule: When moving to multiply the next number by 9, increase tens by 1 and decrease ones by 1.",
            answer: null,
          },
          { text: "Starting point: We know that 9 × 7 = 63", answer: null },
          {
            text:
              "Transition step for 9 × 8: from 63 → tens (6+1=7), ones (3-1=2) → result 72",
            answer: null,
          },
          { text: "Apply it: Calculate 9 × 9", answer: 81 },
        ],
      },
      placevalue: {
        title: "Multiplying Large Numbers Easily",
        concept:
          "Break the large number into parts, multiply each part, then add.",
        steps: [
          { text: "12 × 6 = (10 × 6) + (2 × 6)", answer: null },
          { text: "60 + 12 = 72", answer: null },
          { text: "Try: 14 × 5 = ?", answer: 70 },
        ],
      },
      commutative: {
        title: "The Commutative Property",
        concept:
          "Order of numbers in multiplication doesn't change the result: a × b = b × a.",
        steps: [
          { text: "Notice: 6 × 8 = 48 and 8 × 6 = 48.", answer: null },
          { text: "Problem: 7 boxes × 9 pencils = ?", answer: 63 },
        ],
      },
      areamodel: {
        title: "Multiplication as Area Model",
        concept: "Multiplication is the area of a rectangle. Length × Width.",
        steps: [
          { text: "A rectangle 5 × 4 covers 20 squares.", answer: null },
          { text: "A room 7m × 5m = ?", answer: 35 },
        ],
      },
      estimation: {
        title: "Smart Estimation",
        concept: "Rounding helps us make quick decisions in real life.",
        steps: [
          { text: "47 × 6 ≈ 50 × 6 = 300", answer: null },
          {
            text: "Game costs 43, you want 8 games. Is 350 enough?",
            answer: 1,
          },
        ],
      },
    },

    // === Word Problem Scenarios ===
    wordScenarios: [
      {
        type: "shopping",
        text:
          "You bought {n1} games, each costs {n2} dollars. How much did you pay total?",
        hint: "Multiply number of games by price per unit",
      },
      {
        type: "sports",
        text:
          "A team plays {n1} matches, scoring average {n2} points per match. How many points monthly?",
        hint: "Matches × points per match",
      },
      {
        type: "gaming",
        text:
          "You earn {n1} coins per level. You completed {n2} levels. How many coins collected?",
        hint: "Coins per level × levels",
      },
      {
        type: "cooking",
        text:
          "A cake recipe needs {n1} eggs. You want to bake {n2} cakes. How many eggs needed?",
        hint: "Ingredients × number of units",
      },
    ],
  },

  fr: {
    dir: "ltr",
    appName: "Académie Multiplication",
    tagline: "Cours interactif pour 10-15 ans",
    dashboard: "Tableau de bord",
    conceptLessons: "Leçons Conceptuelles",
    trainingMode: "Mode Entraînement",
    selectTable: "Choisir la table:",
    mixed: "Mixte (1-12)",
    accuracy: "Précision",
    speed: "Vitesse ⏱️",
    tableBtn: "Table Interactive",
    mistakesBtn: "Révision Erreurs",
    printBtn: "Imprimer Fiche",
    wordProblemsBtn: "Problèmes",
    masteryTitle: "Niveau de Maîtrise",
    exit: "Quitter",
    question: "Question",
    reviewSmart: "Révision Intelligente",
    training: "Pratique",
    submit: "Valider",
    correctMsg: "Correct!",
    wrongMsg: "Mauvaise réponse",
    resultsTitle: "Session Terminée!",
    accuracyLabel: "Précision",
    timeLabel: "Temps",
    home: "Accueil",
    retry: "Recommencer",
    back: "Retour",
    lessonNext: "Suivant",
    lessonFinish: "Terminer",
    lessonConcept: "Concept",
    lessonCheck: "Vérifier",
    printHeader: "Fiche de Multiplication",
    printName: "Nom",
    printDate: "Date",
    printTable: "Table",
    noMistakes: "Aucune erreur! Excellent 🌟",
    challengeMistakes: "Défi: Mes Erreurs",
    wpTitle: "Problèmes Interactifs",
    wpRead: "Lecture",
    wpExtract: "Extraire",
    wpModel: "Modèle",
    wpSolve: "Résoudre",
    wpCheck: "Vérifier",
    wpHint: "Indice",
    wpNew: "Nouveau 🔄",
    wpFinish: "Terminer & Sauvegarder",

    lessons: {
      concept: {
        title: "Qu'est-ce que la multiplication ?",
        concept:
          "La multiplication n'est pas la mémorisation, c'est une addition répétée organisée.",
        steps: [
          {
            text:
              "3 × 4 signifie: 3 groupes, avec 4 éléments dans chaque groupe",
            answer: 10,
          },
          { text: "On peut inverser: 4 × 3 = même résultat", answer: null },
          {
            text: "Essayez: Combien d'éléments dans 5 rangées × 2 colonnes ?",
            answer: 10,
          },
        ],
      },
      pattern9: {
        title: "L'astuce séquentielle du 9",
        concept: "Les produits de 9 suivent un motif séquentiel.",
        steps: [
          {
            text:
              "Règle: En passant au nombre suivant × 9, augmentez les dizaines de 1 et diminuez les unités de 1.",
            answer: null,
          },
          { text: "Point de départ: 9 × 7 = 63", answer: null },
          {
            text:
              "Étape pour 9 × 8: de 63 → dizaines (6+1=7), unités (3-1=2) → 72",
            answer: null,
          },
          { text: "Appliquez: 9 × 9 = ?", answer: 81 },
        ],
      },
      placevalue: {
        title: "Multiplier les grands nombres",
        concept:
          "Décomposez le grand nombre, multipliez chaque partie, puis additionnez.",
        steps: [
          { text: "12 × 6 = (10 × 6) + (2 × 6)", answer: null },
          { text: "60 + 12 = 72", answer: null },
          { text: "Essayez: 14 × 5 = ?", answer: 70 },
        ],
      },
      commutative: {
        title: "Propriété commutative",
        concept: "L'ordre ne change pas le résultat: a × b = b × a.",
        steps: [
          { text: "Remarquez: 6 × 8 = 48 et 8 × 6 = 48.", answer: null },
          { text: "Problème: 7 boîtes × 9 crayons = ?", answer: 63 },
        ],
      },
      areamodel: {
        title: "Multiplication comme aire",
        concept: "La multiplication est l'aire d'un rectangle.",
        steps: [
          { text: "Un rectangle 5 × 4 couvre 20 carrés.", answer: null },
          { text: "Une pièce 7m × 5m = ?", answer: 35 },
        ],
      },
      estimation: {
        title: "Estimation intelligente",
        concept: "L'arrondi aide à prendre des décisions rapides.",
        steps: [
          { text: "47 × 6 ≈ 50 × 6 = 300", answer: null },
          {
            text: "Jeu coûte 43€, vous voulez 8 jeux. 350€ suffisent-ils ?",
            answer: 1,
          },
        ],
      },
    },
    wordScenarios: [
      {
        type: "shopping",
        text:
          "Vous avez acheté {n1} jeux, chaque jeu coûte {n2}€. Total payé ?",
        hint: "Multipliez le nombre de jeux par le prix unitaire",
      },
      {
        type: "sports",
        text:
          "Une équipe joue {n1} matchs, marque {n2} points par match. Points mensuels ?",
        hint: "Matchs × points par match",
      },
      {
        type: "gaming",
        text:
          "Vous gagnez {n1} pièces par niveau. {n2} niveaux terminés. Total pièces ?",
        hint: "Pièces par niveau × niveaux",
      },
      {
        type: "cooking",
        text:
          "Recette: {n1} œufs par gâteau. Vous voulez {n2} gâteaux. Œufs nécessaires ?",
        hint: "Ingrédients × nombre d'unités",
      },
    ],
  },

  es: {
    dir: "ltr",
    appName: "Academia de Multiplicación",
    tagline: "Currículo interactivo 10-15 años",
    dashboard: "Panel",
    conceptLessons: "Lecciones",
    trainingMode: "Entrenamiento",
    selectTable: "Elegir tabla:",
    mixed: "Mixto (1-12)",
    accuracy: "Precisión",
    speed: "Velocidad ⏱️",
    tableBtn: "Tabla Interactiva",
    mistakesBtn: "Repaso Errores",
    printBtn: "Imprimir Hoja",
    wordProblemsBtn: "Problemas",
    masteryTitle: "Dominio",
    exit: "Salir",
    question: "Pregunta",
    reviewSmart: "Repaso Inteligente",
    training: "Práctica",
    submit: "Enviar",
    correctMsg: "¡Correcto!",
    wrongMsg: "Incorrecto",
    resultsTitle: "¡Sesión Completa!",
    accuracyLabel: "Precisión",
    timeLabel: "Tiempo",
    home: "Inicio",
    retry: "Reintentar",
    back: "Atrás",
    lessonNext: "Siguiente",
    lessonFinish: "Terminar",
    lessonConcept: "Concepto",
    lessonCheck: "Verificar",
    printHeader: "Hoja de Práctica",
    printName: "Nombre",
    printDate: "Fecha",
    printTable: "Tabla",
    noMistakes: "¡Sin errores! Excelente 🌟",
    challengeMistakes: "Desafío: Mis Errores",
    wpTitle: "Problemas Interactivos",
    wpRead: "Lectura",
    wpExtract: "Extraer",
    wpModel: "Modelo",
    wpSolve: "Resolver",
    wpCheck: "Verificar",
    wpHint: "Pista",
    wpNew: "Nuevo 🔄",
    wpFinish: "Terminar y Guardar",

    lessons: {
      concept: {
        title: "¿Qué es realmente la multiplicación?",
        concept:
          "La multiplicación no es memorizar, es suma repetida organizada.",
        steps: [
          {
            text: "3 × 4 significa: 3 grupos, con 4 elementos en cada grupo",
            answer: 10,
          },
          { text: "Se puede invertir: 4 × 3 = mismo resultado", answer: null },
          {
            text: "Prueba: ¿Cuántos elementos en 5 filas × 2 columnas?",
            answer: 10,
          },
        ],
      },
      pattern9: {
        title: "El truco secuencial del 9",
        concept: "Los productos de 9 siguen un patrón secuencial.",
        steps: [
          {
            text:
              "Regla: Al pasar al siguiente número × 9, aumenta decenas en 1 y disminuye unidades en 1.",
            answer: null,
          },
          { text: "Punto de partida: 9 × 7 = 63", answer: null },
          {
            text:
              "Paso para 9 × 8: de 63 → decenas (6+1=7), unidades (3-1=2) → 72",
            answer: null,
          },
          { text: "Aplica: 9 × 9 = ?", answer: 81 },
        ],
      },
      placevalue: {
        title: "Multiplicar números grandes fácilmente",
        concept:
          "Descompón el número grande, multiplica cada parte, luego suma.",
        steps: [
          { text: "12 × 6 = (10 × 6) + (2 × 6)", answer: null },
          { text: "60 + 12 = 72", answer: null },
          { text: "Prueba: 14 × 5 = ?", answer: 70 },
        ],
      },
      commutative: {
        title: "Propiedad conmutativa",
        concept: "El orden no cambia el resultado: a × b = b × a.",
        steps: [
          { text: "Nota: 6 × 8 = 48 y 8 × 6 = 48.", answer: null },
          { text: "Problema: 7 cajas × 9 lápices = ?", answer: 63 },
        ],
      },
      areamodel: {
        title: "Multiplicación como área",
        concept: "La multiplicación es el área de un rectángulo.",
        steps: [
          { text: "Un rectángulo 5 × 4 cubre 20 cuadrados.", answer: null },
          { text: "Una habitación 7m × 5m = ?", answer: 35 },
        ],
      },
      estimation: {
        title: "Estimación inteligente",
        concept: "Redondear ayuda a tomar decisiones rápidas.",
        steps: [
          { text: "47 × 6 ≈ 50 × 6 = 300", answer: null },
          {
            text: "Juego cuesta 43€, quieres 8 juegos. ¿350€ son suficientes?",
            answer: 1,
          },
        ],
      },
    },
    wordScenarios: [
      {
        type: "shopping",
        text: "Compraste {n1} juegos, cada uno cuesta {n2}€. ¿Total pagado?",
        hint: "Multiplica número de juegos por precio unitario",
      },
      {
        type: "sports",
        text:
          "Un equipo juega {n1} partidos, anota {n2} puntos por partido. ¿Puntos mensuales?",
        hint: "Partidos × puntos por partido",
      },
      {
        type: "gaming",
        text:
          "Ganas {n1} monedas por nivel. Completaste {n2} niveles. ¿Total monedas?",
        hint: "Monedas por nivel × niveles",
      },
      {
        type: "cooking",
        text:
          "Receta: {n1} huevos por pastel. Quieres {n2} pasteles. ¿Huevos necesarios?",
        hint: "Ingredientes × número de unidades",
      },
    ],
  },
};
