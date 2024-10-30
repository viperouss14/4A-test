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
      <h1 className="font-rubik text-4xl font-bold leading-tight tracking-tight text-center text-[#2D3242] mt-7 uppercase">
        Выберите подходящий тарифный план
      </h1>
      <section className="flex gap-20 mx-44 my-24">
        <ImageWithGradient />
        <ClientWrapper subscriptions={subscriptions} />
      </section>
      <Modal subscriptions={subscriptions} />
    </main>
  );
}
