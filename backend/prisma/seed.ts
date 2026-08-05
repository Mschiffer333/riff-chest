import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genres = [
    'Metalcore',
    'Deathcore',
    'Heavy Metal',
    'Rock',
    'Pop',
    'Thrash Metal',
    'Nu Metal'
];

const tunings = [
    {
        name: 'Standard',
        numberStrings: 6,
        notes: 'E A D G B E'
    },
    {
        name: 'Eb Standard',
        numberStrings: 6,
        notes: 'Eb Ab Db Gb Bb Eb'
    },
    {
        name: 'Drop D',
        numberStrings: 6,
        notes: 'D A D G B E'
    },
    {
        name: 'D Standard',
        numberStrings: 6,
        notes: 'D G C F A D'
    },
    {
        name: 'Drop C',
        numberStrings: 6,
        notes: 'C G C F A D'
    },
    {
        name: 'C Standard',
        numberStrings: 6,
        notes: 'C F Bb Eb G C'
    },
    {
        name: 'Drop B',
        numberStrings: 6,
        notes: 'B F# B E G# C#'
    },
    {
        name: 'Drop A',
        numberStrings: 7,
        notes: 'A E A D G B E'
    },
    {
        name: 'B Standard',
        numberStrings: 7,
        notes: 'B E A D G B E'
    },
    {
        name: 'G# Standard',
        numberStrings: 7,
        notes: 'G# D# G# C# F# A# D#'
    },
    {
        name: 'F# Standard',
        numberStrings: 7,
        notes: 'F# C# F# B E G# C#'
    },
]

const guitars = [
    {
        brand: 'Jackson',
        model: 'Dinky X Series DKAF8',
        numberStrings: 7,
    },
    {
        brand: 'Fender',
        model: 'Stratocaster',
        numberStrings: 6,
    },
    {
        brand: 'Fender Classic Design',
        model: 'CD Series',
        numberStrings: 6,
    },
    {
        brand: 'Lyon by Washburn',
        model: 'Li15',
        numberStrings: 6,
    },
    {
        brand: 'Yamaha',
        model: 'C40',
        numberStrings: 6,
    },
]

async function main() {
    for (const genre of genres) {
        await prisma.genre.upsert({
            where: {
                name: genre,
            },
            update: {},
            create: {
                name: genre,
            }
        });
    }

    for (const tuning of tunings) {
        await prisma.tuning.upsert({
            where: {
                name: tuning.name
            },
            update: {},
            create: tuning,
        });
    }

    for (const guitar of guitars) {
        await prisma.guitar.upsert({
            where: {
                brand_model: {
                    brand: guitar.brand,
                    model: guitar.model
                },
            },
            update: {},
            create: guitar
        })
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })