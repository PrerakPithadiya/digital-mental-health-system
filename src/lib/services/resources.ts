import clientPromise from '@/lib/mongodb';
import type { Resource } from '@/lib/models/resource';
import { ObjectId } from 'mongodb';

const initialResources: Omit<Resource, '_id'>[] = [
    // Stress & Anxiety
    {
      category: 'Stress & Anxiety',
      subcategory: 'Articles & Guides',
      title: 'Tips to reduce stress',
      url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/',
      source: 'NHS',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Articles & Guides',
      title: 'Managing Stress',
      url: 'https://www.cdc.gov/mental-health/living-with/index.html',
      source: 'CDC',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Articles & Guides',
      title: 'Anxiety Disorders',
      url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
      source: 'National Institute of Mental Health (NIMH)',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Articles & Guides',
      title: 'How to manage and reduce stress',
      url: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress',
      source: 'Mental Health Foundation',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Articles & Guides',
      title: 'Stress Management',
      url: 'https://www.helpguide.org/mental-health/stress/stress-management',
      source: 'HelpGuide',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Articles & Guides',
      title: 'Top ways to reduce daily stress',
      url: 'https://www.health.harvard.edu/staying-healthy/top-ways-to-reduce-daily-stress',
      source: 'Harvard Health',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Tools & Apps',
      title: 'Stress relievers: Tips, tools, and techniques',
      url: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relievers/art-20047257',
      source: 'Mayo Clinic',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Tools & Apps',
      title: 'Stress management tools & resources',
      url: 'https://hr.umich.edu/benefits-wellness/health-well-being/mental-emotional-health/learn-more-about-mental-emotional-health/stress-management-resources/stress-management-tools-resources',
      source: 'University of Michigan',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Tools & Apps',
      title: 'Headspace (Mindfulness & Meditation App)',
      url: 'https://www.headspace.com',
      source: 'Headspace',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Support Organizations',
      title: 'Find Help',
      url: 'https://www.nimh.nih.gov/health/find-help',
      source: 'National Institute of Mental Health (NIMH)',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Support Organizations',
      title: 'WHO: Mental health',
      url: 'https://www.who.int/health-topics/mental-health',
      source: 'World Health Organization (WHO)',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Support Organizations',
      title: 'American Institute of Stress',
      url: 'https://www.stress.org',
      source: 'American Institute of Stress',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Support Organizations',
      title: 'Anxiety and Depression Association of America (ADAA)',
      url_id: 'adaa-org',
      url: 'https://adaa.org',
      source: 'ADAA',
    },
    {
      category: 'Stress & Anxiety',
      subcategory: 'Support Organizations',
      title: 'Mind (UK): Anxiety self-care',
      url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care/',
      source: 'Mind (UK)',
    },
  
    // Mindfulness
    {
      category: 'Mindfulness',
      subcategory: 'Articles & Guides',
      title: 'What is Mindfulness?',
      url: 'https://www.mindful.org/what-is-mindfulness/',
      source: 'Mindful.org',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Articles & Guides',
      title: 'Getting Started with Mindfulness',
      url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
      source: 'Mindful.org',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Articles & Guides',
      title: 'How to Practice Mindfulness Meditation',
      url: 'https://www.nytimes.com/guides/well/how-to-meditate',
      source: 'The New York Times',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Articles & Guides',
      title: 'Mindfulness Exercises',
      url: 'https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/mindfulness-exercises/art-20046356',
      source: 'Mayo Clinic',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Apps & Tools',
      title: 'UCLA Mindful App',
      url: 'https://www.uclahealth.org/mindful',
      source: 'Free Guided Meditations (App)',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Apps & Tools',
      title: 'Headspace App',
      url: 'https://www.headspace.com/',
      source: 'Guided Meditation (App)',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Apps & Tools',
      title: 'Calm App',
      url: 'https://www.calm.com/',
      source: 'Meditation & Sleep (App)',
    },
    {
      category: 'Mindfulness',
      subcategory: 'Apps & Tools',
      title: 'The Free Mindfulness Project',
      url: 'https://www.freemindfulness.org/download',
      source: 'Free Guided Meditations (Audio)',
    },
  
    // Self-Care
    {
      category: 'Self-Care',
      subcategory: 'Articles & Guides',
      title: 'The Importance of Sleep for Mental Health',
      url: 'https://www.sleepfoundation.org/mental-health',
      source: 'Sleep Foundation',
    },
    {
      category: 'Self-Care',
      subcategory: 'Articles & Guides',
      title: 'How to Build a Self-Care Plan',
      url: 'https://www.mentalhealthfirstaid.org/2020/07/how-to-create-a-self-care-plan/',
      source: 'Mental Health First Aid',
    },
    {
      category: 'Self-Care',
      subcategory: 'Articles & Guides',
      title: 'The Connection Between Diet and Mental Wellness',
      url: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/food-and-mood/',
      source: 'Mind UK',
    },
    {
      category: 'Self-Care',
      subcategory: 'Tools & Challenges',
      title: '7-Day Self-Care Challenge',
      url: 'https://www.verywellmind.com/self-care-challenge-4845517',
      source: 'Verywell Mind',
    },
  
    // Personal Stories
    {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Browse Personal Stories from ADAA',
      url: 'https://adaa.org/living-with-anxiety/personal-stories/all-stories',
      source: 'Anxiety and Depression Association of America',
    },
    {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Mental Health Stories to Inspire You',
      url: 'https://www.beyondblue.org.au/mental-health/personal-stories',
      source: 'Beyond Blue (Australia)',
    },
    {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'NAMI: Personal Stories Blog',
      url: 'https://www.nami.org/blogs/personal-stories/',
      source: 'National Alliance on Mental Illness',
    },
    {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Stories of Lived Experience',
      url: 'https://www.blackdoginstitute.org.au/resources-support/personal-stories/',
      source: 'Black Dog Institute',
    },
    {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Overcoming anxiety: Three powerful stories',
      url: 'https://www.aia.com/en/health-wellness/healthy-living/healthy-mind/Overcoming-anxiety',
      source: 'AIA',
    },
];

async function getDb() {
  const client = await clientPromise;
  return client.db();
}

export async function getResourcesCollection() {
    const db = await getDb();
    return db.collection<Resource>('resources');
}

export async function seedResources() {
    try {
        const collection = await getResourcesCollection();
        const count = await collection.countDocuments();
        if (count === 0) {
            console.log('Seeding resources collection...');
            await collection.insertMany(initialResources as any[]);
            console.log('Seeding complete.');
        }
    } catch (e) {
        console.warn('Could not connect to the database. Skipping seeding.');
    }
}

export async function getResources(): Promise<Resource[]> {
    try {
        const collection = await getResourcesCollection();
        // The `_id` is a BSON object from MongoDB, we need to convert it to a string
        const resources = await collection.find({}).toArray();
        return resources.map(r => ({ ...r, _id: r._id.toString() })) as unknown as Resource[];
    } catch (e) {
         console.warn('Could not connect to the database. Returning initial hardcoded resources.');
         return initialResources.map(r => ({ ...r, _id: new ObjectId() })) as Resource[];
    }
}
