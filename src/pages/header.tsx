import { BorderBeam } from '@site/src/components/magicui/border-beam';
import { WordRotate } from '@site/src/components/magicui/word-rotate';
import { Button } from '@site/src/components/ui/button';
import { cn } from '@site/src/lib/utils';
import { CoffeeIcon, DatabaseIcon, TerminalIcon, Package, Users, TrendingUp } from 'lucide-react';
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
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <CoffeeIcon className="size-12 text-primary" />
          <h1 className="text-[70px] font-bold text-primary">Coamifee</h1>
        </div>
        <p className="text-xl text-muted-foreground">By Koamishin Studios</p>
      </div>

      <div className="mb-4 text-center">
        <WordRotate className="text-4xl font-bold text-primary" words={['Open Source', 'Self-Hosted', 'Professional']} />
        <p className="mt-2 text-2xl text-foreground">Coffee Shop Management System</p>
      </div>

      <p className="mb-8 max-w-2xl text-center text-lg text-muted-foreground">
        A comprehensive solution for managing coffee shops, built with modern web technologies. Take control of your business with powerful tools for
        point of sale, inventory management, and customer analytics.
      </p>

      <div className="mb-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
          <TerminalIcon className="mb-3 size-10 text-primary" />
          <h3 className="mb-2 text-lg font-semibold">POS System</h3>
          <p className="text-center text-sm text-muted-foreground">Touch-friendly order processing with intuitive interface</p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
          <DatabaseIcon className="mb-3 size-10 text-primary" />
          <h3 className="mb-2 text-lg font-semibold">Inventory</h3>
          <p className="text-center text-sm text-muted-foreground">Real-time stock tracking and automated alerts</p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
          <Users className="mb-3 size-10 text-primary" />
          <h3 className="mb-2 text-lg font-semibold">Customer Management</h3>
          <p className="text-center text-sm text-muted-foreground">Loyalty programs and customer insights</p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
          <TrendingUp className="mb-3 size-10 text-primary" />
          <h3 className="mb-2 text-lg font-semibold">Analytics</h3>
          <p className="text-center text-sm text-muted-foreground">Comprehensive business insights and reporting</p>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          <Package className="size-4" />
          Built with Laravel 12 & Livewire 3
        </div>
      </div>

      <div
        className={cn(
          'relative mt-6 max-h-[480px] overflow-hidden rounded-[12px] border border-border bg-contain bg-center shadow-lg',
          'bg-[url(/img/overview-light.png)]',
          'dark:bg-[url(/img/overview-dark.png)]',
        )}
      >
        <img src="/img/overview-light.png" alt="Coffee Shop Management System Dashboard" className="max-h-[480px] bg-no-repeat opacity-0" />
        <BorderBeam size={200} />
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button size="lg" onClick={() => (window.location.href = '/docs/getting-started/introduction')} className="w-full sm:w-auto">
          <TerminalIcon className="mr-2 !size-5" />
          Quick Start Guide
        </Button>
        <Button size="lg" variant="secondary" onClick={() => window.open('https://github.com')} className="w-full sm:w-auto">
          <CoffeeIcon className="mr-2 !size-5" />
          View on GitHub
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">🎉 Completely free and open source • No vendor lock-in • Full control over your data</p>
      </div>
    </header>
  );
}
