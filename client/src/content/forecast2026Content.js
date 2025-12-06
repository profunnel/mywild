// 2026 Tick Forecast specific content
export const forecast2026 = {
    executiveSummary: {
        nationalActivity: {
            icon: '📈',
            metric: '+15-20%',
            label: 'Projected Activity Increase',
            description: 'Forecast tick populations based on climate trends and recent years'
        },
        peakRisk: {
            icon: '🗓️',
            metric: 'May 15 - July 15',
            label: 'Peak Risk Window',
            description: 'Nymphal tick season critical period for Lyme transmission'
        },
        highRiskRegions: {
            icon: '📍',
            metric: '19 States',
            label: 'Very High Risk Zones',
            description: 'Elevated Lyme disease endemic areas'
        }
    },

    regionalOutlook: {
        northeast: {
            name: 'Northeast',
            riskLevel: 'Very High',
            riskColor: '#ef4444',
            states: ['ME', 'VT', 'NH', 'MA', 'RI', 'CT', 'NY', 'PA', 'NJ'],
            outlook: 'Projected High Activity - Climate forecasts suggest conditions favorable for nymph populations. Historical patterns indicate this could be one of the more active tick seasons in recent years.',
            primaryThreat: 'Blacklegged tick (Deer tick)',
            primaryDisease: 'Lyme disease',
            recommendation: 'Start prevention measures in early April. Daily tick checks essential from May through July.',
            specialNote: 'Mouse populations are key predictors of Lyme infection rates. Higher mouse survival typically leads to more infected nymphs the following spring.'
        },
        midAtlantic: {
            name: 'Mid-Atlantic',
            riskLevel: 'High',
            riskColor: '#f97316',
            states: ['MD', 'DE', 'VA', 'WV', 'DC'],
            outlook: 'Increasing Lone Star tick activity alongside established Blacklegged tick populations. Transition zone experiencing dual threats with range expansion of southern species.',
            primaryThreat: 'Blacklegged tick & Lone Star tick',
            primaryDisease: 'Lyme disease & Alpha-gal syndrome',
            recommendation: 'Monitor for both Lyme disease symptoms and Alpha-gal syndrome. Avoid wooded edges and tall grass.',
            specialNote: 'Alpha-gal red meat allergy cases rising 15% annually in this region.'
        },
        southeast: {
            name: 'Southeast',
            riskLevel: 'Moderate',
            riskColor: '#fb923c',
            states: ['NC', 'SC', 'GA', 'FL', 'AL', 'MS', 'LA', 'TN', 'KY', 'AR'],
            outlook: 'Lone Star tick remains dominant vector. Gulf Coast tick expanding northward from coastal areas. Warmer winters extending active season by 4-6 weeks.',
            primaryThreat: 'Lone Star tick & Gulf Coast tick',
            primaryDisease: 'Ehrlichiosis & Rickettsia parkeri rickettsiosis',
            recommendation: 'Year-round vigilance in warm coastal areas. Peak activity March-October.',
            specialNote: 'Aggressive Lone Star tick behavior means higher encounter rates during outdoor activities.'
        },
        midwest: {
            name: 'Midwest',
            riskLevel: 'Moderate-High',
            riskColor: '#f59e0b',
            states: ['OH', 'IN', 'IL', 'MI', 'WI', 'MN', 'IA', 'MO', 'KS', 'NE', 'ND', 'SD'],
            outlook: 'Stable to slightly increased Blacklegged tick activity in forested regions. Upper Midwest lake areas show highest concentration. Asian Longhorned tick detected in 4 new counties.',
            primaryThreat: 'Blacklegged tick (American Dog tick in open areas)',
            primaryDisease: 'Lyme disease & Anaplasmosis',
            recommendation: 'Northern lakes region highest risk. Wisconsin, Minnesota, Michigan residents should use preventive measures May-August.',
            specialNote: 'Anaplasmosis co-infection with Lyme increasing in this region.'
        },
        west: {
            name: 'West',
            riskLevel: 'Low-Moderate',
            riskColor: '#10b981',
            states: ['CA', 'OR', 'WA', 'MT', 'ID', 'WY', 'CO', 'UT', 'NV', 'AZ', 'NM', 'TX', 'OK'],
            outlook: 'Western Blacklegged tick active in Pacific coastal states. Rocky Mountain Wood tick in high elevation areas. Soft ticks (Ornithodoros) in mountain cabins and caves pose relapsing fever risk.',
            primaryThreat: 'Western Blacklegged tick (Pacific), Rocky Mountain Wood tick (Rockies)',
            primaryDisease: 'Lyme disease (West Coast), RMSF & Colorado Tick Fever (Mountains)',
            recommendation: 'Pacific Northwest hikers check for ticks. Mountain cabin visitors inspect sleeping areas for soft ticks. Texas experiences multiple species.',
            specialNote: 'Soft tick relapsing fever cases tied to rustic cabin stays - inspect before sleeping.'
        }
    },

    diseaseProjections: {
        lyme: {
            name: 'Lyme Disease',
            cases2024: '~476,000',
            projection2026: '10-15% increase in Northeast',
            reasoning: 'Climate patterns suggest favorable conditions for white-footed mouse populations, the primary reservoir for Borrelia burgdorferi. Higher mouse populations typically correlate with increased nymphal tick infection rates.',
            symptoms: 'Bull\'s-eye rash (60-80% of cases), fever, headache, fatigue, joint pain',
            peakRisk: 'May-July (nymphal tick season)',
            prevention: 'Daily tick checks, permethrin-treated clothing, DEET repellent'
        },
        anaplasmosis: {
            name: 'Anaplasmosis',
            cases2024: '~5,700',
            projection2026: 'Steady increase in Upper Midwest',
            reasoning: 'Co-transmitted with Lyme by Blacklegged ticks. Expanding geographic range following tick distribution patterns.',
            symptoms: 'Fever, severe headache, muscle aches, low white blood cell count',
            peakRisk: 'May-October',
            prevention: 'Same tick avoidance strategies as Lyme disease'
        },
        babesiosis: {
            name: 'Babesiosis',
            cases2024: '~2,400',
            projection2026: 'Expansion into Great Lakes region',
            reasoning: 'Parasitic infection spreading beyond traditional Northeast endemic areas. Now confirmed in Wisconsin, Minnesota, and Michigan.',
            symptoms: 'Flu-like illness, can be severe in immunocompromised individuals',
            peakRisk: 'May-August',
            prevention: 'Tick bite prevention; screen blood donations in endemic areas'
        },
        alphaGal: {
            name: 'Alpha-gal Syndrome',
            cases2024: '~110,000 suspected',
            projection2026: 'Increasing Lone Star tick encounters',
            reasoning: 'Lone Star tick range expansion into Mid-Atlantic and Midwest. More human-tick contacts = more sensitization to alpha-gal sugar molecule.',
            symptoms: 'Delayed allergic reaction to red meat (3-6 hours after eating)',
            peakRisk: 'Spring through Fall (Lone Star activity)',
            prevention: 'Avoid Lone Star tick bites; recognize female\'s distinctive white dot'
        },
        rmsf: {
            name: 'Rocky Mountain Spotted Fever',
            cases2024: '~6,200',
            projection2026: 'Southwest concern (Brown Dog tick)',
            reasoning: 'Brown Dog tick populations in urban/suburban areas of Arizona, California, Texas. High mortality (20-30%) if untreated within 5 days.',
            symptoms: 'Fever, spotted rash (2-5 days after fever), severe headache',
            peakRisk: 'April-September',
            prevention: 'Early antibiotic treatment critical; tick checks on dogs'
        }
    },

    timeline2026: [
        {
            month: 'January 2026',
            title: 'Winter Dormancy',
            activity: 'Very Low',
            description: 'Minimal tick activity during coldest month. Adult Blacklegged ticks can occasionally be active on warm winter days above 35°F.',
            actions: [
                'Stay vigilant on unseasonably warm days',
                'Keep tick removal tools accessible',
                'Review prevention strategies for upcoming season',
                'Plan yard improvements for tick habitat reduction'
            ]
        },
        {
            month: 'February 2026',
            title: 'Late Winter Preparation',
            activity: 'Very Low',
            description: 'Activity remains low but begins increasing toward month end. Prepare for spring tick season with preventive measures.',
            actions: [
                'Order permethrin spray for clothing',
                'Stock up on tick repellents',
                'Schedule yard cleanup for early March',
                'Check pets for ticks on warmer days'
            ]
        },
        {
            month: 'March 2026',
            title: 'Early Activity Begins',
            activity: 'Low',
            description: 'Adult ticks emerge on warm days (>35°F). First signs of tick season as temperatures rise above freezing.',
            actions: [
                'Begin yard cleanup - remove leaf litter',
                'Create wood chip or gravel barriers',
                'Apply first permethrin treatment to clothing',
                'Inspect pets after outdoor time'
            ]
        },
        {
            month: 'April 2026',
            title: 'Nymph Emergence Starts',
            activity: 'Moderate',
            description: 'First nymphal ticks become active in Southern states. Populations building in Northeast. Temperature-dependent development accelerates.',
            actions: [
                'Start daily tick checks after outdoor activities',
                'Apply DEET repellent before hiking',
                'Treat pets with tick preventive medication',
                'Mow lawn regularly (keep grass short)'
            ]
        },
        {
            month: 'May 2026',
            title: '⚠️ Peak Risk Begins',
            activity: 'Very High',
            description: 'Nymphal tick season in full swing. Tiny nymphs (size of poppy seed) are most dangerous vectors for Lyme disease. Highest transmission risk.',
            actions: [
                'CRITICAL: Check for ticks within 24 hours',
                'Wear long pants tucked into socks',
                'Stay on center of trails, avoid brush',
                'Use tick removal tweezers immediately if found'
            ]
        },
        {
            month: 'June 2026',
            title: '⚠️ Peak Nymph Activity',
            activity: 'Very High',
            description: 'Continued peak nymphal activity. Highest Lyme disease transmission month historically. Outdoor recreation = elevated exposure.',
            actions: [
                'Full-body tick checks essential',
                'Shower within 2 hours of being outdoors',
                'Tumble dry clothes on high heat for 10 minutes',
                'Monitor for early Lyme symptoms'
            ]
        },
        {
            month: 'July 2026',
            title: 'Adult Tick Activity Rises',
            activity: 'High',
            description: 'Adult ticks more prevalent and easier to spot. Nymph activity declining. Still significant disease transmission risk.',
            actions: [
                'Continue prevention measures',
                'Larger ticks easier to find and remove',
                'Maintain yard tick management',
                'Watch for bull\'s-eye rash (Lyme indicator)'
            ]
        },
        {
            month: 'August 2026',
            title: 'Summer Activity Continues',
            activity: 'Moderate-High',
            description: 'Adult tick season ongoing. Hot, dry conditions may slightly reduce activity in some areas, but ticks remain active in shaded, moist environments.',
            actions: [
                'Don\'t let guard down',
                'Focus checks on hairline, armpits, groin',
                'Keep pets protected',
                'Avoid sitting directly on ground or logs'
            ]
        },
        {
            month: 'September 2026',
            title: 'Fall Activity Surge',
            activity: 'Moderate-High',
            description: 'Adult deer ticks seeking final blood meal before winter. Hunters at elevated risk during deer season.',
            actions: [
                'Hunters: permethrin-treat all gear',
                'Do tick checks after apple picking, hiking',
                'Continue yard maintenance',
                'Prepare for late-season activity'
            ]
        },
        {
            month: 'October 2026',
            title: 'Late Season Activity',
            activity: 'Moderate',
            description: 'Adult tick activity continues in mild weather. Some nymphs may still be active early in month in southern regions.',
            actions: [
                'Leaf raking  = tick exposure risk',
                'Wear gloves when handling leaves',
                'Final yard cleanup before winter',
                'Tick checks still necessary'
            ]
        },
        {
            month: 'November 2026',
            title: 'Winter Slowdown Begins',
            activity: 'Low',
            description: 'Activity decreases significantly as temperatures drop, but adult Blacklegged ticks can be active on warm days.',
            actions: [
                'Tick checks on mild days (>45°F)',
                'Remove leaves from lawn perimeter',
                'Plan prevention strategy for 2027',
                'Review tick removal technique'
            ]
        },
        {
            month: 'December 2026',
            title: 'Winter Minimum',
            activity: 'Very Low',
            description: 'Lowest tick activity of the year, but not zero. Adult ticks can emerge during winter thaws. Ticks overwinter in leaf litter.',
            actions: [
                'Rare but possible on warm winter days',
                'Keep tick tweezers accessible year-round',
                'Educate family about 2027 season prep',
                'Review year\'s tick encounters'
            ]
        }
    ],

    nationalOverview: {
        title: 'What to Expect in 2026',
        summary: 'Based on current climate patterns and tick surveillance data, the 2026 tick season is projected to bring elevated activity across much of the United States. Recent years have shown consistent upward trends in tick populations and geographic expansion of multiple species. Climate forecasts suggest favorable conditions for tick development, particularly in the Northeast and Upper Midwest regions.',
        keyFactors: [
            {
                title: 'Climate Factors',
                points: [
                    'Winter forecast models suggest variable conditions across regions',
                    'Spring precipitation projected above average in key tick habitats',
                    'Recent 5-year trend shows extended tick active seasons',
                    'Climate change contributing to gradual northward range expansion'
                ]
            },
            {
                title: 'Population Dynamics',
                points: [
                    'Small mammal populations influence tick infection rates',
                    'Acorn mast cycles affect mouse breeding success',
                    'Deer populations stable to increasing in suburban areas',
                    'Asian Longhorned tick spreading to new counties'
                ]
            },
            {
                title: 'Geographic Trends',
                points: [
                    'Northeast: Very high activity projected',
                    'Lone Star tick expanding northward',
                    'Gulf Coast tick range expanding',
                    'Pacific Northwest Lyme risk increasing'
                ]
            }
        ]
    }
};

export default forecast2026;
