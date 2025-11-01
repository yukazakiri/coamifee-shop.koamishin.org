import { MagicCard } from '@site/src/components/magicui/magic-card';
import {
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  BarChart3Icon,
  ShieldIcon,
  SmartphoneIcon,
  ZapIcon,
  SettingsIcon,
  CoffeeIcon,
  CreditCardIcon,
  TrendingUpIcon,
  LockIcon,
  ClockIcon,
  HeadphonesIcon,
  FileTextIcon,
  GlobeIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: ReactNode }) {
  return (
    <MagicCard className="rounded-lg p-5" gradientColor="#89898940" gradientFrom="#9E7AFF" gradientTo="#4F45E5">
      <div>
        <div className="text-primary">{icon}</div>
        <h2 className="mt-2 text-xl text-foreground">{title}</h2>
        <p className="mb-0 text-muted-foreground">{description}</p>
      </div>
    </MagicCard>
  );
}

export default function Features(): ReactNode {
  return (
    <div className="py-10">
      <h2 className="text-center text-4xl">Features</h2>
      <p className="text-center text-lg text-muted-foreground">Comprehensive management for your coffee shop</p>
      
      <div className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">🛒 Core Operations</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FeatureCard 
            title="Product Management" 
            description="Complete inventory tracking with categories and variants" 
            icon={<PackageIcon size={32} />} 
          />
          <FeatureCard 
            title="Point of Sale (POS)" 
            description="Touch-friendly interface for quick order processing" 
            icon={<ShoppingCartIcon size={32} />} 
          />
          <FeatureCard 
            title="Order Management" 
            description="Real-time order tracking and status updates" 
            icon={<ClockIcon size={32} />} 
          />
          <FeatureCard 
            title="Customer Management" 
            description="Customer profiles, order history, and loyalty programs" 
            icon={<UsersIcon size={32} />} 
          />
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">📊 Business Intelligence</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FeatureCard 
            title="Analytics Dashboard" 
            description="Sales reports, popular products, and trend analysis" 
            icon={<BarChart3Icon size={32} />} 
          />
          <FeatureCard 
            title="Inventory Insights" 
            description="Stock level monitoring and automated alerts" 
            icon={<TrendingUpIcon size={32} />} 
          />
          <FeatureCard 
            title="Customer Analytics" 
            description="Purchase patterns and preferences tracking" 
            icon={<UsersIcon size={32} />} 
          />
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">🔧 Administration</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FeatureCard 
            title="Filament Admin Panel" 
            description="Beautiful, intuitive admin interface" 
            icon={<SettingsIcon size={32} />} 
          />
          <FeatureCard 
            title="Role-Based Access" 
            description="Granular permissions for admin, barista, and manager roles" 
            icon={<ShieldIcon size={32} />} 
          />
          <FeatureCard 
            title="System Configuration" 
            description="Flexible settings for business operations" 
            icon={<SettingsIcon size={32} />} 
          />
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">🎨 User Experience</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FeatureCard 
            title="Responsive Design" 
            description="Works seamlessly on desktop, tablet, and mobile" 
            icon={<SmartphoneIcon size={32} />} 
          />
          <FeatureCard 
            title="Real-Time Updates" 
            description="Live order status and inventory changes" 
            icon={<ZapIcon size={32} />} 
          />
          <FeatureCard 
            title="Modern UI" 
            description="Built with Tailwind CSS for a clean, professional look" 
            icon={<CoffeeIcon size={32} />} 
          />
          <FeatureCard 
            title="Payment Processing" 
            description="Multiple payment options and secure transactions" 
            icon={<CreditCardIcon size={32} />} 
          />
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-2xl font-semibold text-center mb-6">⚡ Technology Stack</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FeatureCard 
            title="Laravel 12" 
            description="Modern PHP framework for robust backend development" 
            icon={<PackageIcon size={32} />} 
          />
          <FeatureCard 
            title="Livewire 3" 
            description="Dynamic interfaces without writing JavaScript" 
            icon={<ZapIcon size={32} />} 
          />
          <FeatureCard 
            title="Tailwind CSS 4" 
            description="Utility-first CSS framework for rapid UI development" 
            icon={<FileTextIcon size={32} />} 
          />
          <FeatureCard 
            title="PostgreSQL" 
            description="Powerful relational database for data management" 
            icon={<PackageIcon size={32} />} 
          />
        </div>
      </div>
    </div>
  );
}
