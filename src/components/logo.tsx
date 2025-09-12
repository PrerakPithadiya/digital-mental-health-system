import { Leaf } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="p-2 bg-accent/20 rounded-lg">
        <Leaf className="h-6 w-6 text-accent" />
      </div>
      <span className="font-headline text-xl font-semibold text-foreground">
        WellSpring
      </span>
    </div>
  );
}
