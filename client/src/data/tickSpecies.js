export const tickSpecies = {
  blackleggedTick: {
    id: 'blackleggedTick',
    commonNames: ['Blacklegged Tick', 'Deer Tick'],
    displayName: 'Deer Tick / Blacklegged Tick',
    scientificName: 'Ixodes scapularis',
    regions: ['Northeast', 'Mid-Atlantic', 'Midwest'],
    dangerLevel: 'Very High',
    appearance: 'Dark reddish-brown body with black shield on back. Adults are 3-5mm.',
    peakSeason: 'Adults: Oct-May | Nymphs: May-Aug',
    habitat: 'Deciduous forests, shady moist areas, and leaf litter. Loves the boundary between lawns and woods.',
    diseases: ['Lyme Disease', 'Anaplasmosis', 'Babesiosis', 'Powassan Virus', 'B. miyamotoi'],
    imageUrl: '/images/deer_tick.png',
    priority: 1,
    tickType: 'hard'
  },

  americanDogTick: {
    id: 'americanDogTick',
    commonNames: ['American Dog Tick', 'Wood Tick'],
    displayName: 'American Dog Tick',
    scientificName: 'Dermacentor variabilis',
    regions: ['East of Rockies', 'Limited Western Areas'],
    dangerLevel: 'Moderate',
    appearance: 'Brown with white/grey mottling. Ornate white patterns on shield.',
    peakSeason: 'Spring and Summer',
    habitat: 'Grassy fields, walkways, and trails. More tolerant of dry conditions than Deer Ticks.',
    diseases: ['Rocky Mountain Spotted Fever', 'Tularemia'],
    imageUrl: '/images/dog_tick.png',
    priority: 2,
    tickType: 'hard'
  },

  loneStarTick: {
    id: 'loneStarTick',
    commonNames: ['Lone Star Tick'],
    displayName: 'Lone Star Tick',
    scientificName: 'Amblyomma americanum',
    regions: ['Southeast', 'Eastern US', 'Midwest'],
    dangerLevel: 'High',
    appearance: 'Distinct white dot or "lone star" on female\'s back. Reddish-brown body.',
    peakSeason: 'Active from early Spring through late Fall',
    habitat: 'Woodlands with dense undergrowth and around animal resting areas.',
    diseases: ['Ehrlichiosis', 'Alpha-gal Syndrome', 'STARI', 'Heartland Virus', 'Bourbon Virus'],
    imageUrl: '/images/lone_star_tick.png',
    priority: 1,
    tickType: 'hard',
    specialNote: 'Aggressive hunter. Actively pursues hosts.'
  },

  gulfCoastTick: {
    id: 'gulfCoastTick',
    commonNames: ['Gulf Coast Tick'],
    displayName: 'Gulf Coast Tick',
    scientificName: 'Amblyomma maculatum',
    regions: ['Southeast', 'Expanding Northeast/Midwest'],
    dangerLevel: 'Moderate',
    appearance: 'Reddish-brown with ornate silver/white markings creating an eye-catching pattern.',
    peakSeason: 'April-September',
    habitat: 'Coastal grasslands, marshes, beaches, and open areas near water.',
    diseases: ['Rickettsia parkeri rickettsiosis'],
    imageUrl: '/images/gulf_coast_tick.png',
    priority: 2,
    tickType: 'hard'
  },

  westernBlackleggedTick: {
    id: 'westernBlackleggedTick',
    commonNames: ['Western Blacklegged Tick'],
    displayName: 'Western Blacklegged Tick',
    scientificName: 'Ixodes pacificus',
    regions: ['Pacific Coast'],
    dangerLevel: 'High',
    appearance: 'Similar to deer tick. Dark brown to black. Adults are 3-5mm.',
    peakSeason: 'Adults: Oct-May | Nymphs: May-Jul',
    habitat: 'Chaparral, oak woodlands, coastal scrub. Often feeds on lizards as nymphs.',
    diseases: ['Lyme Disease', 'Anaplasmosis', 'B. miyamotoi'],
    imageUrl: '/images/western_blacklegged_tick.png',
    priority: 1,
    tickType: 'hard'
  },

  rockyMountainWoodTick: {
    id: 'rockyMountainWoodTick',
    commonNames: ['Rocky Mountain Wood Tick'],
    displayName: 'Rocky Mountain Wood Tick',
    scientificName: 'Dermacentor andersoni',
    regions: ['Rocky Mountain States'],
    dangerLevel: 'Moderate',
    appearance: 'Brown with gray/white mottling, similar to dog tick but found at higher elevations.',
    peakSeason: 'March-July',
    habitat: 'Shrublands, lightly wooded areas, and grasslands at 4,000 to 10,500 feet elevation.',
    diseases: ['Rocky Mountain Spotted Fever', 'Colorado Tick Fever', 'Tularemia', 'Tick Paralysis'],
    imageUrl: '/images/rocky_mountain_wood_tick.png',
    priority: 1,
    tickType: 'hard',
    specialNote: 'Saliva contains neurotoxin that can cause Tick Paralysis (reversible after removal).'
  },

  brownDogTick: {
    id: 'brownDogTick',
    commonNames: ['Brown Dog Tick'],
    displayName: 'Brown Dog Tick',
    scientificName: 'Rhipicephalus sanguineus',
    regions: ['Nationwide', 'Especially Southwest'],
    dangerLevel: 'Low-Moderate',
    appearance: 'Uniform reddish-brown color with no ornate patterns or markings.',
    peakSeason: 'Year-round (can survive indoors)',
    habitat: 'On dogs and in kennels. Can survive and reproduce indoors.',
    diseases: ['Rocky Mountain Spotted Fever (in Southwest)'],
    imageUrl: '/images/brown_dog_tick.png',
    priority: 3,
    tickType: 'hard',
    specialNote: 'Primarily feeds on dogs. Can establish indoor infestations.'
  },

  asianLonghornedTick: {
    id: 'asianLonghornedTick',
    commonNames: ['Asian Longhorned Tick'],
    displayName: 'Asian Longhorned Tick',
    scientificName: 'Haemaphysalis longicornis',
    regions: ['Eastern US (19 states)'],
    invasive: true,
    emerging: true,
    dangerLevel: 'High (Emerging)',
    appearance: 'Pale brown with long mouthparts. Smaller than many native ticks.',
    peakSeason: 'Spring-Fall (rapidly spreading)',
    habitat: 'Grasslands, forest edges, agricultural areas. Prefers livestock.',
    diseases: ['Potential SFTS virus (not yet confirmed in US)', 'Theileriosis in cattle'],
    imageUrl: '/images/asian_longhorned_tick.png',
    priority: 2,
    tickType: 'hard',
    specialNote: '⚠️ INVASIVE: Parthenogenetic (females clone themselves). Major livestock threat. Rapidly spreading since 2017.'
  },

  ornithodorosHermsii: {
    id: 'ornithodorosHermsii',
    commonNames: ['Soft Tick', 'Relapsing Fever Tick'],
    displayName: 'Soft Tick (O. hermsii)',
    scientificName: 'Ornithodoros hermsii',
    regions: ['Western US Mountains'],
    dangerLevel: 'Moderate',
    appearance: 'Soft-bodied, leathery texture, no hard shield. Looks like a raisin. 5-8mm.',
    peakSeason: 'Active in mountain cabins year-round',
    habitat: 'Rustic cabins, rodent burrows in coniferous forests at 900-2,000m elevation.',
    diseases: ['Tick-Borne Relapsing Fever (TBRF)'],
    imageUrl: '/images/soft_tick_hermsii.png',
    priority: 3,
    tickType: 'soft',
    specialNote: '🌙 Feeds at night for 15-30 minutes. Painless bite. Found in mountain cabins with rodent infestations.'
  },

  ornithodorosTuricata: {
    id: 'ornithodorosTuricata',
    commonNames: ['Soft Tick', 'Relapsing Fever Tick'],
    displayName: 'Soft Tick (O. turicata)',
    scientificName: 'Ornithodoros turicata',
    regions: ['Southwest US', 'Texas'],
    dangerLevel: 'Moderate',
    appearance: 'Soft-bodied, leathery, no hard shield. Oval shaped. 5-8mm.',
    peakSeason: 'Year-round in caves and burrows',
    habitat: 'Caves, burrows, crawl spaces. Associated with southwestern ground squirrels and prairie dogs.',
    diseases: ['Tick-Borne Relapsing Fever (TBRF)'],
    imageUrl: '/images/soft_tick_turicata.png',
    priority: 3,
    tickType: 'soft',
    specialNote: '🌙 Nocturnal feeder. Can live for decades. Found in caves and building crawl spaces.'
  },

  ixodesAngustus: {
    id: 'ixodesAngustus',
    commonNames: ['Squirrel Tick', 'Vole Tick'],
    displayName: 'Alaska Native Tick (I. angustus)',
    scientificName: 'Ixodes angustus',
    regions: ['Alaska'],
    dangerLevel: 'Very Low',
    appearance: 'Small, dark tick. Similar appearance to blacklegged tick.',
    peakSeason: 'Summer months',
    habitat: 'On small mammals (squirrels, voles). Rarely encountered by humans.',
    diseases: ['None confirmed in humans'],
    imageUrl: '/images/ixodes_angustus.png',
    priority: 1,
    tickType: 'hard',
    specialNote: '✅ Native to Alaska. Minimal human health risk. Most common tick found on Alaskan wildlife.'
  }
};

export default tickSpecies;
