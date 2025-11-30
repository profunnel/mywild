/**
 * Global Page Content - Biology, Diseases, Prevention
 * SEO-optimized content for state and annual forecast pages
 */

// ============================================================================
// SEO METADATA TEMPLATES
// ============================================================================

export const seoMetadata = {
  state: {
    titleTemplate: (stateName) => `${stateName} Tick Forecast 2026 | Lyme Disease Risk & Prevention`,
    descriptionTemplate: (stateName) =>
      `Get the latest ${stateName} tick forecast for 2026. Learn when ticks are most active, where they hide, and how to prevent Lyme disease and tick-borne illnesses in ${stateName}.`,
    keywords: [
      'tick forecast',
      'Lyme disease risk',
      'tick season',
      'deer tick',
      'tick prevention',
      'tick activity map',
      'blacklegged tick',
      'when are ticks most active'
    ]
  },
  annual: {
    title: '2026 National Tick Forecast | Lyme Disease Risk Predictions',
    description: 'Comprehensive 2026 tick forecast for the United States. Discover why experts predict record tick activity, where risk is highest, and science-based prevention strategies.',
    keywords: [
      '2026 tick forecast',
      'national tick predictions',
      'tick activity trends',
      'Lyme disease outbreak',
      'tick population boom'
    ]
  }
};

// ============================================================================
// TICK BIOLOGY & LIFECYCLE
// ============================================================================

export const tickBiology = {
  overview: {
    title: 'Understanding Tick Biology and Life Cycles',
    intro: `Ticks are not insects—they\'re arachnids, related to spiders and mites. Understanding their biology helps you know when and where to watch for them. The deer tick (also called the blacklegged tick) goes through four life stages over two years, and each stage poses different risks.`,
    scientificName: 'Ixodes scapularis',
    commonNames: ['deer tick', 'blacklegged tick', 'Lyme tick'],
  },

  lifecycle: {
    title: 'The Four Stages of a Tick\'s Life',
    description: 'Ticks progress through egg, larva, nymph, and adult stages. Each stage requires a blood meal to advance, creating multiple opportunities for disease transmission.',

    stages: [
      {
        name: 'Egg',
        duration: 'Spring',
        description: 'Female adult ticks lay thousands of eggs in leaf litter. These eggs hatch into larvae by late summer.',
        size: null,
        risk: 'None - eggs don\'t feed on hosts'
      },
      {
        name: 'Larva',
        duration: 'August - September',
        description: 'Tiny six-legged larvae emerge and take their first blood meal, usually from small mammals like mice. If the host is infected with Lyme bacteria, the larva becomes a carrier.',
        size: 'Smaller than a poppy seed (about 0.5mm)',
        risk: 'Low - rarely infected yet, but can acquire disease from infected hosts',
        seoNote: 'How big are tick larvae? Tick larvae are extremely small, about the size of a grain of sand or smaller than a poppy seed, making them nearly impossible to see.'
      },
      {
        name: 'Nymph',
        duration: 'May - July (peak danger period)',
        description: 'After molting, eight-legged nymphs emerge in spring seeking a second blood meal. This is when most human infections occur because nymphs are active when people are outdoors and small enough to go unnoticed.',
        size: 'Size of a poppy seed (1-2mm) - hard to see',
        risk: 'HIGHEST - responsible for most Lyme disease cases in humans',
        whyDangerous: 'Nymphs are tiny and active during peak outdoor season (May-July). Many people don\'t notice them attached, allowing disease transmission.',
        seoNote: 'When are ticks most active? Tick nymphs are most active from May through July in the northeastern United States. This is peak tick season and when most people get Lyme disease.'
      },
      {
        name: 'Adult',
        duration: 'October - November (fall), March - May (spring)',
        description: 'Fully-grown adults seek larger hosts like deer for their final blood meal. Females lay eggs and die; males die after mating. Adults are easier to spot than nymphs.',
        size: 'Sesame seed size (3-5mm when unfed)',
        risk: 'Moderate - visible and easier to remove before disease transmission',
        note: 'Adult females have a distinctive reddish-orange body with black shield; males are entirely black.'
      }
    ],

    funFacts: [
      'A single female tick can lay up to 3,000 eggs',
      'Only about 5% of tick eggs survive to adulthood',
      'Ticks can wait months or even years for a host',
      'Each life stage (larva, nymph, adult) feeds only once before molting'
    ]
  },

  feedingBehavior: {
    title: 'How Ticks Find and Feed on Hosts',
    questing: {
      heading: 'The "Questing" Behavior',
      description: 'Ticks don\'t jump or fly. Instead, they climb onto grass or brush and extend their front legs in a behavior called "questing," waiting to grab onto passing animals or people. They detect hosts through body heat, carbon dioxide, and movement.'
    },
    attachment: {
      heading: 'Attachment and Feeding',
      description: 'Once on a host, ticks crawl to warm, moist areas—often hairlines, armpits, or groin. They insert their mouthparts and feed for several days. Disease transmission typically occurs after 24-48 hours of attachment, which is why prompt removal is critical.',
      transmissionWindow: '24-48 hours'
    }
  },

  speciesComparison: {
    title: 'Common Tick Species in New England',
    species: [
      {
        name: 'Deer Tick / Blacklegged Tick',
        scientific: 'Ixodes scapularis',
        appearance: 'Reddish-brown body, black shield (scutum) on back',
        diseases: ['Lyme disease', 'Anaplasmosis', 'Babesiosis', 'Powassan virus'],
        habitat: 'Wooded areas, tall grass, leaf litter',
        prevalence: 'Most common in Northeast and Upper Midwest'
      },
      {
        name: 'American Dog Tick',
        scientific: 'Dermacentor variabilis',
        appearance: 'Brown with white/gray ornate markings',
        diseases: ['Rocky Mountain spotted fever', 'Tularemia'],
        habitat: 'Grassy fields, paths, edges of woods',
        prevalence: 'Common across United States'
      },
      {
        name: 'Lone Star Tick',
        scientific: 'Amblyomma americanum',
        appearance: 'Reddish-brown with distinctive white dot on back (females)',
        diseases: ['Ehrlichiosis', 'STARI', 'Alpha-gal syndrome (red meat allergy)'],
        habitat: 'Expanding northward into New England',
        prevalence: 'Increasingly common, previously rare in region'
      }
    ]
  }
};

