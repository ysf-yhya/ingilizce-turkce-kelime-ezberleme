// DOM elementleri
const yeniOgrenciBtn = document.getElementById('yeniOgrenciBtn');
const ogrenciModal = document.getElementById('ogrenciModal');
const duzenleModal = document.getElementById('duzenleModal');
const ogrenciForm = document.getElementById('ogrenciForm');
const duzenleForm = document.getElementById('duzenleForm');
const iptalBtn = document.getElementById('iptalBtn');
const duzenlemeIptalBtn = document.getElementById('duzenlemeIptalBtn');
const ogrenciListesi = document.getElementById('ogrenciListesi');
const katilmayanlarListesi = document.getElementById('katilmayanlarListesi');
const searchInput = document.getElementById('searchInput');
const ogrenciSayisi = document.getElementById('ogrenciSayisi');
const katilmayanSayisi = document.getElementById('katilmayanSayisi');
const filterButtons = {
    tumu: document.getElementById('tumunuGoster'),
    katilanlar: document.getElementById('katilanlariGoster'),
    katilmayanlar: document.getElementById('katilmayanlariGoster')
};

// Veri yönetimi
let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
let aktifFiltre = 'tumu';
let duzenlenenOgrenciId = null;

// Modal işlemleri
yeniOgrenciBtn.addEventListener('click', () => {
    ogrenciModal.classList.add('active');
    document.getElementById('isim').focus();
});

iptalBtn.addEventListener('click', () => {
    ogrenciModal.classList.remove('active');
    ogrenciForm.reset();
});

duzenlemeIptalBtn.addEventListener('click', () => {
    duzenleModal.classList.remove('active');
    duzenleForm.reset();
});

// Yeni öğrenci ekleme
ogrenciForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isim = document.getElementById('isim').value.trim();
    const numara = document.getElementById('numara').value.trim();
    
    if (ogrenciler.some(o => o.numara === numara)) {
        alert('Bu numara zaten kayıtlı!');
        return;
    }
    
    const yeniOgrenci = {
        id: Date.now(),
        isim,
        numara,
        katildi: false,
        sonGuncelleme: new Date().toISOString()
    };
    
    ogrenciler.unshift(yeniOgrenci);
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    
    ogrenciForm.reset();
    ogrenciModal.classList.remove('active');
    
    showNotification('Öğrenci başarıyla eklendi');
    listeyiGuncelle();
});

// Öğrenci düzenleme
duzenleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isim = document.getElementById('duzenleIsim').value.trim();
    const numara = document.getElementById('duzenleNumara').value.trim();
    
    const digerOgrenci = ogrenciler.find(o => o.numara === numara && o.id !== duzenlenenOgrenciId);
    if (digerOgrenci) {
        alert('Bu numara zaten kayıtlı!');
        return;
    }
    
    ogrenciler = ogrenciler.map(ogrenci => {
        if (ogrenci.id === duzenlenenOgrenciId) {
            return {
                ...ogrenci,
                isim,
                numara,
                sonGuncelleme: new Date().toISOString()
            };
        }
        return ogrenci;
    });
    
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    duzenleForm.reset();
    duzenleModal.classList.remove('active');
    
    showNotification('Öğrenci bilgileri güncellendi');
    listeyiGuncelle();
});

// Arama işlemi
searchInput.addEventListener('input', (e) => {
    const aramaMetni = e.target.value.toLowerCase();
    listeyiGuncelle(aramaMetni);
});

// Filtre işlemleri
Object.entries(filterButtons).forEach(([filtre, button]) => {
    button.addEventListener('click', () => {
        Object.values(filterButtons).forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        aktifFiltre = filtre;
        listeyiGuncelle();
    });
});

