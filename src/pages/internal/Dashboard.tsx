import { FaHome, FaUserNurse } from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";
import { useAuthUser } from "react-auth-kit";
import { User } from "../../consts/user";
import { Panel, BarChartPanel } from "../../components/internal/Panel";
import { LaporanCountLoader, LaporanLoader, LaporansLoader } from "../../helpers/fetchHelpers";
import { useState } from "react";
import { Laporan, LaporanCount } from "../../consts/laporan";
import { STATUS_LAPORAN } from "../../consts/status";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const userData = useAuthUser()() as User;
  const [laporanCount, setLaporanCount] = useState<LaporanCount[]>([]);
  const [laporans, setLaporans] = useState<Laporan[]>([])

  return (
    <AdminLayout>
      <LaporanCountLoader data={laporanCount} setData={setLaporanCount}>
        <div className="lg:w-10/12 w-11/12 p-4 bg-white floating-shadow-md mx-auto mt-12 rounded-lg">
          <h1 className="font-bold text-2xl text-primary mb-2">
            Selamat Datang di Dashboard !
          </h1>
          <div className="flex gap-3 items-center text-lg">
            <FaHome />
            <h2 className="font-bold">Kelurahan Tambakrejo</h2>
          </div>
          <div className="flex gap-3 items-center text-lg">
            <FaUserNurse />
            <h2 className="font-bold">{userData?.name}</h2>
          </div>
        </div>
        <div className="lg:w-10/12 w-11/12 p-8 bg-white floating-shadow-md mx-auto mt-6 rounded-lg">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            <Panel
              title="Total Kasus Masuk"
              date={new Date().toISOString()}
              count={
                laporanCount.find(
                  (val) => val.id === STATUS_LAPORAN.SEMUA_KASUS
                )?.totalCase
              }
            />
            <Panel
              title="Total Kasus Menunggu Validasi"
              date={new Date().toISOString()}
              count={
                laporanCount.find(
                  (val) => val.id === STATUS_LAPORAN.MENUNGGU_VALIDASI
                )?.totalCase
              }
            />
            <Panel
              title="Total Kasus Selesai"
              date={new Date().toISOString()}
              count={
                laporanCount.find(
                  (val) => val.id === STATUS_LAPORAN.KASUS_SELESAI
                )?.totalCase
              }
            />
            <Panel
              title="Total Kasus Diteruskan ke DP3A"
              date={new Date().toISOString()}
              count={
                laporanCount.find(
                  (val) => val.id === STATUS_LAPORAN.KASUS_DITERUSKAN
                )?.totalCase
              }
            />
            <Panel
              title="Total Kasus Ditangani"
              date={new Date().toISOString()}
              count={
                laporanCount.find(
                  (val) => val.id === STATUS_LAPORAN.SEDANG_DITANGANI
                )?.totalCase
              }
            />
            <Panel
              title="Total Kasus Dikembalikan"
              date={new Date().toISOString()}
              count={
                laporanCount.find(
                  (val) => val.id === STATUS_LAPORAN.KASUS_DIKEMBALIKAN
                )?.totalCase
              }
            />
          </div>
          <div className="mt-4">
            <LaporansLoader data={laporans} setData={setLaporans}>
              <BarChartPanel
                title="Jumlah Laporan Per Jenis Laporan"
                date={new Date().toISOString()}
                laporans={laporans}
                laporanCount={laporanCount}
              />
            </LaporansLoader>
          </div>
        </div>
      </LaporanCountLoader>
    </AdminLayout>
  );
};

export default Dashboard;
