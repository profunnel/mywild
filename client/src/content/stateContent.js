/**
 * State-Specific Content for New England Tick Forecasts
 * Detailed profiles for ME, NH, VT, MA, CT, RI
 */

export const stateDetails = {
    maine: {
        overview: `Maine's dense forests, humid coastal climate, and extensive wilderness create ideal tick habitats across much of the state. As the largest New England state, Maine has seen dramatic increases in Lyme disease cases over the past two decades, with southern and coastal counties experiencing the highest infection rates. The state's long summers and mild winters have allowed tick populations to thrive, making Maine one of the highest-risk states for tick-borne diseases in the nation. The blacklegged tick (deer tick) is the primary vector, responsible for transmitting Lyme disease, anaplasmosis, and babesiosis. With over 17 million acres of forested land and a robust outdoor recreation culture, Mainers and visitors face significant exposure during spring and summer months.`,

        habitat: `The transition zones between Maine's hardwood forests and coastal scrub are prime tick habitats. Ticks thrive in the state's mixed forests of oak, maple, and birch, where leaf litter provides moist, shaded conditions essential for survival. Coastal areas from Kittery to Bar Harbor create particularly favorable microclimates—maritime humidity combines with dense vegetation to support year-round tick activity. The understory vegetation in second-growth forests provides questing sites where ticks wait for white-footed mice, deer, and humans. Maine's numerous hiking trails, state parks, and lakeside camps create countless human-tick encounter points, especially during peak activity season.`,

        seasonality: `Due to cooler springs, Maine's nymph activity peaks slightly later than southern New England, typically from early June through mid-July. This is the most dangerous period for human infection, as tiny nymphs go unnoticed. Adult ticks are active during two periods: a fall peak in October-November and a smaller spring resurgence in April-May. Unusually for northern states, Maine's coastal microclimates allow limited tick activity even during mild winter periods, though this is uncommon. The state's short spring means the window between winter dormancy and peak nymph season is compressed, creating an intense 6-8 week high-risk period.`,

        dominantTick: 'Deer Tick (Ixodes scapularis)',
        secondaryTick: 'American Dog Tick (Dermacentor variabilis)',

        hotspots: [
            'York County (highest case rates)',
            'Cumberland County (Portland metro area)',
            'Sagadahoc County (mid-coast region)',
            'Knox County (Camden, Rockland areas)',
            'Acadia National Park and Mount Desert Island',
            'Greater Portland trails and parks',
            'Kennebec River Valley'
        ],

        keywords: ['maine tick forecast', 'lyme disease maine', 'tick season maine', 'deer tick maine', 'maine tick map'],

        lymeStats: {
            annualCases: '~2,000 reported cases annually (one of highest rates per capita in U.S.)',
            trend: 'Consistent increase over past 20 years',
            highRiskCounties: 'Southern and coastal counties (York, Cumberland, Sagadahoc)'
        }
    },

    'new-hampshire': {
        overview: `New Hampshire's extensive forests, mountainous terrain, and outdoor recreation economy create endemic tick-borne disease conditions across the state. The White Mountains and Lakes Region attract millions of visitors annually, many unaware of tick risks. Lyme disease cases have increased steadily since the 1990s, with infection rates now among the highest in the nation. The state's mixed hardwood and coniferous forests, combined with fragmented suburban-rural landscapes, provide ideal conditions for white-footed mice and deer—the primary hosts for blacklegged ticks. New Hampshire's four distinct seasons include warm, humid summers that amplify tick population growth, particularly in southern counties bordering Massachusetts.`,

        habitat: `New Hampshire's tick habitats range from coastal salt marshes to high-elevation forests. The most significant risk areas are the hardwood forests and forest-field edges common in southern counties (Hillsborough, Rockingham, Strafford). These transition zones between residential areas and woodlands create perfect questing sites for ticks. The state's granite bedrock creates well-drained soils that support oak and maple forests—preferred habitat for white-footed mice, which have exceptionally high tick infection rates. Lakeside properties, hiking trails through the White Mountains, and even urban parks in Manchester and Concord harbor substantial tick populations.`,

        seasonality: `New Hampshire's nymph season peaks from late May through early July, with the most intense activity in mid-June. This timing coincides with school vacation and early summer hiking season, increasing human exposure. Adult tick activity occurs in two waves: October-November (fall) and March-April (spring), though spring activity is often masked by unpredictable weather. The state's variable spring weather can compress or extend nymph season depending on temperature patterns. Coastal and southern regions experience earlier nymph emergence than the White Mountains region, which lags by 1-2 weeks.`,

        dominantTick: 'Deer Tick (Ixodes scapularis)',
        secondaryTick: 'American Dog Tick (Dermacentor variabilis)',

        hotspots: [
            'Rockingham County (highest density)',
            'Hillsborough County (Manchester/Nashua metro)',
            'Strafford County (Durham, Dover areas)',
            'Merrimack County (Concord region)',
            'White Mountain National Forest trails',
            'Lake Winnipesaukee region',
            'Monadnock State Park area'
        ],

        keywords: ['new hampshire tick forecast', 'lyme disease new hampshire', 'nh tick season', 'white mountains ticks'],

        lymeStats: {
            annualCases: '~1,500 confirmed cases annually',
            trend: 'Steady increase, particularly in southern counties',
            highRiskCounties: 'Rockingham, Hillsborough, Strafford counties lead case counts'
        }
    },

    vermont: {
        overview: `Vermont's rural character, extensive forest cover, and outdoor recreation culture create widespread tick exposure across the state. Once considered relatively low-risk compared to coastal New England, Vermont has experienced explosive growth in Lyme disease cases over the past 15 years, with infection rates now rivaling the highest in the country. The state's Green Mountains, Lake Champlain valley, and countless hiking trails provide ideal conditions for blacklegged ticks. Vermont's cool climate historically limited tick populations, but warming temperatures have eliminated this natural barrier. The state's small, dispersed population means tick encounters often occur far from medical facilities, making prevention and early detection critical.`,

        habitat: `Vermont's tick habitats center on the hardwood forests and old pasture margins common throughout the state. The Champlain Valley's moderate climate and deciduous forests create particularly favorable conditions. Ticks thrive in Vermont's stone-wall-lined forests, where historical sheep pastures have reverted to brushy woodland—perfect habitat for mice and deer. The state's extensive trail systems, including the Long Trail and Appalachian Trail segments, pass through prime tick habitat. Suburban areas around Burlington, Montpelier, and Brattleboro show high tick density due to forest fragmentation and abundant deer populations.`,

        seasonality: `Vermont's tick season mirrors New Hampshire, with nymph activity peaking in late May through July. The state's cold springs can delay nymph emergence, compressing peak season into a shorter window. Adult ticks are active during fall (October-early November) before hard freezes, and briefly in spring (late March-April) if conditions permit. Vermont's higher elevations experience later and shorter tick seasons, but lowland valleys around Lake Champlain see activity patterns similar to southern New England. The state's unpredictable spring weather makes timing difficult to predict year to year.`,

        dominantTick: 'Deer Tick (Ixodes scapularis)',
        secondaryTick: 'American Dog Tick (Dermacentor variabilis)',

        hotspots: [
            'Chittenden County (Burlington area - highest cases)',
            'Windham County (Brattleboro, southern Vermont)',
            'Bennington County',
            'Rutland County',
            'Lake Champlain islands and shoreline',
            'Green Mountain National Forest trails',
            'Mad River Valley recreation areas'
        ],

        keywords: ['vermont tick forecast', 'lyme disease vermont', 'vt tick season', 'green mountains ticks'],

        lymeStats: {
            annualCases: '~1,000 confirmed cases annually (dramatic increase from 200/year in 2010)',
            trend: 'Steepest increase in New England over past decade',
            highRiskCounties: 'Chittenden County leads, but risk is now statewide'
        }
    },

    massachusetts: {
        overview: `Massachusetts has the unfortunate distinction of being the epicenter of Lyme disease in the United States, with some of the highest infection rates in the world. The disease was first identified in nearby Connecticut, but Massachusetts now reports over 5,000 cases annually. The state's geography—68% forested despite heavy urbanization—creates countless tick habitats. Cape Cod, the Islands (Martha's Vineyard, Nantucket), and the Berkshires are particularly notorious for tick density. Suburban sprawl into forested areas around Boston has created perfect conditions: fragmented forests, abundant deer, and high human exposure. The state's robust outdoor recreation culture and dense trail networks ensure frequent human-tick encounters throughout the warm months.`,

        habitat: `Massachusetts tick habitats are characterized by oak-dominated hardwood forests, coastal scrublands, and suburban forest fragments. The oak-mouse-tick ecological triangle is especially strong here: prolific acorn production feeds mouse populations, which in turn support enormous tick densities. Cape Cod's scrub oak barrens, pitch pine forests, and sandy soils create uniquely favorable microclimates. The islands (Martha's Vineyard and Nantucket) have infection rates approaching 50% in adult tick populations—among the highest anywhere. Even Boston's urban parks (Middlesex Fells, Blue Hills Reservation) harbor significant tick populations. Coastal humidity extends tick activity season and increases survival rates.`,

        seasonality: `Massachusetts experiences one of the earliest and longest tick seasons in New England. Nymph activity begins in early May and extends through late July, with peak danger in late May through June. This early onset catches many residents off-guard before they've adopted protective behaviors. Adult ticks are active during two distinct periods: a strong fall peak (October-November) and a spring emergence (March-April). Mild winters along the coast allow occasional winter activity. The state's extended fall warmth prolongs adult tick questing into December some years, creating nearly year-round risk in coastal areas.`,

        dominantTick: 'Deer Tick (Ixodes scapularis)',
        secondaryTick: 'Lone Star Tick (Amblyomma americanum) - increasingly common in southeastern MA',

        hotspots: [
            'Cape Cod (all regions - extremely high risk)',
            'Martha\'s Vineyard (50%+ tick infection rates)',
            'Nantucket Island (highest infection rates in state)',
            'Berkshire County (western MA)',
            'Middlesex County suburbs',
            'Norfolk County (Blue Hills, Stony Brook)',
            'Essex County (North Shore)',
            'Worcester County forests'
        ],

        keywords: ['massachusetts tick forecast', 'lyme disease massachusetts', 'cape cod ticks', 'nantucket lyme disease', 'ma tick season'],

        lymeStats: {
            annualCases: '~5,500 confirmed cases annually (likely 10x+ actual infections)',
            trend: 'Consistently highest or second-highest in nation',
            highRiskCounties: 'Cape Cod, Islands, and Berkshires have infection rates 10-20x national average'
        }
    },

    connecticut: {
        overview: `Connecticut holds historical significance as the namesake of Lyme, Connecticut—where the disease was first identified in 1975. Nearly 50 years later, the state continues to battle some of the nation's highest Lyme disease rates. Connecticut's dense suburban development interspersed with forest fragments creates ideal tick-human encounter conditions. The state's humid summers, mild winters, and extensive deer populations support thriving tick communities statewide. Fairfield, New Haven, and New London counties consistently report the highest case numbers, but no region of Connecticut is low-risk. The state's small size and universal tick presence mean residents cannot avoid exposure through geography—prevention and awareness are essential.`,

        habitat: `Connecticut's tick habitats include extensive oak-hickory forests, coastal woodlands, and the countless forest patches in suburban landscapes. The state's geology—rocky, well-drained soils derived from glacial till—supports oak forests that produce variable acorn crops, driving boom-bust cycles in mouse (and therefore tick) populations. Riverside forests along the Connecticut River and coastal areas provide year-round moderate temperatures that boost tick survival. Even small urban parks and backyard edges harbor ticks, making avoidance nearly impossible. The state's extensive trail systems, state parks, and forests see heavy recreational use, creating constant human exposure.`,

        seasonality: `Connecticut's tick season begins early and extends late. Nymph activity starts in early May and continues through mid-July, with peak risk in late May and June. Adult ticks emerge strongly in October-November and again briefly in March-April. The state's coastal and southern regions experience milder winters that permit occasional mid-winter tick activity. Connecticut's long fall extends adult tick season well into November, and early springs can trigger March activity. Residents face potential tick exposure 8-9 months per year in many regions.`,

        dominantTick: 'Deer Tick (Ixodes scapularis)',
        secondaryTick: 'Lone Star Tick (Amblyomma americanum) - expanding range from the south',

        hotspots: [
            'Fairfield County (southwestern CT - highest density)',
            'New Haven County',
            'New London County (southeastern coastal region)',
            'Litchfield County (northwestern hills)',
            'Middlesex County',
            'All state forests and parks (Devil\'s Hopyard, Sleeping Giant, etc.)',
            'Connecticut River valley'
        ],

        keywords: ['connecticut tick forecast', 'lyme disease connecticut', 'ct tick season', 'lyme ct statistics'],

        lymeStats: {
            annualCases: '~4,000 confirmed cases annually',
            trend: 'Consistently among top 3 states for Lyme disease',
            highRiskCounties: 'Statewide endemic - no low-risk areas remain'
        }
    },

    'rhode-island': {
        overview: `Rhode Island, despite being the nation's smallest state, has one of the highest per-capita Lyme disease rates in the country. The state's coastal location, mild climate, and extensive forest cover create ideal tick habitat year-round. Rhode Island's outdoor recreation culture—beaches, trails, and state parks—ensures high human exposure. The state's proximity to other high-risk areas (southeastern Massachusetts, eastern Connecticut) means tick populations have been established for decades. Rhode Island's small size offers no geographic escape: ticks are present statewide, from urban Providence to rural Westerly. The combination of year-round mild temperatures, humid maritime climate, and abundant deer populations creates perfect tick breeding conditions.`,

        habitat: `Rhode Island's tick habitats include coastal scrub forests, oak woodlands, and the mixed forests common across southern New England. The state's coastal influence creates moderate temperatures and high humidity year-round, conditions that allow ticks to remain active longer than inland areas. Forest fragments in suburban areas around Providence, Warwick, and Cranston bring ticks into close contact with dense human populations. State parks like Arcadia Management Area, Lincoln Woods, and Ninigret Park see heavy recreational use and harbor substantial tick populations. Even urban parks and coastal trails are high-risk during peak season.`,

        seasonality: `Rhode Island's maritime climate creates one of the earliest tick seasons in New England. Nymph activity begins in early to mid-May and extends through late July, with peak danger in late May through mid-June. Adult ticks are active during extended fall (September through November) and spring (March through April) periods. Mild winters allow occasional mid-winter activity along the coast. Rhode Island's long fall warmth keeps adult ticks questing into December some years, creating nearly 9-month potential exposure windows in coastal areas.`,

        dominantTick: 'Deer Tick (Ixodes scapularis)',
        secondaryTick: 'American Dog Tick (Dermacentor variabilis)',

        hotspots: [
            'Washington County (southern RI - highest risk)',
            'Kent County',
            'Providence County (despite urbanization)',
            'Newport County (including Aquidneck Island)',
            'Arcadia Management Area',
            'Lincoln Woods State Park',
            'Ninigret Conservation Area',
            'Block Island (very high tick density)'
        ],

        keywords: ['rhode island tick forecast', 'lyme disease rhode island', 'ri tick season', 'block island ticks'],

        lymeStats: {
            annualCases: '~900 confirmed cases annually (highest per-capita rate in New England)',
            trend: 'Consistently very high, stable at elevated levels',
            highRiskCounties: 'Statewide endemic - all counties have high infection rates'
        }
    }
};

// Helper function to get state content by slug
export function getStateContent(stateSlug) {
    return stateDetails[stateSlug] || null;
}

// Get all state slugs
export function getAllStatelugs() {
    return Object.keys(stateDetails);
}
