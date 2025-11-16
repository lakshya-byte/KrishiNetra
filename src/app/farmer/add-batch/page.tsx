import { Header } from "./_components/Header";
import { ProduceForm } from "./_components/ProduceForm";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                <ProduceForm />
            </main>
        </div>
    );
}