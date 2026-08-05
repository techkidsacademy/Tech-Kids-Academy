export interface PathCourseNode {
  stepNumber: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationEn: string;
  durationAr: string;
  icon: string;
  topicsEn?: string[];
  topicsAr?: string[];
  projectEn?: string;
  projectAr?: string;
}

export interface RoadmapLevelFeature {
  icon: string;
  textEn: string;
  textAr: string;
}

export interface RoadmapLevel {
  id: number;
  levelNumberEn: string;
  levelNumberAr: string;
  priceEn: string;
  priceAr: string;
  originalPriceEn?: string;
  originalPriceAr?: string;
  perClassEn?: string;
  perClassAr?: string;
  durationEn: string;
  durationAr: string;
  icon: string;
  color: string;
  gradient: string;
  iconColor?: string;
  goalAr?: string;
  goalEn?: string;
  outcomesAr?: string[];
  outcomesEn?: string[];
  routineAr?: string[];
  routineEn?: string[];
  features: RoadmapLevelFeature[];
  coursePath: PathCourseNode[];
  isFeatured?: boolean;
  featuredBadgeEn?: string;
  featuredBadgeAr?: string;
}

const COMMON_ROUTINE_AR = [
  'تحدي برمجي أسبوعي',
  'مسابقة شهرية',
  'واجب منزلي صغير',
  'مشروع شهري تطبيق عملي',
  'مراجعة بالألعاب (Kahoot / Quizizz)',
  'لوحة إنجازات ونقاط تحفيزية'
];

const COMMON_ROUTINE_EN = [
  'Weekly Coding Challenge',
  'Monthly Competition',
  'Mini Homework Assignment',
  'Monthly Hands-on Project',
  'Gamified Review (Kahoot / Quizizz)',
  'Points & Achievement Leaderboard'
];

