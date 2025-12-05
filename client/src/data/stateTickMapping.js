// State-to-tick mapping for all 50 US states
// Each state lists primary (most common/dangerous), secondary, emerging, and specialty ticks

export const stateTickMapping = {
    // NORTHEAST
    CT: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick', 'loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'One of highest Lyme disease rates in US. Check for ticks daily during warm months.'
    },

    ME: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'Lyme disease endemic. Ticks expanding northward with climate change.'
    },

    MA: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick', 'loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Highest Lyme disease incidence in US. Year-round tick activity in mild winters.'
    },

    NH: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'High Lyme disease risk. Ticks active even in mild winter days.'
    },

    NJ: {
        primary: ['blackleggedTick', 'loneStarTick'],
        secondary: ['americanDogTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'First US detection site of Asian Longhorned tick (2017). Multiple tick species highly active.'
    },

    NY: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick', 'loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lyme disease endemic. Expanding Lone Star tick populations in Hudson Valley.'
    },

    PA: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: ['loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Widespread tick activity. Asian Longhorned tick confirmed in multiple counties.'
    },

    RI: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick', 'loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Extremely high Lyme disease rates. Block Island is tick hotspot.'
    },

    VT: {
        primary: ['blackleggedTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'Lyme disease endemic. Tick range expanding into higher elevations.'
    },

    // MID-ATLANTIC
    DE: {
        primary: ['blackleggedTick', 'loneStarTick'],
        secondary: ['americanDogTick', 'gulfCoastTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Multiple tick species active. Coastal areas see Gulf Coast ticks.'
    },

    MD: {
        primary: ['blackleggedTick', 'loneStarTick'],
        secondary: ['americanDogTick', 'gulfCoastTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Transition zone with both northern and southern tick species.'
    },

    VA: {
        primary: ['loneStarTick', 'blackleggedTick'],
        secondary: ['americanDogTick', 'gulfCoastTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lone Star tick very aggressive here. Alpha-gal syndrome cases reported.'
    },

    WV: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: ['loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Asian Longhorned tick earliest known US specimen (2010, retrospective).'
    },

    DC: {
        primary: ['blackleggedTick', 'loneStarTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'Urban tick exposure in parks and green spaces.'
    },

    // SOUTHEAST
    FL: {
        primary: ['gulfCoastTick', 'loneStarTick'],
        secondary: ['americanDogTick', 'brownDogTick'],
        emerging: [],
        specialNotes: 'Gulf Coast tick dominant. Year-round tick activity. Low Lyme disease risk.'
    },

    GA: {
        primary: ['loneStarTick', 'gulfCoastTick'],
        secondary: ['americanDogTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lone Star tick very common. Ehrlichiosis and Alpha-gal syndrome risks.'
    },

    NC: {
        primary: ['loneStarTick', 'blackleggedTick'],
        secondary: ['americanDogTick', 'gulfCoastTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Multiple tick species. Coastal areas have Gulf Coast ticks.'
    },

    SC: {
        primary: ['loneStarTick', 'gulfCoastTick'],
        secondary: ['americanDogTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lone Star and Gulf Coast ticks dominant. Year-round activity.'
    },

    AL: {
        primary: ['loneStarTick', 'gulfCoastTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'Active tick season nearly year-round. Ehrlichiosis common.'
    },

    MS: {
        primary: ['loneStarTick', 'gulfCoastTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'Coastal areas heavy with Gulf Coast ticks. Mild winters extend tick season.'
    },

    TN: {
        primary: ['loneStarTick', 'americanDogTick'],
        secondary: ['blackleggedTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lone Star tick highly abundant. Alpha-gal syndrome cases increasing.'
    },

    KY: {
        primary: ['loneStarTick', 'americanDogTick'],
        secondary: ['blackleggedTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Transition zone. Both northern and southern tick species present.'
    },

    AR: {
        primary: ['loneStarTick', 'americanDogTick'],
        secondary: ['gulfCoastTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lone Star tick very common. Long active season.'
    },

    LA: {
        primary: ['loneStarTick', 'gulfCoastTick'],
        secondary: ['americanDogTick'],
        emerging: [],
        specialNotes: 'Near year-round tick activity. Coastal marshes have Gulf Coast ticks.'
    },

    // MIDWEST
    IL: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: ['loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lyme disease endemic in northern counties. Lone Star tick expanding northward.'
    },

    IN: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: ['loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Multiple tick-borne diseases. Asian Longhorned tick recently confirmed.'
    },

    IA: {
        primary: ['americanDogTick', 'blackleggedTick'],
        secondary: ['loneStarTick'],
        emerging: [],
        specialNotes: 'American Dog tick most common. Lyme disease risk in eastern counties.'
    },

    MI: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'Lyme disease endemic. Tick activity from spring through fall.'
    },

    MN: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'Significant Lyme disease risk. Ticks in wooded and brushy areas.'
    },

    OH: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: ['loneStarTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Multiple tick species. Lone Star tick expanding into southern counties.'
    },

    WI: {
        primary: ['blackleggedTick', 'americanDogTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'One of highest Lyme disease rates nationally. Tick checks essential.'
    },

    MO: {
        primary: ['loneStarTick', 'americanDogTick'],
        secondary: ['blackleggedTick'],
        emerging: ['asianLonghornedTick'],
        specialNotes: 'Lone Star tick very common. Alpha-gal syndrome reports increasing.'
    },

    KS: {
        primary: ['americanDogTick', 'loneStarTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'American Dog tick common in grasslands. Lone Star tick in eastern areas.'
    },

    NE: {
        primary: ['americanDogTick'],
        secondary: ['blackleggedTick'],
        emerging: [],
        specialNotes: 'American Dog tick most common. Lower tick-borne disease rates.'
    },

    ND: {
        primary: ['americanDogTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'American Dog tick in grasslands. Limited tick diversity.'
    },

    SD: {
        primary: ['americanDogTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'American Dog tick most common. Rocky Mountain tick diseases possible in western counties.'
    },

    // SOUTHWEST  
    TX: {
        primary: ['loneStarTick', 'americanDogTick'],
        secondary: ['gulfCoastTick', 'brownDogTick'],
        specialty: ['ornithodorosTuricata'],
        specialNotes: 'Diverse tick fauna. Soft ticks in caves/burrows (relapsing fever). Brown Dog tick common in urban areas.'
    },

    OK: {
        primary: ['loneStarTick', 'americanDogTick'],
        secondary: ['brownDogTick'],
        specialty: ['ornithodorosTuricata'],
        specialNotes: 'Lone Star tick dominant. Soft ticks in southwestern regions.'
    },

    NM: {
        primary: ['americanDogTick', 'brownDogTick'],
        secondary: ['rockyMountainWoodTick'],
        specialty: ['ornithodorosHermsii', 'ornithodorosTuricata'],
        specialNotes: 'Rocky Mountain Wood tick at high elevations. Soft ticks in caves and mountain cabins (relapsing fever).'
    },

    AZ: {
        primary: ['brownDogTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii', 'ornithodorosTuricata'],
        specialNotes: 'Brown Dog tick causes RMSF here. Soft ticks in mountain cabins and caves (relapsing fever).'
    },

    // ROCKY MOUNTAIN
    MT: {
        primary: ['rockyMountainWoodTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Rocky Mountain Wood tick dominant at 4,000-10,500 ft. Soft ticks in rustic mountain cabins (relapsing fever). Tick paralysis risk.'
    },

    ID: {
        primary: ['rockyMountainWoodTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Rocky Mountain Wood tick in mountainous areas. Soft ticks in mountain cabins (relapsing fever).'
    },

    WY: {
        primary: ['rockyMountainWoodTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Rocky Mountain Wood tick at elevation. Colorado Tick Fever and RMSF risks. Soft ticks in cabins.'
    },

    CO: {
        primary: ['rockyMountainWoodTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Rocky Mountain Wood tick 4,000-10,500 ft. Colorado Tick Fever endemic. Soft ticks in mountain cabins (relapsing fever).'
    },

    UT: {
        primary: ['rockyMountainWoodTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Rocky Mountain Wood tick in high country. Soft ticks in recreation cabins (relapsing fever).'
    },

    NV: {
        primary: ['rockyMountainWoodTick', 'americanDogTick'],
        secondary: [],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Rocky Mountain Wood tick at higher elevations. Soft ticks in mountain areas.'
    },

    // PACIFIC WEST
    CA: {
        primary: ['westernBlackleggedTick', 'americanDogTick'],
        secondary: ['brownDogTick'],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Western Blacklegged tick carries Lyme disease. Soft ticks in Sierra Nevada cabins (relapsing fever). Brown Dog tick in urban/southern areas.'
    },

    OR: {
        primary: ['westernBlackleggedTick', 'americanDogTick'],
        secondary: ['rockyMountainWoodTick'],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Western Blacklegged tick in western forests. Rocky Mountain tick in eastern high country. Soft ticks in mountain cabins.'
    },

    WA: {
        primary: ['westernBlackleggedTick', 'americanDogTick'],
        secondary: ['rockyMountainWoodTick'],
        specialty: ['ornithodorosHermsii'],
        specialNotes: 'Western Blacklegged tick west of Cascades. Rocky Mountain tick in eastern mountains. Soft ticks in cabins (relapsing fever).'
    },

    // ALASKA
    AK: {
        primary: ['ixodesAngustus'],
        secondary: [],
        emerging: [],
        specialNotes: '✅ Good news! No established populations of disease-carrying ticks. Native I. angustus poses minimal human health risk. Travelers should check pets/gear from Lower 48.'
    },

    // HAWAII
    HI: {
        primary: ['brownDogTick'],
        secondary: [],
        emerging: [],
        specialNotes: 'Brown Dog tick is endemic but Lyme disease absent. Low tick-borne disease risk.'
    }
};

export default stateTickMapping;
