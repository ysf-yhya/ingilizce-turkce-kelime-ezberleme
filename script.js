// Öğrenci listesini localStorage'dan yükleme
let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];

// DOM elementlerini seçme
const modal = document.getElementById('modal');
const ogrenciForm = document.getElementById('ogrenciForm');
const ogrenciEkleBtn = document.getElementById('ogrenciEkleBtn');
const modalKapat = document.getElementById('modalKapat');
const ogrenciListesiContainer = document.getElementById('ogrenciListesiContainer');
const katilmayanlarListesi = document.getElementById('katilmayanlarListesi');

// Modal işlemleri
ogrenciEkleBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

modalKapat.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Yeni öğrenci ekleme
ogrenciForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isim = document.getElementById('isim').value;
    const numara = document.getElementById('numara').value;
    
    const yeniOgrenci = {
        id: Date.now(),
        isim,
        numara,
        katildi: false
    };
    
    ogrenciler.push(yeniOgrenci);
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    
    ogrenciForm.reset();
    modal.style.display = 'none';
    
    listeyiGuncelle();
});

// Katılım durumunu değiştirme
function katilimDurumuDegistir(id, durum) {
    const ogrenci = ogrenciler.find(o => o.id === id);
    if (ogrenci) {
        ogrenci.katildi = durum;
        localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
        listeyiGuncelle();
    }
}

// Öğrenci listesini güncelleme
function listeyiGuncelle() {
    // Ana liste
    ogrenciListesiContainer.innerHTML = '';
    ogrenciler.forEach(ogrenci => {
        const ogrenciDiv = document.createElement('div');
        ogrenciDiv.className = 'ogrenci-item';
        ogrenciDiv.innerHTML = `
            <div class="ogrenci-bilgi">
                <strong>${ogrenci.isim}</strong> - ${ogrenci.numara}
            </div>
            <div class="ogrenci-islem">
                <button onclick="katilimDurumuDegistir(${ogrenci.id}, true)" 
                        class="katildi-btn" 
                        ${ogrenci.katildi ? 'disabled' : ''}>
                    ✓
                </button>
                <button onclick="katilimDurumuDegistir(${ogrenci.id}, false)" 
                        class="katilmadi-btn"
                        ${!ogrenci.katildi ? 'disabled' : ''}>
                    ✗
                </button>
            </div>
        `;
        ogrenciListesiContainer.appendChild(ogrenciDiv);
    });
    
    // Katılmayanlar listesi
    katilmayanlarListesi.innerHTML = '';
    const katilmayanlar = ogrenciler.filter(o => !o.katildi);
    katilmayanlar.forEach(ogrenci => {
        const katilmayanDiv = document.createElement('div');
        katilmayanDiv.className = 'ogrenci-item';
        katilmayanDiv.innerHTML = `
            <div class="ogrenci-bilgi">
                <strong>${ogrenci.isim}</strong> - ${ogrenci.numara}
            </div>
        `;
        katilmayanlarListesi.appendChild(katilmayanDiv);
    });
}

// Sayfa yüklendiğinde listeyi güncelle
document.addEventListener('DOMContentLoaded', listeyiGuncelle);
