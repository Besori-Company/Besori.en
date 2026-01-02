document.getElementById("footer-placeholder").innerHTML = `
<footer role="contentinfo">
    <span>© <span id="year"></span> Besori ®</span>
    <span><a href="/Besori.en/pages/terms.html">Terms and Policies</a></span>
    <span><a href="mailto:info.besori@gmail.com">info.besori@gmail.com</a></span>
</footer>
`;
document.getElementById("year").textContent = new Date().getFullYear();
