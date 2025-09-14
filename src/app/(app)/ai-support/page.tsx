import PageHeader from '@/components/page-header';
import AiChat from './chat-ui';

export default function AiSupportPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI-Guided First-Aid"
        description="I'm a friendly AI assistant here to help. Describe what you're feeling, and I can offer some initial guidance and coping strategies. This is a safe and confidential space."
      />
      <div className="flex-1 min-h-0">
         <AiChat />
      </div>
    </div>
  );
}
