import { PawPrint } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 rounded-xl p-2">
              <PawPrint size={28} className="text-white" />
            </div>
            <span className="text-2xl font-bold">PetCare</span>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Manage your dog daycare with ease
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Bookings, daily report cards, financials and communication with pet owners — all in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['bg-amber-400', 'bg-blue-400', 'bg-emerald-400', 'bg-purple-400'].map((bg, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${bg} border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-white`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">+200 daycares already trust PetCare</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
