import ClientWrapper from '@/components/ClientWrapper';
import HeaderWithTimer from '@/components/HeaderWithTimer';
import ImageWithGradient from '@/components/ImageWithGradient';
import Modal from '@/components/Modal';
import { getSubscriptions } from '@/services/api';

export default async function Home() {
  const subscriptions = await getSubscriptions();

  return (
    <main className="min-h-screen">
      <HeaderWithTimer />
      <h1 className="ml-5 mt-5 font-rubik text-2xl font-bold uppercase leading-tight tracking-tight text-[#2D3242] sm:text-center md:mt-7 md:text-4xl">
        Выберите подходящий тарифный план
      </h1>
      <section className="my-5 flex flex-col items-center justify-center gap-2.5 lg:my-24 lg:flex-row lg:items-start lg:gap-20">
        <ImageWithGradient />
        <ClientWrapper subscriptions={subscriptions} />
      </section>
      <Modal subscriptions={subscriptions} />
    </main>
  );
}
