import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react"
import { PrimaryButton, SecondaryButton } from "../form/Button"
import { FaPaperPlane, FaTimesCircle } from "react-icons/fa"
import { SatgasPelapor } from "../../consts/satgas"
import ReactSelect from "react-select"
import { ROLE } from "../../consts/role"
import { SatgasPelaporLoader } from "../../helpers/fetchHelpers"

interface ModalProps {
    onClose: MouseEventHandler
    onSuccess: MouseEventHandler
    title?: string
    description?: string
    successButtonText: string
}

interface AssignModalProps extends ModalProps {
    setSelectedSatgasId: Dispatch<SetStateAction<string>>
}

export const ConfirmationModal = (props: ModalProps) => {
    const { onClose, onSuccess, title, description, successButtonText } = props
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-[600px] md:w-1/2 w-11/12 rounded-md">
                <span className="font-bold text-lg">{title}</span>
                <p className="mt-3">{description}</p>
                <div className="w-full flex gap-4 mt-7">
                    <SecondaryButton
                        className="flex items-center justify-center grow gap-2 py-2.5 hover:text-white"
                        onClick={onClose}
                    >
                        <FaTimesCircle />
                        Batal
                    </SecondaryButton>
                    <PrimaryButton
                        className="flex items-center justify-center grow gap-2 py-2.5"
                        onClick={onSuccess}
                    >
                        <FaPaperPlane />
                        {successButtonText}
                    </PrimaryButton>
                </div>
            </div>

        </div>
    </>
}

export const AssignModal = (props: AssignModalProps) => {
    const { onClose, onSuccess, title, description, successButtonText, setSelectedSatgasId } = props
    const [satgasPelapors, setSatgasPelapors] = useState<SatgasPelapor[]>([])

    return <>
        <SatgasPelaporLoader data={satgasPelapors} setData={setSatgasPelapors}>
            <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
                <div className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-[600px] md:w-1/2 w-11/12 rounded-md">
                    <span className="font-bold text-lg">{title}</span>
                    <p className="mt-3 text-start">Anda akan menerima laporan dari {description}.<br />Mohon pilih satgas yang akan menangani kasus ini.</p>
                    <ReactSelect
                        className="mt-4"
                        onChange={(v) => setSelectedSatgasId(v?.value!)}
                        options={satgasPelapors.filter((satgas) => satgas.role.nama === ROLE.SATGAS).map((satgas) => ({
                            label: satgas.nama,
                            value: satgas.id
                        }))}
                    />
                    <div className="w-full flex gap-4 mt-7">
                        <SecondaryButton
                            className="flex items-center justify-center grow gap-2 py-2.5 hover:text-white"
                            onClick={onClose}
                        >
                            <FaTimesCircle />
                            Batal
                        </SecondaryButton>
                        <PrimaryButton
                            className="flex items-center justify-center grow gap-2 py-2.5"
                            onClick={onSuccess}
                        >
                            <FaPaperPlane />
                            {successButtonText}
                        </PrimaryButton>
                    </div>
                </div>

            </div>
        </SatgasPelaporLoader>

    </>
}