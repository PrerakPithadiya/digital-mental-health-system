import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  BookOpen,
  BrainCircuit,
  ExternalLink,
  HeartHandshake,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/page-header';

const resources = {
  stress: {
    articles: [
      {
        title: 'Tips to reduce stress',
        url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/',
        source: 'NHS',
      },
      {
        title: 'Managing Stress',
        url: 'https://www.cdc.gov/mental-health/living-with/index.html',
        source: 'CDC',
      },
      {
        title: 'Anxiety Disorders',
        url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        source: 'National Institute of Mental Health (NIMH)',
      },
      {
        title: 'How to manage and reduce stress',
        url: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress',
        source: 'Mental Health Foundation',
      },
      {
        title: 'Stress Management',
        url: 'https://www.helpguide.org/mental-health/stress/stress-management',
        source: 'HelpGuide',
      },
      {
        title: 'Top ways to reduce daily stress',
        url: 'https://www.health.harvard.edu/staying-healthy/top-ways-to-reduce-daily-stress',
        source: 'Harvard Health',
      },
    ],
    tools: [
      {
        title: 'Stress relievers: Tips, tools, and techniques',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relievers/art-20047257',
        source: 'Mayo Clinic',
      },
      {
        title: 'Stress management tools & resources',
        url: 'https://hr.umich.edu/benefits-wellness/health-well-being/mental-emotional-health/learn-more-about-mental-emotional-health/stress-management-resources/stress-management-tools-resources',
        source: 'University of Michigan',
      },
      {
        title: 'Headspace (Mindfulness & Meditation App)',
        url: 'https://www.headspace.com',
        source: 'Headspace',
      },
    ],
    organizations: [
      {
        title: 'Find Help',
        url: 'https://www.nimh.nih.gov/health/find-help',
        source: 'National Institute of Mental Health (NIMH)',
      },
      {
        title: 'WHO: Mental health',
        url: 'https://www.who.int/health-topics/mental-health',
        source: 'World Health Organization (WHO)',
      },
      {
        title: 'American Institute of Stress',
        url: 'https://www.stress.org',
        source: 'American Institute of Stress',
      },
      {
        title: 'Anxiety and Depression Association of America (ADAA)',
        url: 'https://adaa.org',
        source: 'ADAA',
      },
      {
        title: 'Mind (UK): Anxiety self-care',
        url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care/',
        source: 'Mind (UK)',
      },
    ],
  },
  mindfulness: {
    articles: [
      {
        title: 'What is Mindfulness?',
        url: 'https://www.mindful.org/what-is-mindfulness/',
        source: 'Mindful.org',
      },
      {
        title: 'How to Practice Mindfulness Meditation',
        url: 'https://www.nytimes.com/guides/well/how-to-meditate',
        source: 'The New York Times',
      },
    ],
    tools: [
      {
        title: 'Headspace App',
        url: 'https://www.headspace.com/',
        source: 'Guided Meditation App',
      },
      {
        title: 'Calm App',
        url: 'https://www.calm.com/',
        source: 'Meditation & Sleep App',
      },
       {
        title: 'UCLA Mindful App',
        url: 'https://www.uclahealth.org/mindful',
        source: 'Free Guided Meditations',
      },
    ],
  },
  selfCare: {
     articles: [
      {
        title: 'The Importance of Sleep for Mental Health',
        url: 'https://www.sleepfoundation.org/mental-health',
        source: 'Sleep Foundation',
      },
       {
        title: 'How to Build a Self-Care Plan',
        url: 'https://www.mentalhealthfirstaid.org/2020/07/how-to-create-a-self-care-plan/',
        source: 'Mental Health First Aid',
      },
      {
        title: 'The Connection Between Diet and Mental Wellness',
        url: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/food-and-mood/',
        source: 'Mind UK',
      },
    ],
    tools: [
       {
        title: '7-Day Self-Care Challenge',
        url: 'https://www.verywellmind.com/self-care-challenge-4845517',
        source: 'Verywell Mind',
      },
    ],
  },
  professionalHelp: {
     articles: [
      {
        title: 'How to Find the Right Therapist',
        url: 'https://www.psychologytoday.com/us/basics/therapy/how-find-the-right-therapist',
        source: 'Psychology Today',
      },
       {
        title: "What to Expect in Your First Therapy Session",
        url: 'https://www.verywellmind.com/what-to-expect-in-your-first-therapy-session-2795744',
        source: 'Verywell Mind',
      },
    ],
    organizations: [
       {
        title: 'National Alliance on Mental Illness (NAMI)',
        url: 'https://www.nami.org',
        source: 'Support & Education',
      },
       {
        title: 'The Jed Foundation (JED)',
        url: 'https://www.jedfoundation.org/',
        source: 'Protecting student mental health',
      },
      {
        title: 'Psychology Today Therapist Finder',
        url: 'https://www.psychologytoday.com/us/therapists',
        source: 'Find a therapist near you',
      },
    ],
  },
};

const ResourceLink = ({
  url,
  title,
  source,
}: {
  url: string;
  title: string;
  source: string;
}) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted"
  >
    <div>
      <p className="font-medium text-primary">{title}</p>
      <p className="text-sm text-muted-foreground">{source}</p>
    </div>
    <ExternalLink className="h-5 w-5 text-muted-foreground" />
  </Link>
);

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader
        title="Resource Hub"
        description="Explore articles, tools, and organizations to support your mental wellness journey."
      />
      <Alert className="mb-8 bg-background">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          This information is for educational purposes only and is not a substitute
          for professional medical advice. If you are in crisis, please seek
          immediate help from a qualified professional or use our{' '}
          <Link href="/urgent-support" className="underline font-semibold">
            Urgent Support
          </Link>{' '}
          page.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="stress" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="stress" className="py-2">
            <BrainCircuit className="mr-2" /> Stress & Anxiety
          </TabsTrigger>
          <TabsTrigger value="mindfulness" className="py-2">
            <Sparkles className="mr-2" /> Mindfulness
          </TabsTrigger>
          <TabsTrigger value="self-care" className="py-2">
            <HeartHandshake className="mr-2" /> Self-Care
          </TabsTrigger>
          <TabsTrigger value="professional-help" className="py-2">
            <Users className="mr-2" /> Professional Help
          </TabsTrigger>
        </TabsList>

        <Card className="mt-4">
          <CardContent className="p-6">
            <TabsContent value="stress">
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                      <BookOpen className="mr-2 text-primary" /> Articles & Guides
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.stress.articles.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">
                      <Sparkles className="mr-2 text-primary" /> Tools & Exercises
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.stress.tools.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-3" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Users className="mr-2 text-primary" /> Organizations
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.stress.organizations.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TabsContent>

            <TabsContent value="mindfulness">
               <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                       <BookOpen className="mr-2 text-primary" /> Articles & Guides
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.mindfulness.articles.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Sparkles className="mr-2 text-primary" /> Apps & Tools
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.mindfulness.tools.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TabsContent>

            <TabsContent value="self-care">
              <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                      <BookOpen className="mr-2 text-primary" /> Articles & Guides
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.selfCare.articles.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Sparkles className="mr-2 text-primary" /> Tools & Challenges
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.selfCare.tools.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TabsContent>
            
            <TabsContent value="professional-help">
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                      <BookOpen className="mr-2 text-primary" /> Articles & Guides
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.professionalHelp.articles.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Users className="mr-2 text-primary" /> Organizations & Directories
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {resources.professionalHelp.organizations.map((item) => (
                        <ResourceLink key={item.url} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TabsContent>

          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
