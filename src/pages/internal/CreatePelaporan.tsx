import { useState } from "react"
import { PrimaryButton } from "../../components/form/Button"
import AdminLayout from "../layouts/AdminLayout"


const CreatePelaporan = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return <AdminLayout>
        <div className="lg:w-1/2 md:w-10/12 w-11/12 bg-white floating-shadow-md rounded-md mx-auto mt-4 px-8 py-10">
            <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary">Tambah Data Laporan</h1>
            <div className="my-5 flex flex-col gap-4">
                <section>
                    <h2 className="font-bold">Data Kasus</h2>
                    <div className="flex flex-col gap-4">
                    </div>
                </section>
                <section>
                    <h2 className="font-bold">Data Identitas Pelapor</h2>
                    <div className="flex flex-col gap-4">
                    </div>
                </section>
                <section>
                    <h2 className="font-bold">Data Identitas Klien</h2>
                    <div className="flex flex-col gap-4">
                    </div>
                </section>
            </div>
            {/* Footer */}
            <div className="border-t-2 border-slate-400 pt-5">
                <PrimaryButton className="py-3" isLoading={isLoading} isDisabled={isLoading}>
                    Laporkan
                </PrimaryButton>
            </div>

        </div>

    </AdminLayout>
}

export default CreatePelaporan