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
        subcategory: 'Physical Self-Care',
        title: 'The Importance of Sleep for Mental Health',
        url: 'https://www.sleepfoundation.org/mental-health',
        source: 'Sleep Foundation',
    },
    {
        category: 'Self-Care',
        subcategory: 'Physical Self-Care',
        title: 'Why Exercise is So Important for Mental Health',
        url: 'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm',
        source: 'HelpGuide',
    },
    {
        category: 'Self-Care',
        subcategory: 'Emotional Self-Care',
        title: 'Emotional Self-Care: 10 Ways to Nurture Your Inner World',
        url: 'https://www.psychologytoday.com/us/blog/click-here-for-happiness/201812/emotional-self-care-10-ways-nurture-your-inner-world',
        source: 'Psychology Today',
    },
    {
        category: 'Self-Care',
        subcategory: 'Emotional Self-Care',
        title: 'How to Journal for Self-Improvement',
        url: 'https://www.healthline.com/health/how-to-journal',
        source: 'Healthline',
    },
    {
        category: 'Self-Care',
        subcategory: 'Mental & Psychological Self-Care',
        title: 'How to Do a Digital Detox',
        url: 'https://www.verywellmind.com/how-to-do-a-digital-detox-4691452',
        source: 'Verywell Mind',
    },
    {
        category: 'Self-Care',
        subcategory: 'Mental & Psychological Self-Care',
        title: 'Caring for Your Mental Health',
        url: 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health',
        source: 'NIMH',
    },
    {
        category: 'Self-Care',
        subcategory: 'Social Self-Care',
        title: 'How to Build a Social Support Network',
        url: 'https://www.verywellmind.com/how-to-build-a-strong-social-support-network-3144865',
        source: 'Verywell Mind',
    },
    {
        category: 'Self-Care',
        subcategory: 'Social Self-Care',
        title: 'How to Set Healthy Boundaries',
        url: 'https://www.healthline.com/health/mental-health/set-boundaries',
        source: 'Healthline',
    },
    {
        category: 'Self-Care',
        subcategory: 'Spiritual Self-Care',
        title: 'How Spending Time in Nature Benefits Your Health',
        url: 'https://www.health.harvard.edu/blog/health-benefits-of-taking-a-walk-outside-202303212905',
        source: 'Harvard Health',
    },
    {
        category: 'Self-Care',
        subcategory: 'Spiritual Self-Care',
        title: 'How to Practice Gratitude',
        url: 'https://greatergood.berkeley.edu/article/item/how_to_practice_gratitude',
        source: 'Greater Good Science Center',
    },
    {
        category: 'Self-Care',
        subcategory: 'Practical & Professional Self-Care',
        title: 'How to Create a Self-Care Plan',
        url: 'https://www.mentalhealthfirstaid.org/2020/07/how-to-create-a-self-care-plan/',
        source: 'Mental Health First Aid',
    },
    {
        category: 'Self-Care',
        subcategory: 'Practical & Professional Self-Care',
        title: 'How to Achieve a Better Work-Life Balance',
        url: 'https://www.forbes.com/advisor/business/work-life-balance/',
        source: 'Forbes',
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
      title: 'Living with Bipolar 1 Disorder (BP1D)',
      url: 'https://adaa.org/living-with-anxiety/personal-stories/diagnosed-38-living-bipolar-1-disorder-bp1d',
      source: 'ADAA',
    },
     {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Shame, Storytelling & My Journey Living with OCD',
      url: 'https://adaa.org/living-with-anxiety/personal-stories/shame-storytelling-my-journey-living-ocd',
      source: 'ADAA',
    },
     {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Surviving and Thriving - Turning Trauma into Fuel',
      url: 'https://adaa.org/living-with-anxiety/personal-stories/surviving-thriving-turning-trauma-fuel',
      source: 'ADAA',
    },
     {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'Living Beyond Anxiety',
      url: 'https://adaa.org/living-with-anxiety/personal-stories/living-beyond-anxiety',
      source: 'ADAA',
    },
    {
      category: 'Personal Stories',
      subcategory: 'Testimonials',
      title: 'The Silence Within',
      url: 'https://adaa.org/living-with-anxiety/personal-stories/the-silence-within',
      source: 'ADAA',
    }
];

async function getDb() {
  try {
    const client = await clientPromise;
    return client.db();
  } catch (e) {
    console.warn('Could not connect to the database. Database features will be unavailable.');
    return null;
  }
}

export async function getResourcesCollection() {
    const db = await getDb();
    if (!db) return null;
    return db.collection<Resource>('resources');
}

export async function seedResources() {
    try {
        const collection = await getResourcesCollection();
        if (!collection) {
            console.warn('Database not available. Skipping seeding.');
            return;
        }
        const count = await collection.countDocuments();
        if (count === 0) {
            console.log('Seeding resources collection...');
            await collection.insertMany(initialResources as any[]);
            console.log('Seeding complete.');
        }
    } catch (e) {
        console.error('Error seeding resources:', e);
    }
}

export async function getResources(): Promise<Resource[]> {
    try {
        const collection = await getResourcesCollection();
        if (!collection) {
            console.warn('Could not connect to the database. Returning initial hardcoded resources.');
            return initialResources.map(r => ({ ...r, _id: new ObjectId() })) as Resource[];
        }
        const resources = await collection.find({}).toArray();
        return resources.map(r => ({ ...r, _id: r._id.toString() })) as unknown as Resource[];
    } catch (e) {
         console.warn('Could not connect to the database. Returning initial hardcoded resources.');
         return initialResources.map(r => ({ ...r, _id: new ObjectId() })) as Resource[];
    }
}
