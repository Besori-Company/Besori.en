document.getElementById("footer-placeholder").innerHTML = `
<footer role="contentinfo">
    <span>© <span id="year"></span> Besori ®</span>
    <span><a href="/pages/terms.html">Terms and Policies</a></span>
    <span><a href="mailto:besoricompany@gmail.com">besoricompany@gmail.com</a></span>
</footer>
`;
document.getElementById("year").textContent = new Date().getFullYear();