// ============================================================================
// TICK-BORNE DISEASES
// ============================================================================

export const tickDiseases = {
  overview: {
    title: 'Tick-Borne Diseases in New England',
    intro: 'Ticks in the northeastern United States can transmit several serious diseases. Early detection and treatment are critical for the best outcomes. Learn the symptoms and when to seek medical care.',
  },

  diseases: [
    {
      name: 'Lyme Disease',
      scientific: 'Borrelia burgdorferi',
      vector: 'Deer tick (Ixodes scapularis)',
      prevalence: 'Most common tick-borne disease in the U.S.',
      image: '/images/doctor_examining_rash.png',

      description: 'Lyme disease is a bacterial infection transmitted by deer ticks. If caught early, it\'s highly treatable with antibiotics. Left untreated, it can cause serious complications affecting joints, heart, and nervous system.',

      statistics: {
        annualCases: '~476,000 cases diagnosed and treated annually in the U.S. (CDC estimate)',
        regionalRisk: 'Northeast and Upper Midwest account for over 95% of cases',
        peakTransmission: 'May through July (nymph season)',
        source: 'Centers for Disease Control and Prevention'
      },

      symptoms: {
        early: [
          'Erythema migrans (EM) rash - appears in 70-80% of cases',
          'Bullseye rash (circular red rash with clear center)',
          'Rash appears 3-30 days after bite',
          'Fever and chills',
          'Fatigue',
          'Muscle and joint aches',
          'Headache',
          'Swollen lymph nodes'
        ],
        late: [
          'Severe headaches and neck stiffness',
          'Facial palsy (loss of muscle tone on one or both sides of face)',
          'Arthritis with severe joint pain, especially knees',
          'Heart palpitations or irregular heartbeat (Lyme carditis)',
          'Nerve pain',
          'Dizziness or shortness of breath',
          'Brain and spinal cord inflammation'
        ]
      },

      rashDescription: {
        appearance: 'The classic Lyme disease rash looks like a bullseye target: a red outer ring with a clear area in the middle and a central red spot. However, many rashes don\'t follow this pattern—they may be solid red, oval-shaped, or appear as multiple spots.',
        location: 'Usually appears at the site of the tick bite',
        size: 'Expands over days to 12 inches or more in diameter',
        note: 'The rash is rarely itchy or painful'
      },

      timeline: {
        rashAppears: '3-30 days after tick bite (average 7 days)',
        earlySymptoms: 'First few weeks without treatment',
        lateSymptoms: 'Weeks to months after initial infection',
        antibioticWindow: 'Most effective when started within first 3 weeks'
      },

      whenToSeekCare: [
        'Develop a rash after spending time outdoors',
        'Find an attached tick and develop flu-like symptoms',
        'Experience unexplained fever, fatigue, or joint pain during tick season',
        'Notice facial drooping or heart palpitations after a recent tick bite',
        'ANY rash after outdoor activity in tick-prone areas'
      ],

      treatment: 'Oral antibiotics (doxycycline, amoxicillin, or cefuroxime) for 10-21 days. Early treatment prevents complications.'
    },

    {
      name: 'Anaplasmosis',
      scientific: 'Anaplasma phagocytophilum',
      vector: 'Deer tick (Ixodes scapularis)',
      prevalence: 'Second most common tick-borne disease in New England',
      image: '/images/anaplasmosis.png',

      description: 'Anaplasmosis is a bacterial infection that affects white blood cells. Cases have been rising significantly in the Northeast over the past decade.',

      statistics: {
        annualCases: '~5,750 cases reported annually in the U.S. (likely underreported)',
        trendNote: 'Cases increased 47% from 2011-2019',
        peakSeason: 'May through July',
        source: 'CDC'
      },

      symptoms: {
        typical: [
          'Fever and chills',
          'Severe headache',
          'Muscle aches',
          'Nausea, vomiting, or diarrhea',
          'Loss of appetite',
          'Fatigue',
          'Confusion (in severe cases)',
          'NO RASH - unlike Lyme disease'
        ],
        onset: 'Symptoms typically begin 1-2 weeks after tick bite',
        severe: [
          'Respiratory failure',
          'Bleeding problems',
          'Organ failure',
          'Death (if untreated)'
        ]
      },

      whenToSeekCare: [
        'Fever and severe headache after tick exposure',
        'Flu-like symptoms during tick season',
        'Symptoms persisting beyond typical cold/flu duration'
      ],

      treatment: 'Doxycycline is highly effective. Most people recover quickly with prompt treatment.',

      complications: 'Can be severe in elderly, immunocompromised, or those with delayed treatment. Hospitalization rate: ~36%'
    },

    {
      name: 'Babesiosis',
      scientific: 'Babesia microti',
      vector: 'Deer tick (Ixodes scapularis)',
      prevalence: 'Emerging disease, primarily in Northeast and upper Midwest',
      image: '/images/babesiosis.jpg',

      description: 'Babesiosis is a parasitic infection affecting red blood cells, similar to malaria. Many healthy people show no symptoms, but it can be life-threatening for those without a spleen or with weakened immune systems.',

      statistics: {
        annualCases: '~2,000 cases reported annually (many asymptomatic cases go unreported)',
        highRiskStates: 'Massachusetts, New York, Connecticut, Rhode Island',
        source: 'CDC'
      },

      symptoms: {
        typical: [
          'Fever and chills',
          'Fatigue and body aches',
          'Headache',
          'Nausea',
          'Sweats (often described as drenching night sweats)',
          'May be asymptomatic in healthy individuals'
        ],
        severe: 'Hemolytic anemia (destruction of red blood cells), especially in those without a spleen'
      },

      whenToSeekCare: [
        'Persistent fever after tick bite, especially if you lack a spleen',
        'Severe fatigue and sweats',
        'Being immunocompromised and experiencing any symptoms after tick exposure'
      ],

      treatment: 'Combination of atovaquone and azithromycin (or clindamycin and quinine for severe cases)'
    },

    {
      name: 'Powassan Virus Disease',
      scientific: 'Powassan virus (POWV)',
      vector: 'Deer tick and groundhog tick',
      prevalence: 'Rare but increasing',
      image: '/images/powassan.png',

      description: 'Powassan virus is a rare but serious disease that can cause encephalitis (brain inflammation). Unlike bacterial diseases, there is no specific treatment. Transmission can occur in as little as 15 minutes after tick attachment.',

      statistics: {
        annualCases: '~20-40 cases per year in the U.S.',
        severity: '10% fatality rate; 50% of survivors have permanent neurological damage',
        regionNote: 'Most cases in Northeast and Great Lakes regions',
        source: 'CDC'
      },

      symptoms: {
        initial: [
          'Fever',
          'Headache',
          'Vomiting',
          'Weakness'
        ],
        severe: [
          'Confusion',
          'Loss of coordination',
          'Difficulty speaking',
          'Seizures',
          'Encephalitis (brain inflammation)',
          'Meningitis'
        ],
        onset: '1 week to 1 month after tick bite'
      },

      whenToSeekCare: [
        'IMMEDIATE medical attention for severe headache, confusion, or seizures after tick exposure',
        'Any neurological symptoms (weakness, difficulty speaking, loss of coordination)',
        'High fever with severe headache and stiff neck'
      ],

      treatment: 'No specific antiviral treatment. Supportive care including hospitalization, respiratory support, and IV fluids. Prevention through tick avoidance is critical.',

      prevention: 'Especially important because transmission can occur within 15 minutes—faster than Lyme disease (24-48 hours)'
    },

    {
      name: 'Spotted Fever Rickettsiosis',
      scientific: 'Rickettsia parkeri / R. rickettsii',
      vector: 'American Dog Tick & Gulf Coast Tick',
      prevalence: 'Increasing concern in New England',
      image: '/images/spotted_fever.jpg',

      description: 'A group of tick-borne diseases including Rocky Mountain Spotted Fever (RMSF). While classic RMSF is rare in New England, related spotted fevers are becoming more common. These bacterial infections can be severe if not treated early.',

      statistics: {
        annualCases: 'Variable; often underdiagnosed',
        severity: 'Can be fatal if untreated (RMSF)',
        regionNote: 'American Dog Ticks are abundant in grassy areas',
        source: 'CDC'
      },

      symptoms: {
        initial: [
          'Sudden high fever',
          'Severe headache',
          'Muscle pain',
          'Nausea and vomiting'
        ],
        rash: [
          'Distinctive rash often starts on wrists and ankles',
          'Spreads to trunk, palms, and soles',
          'Appears 2-5 days after fever begins'
        ],
        onset: '2-14 days after tick bite',
        severe: [
          'Damage to blood vessels',
          'Inflammation of the heart, lungs, or brain',
          'Kidney failure',
          'Amputation of extremities due to gangrene'
        ]
      },

      whenToSeekCare: [
        'Fever and headache after being in grassy areas',
        'Rash developing on wrists or ankles',
        'Flu-like symptoms in summer months'
      ],

      treatment: 'Doxycycline is the treatment of choice and should be started immediately if suspected.'
    },

    {
      name: 'Ehrlichiosis',
      scientific: 'Ehrlichia chaffeensis / E. muris eauclairensis',
      vector: 'Lone Star Tick & Deer Tick',
      prevalence: 'Rising with the spread of Lone Star Ticks',
      image: '/images/ehrlichiosis.png',

      description: 'Ehrlichiosis is a bacterial illness that causes flu-like symptoms. As the Lone Star tick expands its range northward into New England, cases of Ehrlichiosis are expected to rise.',

      statistics: {
        annualCases: '~2,000+ cases nationally',
        trendNote: 'Cases increasing as tick range expands',
        peakSeason: 'May through August',
        source: 'CDC'
      },

      symptoms: {
        typical: [
          'Fever and chills',
          'Severe headache',
          'Muscle aches',
          'Nausea, vomiting, diarrhea',
          'Confusion',
          'Rash (more common in children)'
        ],
        onset: '1-2 weeks after tick bite',
        severe: [
          'Difficulty breathing',
          'Bleeding disorders',
          'Kidney failure',
          'Neurological problems (seizures, coma)'
        ]
      },

      whenToSeekCare: [
        'Flu-like illness after tick exposure',
        'Persistent fever and headache',
        'Digestive issues combined with fever'
      ],

      treatment: 'Doxycycline is highly effective. Early treatment prevents severe illness.'
    }
  ],

  generalGuidance: {
    title: 'When to See a Doctor',
    urgentCare: [
      'Any rash developing after outdoor activity',
      'Fever with severe headache during tick season',
      'Neurological symptoms (confusion, facial drooping, difficulty speaking)',
      'Heart palpitations or chest pain after tick exposure',
      'Persistent flu-like symptoms that don\'t improve'
    ],
    testing: 'If you saved the tick, bring it to your appointment. Your doctor may send it for testing to identify what pathogens it carries.',
    antibiotics: 'Don\'t wait for test results if symptoms suggest Lyme disease or anaplasmosis. Early antibiotic treatment is crucial and won\'t harm you if the test is negative.'
  }
};

