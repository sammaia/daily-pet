export default function RootPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PetCare</h1>
        <p className="text-xl text-gray-600 mb-8">Gerenciamento de creche de cães</p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Entrar
        </a>
      </div>
    </main>
  );
}
