let categories = ['Suppen', 'Salate', 'Hauptspeisen', 'Desserts'];

let dishes = [ 
    {
        'name': 'Würzige Kichererbsenpfanne',
        'description': 'Scharfe Kichererbsenpfanne mit Zucchini und Melanzani. (Vegetarisch)',
        'price': 8.90,
        //'extras': {
        // 'name': '',
        // 'extraPrice': ,
        // },
        'category': 2
    },
    {
        'name': 'Chili - Tomatensuppe',
        'description': 'Tomatensuppe mit Pfiff.',
        'price': 4.60,
        // 'extras': {
        //     'name': '',
        //     'extraPrice': ,
        // },
        'category': 0
    },
    {
        'name': 'Scharfe Zitronenspaghetti mit Garnelen',
        'description': 'Teigwaren mit pfeffriger Zitronen - Frischkäsesauce, Cayennepfeffer und Garnelen.',
        'price': 8.50,
        // 'extras': {},
        'category': 2
    },
    {
        'name': 'Tex-Mex Chili mit Bohnen',
        'description': 'Traditionelles Tex-Mex Chili mit Rindfleisch und Bohnen.',
        'price': 14.9,
        //  'extras': {},
        'category': 2
    },
    {
        'name': 'Höllische Limonensuppe',
        'description': 'Erfrischende, würzige Suppe mit Limonen, Zitronengras, Kokosmilch, Gurken und Chili.',
        'price': 4.90,
        //  'extras': {},
        'category': 0
    },
    {
        'name': 'Schokoladenmousse mit Chili',
        'description': 'Dunkle Schokolade mit Chili, die perfekte Kombination.',
        'price': 7.8,
        //'extras': {},
        'category': 3
    },
    {
        'name': 'Vanilleeis mit Kürbiskernöl',
        'description': 'Ein bodenständiger, steirischer Klassiker.',
        'price': 4.30,
        //'extras': {},
        'category': 3
    },
    {
        'name': 'Oma Aloisias Apfelstrudel',
        'description': 'Traditioneller handgezogener Apfelstrudel. Ein Klassiker, aber mit einem würzigen Twist.',
        'price': 5.9,
        //'extras': {},
        'category': 3
    },
    {
        'name': 'Teuflisch scharfer Mangosalat',
        'description': 'Thai- inspirierter Salat mit Erdnüssen, Garnelen und Mangos.',
        'price': 6.90,
        //'extras': {},
        'category': 1
    },
];

// besser:
// let menu = [
//     {
//         'category': 'soups',
//         'dishes': [
//             { },
//             { },
//         ],
//     }.
// ]