// ============================================================================
// PREVENTION & TICK REMOVAL
// ============================================================================

export const prevention = {
  overview: {
    title: 'Proven Strategies to Prevent Tick Bites',
    intro: 'The best way to avoid tick-borne diseases is to prevent tick bites in the first place. These strategies work together to create multiple layers of protection.',
  },

  strategies: [
    {
      title: 'Permethrin-Treated Clothing',
      priority: 'HIGH',
      effectiveness: '90%+ protection',
      description: 'Permethrin is an insecticide that kills ticks on contact. When applied to clothing, it remains effective through multiple washes.',
      howTo: [
        'Treat boots, pants, socks, and outdoor gear with 0.5% permethrin spray',
        'Apply outdoors and let dry completely (2-4 hours)',
        'Remains effective for up to 6 weeks or 6 washings',
        'Pre-treated clothing available at outdoor retailers',
        'Never apply permethrin directly to skin—use on clothing only'
      ],
      whyItWorks: 'Ticks that crawl onto treated fabric become paralyzed and die within minutes, preventing attachment.',
      products: 'Sawyer Permethrin, Repel Permethrin (widely available)'
    },
    {
      title: 'Daily Tick Checks',
      priority: 'CRITICAL',
      effectiveness: 'Prevents disease transmission if ticks found within 24 hours',
      description: 'Since disease transmission typically requires 24-48 hours of attachment, finding and removing ticks quickly dramatically reduces infection risk.',
      howTo: [
        'Check yourself within 2 hours of coming indoors',
        'Use a handheld or full-length mirror to view all parts of body',
        'Check especially: hairline, behind ears, armpits, groin, behind knees',
        'Run fingers through hair to feel for bumps',
        'Check children thoroughly (have them stand on white towel to spot fallen ticks)',
        'Inspect pets before they come inside',
        'Check gear and clothing before bringing indoors'
      ],
      whyItWorks: 'Ticks wander for hours looking for ideal attachment sites. Early detection prevents feeding.',
      timing: 'Most important in May-July (nymph season) but necessary year-round in endemic areas'
    },
    {
      title: 'Landscaping Defense',
      priority: 'MEDIUM',
      effectiveness: 'Reduces tick habitat around your home',
      description: 'Creating a tick-hostile environment in your yard reduces the chance ticks will be waiting when you step outside.',
      howTo: [
        'Mow lawn regularly—keep grass under 3 inches',
        'Create a 3-foot wood chip or gravel barrier between lawn and woods',
        'Remove leaf litter, brush, and tall grass around buildings',
        'Stack woodpiles neatly in dry, sunny locations away from house',
        'Keep playground equipment away from wooded edges',
        'Discourage deer with fencing (deer are tick magnets)',
        'Consider professional tick control treatments in high-risk areas'
      ],
      whyItWorks: 'Ticks thrive in moist, shaded areas with leaf litter. Sunny, dry lawns are inhospitable.',
      bonus: 'Also reduces rodent habitat, cutting off tick food sources'
    },
    {
      title: 'Shower Within 2 Hours',
      priority: 'HIGH',
      effectiveness: 'Washes away unattached ticks',
      description: 'Showering after outdoor activity gives you a chance to wash off ticks before they bite.',
      howTo: [
        'Shower within 2 hours of coming indoors (sooner is better)',
        'Use a washcloth to scrub entire body',
        'Wash hair thoroughly',
        'Conduct tick check during or immediately after shower',
        'Put outdoor clothes directly in dryer on high heat for 10 minutes (kills ticks)'
      ],
      whyItWorks: 'Ticks crawl for 30 minutes to several hours before biting. Showering disrupts this process.',
      note: 'Washing alone won\'t remove attached ticks—only manual removal works once bitten'
    },
    {
      title: 'Light-Colored Clothing',
      priority: 'LOW',
      effectiveness: 'Makes ticks easier to spot',
      description: 'Light colors don\'t prevent bites, but they make dark-colored ticks visible so you can remove them before attachment.',
      howTo: [
        'Wear khaki, beige, or white when hiking',
        'Tuck pants into socks to prevent ticks from crawling up legs',
        'Wear long sleeves and long pants in wooded areas',
        'Choose tightly woven fabrics that are harder for ticks to penetrate',
        'Tie back long hair'
      ],
      whyItWorks: 'Visual detection is your first line of defense. Seeing ticks crawling allows instant removal.',
      combo: 'Pairs perfectly with permethrin treatment for maximum protection'
    },
    {
      title: 'Avoid Tick Habitats When Possible',
      priority: 'MEDIUM',
      effectiveness: 'No exposure = no bites',
      description: 'Stay in the center of trails and avoid brushy, wooded areas during peak tick season.',
      howTo: [
        'Walk in center of trails (ticks quest on vegetation at trail edges)',
        'Avoid sitting directly on ground or logs',
        'Use blanket or tarp for picnics',
        'Choose mowed, sunny areas for activities',
        'Limit time in tall grass and leaf litter, especially May-July'
      ],
      whyItWorks: 'Ticks don\'t jump or fly—they wait on vegetation for hosts to brush against them.',
      reality: 'Often impractical to completely avoid tick areas, so combine with other strategies'
    }
  ],

  repellents: {
    title: 'EPA-Registered Repellents',
    skinRepellents: [
      {
        name: 'DEET',
        concentration: '20-30% for adults, 10% for children',
        effectiveness: 'Highly effective against ticks',
        application: 'Apply to exposed skin, reapply every 4-6 hours',
        note: 'Safe for children over 2 months old'
      },
      {
        name: 'Picaridin',
        concentration: '20%',
        effectiveness: 'Comparable to DEET, less odor',
        application: 'Apply to exposed skin',
        note: 'Good alternative for those who dislike DEET'
      },
      {
        name: 'IR3535',
        concentration: '20%',
        effectiveness: 'Moderate protection',
        application: 'Requires frequent reapplication'
      },
      {
        name: 'Oil of Lemon Eucalyptus (OLE)',
        concentration: '30%',
        effectiveness: 'Moderate, needs frequent reapplication',
        note: 'Not for children under 3 years old'
      }
    ],
    clothingOnly: 'Permethrin (0.5%) - Never apply to skin, clothing only'
  }
};

