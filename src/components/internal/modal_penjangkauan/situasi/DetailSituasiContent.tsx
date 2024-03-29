import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography"

const DetailSituasiContent = (props: ContentModal) => {
    const { } = props
    return <>
        <span className="font-bold text-lg">Detail Data Situasi Keluarga</span>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>Situasi Keluarga</SectionTitle>
                <p className="text-sm whitespace-preline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero error placeat nostrum doloribus necessitatibus ipsa quos quibusdam fugit earum amet.</p>
            </div>
        </div>
    </>
}

export default DetailSituasiContent