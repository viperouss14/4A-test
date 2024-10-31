import ClientWrapper from "@/components/ClientWrapper";
import HeaderWithTimer from "@/components/HeaderWithTimer";
import ImageWithGradient from "@/components/ImageWithGradient";
import Modal from "@/components/Modal";
import { getSubscriptions } from "@/services/api";

export default async function Home() {
  const subscriptions = await getSubscriptions();

  return (
    <main className="min-h-screen">
      <HeaderWithTimer />
      <h1 className="font-rubik md:text-4xl text-2xl font-bold leading-tight tracking-tight ml-5 md:text-center text-[#2D3242] md:mt-7 mt-5 uppercase">
        Выберите подходящий тарифный план
      </h1>
      <section className="flex flex-col items-center gap-2.5 md:my-24 my-5 justify-center md:flex-row md:items-start md:gap-20">
        <ImageWithGradient />
        <ClientWrapper subscriptions={subscriptions} />
      </section>
      <Modal subscriptions={subscriptions} />
    </main>
  );
}
