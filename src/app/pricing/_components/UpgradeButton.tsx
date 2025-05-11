import { Zap } from "lucide-react";

export default function UpgradeButton() {
  const CHECKOUT_URL =
    "https://codehorizon.lemonsqueezy.com/buy/ad8a47bd-80bd-44c8-b829-21b81d1089c3";

  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </a>
  );
}
