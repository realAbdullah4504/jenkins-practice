// pages/privacy-policy.tsx
import type { NextPage } from 'next';
import Link from 'next/link';

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <header className="bg-gray-800 text-white p-4 mb-8">
          <nav className="flex justify-between">
            <Link href="/" className="text-xl font-bold">Home</Link>
            <Link href="/privacy-policy" className="text-lg">Política de Privacidad</Link>
          </nav>
        </header>
        
        <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
        <p className="mb-4">
          La protección de tus datos personales es importante para nosotros. En nuestra política de privacidad, explicamos qué información recopilamos, cómo la utilizamos y cuáles son tus derechos en relación con tus datos. Nos comprometemos a tratar tu información de manera confidencial y segura. Tómate un momento para leer nuestra política de privacidad en su totalidad.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que Recopilamos</h2>
        <p className="mb-4">
          Aquí puedes describir la información que recopilas, como datos personales, información de uso, etc.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Cómo Utilizamos tu Información</h2>
        <p className="mb-4">
          Explica cómo usas la información recopilada.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Derechos del Usuario</h2>
        <p className="mb-4">
          Describe los derechos que tienen los usuarios respecto a sus datos personales.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Seguridad de los Datos</h2>
        <p className="mb-4">
          Explica las medidas que tomas para proteger los datos personales.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Cambios en la Política</h2>
        <p className="mb-4">
          Informa a los usuarios sobre cómo se les notificará cualquier cambio en la política de privacidad.
        </p>
        <p className="mt-6 text-gray-600">
          Última actualización: [Fecha]
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
