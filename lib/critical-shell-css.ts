/**
 * Inlined in root layout <head>. If the main CSS chunk fails to load (stale .next / HMR),
 * these rules still apply so the page is not raw HTML with blue links and broken marquees.
 */
export const CRITICAL_SHELL_CSS = `
*,*::before,*::after{box-sizing:border-box}
html{overflow-x:clip;-webkit-text-size-adjust:100%;font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif}
body{margin:0;min-height:100vh;background:#000;color:#f5f5f5;line-height:1.5;-webkit-font-smoothing:antialiased}
main{display:block;min-width:0}
a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer}
.paprish-navbar-root{position:fixed;left:0;right:0;top:0;z-index:100;pointer-events:none}
.paprish-navbar-root>.paprish-navbar-inner{pointer-events:auto}
.paprish-utility-wrap{display:none;border-bottom:1px solid rgba(255,255,255,0.07);background:#000}
@media (min-width:640px){.paprish-utility-wrap{display:block}}
.paprish-utility-inner{display:flex;max-width:1600px;margin-left:auto;margin-right:auto;align-items:center;justify-content:flex-end;gap:1.5rem;padding:0.5rem 1rem;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.45)}
.paprish-mainbar{border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.95)}
.paprish-main-row{display:flex;max-width:1600px;margin-left:auto;margin-right:auto;align-items:center;gap:0.5rem;padding:0.75rem;flex-wrap:nowrap}
@media (min-width:640px){.paprish-main-row{gap:1rem;padding-left:1.5rem;padding-right:1.5rem}}
.paprish-menu-btn{display:block;padding:0.5rem;border-radius:0.375rem;background:transparent;border:none;color:#fff}
@media (min-width:1024px){.paprish-menu-btn{display:none}}
.paprish-logo-link{display:flex;flex-shrink:0;align-items:center}
.paprish-nav-desktop{display:none;align-items:center;gap:1.75rem;margin-left:0.5rem}
@media (min-width:1024px){.paprish-nav-desktop{display:flex}}
@media (min-width:1280px){.paprish-nav-desktop{gap:2.25rem}}
.paprish-search-desktop{display:none;flex:1;min-width:0;justify-content:center;align-items:center;margin:0 0.5rem}
@media (min-width:1024px){.paprish-search-desktop{display:flex}}
.paprish-actions{margin-left:auto;display:flex;align-items:center;gap:0.125rem}
@media (min-width:640px){.paprish-actions{gap:0.25rem}}
.paprish-main-row svg,.paprish-utility-inner svg{color:inherit;stroke:currentColor}
.paprish-marquee-clip{overflow:hidden;position:relative}
.paprish-marquee-track{display:flex;width:max-content;align-items:center}
.paprish-marquee-anim{animation:paprish-marquee 45s linear infinite}
.paprish-marquee-anim-slow{animation:paprish-marquee 60s linear infinite}
@keyframes paprish-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.paprish-marquee-band{border-top:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(0,0,0,0.1);background:#f59e0b;padding:1rem 0}
.paprish-marquee-script{border-top:1px solid rgba(255,255,255,0.1);border-bottom:1px solid rgba(255,255,255,0.1);background:#000;padding:1.25rem 0}
`;
