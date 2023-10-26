import { Status } from "./status";

export interface Laporan {
    id?: string,
    tanggal_pengaduan?: string,
    jam?: string,
    uraian_singkat?: string,
    no_telp_pelapor?: string,
    no_telp_klien?: string,
    nama_korban?: string,
    nama_pelapor?: string,
    inisial_klien?: string,
    nik_pelapor?: string,
    nik_klien?: string,
    kategori_id?: number,
    usia?: number,
    alamat: string,
    alamat_pelapor?: string,
    alamat_klien?: string,
    rt?: string,
    rw?: string,
    kronologis?: string,
    sumber_pengaduan_id?: number,
    kelurahan_id?: number,
    kecamatan_id?: number,
    jenis_kelamin?: string,
    satgas_pelapor_id?: string,
    previous_satgas_id?: string,
    status?: Status
    token?: string,
    pendidikan_id?: number,
    dokumentasi_pengaduan?: string,
    created_at?: string,
}
