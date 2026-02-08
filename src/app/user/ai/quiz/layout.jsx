"use client"
import { usePathname, useRouter } from "next/navigation";
import { House,Search,BrainCircuit,Calculator } from "lucide-react";

const navItems = [
    { label: "Generate", path: "generate" },
    { label: "Previous", path: "previous" },
];


export default function UserLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="bg-background flex flex-col items-center">
            <div className="w-[80%] h-15 flex justify-center items-center">
                <div className="w-60 h-12 bg-box border border-border rounded-2xl flex justify-around items-center">
                    {navItems.map((nav)=>{
                        return (
                            <div
                            key={nav.path}
                            onClick={() => router.push(nav.path)}
                            className={`text-sm transition h-8 w-25 rounded-lg flex justify-center items-center
            ${pathname === nav.path || pathname.includes(nav.path)
                                    ? "text-white font-semibold bg-primary"
                                    : "text-gray-400 hover:text-white"
                                }`} >
                                <h3 className="text-white" >{nav.label}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}