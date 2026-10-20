document.addEventListener("DOMContentLoaded", function () {

// 1. MENU AKTIF DAN SMOOTH SCROLL
    const navLinks = document.querySelectorAll(
        ".navbar .nav-link"
    );

    const sections = document.querySelectorAll(
        "#home, #divisi, #about, #daftar"
    );

    function setActiveMenu(id) {
        navLinks.forEach(function (link) {
            const aktif = link.getAttribute("href") === "#" + id;

            link.classList.toggle("active", aktif);

            if (aktif) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const tujuan = link.getAttribute("href");
            const section = document.querySelector(tujuan);

            if (!section) return;

            event.preventDefault();

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            setActiveMenu(section.id);
            history.replaceState(null, "", tujuan);

            // Tutup navbar pada tampilan HP
            const navbarNav = document.getElementById("navbarNav");

            if (
                navbarNav &&
                navbarNav.classList.contains("show")
            ) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbarNav)
                    .hide();
            }
        });
    });

// Memperbarui menu aktif sesuai section yang terlihat
    const observer = new IntersectionObserver(
        function (entries) {
            const terlihat = entries
                .filter(entry => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                );

            if (terlihat.length > 0) {
                setActiveMenu(terlihat[0].target.id);
            }
        },
        {
            rootMargin: "-100px 0px -40% 0px",
            threshold: [0, 0.25, 0.5, 0.75]
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });

// 2. GRAFIK CHART.JS
    const canvas = document.getElementById("divisiChart");

    if (canvas && typeof Chart !== "undefined") {
        new Chart(canvas, {
            type: "bar",

            data: {
                labels: [
                    "Acara",
                    "Publikasi",
                    "Perlengkapan",
                    "Konsumsi",
                    "Keamanan",
                    "Dokumentasi"
                ],

                datasets: [{
                    label: "Jumlah Peminat",
                    data: [45, 60, 30, 25, 35, 50],

                    backgroundColor: [
                        "#ff3158",
                        "#f1ff31",
                        "#328bff",
                        "#20bf6b",
                        "#9b59b6",
                        "#ff9f43"
                    ],

                    borderRadius: 6,
                    borderSkipped: false
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: true,

                plugins: {
                    legend: {
                        labels: {
                            color: "#ffffff"
                        }
                    },

                    tooltip: {
                        enabled: true
                    }
                },

                scales: {
                    x: {
                        ticks: {
                            color: "#ffffff"
                        },

                        grid: {
                            display: false
                        }
                    },

                    y: {
                        beginAtZero: true,

                        ticks: {
                            color: "#ffffff",
                            stepSize: 10
                        },

                        title: {
                            display: true,
                            text: "Jumlah Peminat",
                            color: "#ffffff"
                        }
                    }
                }
            }
        });
    } else {
        console.error(
            "Grafik tidak dapat dibuat. Periksa Chart.js dan elemen canvas."
        );
    }

    
// 3. FORMULIR PENDAFTARAN
    const form = document.getElementById("formPendaftaran");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nama = document.getElementById("nama").value.trim();
            const divisi = document.getElementById("divisiPilihan").value;

            alert(
                "Pendaftaran berhasil divalidasi!\n\n" +
                "Nama: " + nama + "\n" +
                "Divisi pilihan: " + divisi + "\n\n" +
                "Catatan: Data ini hanya simulasi dan belum disimpan ke database."
            );

            form.reset();
        });
    }
});