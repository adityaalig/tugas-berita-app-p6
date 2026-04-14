import os

# Menyiapkan konten README.md
readme_content = """# Dokumentasi Teknis Pengembangan BeritaApp
**Nama:** Aditya Aryobima  
**NIM:** 2410501002  
**Kelas:** B

---

## Jawaban Evaluasi Teknis

### 1. Perbedaan `staleTime` dan `gcTime` (cacheTime) pada React Query
Dalam React Query, manajemen data server dibedakan menjadi dua fase waktu:

* staleTime (Waktu Kadaluarsa Data): Adalah durasi di mana data dianggap masih "segar" (fresh). Selama data dalam status fresh, React Query tidak akan melakukan fetching ulang ke server meskipun komponen di-mount ulang atau layar difokuskan kembali.

* Kapan dikonfigurasi? Gunakan `staleTime` tinggi (misal: 1 jam) untuk data statis yang jarang berubah. Gunakan `staleTime: 0` (default) jika data sangat dinamis.

* gcTime / cacheTime (Garbage Collection Time): Adalah durasi data disimpan di memori setelah tidak ada komponen yang menggunakan data tersebut (status inactive). Jika waktu habis, data akan dihapus dari memori.

* Kapan dikonfigurasi? Biasanya dibiarkan default (5 menit). Diatur lebih lama jika kita ingin transisi UI lebih cepat saat user kembali ke halaman lama setelah sekian lama.

### 2. Pentingnya Debounce pada Fitur Pencarian dan Dampak API Quota
Debounce adalah teknik untuk menunda eksekusi fungsi hingga tidak ada input baru dalam rentang waktu tertentu (misal: 500ms).

* Mengapa diperlukan? Tanpa debounce, setiap kali user mengetik satu huruf (misal: "JAKARTA"), aplikasi akan mengirim 7 permintaan API secara beruntun.

* Perspektif API Quota: Jika tidak menggunakan debounce, kuota API akan sangat cepat habis. Pada NewsAPI versi gratis (Developer Plan) yang membatasi 100-500 request per hari, fitur pencarian tanpa debounce bisa menghabiskan seluruh jatah harian hanya dalam beberapa menit interaksi user. Debounce memastikan hanya satu request yang terkirim setelah user selesai mengetik.

### 3. Perbandingan Caching: React Query vs Apollo InMemoryCache
* React Query: Menggunakan pendekatan *Key-Value Pair*. Cache disimpan berdasarkan `queryKey`. Cocok untuk REST API karena strukturnya simpel dan fleksibel.

* Apollo Client: Menggunakan Normalized Cache. Data dipisah-pisah berdasarkan ID unik di dalam objek. Sangat kuat untuk GraphQL karena bisa melakukan pembaruan data otomatis pada objek yang sama di berbagai query yang berbeda.

Kapan GraphQL + Apollo lebih cocok? Lebih cocok digunakan pada aplikasi dengan relasi data yang sangat kompleks dan mendalam (deeply nested), di mana satu perubahan data perlu segera tercermin di banyak layar tanpa harus melakukan refetch total.

### 4. Token Refresh Pattern dan Request Queuing
Token Refresh Pattern adalah mekanisme otomatis di mana jika akses token kadaluarsa (error 401), aplikasi akan secara otomatis memanggil API `refresh-token` tanpa disadari oleh user.

* Request Queuing: Jika aplikasi mengirim 5 request sekaligus dan semuanya gagal karena token kadaluarsa, kita tidak ingin memanggil API `refresh-token` sebanyak 5 kali.

* Mengapa diperlukan? Request Queuing berfungsi untuk "menahan" (antrean) 4 request lainnya saat request pertama sedang melakukan proses perpanjangan token. Setelah token baru didapat, semua request dalam antrean tadi dijalankan kembali (retry) menggunakan token yang baru. Ini mencegah *race condition* dan menjaga keamanan server.
"""
