import { Dispatch, SetStateAction, useState } from "react";
import { Laporan } from "../../../consts/laporan";
import Pill from "../Pill";
import DetailPenjangkauanItem from "./DetailPenjangkauanItem";
import { formatDate } from "../../../helpers/formatDate";
import { MODAL_PENANGANAN_AWAL, MODAL_PENJANGKAUAN } from "../../../consts/modal_penjangkauan";
import DetailLaporanItem from "./DetailLaporanItem";
import { SectionTitle } from "../../common/Typography";
import ModalPenjangkauan from "../modal_penjangkauan/ModalPenjangkauan";
import { useAuthUser } from "react-auth-kit";
import { User } from "../../../consts/user";
import { ROLE } from "../../../consts/role";
import ModalPenangananAwal from "../modal_penanganan_awal/ModalPenangananAwal";

interface SectionPenganganAwalProps {
  laporan: Laporan;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}

const SectionPenangananAwal = (props: SectionPenganganAwalProps) => {
  const { laporan, setRefetch } = props;
  const userData = useAuthUser()() as User;
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
  const [isModalActiveWaktuPenangananAwal, setIsModalActiveWaktuPenangananAwal] =
    useState<boolean>(false);
  const [isModalActiveDokumenPendukung, setIsModalActiveDokumenPendukung] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex gap-3 lg:flex-row flex-col items-center justify-start">
        <h2 className="font-bold text-xl">
          Detail Penanganan Awal <br className="lg:hidden" />{" "}
          <span className="text-primary">{laporan.nama_pelapor}</span>
        </h2>
        <Pill status={laporan.status.id} />
      </div>
      <div className="flex flex-col gap-2 py-3">
        <div className="border-b-2 flex flex-col gap-3 py-3 mb-4">
          <div className="flex items-center justify-between">
            <SectionTitle>Waktu Penanganan Awal</SectionTitle>
            {userData.role === ROLE.SATGAS &&
              laporan.satgas_pelapor.id === userData.id && (
                <button
                  onClick={() => setIsModalActiveWaktuPenangananAwal(true)}
                  type="button"
                  className="text-[12px] bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition duration-300"
                >
                  Tambahkan/Edit Waktu Penanganan Awal
                </button>
              )}
          </div>
          <DetailLaporanItem
            label="Tanggan & Jam Penanganan"
            value={
              laporan.penjadwalan?.tanggal_jam
                ? formatDate(laporan.penjadwalan.tanggal_jam.toString(), true)
                : ""
            }
          />
          <DetailLaporanItem
            label="Hasil Penanganan Awal"
            value={
              laporan.penjadwalan?.tempat ? laporan.penjadwalan?.tempat : ""
            }
          />
        </div>
        <div className="border-b-2 flex flex-col gap-3 py-3 mb-4">
          <div className="flex items-center justify-between">
            <SectionTitle>Dokumen Pendukung</SectionTitle>
            {userData.role === ROLE.SATGAS &&
              laporan.satgas_pelapor.id === userData.id && (
                <button
                  onClick={() => setIsModalActiveDokumenPendukung(true)}
                  type="button"
                  className="text-[12px] bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition duration-300"
                >
                  Tambahkan/Edit Dokument Pendukung
                </button>
              )}
          </div>
        </div>
      </div>
      {isModalActiveWaktuPenangananAwal === true && (
        <ModalPenangananAwal
          mode={"input"}
          setIsModalActive={setIsModalActiveWaktuPenangananAwal}
          modalType={MODAL_PENANGANAN_AWAL.WAKTU_PENANGANAN}
          laporan={laporan}
          setRefetch={setRefetch}
        />
      )}
      {isModalActiveDokumenPendukung === true && (
        <ModalPenangananAwal
          mode={"input"}
          setIsModalActive={setIsModalActiveDokumenPendukung}
          modalType={MODAL_PENANGANAN_AWAL.DOKUMEN_PENDUKUNG}
          laporan={laporan}
          setRefetch={setRefetch}
        />
      )}
    </>
  );
};

export default SectionPenangananAwal;
