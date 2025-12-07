export default function Spinner() {
    return (
        <div className="flex items-center justify-center w-full h-full py-10">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-transparent border-t-saffron border-l-saffron rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-transparent border-b-[#2E7D32] border-r-[#2E7D32] rounded-full animate-spin-slow"></div>
            </div>
        </div>
    );
}