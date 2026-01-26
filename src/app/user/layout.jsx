

export default function UserLayout({children}){
    return(
        <div className="bg-blue-400 w-screen h-screen relative">
            <div className="w-6 h-4 bg-amber-200">
                <h2>Hiii</h2>
            </div>
            {children}
        </div>
    )
}