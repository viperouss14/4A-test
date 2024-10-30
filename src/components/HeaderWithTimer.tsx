import Timer from "./Timer";

export default function HeaderWithTimer() {
  return (
    <header className="bg-white min-h-20 flex items-center justify-center">
      <Timer initialMinutes={2} />
    </header>
  );
}