export const tickRemoval = {
  overview: {
    title: 'How to Safely Remove a Tick',
    urgency: 'Remove ticks as soon as possible. Disease transmission typically requires 24-48 hours of attachment for Lyme disease, but Powassan virus can transmit in as little as 15 minutes.',
    dontPanic: 'Finding an attached tick does NOT mean you will get sick. Most tick bites do not result in disease, especially if removed quickly.'
  },

  steps: [
    {
      step: 1,
      title: 'Don\'t Panic',
      description: 'Most tick bites do not transmit disease, especially if removed quickly.',
      details: [
        'Infection rates vary by region (20-50%)',
        'Transmission usually takes 24-48 hours',
        'Stay calm and use proper technique'
      ]
    },
    {
      step: 2,
      title: 'Gather Tools',
      description: 'Use fine-tipped tweezers. Avoid fingers or chemicals.',
      details: [
        'Fine-tipped tweezers are best',
        'Rubbing alcohol for cleaning',
        'Small container to save the tick'
      ],
      avoidTools: 'NO petroleum jelly, nail polish, or heat'
    },
    {
      step: 3,
      title: 'Grasp & Pull',
      description: 'Grasp close to skin and pull upward with steady pressure.',
      details: [
        'Grab mouthparts near skin (not body)',
        'Pull straight up—don\'t twist',
        'Maintain steady, even pressure'
      ],
      whyCritical: 'Squeezing the body injects bacteria. Twisting breaks mouthparts.'
    },
    {
      step: 4,
      title: 'Clean Area',
      description: 'Disinfect the bite site and your hands thoroughly.',
      details: [
        'Wash with soap and water',
        'Apply rubbing alcohol',
        'Wash hands well'
      ]
    },
    {
      step: 5,
      title: 'Save Tick',
      description: 'Keep the tick in a sealed container for potential testing.',
      details: [
        'Seal in bag or container',
        'Label with date and location',
        'Bring to doctor if symptoms appear'
      ]
    },
    {
      step: 6,
      title: 'Monitor (30 Days)',
      description: 'Watch for rash or flu-like symptoms for a month.',
      details: [
        'Check for expanding rash daily',
        'Watch for fever or fatigue',
        'Seek care if you feel unwell'
      ],
      seekCare: [
        'Rash develops',
        'Flu-like symptoms appear'
      ]
    }
  ],

  myths: {
    title: 'What NOT to Do',
    debunked: [
      {
        myth: 'Apply petroleum jelly, nail polish, or alcohol to make tick back out',
        truth: 'These methods don\'t work and waste time. Worse, they may cause tick to regurgitate bacteria into the bite.'
      },
      {
        myth: 'Burn tick with a match or hot needle',
        truth: 'Dangerous and ineffective. Can injure skin and cause tick to inject more saliva/bacteria.'
      },
      {
        myth: 'Twist the tick to unscrew it',
        truth: 'Twisting breaks off mouthparts. Always pull straight up.'
      },
      {
        myth: 'You must remove every piece of mouthparts or you\'ll get infected',
        truth: 'Small mouthpart remnants are generally harmless. Focus on removing the body quickly.'
      },
      {
        myth: 'Squeezing the tick doesn\'t matter',
        truth: 'Squeezing forces stomach contents into bite, increasing infection risk. Grasp mouthparts only.'
      }
    ]
  },

  afterRemoval: {
    title: 'After Tick Removal',
    prophylaxis: {
      title: 'Preventive Antibiotics (Post-Exposure Prophylaxis)',
      description: 'A single dose of doxycycline within 72 hours of tick removal can prevent Lyme disease in high-risk situations.',
      criteria: [
        'Tick was attached for >36 hours (appears engorged)',
        'You\'re in a high-incidence Lyme area (>20% tick infection rate)',
        'Tick is identified as deer tick (Ixodes scapularis)',
        'You can take doxycycline (not pregnant, no allergies)'
      ],
      consult: 'Talk to your doctor if unsure. This is most common in endemic areas like New England.'
    },
    watchAndWait: 'Most experts recommend monitoring rather than immediate antibiotics for low-risk bites',
    testingNote: 'Tick testing results take days. Don\'t wait for results if symptoms develop—start antibiotics immediately.'
  }
};

