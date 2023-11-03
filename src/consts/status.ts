

export const STATUS_LAPORAN = {
    MENUNGGU_VALIDASI: 1,
    SEDANG_DITANGANI: 2,
    KASUS_SELESAI: 3,
    KASUS_DIKEMBALIKAN: 4,
    KASUS_DITERUSKAN: 5,
    SEMUA_KASUS: 0,
}

export interface Status {
    id: number,
    nama: string,
}