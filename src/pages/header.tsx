import { BorderBeam } from '@site/src/components/magicui/border-beam';
import { WordRotate } from '@site/src/components/magicui/word-rotate';
import { Button } from '@site/src/components/ui/button';
import { cn } from '@site/src/lib/utils';
import { CoffeeIcon, DatabaseIcon, TerminalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedVersion = localStorage.getItem('docs-preferred-version-default');
      setVersion(storedVersion);
    }
  }, []);

  return (
    <header className="container relative flex flex-col items-center justify-center">
      <div className="mb-4 flex items-center gap-2">
        <CoffeeIcon className="size-10 text-primary" />
        <h1 className="text-[60px] font-bold text-primary">Coffee Shop Management</h1>
      </div>
      <WordRotate className="mb-0 text-3xl font-semibold text-primary" words={['Modern', 'Full-Featured', 'Professional']} />
      <p className="mb-6 text-3xl text-foreground">Built with Laravel 12 & Livewire 3</p>

      <div className="mb-8 grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-lg border border-border p-4">
          <TerminalIcon className="mb-2 size-8 text-primary" />
          <h3 className="text-lg font-semibold">POS System</h3>
          <p className="text-center text-sm text-muted-foreground">Touch-friendly order processing</p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-border p-4">
          <DatabaseIcon className="mb-2 size-8 text-primary" />
          <h3 className="text-lg font-semibold">Inventory</h3>
          <p className="text-center text-sm text-muted-foreground">Real-time stock tracking</p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-border p-4">
          <CoffeeIcon className="mb-2 size-8 text-primary" />
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-center text-sm text-muted-foreground">Business insights</p>
        </div>
      </div>

      <div
        className={cn(
          'relative mt-4 max-h-[480px] overflow-hidden rounded-[12px] border border-border bg-contain bg-center shadow-lg',
          version === '2.x' ? 'bg-[url(/img/services-light.png)]' : 'bg-[url(/img/overview-light.png)]',
          version === '2.x' ? 'dark:bg-[url(/img/services-dark.png)]' : 'dark:bg-[url(/img/overview-dark.png)]',
        )}
      >
        <img
          src={version === '2.x' ? '/img/services-light.png' : '/img/overview-light.png'}
          alt="Coffee Shop Management System"
          className="max-h-[480px] bg-no-repeat opacity-0"
        />
        <BorderBeam size={200} />
      </div>

      <div className="mt-10 flex items-center gap-2">
        <Button size="lg" onClick={() => (window.location.href = '/docs/getting-started/introduction')}>
          <TerminalIcon className="!size-5" />
          Quick Start Guide
        </Button>
        <Button size="lg" variant="secondary" onClick={() => window.open('https://github.com')}>
          <CoffeeIcon className="!size-5" />
          View on GitHub
        </Button>
      </div>
    </header>
  );
}
