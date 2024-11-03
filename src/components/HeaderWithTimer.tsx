import Timer from './Timer';

export default function HeaderWithTimer() {
  return (
    <header className="flex min-h-20 items-center justify-center bg-white">
      <Timer initialMinutes={2} />
    </header>
  );
}
