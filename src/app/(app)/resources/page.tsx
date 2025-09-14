import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  BookOpen,
  BrainCircuit,
  ExternalLink,
  HeartHandshake,
  Quote,
  Sparkles,
  Users,
  HeartPulse,
  Scale,
  Briefcase,
  Smile,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/page-header';
import { getResources, seedResources } from '@/lib/services/resources';
import { Resource, ResourceCategory } from '@/lib/models/resource';

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

const groupResourcesByCategory = (resources: Resource[]) => {
  return resources.reduce((acc, resource) => {
    const { category, subcategory } = resource;
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }
    acc[category][subcategory].push(resource);
    return acc;
  }, {} as Record<ResourceCategory, Record<string, Resource[]>>);
};


export default async function ResourcesPage() {
  await seedResources(); // This will seed the DB only if it's empty
  const resources = await getResources();
  const groupedResources = groupResourcesByCategory(resources);

  const stressResources = groupedResources['Stress & Anxiety'] || {};
  const mindfulnessResources = groupedResources['Mindfulness'] || {};
  const selfCareResources = groupedResources['Self-Care'] || {};
  const storiesResources = groupedResources['Personal Stories'] || {};

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
          <TabsTrigger value="stories" className="py-2">
            <Quote className="mr-2" /> Personal Stories
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
                      {stressResources['Articles & Guides']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">
                      <Sparkles className="mr-2 text-primary" /> Tools & Apps
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {stressResources['Tools & Apps']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-3" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Users className="mr-2 text-primary" /> Support Organizations
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {stressResources['Support Organizations']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
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
                      {mindfulnessResources['Articles & Guides']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Sparkles className="mr-2 text-primary" /> Apps & Tools
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {mindfulnessResources['Apps & Tools']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TabsContent>

            <TabsContent value="self-care">
              <div className="prose prose-stone max-w-none dark:prose-invert mb-6">
                <p>
                  Self-care is the foundation of a healthy and balanced life. It involves intentionally taking actions to care for your physical, emotional, mental, social, and spiritual well-being. Prioritizing self-care empowers individuals to manage stress, maintain resilience, and foster overall happiness. Self-care is not a luxury but a necessity that supports your ability to function optimally in daily life and enhances your capacity to care for others.
                </p>
                <p>
                  At its core, self-care encompasses a variety of practices such as nourishing your body with nutritious foods, getting sufficient restful sleep, engaging in regular physical activity, and attending to personal hygiene. Emotional self-care encourages recognizing and expressing feelings in a healthy way, seeking support when needed, and cultivating positive coping mechanisms. Mental self-care includes activities like mindfulness, learning, and digital balance to keep the mind sharp, focused, and calm.
                </p>
                <p>
                  Social self-care involves nurturing meaningful relationships, setting boundaries, and building supportive networks that foster connection and belonging. Spiritual self-care connects you to your inner values and purpose—whether through meditation, prayer, nature, or personal reflection—bringing peace and grounding to life’s challenges. Practical self-care ensures your responsibilities, time, and environment are managed in ways that reduce stress and promote stability.
                </p>
                <p>
                  Incorporating self-care into your daily routine is a personal journey and can take many forms depending on your needs and lifestyle. Regularly checking in with yourself to assess what you need physically, emotionally, and mentally can guide you to effective choices. Remember, even small acts of self-care—like taking a deep breath, enjoying a hobby, or asking for help—can create profound positive effects.
                </p>
                <p>
                  Commit to self-care as a vital part of your well-being. It is not only about preventing burnout and illness but also about enriching your life, enhancing your relationships, and unlocking your fullest potential. Prioritize yourself with kindness, intention, and consistency, and watch as your overall health and happiness flourish.
                </p>
              </div>
              <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                      <HeartPulse className="mr-2 text-primary" /> Physical Self-Care
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {selfCareResources['Physical Self-Care']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">
                      <Smile className="mr-2 text-primary" /> Emotional Self-Care
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {selfCareResources['Emotional Self-Care']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold">
                      <BrainCircuit className="mr-2 text-primary" /> Mental & Psychological Self-Care
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {selfCareResources['Mental & Psychological Self-Care']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold">
                      <Users className="mr-2 text-primary" /> Social Self-Care
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {selfCareResources['Social Self-Care']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-semibold">
                      <Leaf className="mr-2 text-primary" /> Spiritual Self-Care
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {selfCareResources['Spiritual Self-Care']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6" className="border-b-0">
                    <AccordionTrigger className="text-lg font-semibold">
                      <Briefcase className="mr-2 text-primary" /> Practical & Professional Self-Care
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {selfCareResources['Practical & Professional Self-Care']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TabsContent>

            <TabsContent value="stories">
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1" className='border-b-0'>
                    <AccordionTrigger className="text-lg font-semibold">
                      <Quote className="mr-2 text-primary" /> Personal Stories & Testimonials
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-2">
                      {storiesResources['Testimonials']?.map((item) => (
                        <ResourceLink key={item._id?.toString()} {...item} />
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