// ============================================================================
// SHARED CONTENT (preserved from original)
// ============================================================================

export const sharedContent = {
  intro: {
    title: "Understanding Tick Activity and Risk Forecasts",
    body: `
      TickRisk helps you understand where and when tick activity is highest so you can enjoy the outdoors safely.
      Our forecasts combine environmental data, regional tick patterns, and seasonal trends to provide a reliable picture
      of where ticks are most active each year.
    `
  },
  prevention: {
    title: "Tick Bite Prevention & Outdoor Safety",
    body: `
      Protecting yourself from tick bites is easier than you think:
      - Avoid tall grass and brush.
      - Wear long sleeves and pants in wooded areas.
      - Treat clothing with permethrin.
      - Shower soon after outdoor activities.
      - Check yourself, pets, and gear after spending time outside.
    `
  },
  lymeAwareness: {
    title: "Lyme Disease and Tick-Borne Illness Awareness",
    body: `
      Lyme disease remains one of the most common vector-borne illnesses in the U.S. Early detection and prevention
      are key. Our annual tick forecasts aim to empower communities to stay alert and protect their health throughout the year.
    `
  },
  footerCTA: {
    title: "Check Your Local Tick Risk",
    body: "Enter your ZIP code to get your personalized tick activity forecast and prevention tips.",
  }
};
