(function() {
    const consentData = JSON.parse(localStorage.getItem('cookieConsent') || 'null');
    if (consentData && (Date.now() - consentData.timestamp) < 30 * 24 * 60 * 60 * 1000) return;

    // Styles
    if (!document.getElementById('cookie-styles')) {
        const s = document.createElement('style');
        s.id = 'cookie-styles';
        s.textContent = `
            .cookie_banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: var(--blanco, #ffffff);
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
                padding: 2rem 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                z-index: 999;
                animation: cookieSlideUp 0.4s ease-out;
            }

            @keyframes cookieSlideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .cookie_texto {
                font-size: 1.4rem;
                color: var(--negro_claro, #676767);
                max-width: 600px;
                line-height: 1.5;
            }

            .cookie_texto a {
                color: var(--azul, #3577b1);
                text-decoration: none;
            }

            .cookie_texto a:hover {
                text-decoration: underline;
            }

            .cookie_botones {
                display: flex;
                gap: 1rem;
                flex-shrink: 0;
            }

            .cookie_btn {
                padding: 1rem 2rem;
                border: none;
                border-radius: 8px;
                font-size: 1.4rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .cookie_btn:hover {
                transform: translateY(-2px);
            }

            .cookie_btn_aceptar {
                background: var(--azul, #3577b1);
                color: var(--blanco, #ffffff);
                box-shadow: 0 4px 12px rgba(53, 119, 177, 0.3);
            }

            .cookie_btn_aceptar:hover {
                box-shadow: 0 4px 12px rgba(53, 119, 177, 0.5);
            }

            .cookie_btn_necesarias {
                background: var(--gris, #e4efee);
                color: var(--negro_claro, #676767);
            }

            .cookie_btn_necesarias:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 750px) {
                .cookie_banner {
                    flex-direction: column;
                    padding: 1.5rem 2rem;
                    gap: 1.2rem;
                    text-align: center;
                }

                .cookie_texto {
                    font-size: 1.3rem;
                }

                .cookie_botones {
                    width: 100%;
                    justify-content: center;
                }

                .cookie_btn {
                    font-size: 1.3rem;
                    padding: 0.8rem 1.5rem;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // HTML
    const placeholder = document.getElementById('cookies-placeholder');
    if (!placeholder) return;

    placeholder.innerHTML = `
        <div class="cookie_banner" id="cookieBanner">
            <p class="cookie_texto">
                We use cookies to improve your experience. See our
                <a href="/Besori.en/pages/terms.html">Cookie Policy</a>.
            </p>
            <div class="cookie_botones">
                <button class="cookie_btn cookie_btn_aceptar" id="cookieAcceptAll">Accept all</button>
                <button class="cookie_btn cookie_btn_necesarias" id="cookieEssential">Essential only</button>
            </div>
        </div>
    `;

    document.getElementById('cookieAcceptAll').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', JSON.stringify({ type: 'all', timestamp: Date.now() }));
        document.getElementById('cookieBanner').style.animation = 'cookieSlideUp 0.3s ease reverse forwards';
        setTimeout(function() { placeholder.innerHTML = ''; }, 300);
    });

    document.getElementById('cookieEssential').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', JSON.stringify({ type: 'essential', timestamp: Date.now() }));
        document.getElementById('cookieBanner').style.animation = 'cookieSlideUp 0.3s ease reverse forwards';
        setTimeout(function() { placeholder.innerHTML = ''; }, 300);
    });
})();