// Öğrenci listesini güncelleme
function listeyiGuncelle(aramaMetni = '') {
    ogrenciListesi.innerHTML = '';
    katilmayanlarListesi.innerHTML = '';
    
    let filtrelenmisOgrenciler = ogrenciler;
    
    // Arama filtrelemesi
    if (aramaMetni) {
        filtrelenmisOgrenciler = ogrenciler.filter(ogrenci => 
            ogrenci.isim.toLowerCase().includes(aramaMetni) ||
            ogrenci.numara.toLowerCase().includes(aramaMetni)
        );
    }
    
    // Katılım durumu filtrelemesi
    if (aktifFiltre === 'katilanlar') {
        filtrelenmisOgrenciler = filtrelenmisOgrenciler.filter(o => o.katildi);
    } else if (aktifFiltre === 'katilmayanlar') {
        filtrelenmisOgrenciler = filtrelenmisOgrenciler.filter(o => !o.katildi);
    }
    
    if (filtrelenmisOgrenciler.length === 0) {
        ogrenciListesi.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <p>Sonuç bulunamadı</p>
            </div>
        `;
    }
    
    filtrelenmisOgrenciler.forEach(ogrenci => {
        // Ana liste için kart oluşturma
        const ogrenciCard = document.createElement('div');
        ogrenciCard.className = 'ogrenci-card';
        
        const tarih = new Date(ogrenci.sonGuncelleme).toLocaleDateString('tr-TR');
        const saat = new Date(ogrenci.sonGuncelleme).toLocaleTimeString('tr-TR');
        
        ogrenciCard.innerHTML = `
            <div class="ogrenci-info">
                <div class="ogrenci-avatar">${ogrenci.isim[0].toUpperCase()}</div>
                <div class="ogrenci-detay">
                    <h3>${ogrenci.isim}</h3>
                    <p>Numara: ${ogrenci.numara}</p>
                    <small>Son güncelleme: ${tarih} ${saat}</small>
                </div>
            </div>
            <div class="button-group">
                <button class="status-button ${ogrenci.katildi ? 'active' : ''}" onclick="durumDegistir(${ogrenci.id}, true)" title="Katıldı">
                    <i class="fas fa-check"></i>
                </button>
                <button class="status-button ${!ogrenci.katildi ? 'inactive' : ''}" onclick="durumDegistir(${ogrenci.id}, false)" title="Katılmadı">
                    <i class="fas fa-times"></i>
                </button>
                <button class="status-button" onclick="ogrenciDuzenle(${ogrenci.id})" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="status-button" onclick="ogrenciSil(${ogrenci.id})" title="Sil">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        ogrenciListesi.appendChild(ogrenciCard);
        
        // Katılmayanlar listesi için kart oluşturma
        if (!ogrenci.katildi) {
            const katilmayanCard = document.createElement('div');
            katilmayanCard.className = 'katilmayan-card';
            katilmayanCard.innerHTML = `
                <h3>${ogrenci.isim}</h3>
                <p>Numara: ${ogrenci.numara}</p>
                <small>Son güncelleme: ${tarih} ${saat}</small>
            `;
            katilmayanlarListesi.appendChild(katilmayanCard);
        }
    });
    
    // Sayaçları güncelle
    ogrenciSayisi.textContent = ogrenciler.length;
    katilmayanSayisi.textContent = ogrenciler.filter(o => !o.katildi).length;
}

// Katılım durumunu değiştirme
function durumDegistir(id, katildi) {
    ogrenciler = ogrenciler.map(ogrenci => {
        if (ogrenci.id === id) {
            return {
                ...ogrenci,
                katildi,
                sonGuncelleme: new Date().toISOString()
            };
        }
        return ogrenci;
    });
    
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    listeyiGuncelle();
    showNotification(katildi ? 'Öğrenci katıldı olarak işaretlendi' : 'Öğrenci katılmadı olarak işaretlendi');
}

// Öğrenci düzenleme modalını aç
function ogrenciDuzenle(id) {
    const ogrenci = ogrenciler.find(o => o.id === id);
    if (!ogrenci) return;
    
    duzenlenenOgrenciId = id;
    document.getElementById('duzenleIsim').value = ogrenci.isim;
    document.getElementById('duzenleNumara').value = ogrenci.numara;
    duzenleModal.classList.add('active');
}

// Öğrenci silme
function ogrenciSil(id) {
    if (!confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) return;
    
    ogrenciler = ogrenciler.filter(ogrenci => ogrenci.id !== id);
    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    listeyiGuncelle();
    showNotification('Öğrenci silindi');
}

// Bildirim gösterme
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Sayfa yüklendiğinde listeyi güncelle
document.addEventListener('DOMContentLoaded', listeyiGuncelle);

// Modal dışına tıklandığında kapatma
window.addEventListener('click', (e) => {
    if (e.target === ogrenciModal) {
        ogrenciModal.classList.remove('active');
        ogrenciForm.reset();
    }
    if (e.target === duzenleModal) {
        duzenleModal.classList.remove('active');
        duzenleForm.reset();
    }
}); 
