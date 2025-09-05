document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({
        title: '<h1 class="font-dancing" style="font-size: 2.5rem; color: #7e22ce;">Selamat Datang di Kisah Cinta Kita</h1>',
        html: `
            <div style="text-align: center;">
                <div class="welcome-heart">💖</div>
                <p class="text-white" style="font-size: 1.1rem; margin-bottom: 1rem;">Setiap detik bersamamu adalah anugerah terindah</p>
                <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                    <div style="animation-delay: 0.2s;" class="heart-float text-3xl">💕</div>
                    <div style="animation-delay: 0.4s;" class="heart-float text-3xl">💗</div>
                    <div style="animation-delay: 0.6s;" class="heart-float text-3xl">💖</div>
                </div>
            </div>
        `,
        width: '80%',
        padding: '2rem',
        background: 'transparent', // biar glass effect dari CSS yang ambil alih
        backdrop: `
            rgba(255,192,203,0.4)
            url("/images/nyan-cat.gif")
            center top
            no-repeat
        `,
        customClass: {
            popup: 'welcome-modal',
            confirmButton: 'welcome-button'
        },
        showConfirmButton: true,
        confirmButtonText: 'Mulai Cerita Kita ❤️',
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
});

        // Smooth scrolling function
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Love counter - set your relationship start date here
        function updateLoveCounter() {
            // Ganti tanggal ini dengan tanggal mulai hubungan Anda (YYYY, MM-1, DD)
            const startDate = new Date(2022, 10, 12); // Contoh: 1 Januari 2023
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }

        // Update counter every second
        setInterval(updateLoveCounter, 1000);
        updateLoveCounter();

        // Save love message function
    async function saveLoveMessage() {
        const name = document.getElementById('senderName').value.trim();
        const message = document.getElementById('loveMessage').value.trim();
        const submitBtn = document.getElementById('submitBtn');
        const loadingMessage = document.getElementById('loadingMessage');
        
        if (!name || !message) {
            Swal.fire('Oops!', 'Mohon isi nama dan pesan terlebih dahulu! 💕', 'warning');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';
        loadingMessage.classList.remove('hidden');
        
        try {
            // Kirim data ke Apps Script (pastikan sudah di-deploy dengan "Anyone with link")
            const response = await fetch('https://script.google.com/macros/s/AKfycbzKzTLM0blL7AXqcjXD9dA3Fr79Vfsrb2-TxIU__iFySDUN6FUDA9nX64HoA5FM3871ew/exec', {
                method: 'POST',
                body: new URLSearchParams({
                    name: name,
                    message: message,
                    timestamp: new Date().toISOString()
                })
            });

            // Clear form
            document.getElementById('senderName').value = '';
            document.getElementById('loveMessage').value = '';

            // Reload messages dari Spreadsheet
            await loadMessages();

            Swal.fire('Berhasil!', 'Pesan cinta berhasil dikirim! 💕', 'success');
            
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Gagal!', 'Terjadi kesalahan saat mengirim pesan. 💔', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan ❤️';
            loadingMessage.classList.add('hidden');
        }
    }

    async function loadMessages() {
        const container = document.getElementById('messagesContainer');
        container.innerHTML = '<p class="text-center text-purple-600">Memuat pesan cinta... 💕</p>';

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzKzTLM0blL7AXqcjXD9dA3Fr79Vfsrb2-TxIU__iFySDUN6FUDA9nX64HoA5FM3871ew/exec');
            const data = await response.json();

            container.innerHTML = ''; // clear
            data.forEach(item => {
                addMessageToDisplay(item.name, item.message, new Date(item.timestamp));
            });

        } catch (error) {
            console.error('Error load:', error);
            container.innerHTML = '<p class="text-center text-red-500">Gagal memuat pesan 💔</p>';
        }
    }

    function addMessageToDisplay(name, message, date) {
        const container = document.getElementById('messagesContainer');
        const div = document.createElement('div');
        div.className = "p-4 bg-white shadow rounded-xl border border-pink-200";

        div.innerHTML = `
            <p class="text-lg text-purple-700 font-semibold">${name}</p>
            <p class="text-gray-700">${message}</p>
            <p class="text-sm text-gray-400 mt-2">${date.toLocaleString()}</p>
        `;
        container.prepend(div);
    }

    // Panggil ketika halaman pertama kali dibuka
    document.addEventListener('DOMContentLoaded', loadMessages);
    

        // Add some interactive sparkle effects
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.85) {
                createSparkle(e.clientX, e.clientY);
            }
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.fontSize = '12px';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }

        // Data foto dinamis
        const memories = [
            { src: "assets/image/1.jpg", title: "Jalan2 Ke Mall", desc: "Jalan Jalan Ke mal Seru sekali" },
            { src: "assets/image/2.jpg", title: "Jalan2 Ke Mall", desc: "Jalan Jalannya Seru Banget mau ulangi kembali" },
            { src: "assets/image/3.jpg", title: "Daily Stories", desc: "Momen bersama Di fakultas FSB menemani Chika untuk mengecek ruangan Ujiannya Photos 1" },
            { src: "assets/image/4.jpg", title: "Daily Stories", desc: "Momen bersama Di fakultas FSB menemani Chika untuk mengecek ruangan Ujiannya photos 2" },
            { src: "assets/image/5.jpeg", title: "Liburan Bersama", desc: "Perjalanan tak terlupakan ke pantai dan bermain bersama" },
        ];

        const gallery = document.getElementById("scrollingGallery");

        // Gandakan list untuk seamless loop
        const allMemories = [...memories, ...memories];

        // Render item
        allMemories.forEach(mem => {
            const div = document.createElement("div");
            div.className = "memory-item love-card rounded-xl overflow-hidden w-64 h-64 flex-shrink-0 relative group cursor-pointer";
            div.innerHTML = `
            <img src="${mem.src}" alt="${mem.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-white text-xl font-dancing">Lihat Detail</span>
            </div>
            `;
            div.onclick = () => openMemoryModal(mem.src, mem.title, mem.desc);
            gallery.appendChild(div);
        });

        // Fungsi modal glassmorphism
        function openMemoryModal(src, title, desc) {
            Swal.fire({
            title: `<h2 class="font-dancing text-3xl text-purple-700">${title}</h2>`,
            html: `
                <img src="${src}" alt="${title}" class="w-full rounded-xl mb-4 shadow-lg">
                <p class="text-white">${desc}</p>
            `,
            width: "600px",
            background: "transparent",
            customClass: {
                popup: "memory-modal"
            },
            showConfirmButton: false,
            showCloseButton: true,
            });
        }

        // Pause saat hover
        const galleryContainer = document.querySelector(".scrolling-gallery-container");
        galleryContainer.addEventListener("mouseenter", () => {
            gallery.classList.add("paused");
        });
        galleryContainer.addEventListener("mouseleave", () => {
            gallery.classList.remove("paused");
        });