export const ROADMAP_LEVELS: RoadmapLevel[] = [
  {
    id: 1,
    levelNumberEn: 'Beginner',
    levelNumberAr: 'أساسيات الكمبيوتر والبرمجة (Beginner)',
    priceEn: '6600 EGP',
    priceAr: '6600 ج.م',
    durationEn: '3 Months · 12 Live Sessions',
    durationAr: '3 أشهر · 12 حصة تفاعلية',
    icon: 'computer',
    color: '#0066FF',
    gradient: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
    iconColor: '#0066FF',
    goalAr: 'الهدف: الطالب يقدر يستخدم الكمبيوتر لأول مرة ويبدأ يفكر كمبرمج.',
    goalEn: 'Goal: Student learns to use the computer confidently for the first time and starts thinking like a programmer.',
    outcomesAr: [
      'استخدام الكمبيوتر والماوس والكيبورد بثقة',
      'استخدام المتصفح والإنترنت والأمان الرقمي',
      'التفكير المنطقي وحل المشكلات خطوة بخطوة',
      'تصميم وتطوير ألعاب بسيطة بـ Scratch 3.0'
    ],
    outcomesEn: [
      'Use computer hardware, mouse & keyboard with confidence',
      'Browse the web safely and search Google securely',
      'Step-by-step logical thinking & problem solving',
      'Design and code interactive 2D games with Scratch 3.0'
    ],
    routineAr: COMMON_ROUTINE_AR,
    routineEn: COMMON_ROUTINE_EN,
    features: [
      { icon: 'computer', textEn: 'Computer Fundamentals', textAr: 'استخدام الكمبيوتر بثقة والتصفح الآمن' },
      { icon: 'psychology', textEn: 'Algorithmic Thinking', textAr: 'التفكير المنطقي وحل المشكلات' },
      { icon: 'extension', textEn: 'Scratch 3.0 Games', textAr: 'تصميم ألعاب بسيطة بـ Scratch' },
      { icon: 'workspace_premium', textEn: 'Course Output Certificate', textAr: 'مشروع ختامي وشهادة إتمام' }
    ],
    coursePath: [
      {
        stepNumber: 1,
        titleEn: 'Computer Foundations & Digital Literacy',
        titleAr: 'الكمبيوتر من الصفر والأمان الرقمي',
        descEn: 'Learn computer hardware, operating system, typing, file management, and safe Google web browsing.',
        descAr: 'التعرف على أجزاء الكمبيوتر، التشغيل والإغلاق، استخدام الماوس والكيبورد، إدارة الملفات، والبحث في Google والتصفح الآمن.',
        durationEn: 'Month 1 (4 Sessions)',
        durationAr: 'الشهر الأول (4 حصص)',
        icon: 'computer',
        topicsEn: [
          'Week 1: Hardware, Powering On/Off, Mouse, Keyboard & Typing Game',
          'Week 2: File Management (Creating, Copying, Moving & Saving Folders)',
          'Week 3: Web Browsing, Google Search & Online Safety',
          'Week 4: Review & Personal Folder Project (Files & Images)'
        ],
        topicsAr: [
          'الأسبوع 1: التعرف على الكمبيوتر وأجزائه وتواجه الماوس والكيبورد ولعبة الكتابة',
          'الأسبوع 2: إدارة الملفات (إنشاء مجلدات، نسخ، نقل، وحفظ الملفات)',
          'الأسبوع 3: استخدام المتصفح، البحث في Google والأمان على الإنترنت',
          'الأسبوع 4: مراجعة + مشروع بسيط (عمل مجلد شخصي يحتوي صور وملفات)'
        ],
        projectEn: 'Personal Digital Folder & File Organization Project',
        projectAr: 'عمل مجلد شخصي يحتوي صور وملفات وتنظيم البيانات'
      },
      {
        stepNumber: 2,
        titleEn: 'Computational & Algorithmic Thinking',
        titleAr: 'التفكير البرمجي والخوارزميات (بدون كود)',
        descEn: 'Master step-by-step logic, algorithms, sequence, conditionals (If), and loops with unplugged games and activities.',
        descAr: 'فهم ما هو البرنامج والخوارزمية، التفكير خطوة بخطوة، التسلسل (Sequence)، الشروط (If)، والتكرار (Loops) عبر ألعاب ورقية وأنشطة جماعية.',
        durationEn: 'Month 2 (4 Sessions)',
        durationAr: 'الشهر الثاني (4 حصص)',
        icon: 'account_tree',
        topicsEn: [
          'Week 5: What is a Program? Algorithms & Step-by-Step Thinking',
          'Week 6: Sequence Execution',
          'Week 7: Decision Making (If Logic)',
          'Week 8: Loops & Unplugged Paper Games/Group Activities'
        ],
        topicsAr: [
          'الأسبوع 5: ما هو البرنامج؟ ما هي الخوارزمية؟ والتفكير خطوة بخطوة',
          'الأسبوع 6: التسلسل Sequence والتنفيذ المنطقي',
          'الأسبوع 7: القرارات الشرطية If Conditionals',
          'الأسبوع 8: التكرار Loops + مشاريع ألعاب ورقية وأنشطة جماعية'
        ],
        projectEn: 'Unplugged Algorithmic Flowchart & Logic Games',
        projectAr: 'مشاريع ألعاب ورقية وأنشطة جماعية للمنطق البرمجي'
      },
      {
        stepNumber: 3,
        titleEn: 'Visual Block Coding & Games with Scratch 3.0',
        titleAr: 'البرمجة المرئية والألعاب (Scratch 3.0)',
        descEn: 'Learn Scratch 3.0, motion controls, sound, sprites, backdrops, and build a coin collector game or interactive story.',
        descAr: 'التعرف على Scratch 3.0، برمجة الحركة (Motion)، الأصوات، الشخصيات، الخلفيات، وبناء لعبة جمع العملات أو قصة تفاعلية.',
        durationEn: 'Month 3 (4 Sessions)',
        durationAr: 'الشهر الثالث (4 حصص)',
        icon: 'extension',
        topicsEn: [
          'Week 9: Introduction to Scratch 3.0',
          'Week 10: Motion & Movement Programming',
          'Week 11: Sounds, Characters & Backdrops',
          'Week 12: Capstone: Coin Collector Game or Interactive Story'
        ],
        topicsAr: [
          'الأسبوع 9: التعرف على واجهة منصة Scratch 3.0',
          'الأسبوع 10: برمجة وتوجيه الحركة Motion',
          'الأسبوع 11: التحكم بالأصوات والشخصيات والخلفيات',
          'الأسبوع 12: مشروع لعبة جمع العملات أو قصة تفاعلية'
        ],
        projectEn: 'Coin Collector Game or Animated Interactive Story',
        projectAr: 'لعبة جمع العملات أو قصة تفاعلية مكتملة'
      }
    ]
  },
  {
    id: 2,
    levelNumberEn: 'Intermediate',
    levelNumberAr: 'البرمجة الحقيقية (Intermediate)',
    priceEn: '11900 EGP',
    priceAr: '11900 ج.م',
    originalPriceEn: '13200 EGP',
    originalPriceAr: '13200 ج.م',
    durationEn: '3 Months · 12 Live Sessions',
    durationAr: '3 أشهر · 12 حصة تفاعلية',
    icon: 'terminal',
    color: '#FF6B00',
    gradient: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
    iconColor: '#FF6B00',
    goalAr: 'الهدف: الانتقال من Scratch إلى كتابة الكود الحقيقي بلغة Python.',
    goalEn: 'Goal: Transition smoothly from Scratch block coding to real text-based Python programming.',
    outcomesAr: [
      'كتابة برامج بلغة Python حقيقية',
      'استخدام المتغيرات وأنواع البيانات والإدخال والإخراج',
      'كتابة واستدعاء الدوال Functions والتحكم بالمنطق',
      'بناء ألعاب وتطبيقات نصية تفاعلية'
    ],
    outcomesEn: [
      'Write & run real text-based Python code',
      'Use variables, data types, input/output & math operators',
      'Write functions, if-conditions, and loop logic',
      'Build interactive text games and utility applications'
    ],
    routineAr: COMMON_ROUTINE_AR,
    routineEn: COMMON_ROUTINE_EN,
    features: [
      { icon: 'terminal', textEn: 'Python Real Code', textAr: 'كتابة برامج بلغة Python حقيقية' },
      { icon: 'data_object', textEn: 'Variables & Data', textAr: 'استخدام المتغيرات والإدخال والإخراج' },
      { icon: 'functions', textEn: 'Functions & Logic', textAr: 'كتابة الدوال والتحكم بالمنطق' },
      { icon: 'sports_esports', textEn: 'Text-Based Games', textAr: 'بناء ألعاب وتطبيقات نصية تفاعلية' }
    ],
    coursePath: [
      {
        stepNumber: 1,
        titleEn: 'Python Fundamentals for Beginners',
        titleAr: 'Python للمبتدئين',
        descEn: 'Install Python & VS Code, write first program, master variables, I/O, and arithmetic operations.',
        descAr: 'تثبيت Python ومحرر VS Code، كتابة أول برنامج، فهم المتغيرات، الإدخال والإخراج، والعمليات الحسابية.',
        durationEn: 'Month 1 (4 Sessions)',
        durationAr: 'الشهر الأول (4 حصص)',
        icon: 'terminal',
        topicsEn: [
          'Week 1: Install Python & VS Code, First Hello World Program',
          'Week 2: Variables & Data Types',
          'Week 3: Input & Output Handling',
          'Week 4: Arithmetic Operations'
        ],
        topicsAr: [
          'الأسبوع 1: تثبيت Python، محرّر VS Code، وأول برنامج',
          'الأسبوع 2: المتغيرات وأنواع البيانات Variables',
          'الأسبوع 3: الإدخال والإخراج Input/Output',
          'الأسبوع 4: العمليات الحسابية والرياضية Arithmetic'
        ],
        projectEn: 'Interactive Calculation & I/O App',
        projectAr: 'مشروع تطبيق العمليات الحسابية وتفاعل الإدخال'
      },
      {
        stepNumber: 2,
        titleEn: 'Python Flow Control, Loops & Functions',
        titleAr: 'التحكم بالبرنامج والجمل الشرطية والدوال',
        descEn: 'Control logic with If statements, Loops, Functions, and build a Calculator mini project.',
        descAr: 'التحكم بمسار البرنامج بـ If، الحلقات التكرارية Loops، كتابة الدوال Functions، وبناء مشروع الآلة الحاسبة.',
        durationEn: 'Month 2 (4 Sessions)',
        durationAr: 'الشهر الثاني (4 حصص)',
        icon: 'code',
        topicsEn: [
          'Week 5: Conditional If Statements',
          'Week 6: Loops (For / While)',
          'Week 7: Defining & Calling Functions',
          'Week 8: Mini Project: Calculator App'
        ],
        topicsAr: [
          'الأسبوع 5: الجمل الشرطية والقرارات If Statements',
          'الأسبوع 6: الحلقات التكرارية Loops',
          'الأسبوع 7: بناء واستدعاء الدوال Functions',
          'الأسبوع 8: Mini Project مثل آلة حاسبة ذكية'
        ],
        projectEn: 'Smart Calculator Mini Project',
        projectAr: 'مشروع آلة حاسبة ذكية Mini Project'
      },
      {
        stepNumber: 3,
        titleEn: 'Python Games & Final Capstone',
        titleAr: 'المشاريع والألعاب النصية',
        descEn: 'Build interactive text games: Guess the Number, Rock Paper Scissors, Quiz Game, and Final Capstone.',
        descAr: 'بناء ألعاب تفاعلية نصية: لعبة تخمين الرقم، لعبة حجر ورقة مقص، تطبيق المسابقات Quiz Game، والمشروع النهائي.',
        durationEn: 'Month 3 (4 Sessions)',
        durationAr: 'الشهر الثالث (4 حصص)',
        icon: 'sports_esports',
        topicsEn: [
          'Week 9: Guess the Number Game',
          'Week 10: Rock Paper Scissors Game',
          'Week 11: Interactive Quiz Game App',
          'Week 12: Final Capstone Project'
        ],
        topicsAr: [
          'الأسبوع 9: لعبة تخمين الرقم Guess the Number',
          'الأسبوع 10: لعبة حجر ورقة مقص Rock Paper Scissors',
          'الأسبوع 11: تطبيق المسابقات الثقافية Quiz Game',
          'الأسبوع 12: مشروع نهائي وتسليم المخرجات'
        ],
        projectEn: 'Interactive Quiz Game & Text Adventure Capstone',
        projectAr: 'تطبيق المسابقات والمشروع النهائي للعبة النصية'
      }
    ]
  },
  {
    id: 3,
    levelNumberEn: 'Advanced',
    levelNumberAr: 'مطور صغير (Advanced)',
    priceEn: '22400 EGP',
    priceAr: '22400 ج.م',
    originalPriceEn: '26400 EGP',
    originalPriceAr: '26400 ج.م',
    durationEn: '3 Months · 12 Live Sessions',
    durationAr: '3 أشهر · 12 حصة تفاعلية',
    icon: 'rocket_launch',
    color: '#0066FF',
    gradient: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
    iconColor: '#0066FF',
    isFeatured: true,
    featuredBadgeEn: 'Best value',
    featuredBadgeAr: 'الخيار الأفضل',
    goalAr: 'الهدف: الطالب يعمل مشاريع حقيقية يقدر يعرضها لأهله أو يشارك بها في مسابقات.',
    goalEn: 'Goal: Student builds real projects (Games, Websites) to present live to parents on Coding Day.',
    outcomesAr: [
      'تصميم وبناء ألعاب 2D رسومية بـ Pygame',
      'إنشاء موقع ويب شخصي بـ HTML, CSS & JavaScript',
      'تطوير وتدشين مشروع نهائي متكامل',
      'عرض المشروع بثقة أمام أولياء الأمور في Coding Day والحصول على الشهادة'
    ],
    outcomesEn: [
      'Design 2D graphical games with Pygame engine',
      'Build responsive personal websites using HTML, CSS & JS',
      'Engineer a complete full-stack capstone project',
      'Present live on Graduation Coding Day and get certified'
    ],
    routineAr: COMMON_ROUTINE_AR,
    routineEn: COMMON_ROUTINE_EN,
    features: [
      { icon: 'sports_esports', textEn: '2D Game Graphics', textAr: 'تصميم وبناء ألعاب رسومية بـ Pygame' },
      { icon: 'language', textEn: 'Web Development', textAr: 'إنشاء موقع ويب بـ HTML, CSS & JS' },
      { icon: 'groups', textEn: 'Parent Coding Day', textAr: 'عرض المشروع في يوم البرمجة Coding Day' },
      { icon: 'workspace_premium', textEn: 'Official Graduation', textAr: 'شهادة تخرج ومحفظة مشاريع سابقة' }
    ],
    coursePath: [
      {
        stepNumber: 1,
        titleEn: '2D Game Development with Pygame',
        titleAr: 'تصميم الألعاب (Pygame / MakeCode)',
        descEn: 'Draw on screen, handle sprite motion, collision detection, and create a full 2D graphical game.',
        descAr: 'الرسم على الشاشة، حركة الشخصيات، حساسية الاصطدام والفيزياء، وتطوير مشروع لعبة رسومية.',
        durationEn: 'Month 1 (4 Sessions)',
        durationAr: 'الشهر الأول (4 حصص)',
        icon: 'sports_esports',
        topicsEn: [
          'Week 1: Screen Drawing & Graphics',
          'Week 2: Motion & Character Animation',
          'Week 3: Collision Physics & Game Mechanics',
          'Week 4: 2D Game Project'
        ],
        topicsAr: [
          'الأسبوع 1: الرسم على الشاشة Screen Drawing',
          'الأسبوع 2: حركة الشخصيات والعناصر Motion',
          'الأسبوع 3: حساب الاصطدام والفيزياء Collision',
          'الأسبوع 4: مشروع لعبة تفاعلية'
        ],
        projectEn: 'Graphical 2D Arcade Game Project',
        projectAr: 'مشروع لعبة 2D تفاعلية بفيزياء الاصطدام'
      },
      {
        stepNumber: 2,
        titleEn: 'Web Design & Development (HTML, CSS, JS)',
        titleAr: 'تصميم المواقع (HTML, CSS & JavaScript)',
        descEn: 'Structure web pages with HTML, style layouts with CSS, add JavaScript interactivity, and build a personal portfolio.',
        descAr: 'هيكلة الصفحات بـ HTML، تنسيق الألوان والتجاوب بـ CSS، إضافة مبادئ الجافاسكريبت التفاعلية، وبناء موقع شخصي.',
        durationEn: 'Month 2 (4 Sessions)',
        durationAr: 'الشهر الثاني (4 حصص)',
        icon: 'language',
        topicsEn: [
          'Week 5: HTML Web Page Structure',
          'Week 6: CSS Styling & Responsive Design',
          'Week 7: JavaScript Interactivity Fundamentals',
          'Week 8: Personal Website Project'
        ],
        topicsAr: [
          'الأسبوع 5: أساسيات هيكلة صفحات الويب HTML',
          'الأسبوع 6: التنسيق والتصميم والألوان CSS',
          'الأسبوع 7: مبادئ الجافاسكريبت التفاعلية JavaScript',
          'الأسبوع 8: مشروع موقع شخصي'
        ],
        projectEn: 'Personal Portfolio Website Project',
        projectAr: 'مشروع الموقع الإلكتروني الشخصي ومعرض الأعمال'
      },
      {
        stepNumber: 3,
        titleEn: 'Final Capstone & Graduation Coding Day',
        titleAr: 'المشروع النهائي وحفل التخرج (Coding Day)',
        descEn: 'Build a final project (Game, Web, or App), present live to parents on Coding Day, and receive official certificate.',
        descAr: 'تطوير مشروع نهائي متكامل (لعبة كاملة، موقع إلكتروني، قصة تفاعلية، أو تطبيق بسيط)، وعرضه في Coding Day أمام أولياء الأمور واستلام الشهادة.',
        durationEn: 'Month 3 (4 Sessions)',
        durationAr: 'الشهر الثالث (4 حصص)',
        icon: 'workspace_premium',
        topicsEn: [
          'Week 9: Final Project Selection & Planning',
          'Week 10: Feature Development & Code Implementation',
          'Week 11: Code Review & Presentation Preparation',
          'Week 12: Coding Day Event - Present to Parents & Get Certified'
        ],
        topicsAr: [
          'الأسبوع 9: اختيار وتخطيط المشروع النهائي (لعبة، موقع، قصة تفاعلية، تطبيق)',
          'الأسبوع 10: تطوير وتنفيذ ميزات المشروع',
          'الأسبوع 11: التحضير والتجهيز للتقديم والتجربة',
          'الأسبوع 12: Coding Day - عرض المشروع أمام أولياء الأمور والحصول على الشهادة'
        ],
        projectEn: 'Final Graduation Project & Parent Live Showcase on Coding Day',
        projectAr: 'المشروع النهائي واحتفالية Coding Day وعرض المشروع أمام أولياء الأمور'
      }
    ]
  }
];
