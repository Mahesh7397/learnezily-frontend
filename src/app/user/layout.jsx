"use client"
import { usePathname, useRouter } from "next/navigation";
import { House,Search,BrainCircuit,Calculator } from "lucide-react";

const navItems = [
    { label: "Home", path: "dashboard",icon:<House /> },
    { label: "Projects", path: "search",icon:<Search/> },
    { label: "Profile", path: "ai",icon:<BrainCircuit /> },
    {label:"calculator",path:"calculator",icon:<Calculator/>}
];




export default function UserLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="bg-background relative">
            {/**Floating bar */}

            <div className="fixed h-14 bottom-5 left-1/2 flex w-[93%] md:w-[420px] -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-border bg-box z-10 ">
                <nav className="w-full flex justify-around gap-4 ">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`text-sm transition h-10 w-16 rounded-lg flex justify-center items-center
            ${pathname === item.path || pathname.includes(item.path)
                                    ? "text-white font-semibold bg-primary"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {item.icon}
                        </button>
                    ))}
                </nav>
            </div>
            <main>{children}</main>
        </div>
    )
}