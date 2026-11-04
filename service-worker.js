/* Service worker Pemeriksaan Fisik TDBU — cache-first, 100% offline setelah dibuka sekali.
   Setiap kali isi aplikasi diperbarui, naikkan VERSI agar HP mengambil versi baru. */
const VERSI = "tdbu-v3.1";
const FILE = [
"./",
"index.html",
"manifest.webmanifest",
"logo.png",
"icon-192.png",
"icon-512.png",
"icon-maskable-512.png",
"contoh/pp-airless-spray-gun.jpg",
"contoh/pp-alat-gali-tanah.jpg",
"contoh/pp-alat-pengisi-program-siklus.jpg",
"contoh/pp-alat-pengisi-program.jpg",
"contoh/pp-alat-pres-hidrolik-sambungan-kabel.jpg",
"contoh/pp-attractor-rework.jpg",
"contoh/pp-automatic-filling-machine.jpg",
"contoh/pp-automatic-granular-mixer.jpg",
"contoh/pp-avo-mater.jpg",
"contoh/pp-avo-meter.jpg",
"contoh/pp-bending-plate.jpg",
"contoh/pp-bor-cun.jpg",
"contoh/pp-bor-duduk-mata-bor.jpg",
"contoh/pp-bor-tangan.jpg",
"contoh/pp-catu-daya.jpg",
"contoh/pp-chain-block.jpg",
"contoh/pp-compressor.jpg",
"contoh/pp-computer.jpg",
"contoh/pp-cutter.jpg",
"contoh/pp-cutting-plotter.jpg",
"contoh/pp-cutting-wheel.jpg",
"contoh/pp-drilling-machine-core-drill.jpg",
"contoh/pp-electric-hand-driller.jpg",
"contoh/pp-generator-set-kecil.jpg",
"contoh/pp-genset.jpg",
"contoh/pp-glue-gun.jpg",
"contoh/pp-grinding-wheel.jpg",
"contoh/pp-hand-grinder.jpg",
"contoh/pp-impact-faster.jpg",
"contoh/pp-kompresor-udara.jpg",
"contoh/pp-kompresor.jpg",
"contoh/pp-komputer-dilengkapi-software-penghitung-kuat-cahay.jpg",
"contoh/pp-komputer.jpg",
"contoh/pp-kunci-pas.jpg",
"contoh/pp-kunci-set.jpg",
"contoh/pp-lux-meter.jpg",
"contoh/pp-meger-test.jpg",
"contoh/pp-meja-perakitan-daun-rambu.jpg",
"contoh/pp-merger-grounding.jpg",
"contoh/pp-mesin-aplikasi-marka-dorong.jpg",
"contoh/pp-mesin-aplikasi-marka-mobil-opsional.jpg",
"contoh/pp-mesin-bor.jpg",
"contoh/pp-mesin-las.jpg",
"contoh/pp-mesin-pemotong-plat.jpg",
"contoh/pp-mesin-potong-gas-gas-cutting.jpg",
"contoh/pp-mesin-pre-heater.jpg",
"contoh/pp-mesin-rol-aplikator.jpg",
"contoh/pp-mini-concrete-mixer-mesin-pen-gaduk-beton-mini.jpg",
"contoh/pp-mini-concrete-mixer-molen-beton-cor.jpg",
"contoh/pp-mobil-crane.jpg",
"contoh/pp-osciloskop.jpg",
"contoh/pp-osiloskop.jpg",
"contoh/pp-pemanas-menggunakan-gas-lpg.jpg",
"contoh/pp-power-supply-adjaustable.jpg",
"contoh/pp-pyloc-clear.jpg",
"contoh/pp-rak-pengering.jpg",
"contoh/pp-roll-aplikator.jpg",
"contoh/pp-roll-meter.jpg",
"contoh/pp-rst-teater.jpg",
"contoh/pp-rst-tester.jpg",
"contoh/pp-sigmat-meter.jpg",
"contoh/pp-solder-manual.jpg",
"contoh/pp-solder.jpg",
"contoh/pp-tang-ampere.jpg",
"contoh/pp-tang-buaya.jpg",
"contoh/pp-tang-kremping.jpg",
"contoh/pp-tang-kupas.jpg",
"contoh/pp-tang-potong.jpg",
"contoh/pp-test-pen.jpg",
"contoh/pp-tester-charge-cut-off-cco.jpg",
"contoh/pp-thermo-sensor.jpg",
"contoh/pp-timbangan-digital-oven.jpg",
"contoh/pp-tool-sets-obeng-tang-kunci-ring-lengkap.jpg",
"contoh/pp-tool-sets.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSI).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSI).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === "navigate" ? caches.match("index.html") : Response.error()))
  );
});
