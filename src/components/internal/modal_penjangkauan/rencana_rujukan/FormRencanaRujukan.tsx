import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { SectionTitle } from "../../../common/Typography";
import { PrimaryButton, SecondaryButton } from "../../../form/Button";
import { InputText } from "../../../form/Input";
import { REGEX } from "../../../../consts/regex";
import { useState } from "react";
import { KeluargaKlien } from "../../../../consts/keluarga_klien";
import { Select } from "../../../form/Dropdown";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";
import {
  deleteKeluarga,
  getLaporan,
  patchLaporan,
  postKeluarga,
  postKeluargaKlienStatus,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import useLoader from "../../../../hooks/useLoader";
import { useAlert } from "../../../../hooks/useAlert";
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import {
  HubunganKeluargaLoader,
  KeluargaLoader,
} from "../../../../helpers/fetchHelpers";
import { HubunganKeluarga } from "../../../../consts/hubungan_keluarga";
import { Laporan } from "../../../../consts/laporan";

const FormRencanaRujukan = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<KeluargaKlien>();
  const [keluargas, setKeluargas] = useState<KeluargaKlien[]>([]);
  const [hubunganKeluarga, setHubunganKeluarga] = useState<HubunganKeluarga[]>(
    []
  );

  const publishKeluarga = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_keluarga: 2
      };
      setIsLoading(true);
      showLoader();
      (await patchLaporan(formatDataStatus, laporan.id))
      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Keluarga Klien Berhasil Dibuat !",
        message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      });
      hideLoader();
      setIsModalActive(false);
      setRefetch!(true);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const delKeluarga = async (id: number) => {
    try {
      setIsLoading(true);
      showLoader();
      await deleteKeluarga(id);
      setRefetch!(true);
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      const updatedKeluargas = keluargas.filter(
        (keluarga) => keluarga.id !== id
      );
      setKeluargas(updatedKeluargas);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const onSubmit: SubmitHandler<KeluargaKlien> = async (
    data: KeluargaKlien
  ) => {
    const formatData: KeluargaKlien = {
      ...data,
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
    };

    const formatDataStatus = {
      // ...laporan,
      status_keluarga: 1,
      // jenis_kelamin: laporan.jenis_kelamin.toUpperCase()
    };

    try {
      setIsLoading(true);
      showLoader();
      (await postKeluarga(formatData)) as KeluargaKlien;
      await patchLaporan(formatDataStatus, laporan.id);
      reset();
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      setRefetch!(true);
      setKeluargas((prevKeluarga) => [...prevKeluarga, formatData]);

      // setTimeout(() => {
      //   navigate(0);
      // }, 3000);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };
  return (
    <>
      <span className="font-bold text-lg">
        <span className="text-primary">{capitalize(mode)}</span> Detail Rencana
        Rujukan Kebutuhan Klien
      </span>
      <HubunganKeluargaLoader
        data={hubunganKeluarga}
        setData={setHubunganKeluarga}
      >
        <div className="flex flex-col gap-2 py-3">
          <form
            className="border-b-2 flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SectionTitle>Detail Rencana Rujukan Kebutuhan Klien</SectionTitle>
            <Select
              name="hubungan_id"
              control={control}
              placeholder="Kebutuhan"
              label="Kebutuhan"
              errors={errors}
              errorLabel="Hubungan"
              // options={[{ label: "Ayah Kandung", value: 1 }]}
              options={hubunganKeluarga.map((k) => ({
                label: k.hubungan,
                value: k.id,
              }))}
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              name="nama_lengkap"
              placeholder="OPD"
              label="OPD"
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              name="no_telp"
              regex={REGEX.PHONE_IDN}
              placeholder="Layanan yang Diberikan"
              label="Layanan yang Diberikan"
              isRequired
            />
            <PrimaryButton className="py-2" isSubmit>
              Tambah Rencana Rujukan
            </PrimaryButton>
          </form>
          <KeluargaLoader
            key={keluargas.length}
            setData={setKeluargas}
            data={keluargas}
            id={laporan.id}
          >
            <div className="border-b-2 flex flex-col gap-3 py-3">
              {keluargas.length > 0 ? (
                keluargas.map((keluarga, index) => (
                  <div
                    key={index}
                    className="shadow-md p-5 rounded gap-2 flex flex-col"
                  >
                    <SectionTitle>{`Pelayanan ${index + 1}`}</SectionTitle>
                    <DetailLaporanItem
                      label="Kebutuhan"
                      value={
                        keluarga.hubungan?.hubungan
                          ? keluarga.hubungan.hubungan
                          : "-"
                      }
                    />
                    <DetailLaporanItem
                      label="OPD"
                      value={
                        keluarga.nama_lengkap ? keluarga.nama_lengkap : "-"
                      }
                    />
                    <DetailLaporanItem
                      label="Layanan yang Diberikan"
                      value={
                        keluarga.no_telp ? keluarga.no_telp.toString() : "-"
                      }
                    />
                    <div className="flex flex-row-reverse items-end gap-3">
                      <DeleteButton
                        onClick={() => delKeluarga(keluarga.id)}
                      ></DeleteButton>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-2 pt-0">
                  <img
                    src="/images/nodata.png"
                    className=""
                    width={300}
                    alt="No Data illustration"
                  />
                  <b className="text-xl text-center text-primary">
                    Rencana Rujukan Belum Ditambahkan
                  </b>
                </div>
              )}
            </div>
          </KeluargaLoader>
          <PrimaryButton className="py-2" onClick={() => publishKeluarga()}>
            Publish Rencana Rujukan
          </PrimaryButton>
        </div>
      </HubunganKeluargaLoader>
    </>
  );
};

export default FormRencanaRujukan;
