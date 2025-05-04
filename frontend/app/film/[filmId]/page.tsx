import FilmCard from "@/components/films/FilmCard";

export default async function Page({ params }: { params: Promise<{ filmId: string }> }) {
    const { filmId } = await params

    // {/* 
    // <div className="
    //                           flex justify-center sm:justify-end items-center gap-4
    //                           col-span-full sm:col-span-1 lg:col-span-2 -col-end-1 lg:-col-end-2
    //                           bg-red-300
    //                        m-0 p-0 ">
    // </div> */}

    return (
        <FilmCard film={filmId} variant="details" />
    )
}

