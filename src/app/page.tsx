import Header from '@/components/Header'; // Menggunakan path alias @/

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <p>Konten halaman.</p>
      </main>
    </div>
  );
}