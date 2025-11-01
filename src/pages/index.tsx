import Layout from '@theme/Layout';
import Features from './features';
import Header from './header';
// import Pricing from './pricing';

export default function Home() {
  return (
    <Layout
      title={`Coffee Shop Management System`}
      description="A modern, full-featured Coffee Shop Management System built with Laravel 12 and Livewire 3"
    >
      <main className="relative">
        <div className="absolute -top-80 left-[50%] z-[999] size-[300px] translate-x-[-50%] rounded-full bg-white/60 blur-[100px] dark:bg-indigo-500"></div>
        <div className="container mx-auto space-y-10 py-10">
          <Header />
          <Features />
          {/* <Pricing /> */}
          {/* <Contributors /> */}
          {/* <Testimonial /> */}
        </div>
      </main>
    </Layout>
  );
}
