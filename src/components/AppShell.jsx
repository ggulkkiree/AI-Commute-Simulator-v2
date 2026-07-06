export default function AppShell({ children }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-amber-50 to-orange-100 px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1500px] items-center justify-center lg:min-h-[calc(100vh-4rem)]">
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
